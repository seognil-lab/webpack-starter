export default () =>
  setTimeout(() => {
    import(
      /* webpackChunkName: "src/demo" */
      './demo'
    );
  }, 10000);
