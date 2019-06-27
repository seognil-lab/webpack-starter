// * ---------------- feature support test demo

// import './react';
// import './style';
// import './vue';
// import './script';

// * ---------------- dynamic import version

setTimeout(() => {
  console.log('## load react demo');
  import(/* webpackChunkName: "DEADBEAF" */ './react');
}, 100);

setTimeout(() => {
  console.log('## load style demo');
  import(/* webpackChunkName: "DEADBEAF" */ './style');
}, 200);

setTimeout(() => {
  console.log('## load vue demo');
  import(/* webpackChunkName: "DEADBEAF" */ './vue');
}, 300);

setTimeout(() => {
  console.log('## load script demo');
  import(/* webpackChunkName: "DEADBEAF" */ './script');
}, 400);
