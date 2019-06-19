export default () =>
  // * for test preload purpose
  setTimeout(() => {
    import(
      /* webpackChunkName: "src/demo" */
      './demo'
    );
  }, 1000);
