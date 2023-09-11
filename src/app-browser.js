import { createHead, Vue2ProvideUnheadPlugin } from '@unhead/vue';
import Vue from 'vue';
import root from './root.vue';

const head = createHead();

Vue.use(head);
Vue.use(Vue2ProvideUnheadPlugin, head);

const app = new Vue({
  head,
  render: h => h(root),
});

app.$mount('#app');
