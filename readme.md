## 🛠️ What is this

A quick JS-oriented web app starter.  
(Not fully optimized yet, but already works in our projects. 😀)

It works like [vue-cli](https://github.com/vuejs/vue-cli) or [create-react-app](https://github.com/facebook/create-react-app).  
But it is build from scratch. (well basiclly... just some tool installed and their configs, 😆)  
So you can also check the code and references to learn how to build your own build kit. 🖖

---

## ⭐️ Main Features Supported

It use the latest `Webpack 4` and `Babel 7` to ensure the best feature support **In READY**.  
Includes:

-   ES6 and more
-   TypeScript
-   React/Vue
-   Auto Polyfill
-   Vendor Split
-   SASS/SCSS/LESS
-   CSS Autoprefixer

---

## 📦 Getting Started

`git clone`

`npm install`

dev: `npm start` then open 🌐 `http://localhost:8080/`  
prod: `npm build` to the dist folder 👉 `./dist/`

---

## 💡 Confused Config Description

**webpack**

-   **webpack**: is a code bundler.

-   **.resolve**: handle import path in code, do the path transformation and autocompletion staff.

-   **.module.rules**: is a set of different types of file loaders,  
    each type can have multiple loaders which would run _in reverse order_.  
    such as `sass-loader -> postcss-loader -> css-loader -> style-loader`

-   **.plugins** and **.optimization**: are orderless, they are like hooks, and would run in certain points of a build cycle.

**babel**

-   **babel**: is a ES6 ( and dialects like TypeScipt and React ) to ES5 compilers.  
    (Notice that Vue has its own compiler tools.)

-   **plugins**: is a set of some partial code compilers.  
    every plugin will handler specific syntax of code,  
    It runs _in order_, and order matters, e.g.  
    `syntax-dynamic-import -> proposal-decorators -> proposal-class-properties -> transform-runtime`

-   **presets** is a set of packaged code compilers.  
    it runs _in reverse order_,  
    e.g. `typescript -> react -> env`

**browserslist**

-   it's a browser compatibility description used by `Autoprefixer` and `Babel`  
    In this workaround it's declared in `package.json`

---

## 📜 References

[My first time writing a Webpack Loader](https://medium.com/netscape/my-first-time-writing-a-webpack-loader-bf92d42fff57)  
[Working with Babel 7 and Webpack](https://www.thebasement.be/working-with-babel-7-and-webpack/)  
[How to set up Typescript with Babel and Webpack](https://medium.com/@francesco.agnoletto/how-to-set-up-typescript-with-babel-and-webpack-6fba1b6e72d5)  
[The 100% correct way to split your chunks with Webpack](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)  
[Webpack4+Babel7 优化 70%速度](https://juejin.im/post/5c763885e51d457380771ab0)  
[webpack-starter-basic](https://github.com/lifenautjoe/webpack-starter-basic)  
[babel-typescript-react-boilerplate](https://github.com/saltyshiomix/babel-typescript-react-boilerplate)

---

## 🕗 TODO

-   [ ] es/tslint config and autorun
-   [ ] Prettier config for autorun
-   [ ] test（mocha）
-   [ ] git commit hook ( to autorun some staff )
-   [ ] commitizen
-   [ ] more TS example
