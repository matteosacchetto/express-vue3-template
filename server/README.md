# Express - Server

**Express** server implementation

The Express server uses the following packages:

* [app-root-path](https://www.npmjs.com/package/app-root-path)
* [compression](https://www.npmjs.com/package/compression)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express-mung](https://www.npmjs.com/package/express-mung)
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
* [helmet](https://helmetjs.github.io/)
* [hpp](https://www.npmjs.com/package/hpp)
* [http-status-codes](https://www.npmjs.com/package/http-status-codes)
* [morgan](https://www.npmjs.com/package/morgan)
* [winston](https://www.npmjs.com/package/winston)



## Table of contents

* [Project structure](#project-structure)
* [Setup](#setup)
  + [Set a LICENSE](#set-a-license)
  + [Modify the package.json](#modify-the-packagejson)
  + [Install the dependencies](#install-the-dependencies)
  + [Start the application](#start-the-application)
* [Documentation](#documentation)
* [Scripts](#scripts)
  + [Install](#install)
  + [Dev](#dev)
  + [Start](#start)
  + [Lint](#lint)
    - [Lint](#lint-1)
    - [Fix](#fix)
* [Environment variables](#environment-variables)

## Project structure

```
server/
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

The [src](src) directory contains the source code you need to develop. It is divided into the [lib](src/lib) subdirectory, which contains library modules which can be imported by all the other modules, the [middlewares](src/middlewares) subdirectory, which contains the custom defined express middlewares, imported in the [app.js](app.js) main file. There is then the [routes](src/routes) subdirectory which contains all the api endpoints divided into multiple files, in a hierarchic way.



## Setup

Please refer to [../README.md](../README.md#setup) for the details to setup the whole project. In this section I will present the details on how to set up only the server.



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



### Install the dependencies

You can install the dependencies by running the [install](#install) script.

```bash
npm install
```

This will take a while.



### Start the application

You can start the application in two different ways

If you want hot reload, that is available through [nodemon](https://www.npmjs.com/package/nodemon) using the [dev](#dev) script

```bash
npm run dev
```

or using nodemon directly

```bash
nodemon .
```



Otherwise, if you want to start the server without hot reloading, you can either use the [start](#start) script

```bash
npm start
```

or you can use node directly

```bash
node .
```



## Documentation

[Server documentation](../documentation/server/README.md)



## Scripts

### Install

```bash
npm install
```

It will take care of installing the dependencies of the server



### Dev

```bash
npm run dev
```

It will start the server with hot reloading. Useful during development



### Start 

```bash
npm start
```

It will start the server without hot reloading. Useful to test the application as in production



### Lint

#### Lint

```bash
npm run lint
```

This script will take care of linting  the code, without fixing any issue.



#### Fix

```bash
npm run fix
```

This script instead will take care of linting the code and fix **ANY** issue it is able to auto fix.



## Environment variables

These are the environment variables that can be defined in the .env file

* **USE_HTTP**: to specify whether to start a HTTP server or not. (_default: **true**_)
  * **false**: do **not** start the HTTP server
  * **true**: do start the HTTP server
* **PORT**: the port on which the HTTP server will listen (_default: **8000**_)
* **USE_HTTPS**: to specify whether to start a HTTPS server or not. (_default: **true**_)
  * **false**: do **not** start the HTTPS server
  * **true**: do start the HTTPS server
* **PORT_HTTPS**: the port on which the HTTPS server will listen (_default: **44300**_)
* **NODE_ENV**: the environment {development, production} (_default: **development**_)
* **SSL_KEY_PATH**: to specify the path to the ssl key to use.  (_default **'ssl/key.pem'**_)
  **NOTE**: it is only used if the **NODE_ENV** is set to _production_ and **USE_HTTPS** is set to _true_
* **SSL_CERT_PATH**: to specify the path to the ssl certificate to use.  (_default **'ssl/cert.pem'**_)
  **NOTE**: it is only used if the **NODE_ENV** is set to _production_ and **USE_HTTPS** is set to _true_
* **USE_STATIC**: to specify whether to serve static files or not. (_default: **true**_)
  * **false**: do **not** server static files
  * **true**: do serve static files
* **STATIC_PATH**: the path of the folder which contains static files. The path is relative with respect to the project folder (_default: **public**_)
* **USE_STDOUT**: specifies whether to log to files or to stdout when in production. (_default: **false**_)
* **APP_ROOT_PATH**: this is used to identify the root directory of the source code of the server. There is no need to specify it, since it is able to auto-decalare it, but it is available if for some reason you want to specify it. (default: **src**)

