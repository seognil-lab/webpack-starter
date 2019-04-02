import App from './App.vue';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({ render: h => h(App) }).$mount('#root-vue');

console.log('##', 'load vue components');
