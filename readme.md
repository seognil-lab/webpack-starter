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

- ES6 and more
- TypeScript
- React/Vue
- Auto Polyfill
- Bundle Split
- SASS/SCSS/LESS
- CSS Autoprefixer
- Auto ESlint (with husky)
- Auto Prettier (with husky)

---

## 📦 Getting Started

`git clone https://github.com/seognil-lab/webpack-starter`

`npm install`

Modify or drop the `src/demo` folder as your wish.

dev: `npm start` then open 🌐 `http://localhost:8080/`  
prod: `npm build` to the dist folder 👉 `./dist/`

**!! MUST !!**

update the `name` (maybe `author` and `homepage` and more) in `package.json`

update the `LICENSE` file
update the `readme.md`
update `.npmrc` inside the project in case you want to publish

---

## 💡 Confused Config Description

**webpack**

- **webpack**: is a code bundler.

- **.resolve**: handle import path in code, do the path transformation and autocompletion staff.

- **.module.rules**: is a set of different types of file loaders,  
  each type can have multiple loaders which would run _in reverse order_.  
  such as `sass-loader -> postcss-loader -> css-loader -> style-loader`

- **.plugins** and **.optimization**: are orderless, they are like hooks, and would run in certain points of a build cycle.

**babel**

- **babel**: is a ES6 ( and dialects like TypeScipt and React ) to ES5 compilers.  
  (Notice that Vue has its own compiler tools.)

- **plugins**: is a set of some partial code compilers.  
  every plugin will handler specific syntax of code,  
  It runs _in order_, and order matters, e.g.  
  `syntax-dynamic-import -> proposal-decorators -> proposal-class-properties -> transform-runtime`

- **presets** is a set of packaged code compilers.  
  it runs _in reverse order_,  
  e.g. `typescript -> react -> env`

**browserslist**

- it's a browser compatibility description used by `Autoprefixer` and `Babel`  
  In this workaround it's declared in `.browserslistrc`

---

## Best practice

- **splitChunks && dynamic import**

  [Predictable long term caching with Webpack](https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31)  
  [The 100% correct way to split your chunks with Webpack](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)

- **When to transpile**

  - **package**: rollup, basic transpile, output esm/cjs/else

  - **project**: webpack, transpile everything for browser
    - Because you can't control every third-party lib or ask maintainers to do the patch
    - Compacity is one of the project's purpose, not packages'
    - And it's impossible to cover every use case by a packages as open libs themself

  **Why**  
  [sindresorhus - Enable babel-preset-env for node_modules that target newer Node versions #1125](https://github.com/facebook/create-react-app/issues/1125#issuecomment-264217076)

  **Future?** _webpack-plugin-multi-loader_  
  check fields in the package.json then call loader or not

---

## 📜 References

[Working with Babel 7 and Webpack](https://www.thebasement.be/working-with-babel-7-and-webpack/)  
[How to set up Typescript with Babel and Webpack](https://medium.com/@francesco.agnoletto/how-to-set-up-typescript-with-babel-and-webpack-6fba1b6e72d5)  
[The 100% correct way to split your chunks with Webpack](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)  
[Webpack4+Babel7 优化 70%速度](https://juejin.im/post/5c763885e51d457380771ab0)

[The Correct Way to Import Lodash Libraries - A Benchmark](https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark/)

[webpack-starter](https://github.com/wbkd/webpack-starter)  
[webpack-simple-starter](https://github.com/SinanMtl/webpack-simple-starter)  
[webpack-starter-basic](https://github.com/lifenautjoe/webpack-starter-basic)  
[babel-typescript-react-boilerplate](https://github.com/saltyshiomix/babel-typescript-react-boilerplate)

---

## 🕗 TODO

- [x] es/tslint config and autorun
- [x] Prettier config for autorun
- [x] git commit hook ( to autorun some staff )
- [x] commitizen

- [ ] test（mocha）
- [ ] more TS example
- [ ] webpack optimization
