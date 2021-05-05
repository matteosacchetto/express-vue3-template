# Vue3 - Client

**Vue3** client implementation. 

The Vue3 client has been created through the vue cli and uses the following packages:

* [Vue Router](https://next.router.vuejs.org/)
* [Vuex](https://next.vuex.vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/)



## Table of contents

* [Project structure](#project-structure)
* [Setup](#setup)
  + [Set a LICENSE](#set-a-license)
  + [Modify the package.json](#modify-the-packagejson)
  + [Install the dependencies](#install-the-dependencies)
  + [Start the application](#start-the-application)
  + [Build the application](#build-the-application)
* [Documentation](#documentation)
* [Scirpts](#scirpts)
  + [Install](#install)
  + [Serve](#serve)
  + [Build](#build)
  + [Lint](#lint)
    - [Lint](#lint-1)
    - [Fix](#fix)
* [Customize client configuration](#customize-client-configuration)



## Project structure

```
client/
|    README.md
|    package.json
|    package-lock.json
|    vue.config.js
|    tailwind.config.js
|    babel.config.js
|    .gitignore
|    .eslintrc.js
|
|___ public/
|    |    favicon.ico
|    |    index.html
|    |    robots.txt
|
|___ src/
     |    main.js
     |    App.vue
     |
     |___ assets/
     |    |    tailwind.css
     |
     |___ components/
     |    |    Example.vue
     |    |    Footer.vue
     |    |    Navbar.vue
     |
     |___ router/
     |    |    index.js
     |    
     |___ store/
     |    |    index.js
     |
     |___ views/
          |    Home.vue
          |    About.vue
```

The src folder contains the source code you need to develop. If you want to add some `<meta>` tag or other elements to the html file, you can do so by modifying the [public/index.html](public/index.html) file.

In the [src](src) folder you will find the [components](src/components) directory which contains all the components you develop. Thene there is the [views](src/views) directory which contains the views. The [router](router) directory contains the configuration of the Vue Router, and the [store](store) directory contains the configuration of the Vuex store.



## Setup

Please refer to [../README.md](../README.md#setup) for the details to setup the whole project. In this section I will present the details on how to set up only the client.



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

You can run the [serve](#serve) script to launch a development server which hot-reloads the application

```bash
npm run serve
```



### Build the application

Once your application is ready to be released you can then build the application using the [build](#build) script

```bash
npm run build
```

This script will compile the src code into standard HTML, JS and CSS files which will be store in the folder specified by the `outputDir` attribute of the [vue.config.js](vue.config.js) file. By default it will store it in **../server/public**, ready to be served by the express server, but that value can be modified



## Documentation

[Client documentation](../documentation/client/README.md)



## Scirpts

### Install

```bash
npm install
```

It will take care of installing the dependencies of the client



### Serve

```bash
npm run serve
```

Compiles and hot-reloads for development. It will start a development server which will hot reload changes



### Build

```bash
npm run build
```

Compiles and minifies for production. This script will compile the src code into standard HTML, JS and CSS files which will be store in the folder specified by the `outputDir` attribute of the [vue.config.js](vue.config.js) file. By default it will store it in **../server/public**, ready to be served by the express server, but that value can be modified



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



### Customize client configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

