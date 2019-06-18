export default () =>
  setTimeout(() => {
    import(
      /* webpackChunkName: "src/demo" */
      './demo'
    );
  }, 1000);
