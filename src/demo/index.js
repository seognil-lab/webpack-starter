// * ---------------- feature support test demo

// import './react';
// import './style';
// import './vue';
// import './script';

// * ---------------- dynamic import version

setTimeout(() => {
  console.log('## load react demo');
  import(/* webpackChunkName: "DEADBEAF" */ './react');
}, 10);

setTimeout(() => {
  console.log('## load style demo');
  import(/* webpackChunkName: "DEADBEAF" */ './style');
}, 20);

setTimeout(() => {
  console.log('## load vue demo');
  import(/* webpackChunkName: "DEADBEAF" */ './vue');
}, 30);

setTimeout(() => {
  console.log('## load script demo');
  import(/* webpackChunkName: "DEADBEAF" */ './script');
}, 40);
