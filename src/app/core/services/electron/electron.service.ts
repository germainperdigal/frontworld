import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import {ToastrService} from "ngx-toastr";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  crypto;
  remote: typeof remote;
  childProcess: typeof childProcess;
  shell;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor(
    private toastr: ToastrService,
  ) {
    // Conditional imports
    if (this.isElectron) {
      this.shell = window.require('electron').shell;
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.crypto = window.require('crypto');
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      // If you want to use a NodeJS 3rd party deps in Renderer process (like @electron/remote),
      // it must be declared in dependencies of both package.json (in root and app folders)
      // If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts
      this.remote = window.require('@electron/remote');
    }
  }

  /**
   * Write private file
   *
   * @param content The content
   * @param userId The user id
   */
  writePrivateFile(content: Buffer, userId: string): void {
    this.fs.writeFile(`${this.remote.app.getAppPath()}/priv-key-${userId}.pem`, content,  { flag: 'w' }, () => {
      this.toastr.success('Your private security token has been configured.');
    });
  }

  /**
   * Copy to clipboard
   *
   * @param content The content
   * @param message The message
   */
  copyToClipBoard(content: string, message = null) {
    this.remote.clipboard.writeText(content);
    if (message) {
      this.toastr.success(message);
    }
  }

  /**
   * Write public file
   *
   * @param content The content
   * @param userId  The user id
   */
  writePublicFile(content: Buffer, userId: string): void {
    this.fs.writeFile(`${this.remote.app.getAppPath()}/public-key-${userId}.pub`, content,  { flag: 'w' }, () => {
      this.toastr.success('Your public security token has been configured.');
    });
  }

  /**
   * Generate keys
   *
   * @param userId The user id
   */
  async generateKeys(userId: string): Promise<any> {
    const { publicKey, privateKey } = await this.crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      }
    });

    this.writePublicFile(publicKey, userId);
    this.writePrivateFile(privateKey, userId);

    return of(true);
  }

  /**
   * Open external url
   *
   * @param externalUrl The url to open
   */
  openExternalUrl(externalUrl: string) {
    if (externalUrl.search(/^http[s]?\:\/\//) === -1) {
      externalUrl = 'http://' + externalUrl;
    }

    this.shell.openExternal(externalUrl.replace(/href="(?!http)/, 'href="http://'));
  }

  /**
   * Crypt password
   *
   * @param password The plain password
   */
  cryptPassword(password: string): Buffer {
    return this.crypto.publicEncrypt(this.fs.readFileSync(`${this.remote.app.getAppPath()}/public-key-${localStorage.getItem('currentId')}.pub`, 'utf-8'), Buffer.from(password));
  }

  /**
   * Decrypt password
   *
   * @param buffer The buffer
   */
  async decryptPassword(buffer): Promise<string> {
      return this.crypto.privateDecrypt(this.fs.readFileSync(`${this.remote.app.getAppPath()}/priv-key-${localStorage.getItem('currentId')}.pem`, 'utf-8'), new Buffer(buffer.data)).toString();
  }
}
