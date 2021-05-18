# Express + Vue3 template

NodeJS template for building a **Express + Vue3** based application



## Table of contents


* [Project structure](#project-structure)
* [Setup](#setup)
  + [Set a LICENSE](#set-a-license)
  + [Modify the package.json](#modify-the-packagejson)
  + [Install the dependencies](#install-the-dependencies)
  + [Start the application](#start-the-application)
  + [Modify eslint settings [OPTIONAL]](#modify-eslint-settings-optional)
* [Client](#client)
* [Server](#server)
* [Documentation](#documentation)
* [Docker](#docker)
* [Scripts](#scripts)
  + [Install](#install)
  + [Start](#start)
  + [Build](#build)
  + [Lint](#lint)
    - [Lint](#lint-1)
    - [Fix](#fix)
  + [Lint local](#lint-local)
    - [Lint](#lint-2)
    - [Fix](#fix-1)
  + [Docker](#docker-1)
    - [Build](#build-1)
    - [Run dev](#run-dev)
    - [Run prod](#run-prod)
    - [Stop](#stop)
    - [Start](#start-1)
    - [Rm](#rm)
    - [Rmi](#rmi)



## Project structure

```
/
|    README.md
|    package.json
|    package-lock.json
|    Dockerfile
|    .dockerignore
|    .gitignore
|    .eslintrc.js
|
|___ client/
|    |    README.md
|    |    package.json
|    |    package-lock.json
|    |    vue.config.js
|    |    tailwind.config.js
|    |    babel.config.js
|    |    .gitignore
|    |    .eslintrc.js
|    |
|    |___ public/
|    |    |    favicon.ico
|    |    |    index.html
|    |    |    robots.txt
|    |
|    |___ src/
|         |    main.js
|         |    App.vue
|         |
|         |___ assets/
|         |    |    tailwind.css
|         |
|         |___ components/
|         |    |    Example.vue
|         |    |    Footer.vue
|         |    |    Navbar.vue
|         |
|         |___ router/
|         |    |    index.js
|         |    
|         |___ store/
|         |    |    index.js
|         |
|         |___ views/
|              |    Home.vue
|              |    About.vue
|        
|
|___ documentation/
|    |    README.md
|    |
|    |___ client/
|    |    |    README.md
|    |    |    ...
|    |
|    |___ server/
|         |    README.md
|         |    ...
|
|___ scripts/
|    |    docker-build.js
|    |    docker-run-dev.js
|    |    docker-run-prod.js
|    |    docker-start-js
|    |    docker-stop.js
|    |    docker-rm.js
|    |    docker-rmi.js
|    |    build-client.js
|    |    
|    |___ lib/
|         |    logger.js
|         |    optimize-build-client.js
|        
|___ server/
     |    package.json
     |    package-lock.json
     |    .gitignore
     |    .eslintrc.js
     |    .env.example
     |    README.md
     |
     |___ src/
          |    app.js
          |
          |___ lib/
          |    |    config.js
          |    |    logger.js
          |    |    http-utils.js
          |
          |___ middlewares/
          |    |    api-not-found.js
          |    |    response-status.js
          |
          |___ routes/
               |    api.js
```

 

## Setup

After downloading this template, or after initializing a repository starting from this template, you **need** to perform the following steps.



### Set a LICENSE

Decide which license you want to use



### Modify the package.json

In particular you **need** to modify/set the following attributes of the [package.json](package.json):

* name
* version [OPTIONAL]
* description
* author
* contributors [OPTIONAL]
* license

You also **need** to modify/set those attributes in [client/package.json](client/package.json) and [server/package.json](server/package.json)



### Install the dependencies

You can install all the dependencies by running the [install](#install) script in the root folder of the project. 

```bash
npm install
```

This will take a while.



### Start the application

You then can start the default application by running the [start](#start) script in the root folder of the project. 

```bash
npm start
```

By default the application can will only use HTTP and is available at the following url: [http://localhost:8000/](http://localhost:8000/), but you can modify the default behavior by setting some specific environment variables. You can find the list of available environment variables, with some additional informations in the [server/README.md](server/README.md),



### Modify eslint settings [OPTIONAL]

In the application you can find 3 different eslint configurations, one in the root: [.eslintrc.js](.eslintrc.js), one in the client: [client/.eslintrc.js](client/.eslintrc.js) and one in the server: [server/.eslintrc.js](server/.eslintrc.js). While the one in the client has been created by the vue cli, the other two are custom created and take advantage of the prettier plugin to format the code. If you wish to modify those configuration please take a look at [Eslint](https://eslint.org/docs/rules/) and [Prettier](https://prettier.io/docs/en/options.html) documentations	 



## Client

[Client](client/README.md)



## Server

[Server](server/README.md)



## Documentation

[Documentation](documentation/README.md)



## Docker

In the root directory you also find a [Dockerfile](Dockerfile) which can is used by all the [docker](#docker-1) scripts and it is used to containerize the application. The Dockerfile is written for development, so it will start both the HTTP and HTTPS server, but if you want to use it for production you can deactivate the HTTP server by simply setting the `USE_HTTP` environment variable to false and commenting the `EXPOSE 80` line. 



## Scripts

In the [package.json](package.json) are defined some useful script. Some of this script just call a series of commands in the right order, concatenating them through &&, while other are some custom scripts which are implemented in the **scripts** directory.

To list all the available scripts you can run

```bash
npm run
```



### Install

```bash
npm install
```

By running this script in the root folder of the project it will take care of installing the dependencies of the **root**,  the **client** and the **server**. It will create a *node_modules* folder in the **root**, the **client** and the **server** folder.



### Start

```bash
npm start
```

This script will take care of **building (only if necessary)  the Vue3 application** and **store the built files** in */server/public*. Then it will start the express based server



### Build

 

```bash
npm run build
```

This script will take care of **building (only if necessary)  the Vue3 application** and **store the built files** in */server/public*.



### Lint

#### Lint

```bash
npm run lint
```

This script will take care of linting both the **client** and the **server** code, without fixing any issue.



#### Fix

```bash
npm run fix
```

This script instead will take care of linting both the **client** and the **server** code and fix **ANY** issue it is able to auto fix.



### Lint local

#### Lint

```bash
npm run lint-local
```

This script will take care of linting the **scripts** folder



#### Fix

```bash
npm run fix
```

This script will take care of linting the **scripts** folder and fix **ANY** issue it is able to auto fix.



### Docker

#### Build

```bash
npm run docker-build
```

This script will take care of building the application into a Docker image



#### Run dev

```bash
npm run docker-run-dev
```

The script will take care of creating a container from the previously built Docker image exposing only the HTTP server. This can be useful during development, to test it without the need to create a ssl certificate. The container will be exposed on port 8000, but you can modify that value by changing the `localPort` variable of the [scripts/docker-run-dev.js](scripts/docker-run-dev.js) file



#### Run prod

```bash
npm run docker-run-prod
```

The script will take care of creating a container from the previously built Docker image exposing only the HTTPS server. This can be useful to test the application as if it was in production. For this script you need to create the **server/ssl** and you need to create inside that directory the **ssl.key** and **ssl.cert** files. You can modify the directory and the files name by changing the constants `local_ssl_folder` `ssl_key_file` and `ssl_cert_file` in the [scripts/docker-run-prod.js](scripts/docker-run-prod.js) file. The container will be exposed on port 44300, but you can modify that value by changing the `localPort` variable of the [scripts/docker-run-prod.js](scripts/docker-run-dev.js) file



#### Stop

```bash
npm run docker-stop
```

The script will take care of stopping the Docker container



#### Start

```bash
npm run docker-start
```

The script will take care of starting the Docker container



#### Rm

```bash
npm run docker-rm
```

This script will take care of deleting the Docker container created by [docker-run-dev](#run-dev) or [docker-run-prod](#run-prod)



#### Rmi

```bash
npm run docker-rm
```

This script will take care of deleting the Docker image created by [docker-build](#build) and all the child containers



## Useful commands

If you want to generate the ssl certificate in order to test the application over ssl you can create a self signed certificate with the following series of commands:

```bash
mkdir server/ssl
openssl req -new -x509 -days 365 -nodes -out server/ssl/ssl.cert -keyout server/ssl/ssl.key
chmod 600 server/ssl/ssl.*
```

