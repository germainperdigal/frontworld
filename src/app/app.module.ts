import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SubmenuComponent} from './shared/submenu/submenu.component';
import {LoginComponent} from './components/login/login.component';
import {ListComponent} from './components/secured/list/list.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordStrengthComponent} from './shared/password-strength/password-strength.component';
import {AccountComponent} from './components/secured/account/account.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxSmartModalModule} from "ngx-smart-modal";
import { CreateComponent } from './components/secured/create/create.component';
import { HomeComponent } from './components/home/home.component';
import {PasswordsResolver} from "./shared/resolvers/passwords.resolver";
import {AccountResolver} from "./shared/resolvers/account.resolver";

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubmenuComponent,
    LoginComponent,
    ListComponent,
    RegisterComponent,
    PasswordStrengthComponent,
    AccountComponent,
    CreateComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [PasswordsResolver, AccountResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
