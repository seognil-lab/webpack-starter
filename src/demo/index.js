// * ---------------- feature support test demo

// import './react';
// import './style';
// import './vue';
// import './script';

setTimeout(() => {
  console.log('## load react demo');
  import(/* webpackChunkName: "DEADBEAF" */ './react');
}, 1000);

setTimeout(() => {
  console.log('## load style demo');
  import(/* webpackChunkName: "DEADBEAF" */ './style');
}, 2000);

setTimeout(() => {
  console.log('## load vue demo');
  import(/* webpackChunkName: "DEADBEAF" */ './vue');
}, 3000);

setTimeout(() => {
  console.log('## load script demo');
  import(/* webpackChunkName: "DEADBEAF" */ './script');
}, 4000);
