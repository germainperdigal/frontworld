# Introduction

Gestionnaire de MDP sécurisé, pour le WorkShop I4 2021 ***(EPSI LYON)***.

Stack technique :

- Angular v12.1.2
- Electron v13.1.7
- Electron Builder v22.11.9
- Electron Installer Windows

## Mise en route du projet

*Clone du repo:*

``` bash
git clone https://github.com/germainperdigal/frontworld
```

*Installation des dépendances:*

``` bash
npm install
```

``` bash
npm install -g @angular/cli
```

*Installation des dépendances utilisées par Electron:*

``` bash
cd app/
npm install
```

## Build pour le développement

Pour lancer le serveur web ainsi que l'application en env. développement:
- **Dans un shell**: npm start


## Structure du projet

|Dossier/fichier|Description|
| ---- | ---- |
| app | Electron main process (NodeJS) |
| src | Electron renderer process (Web / Angular) |

## Clés publiques et privées

Les clés publiques et privées (générées à l'inscription) sont stockées à la racine du projet.

- ### Convention de nommage
***
public-key-**ID utilisateur**.pub ou priv-key-**ID utilisateur**.pem
