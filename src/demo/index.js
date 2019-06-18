// * ---------------- feature support test demo

setTimeout(() => {
  console.log('## load react demo');
  import('./react');
}, 1000);

setTimeout(() => {
  console.log('## load style demo');
  import('./style');
}, 2000);

setTimeout(() => {
  console.log('## load vue demo');
  import('./vue');
}, 3000);

setTimeout(() => {
  console.log('## load script demo');
  import('./script');
}, 4000);
