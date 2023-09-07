import express from 'express';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { createHead, Vue2ProvideUnheadPlugin } from '@unhead/vue';
import { renderSSRHead } from '@unhead/ssr';

import root from './root.vue';

const app = express();

app.get('*', async (req, res) => {
  const head = createHead();

  Vue.use(head);
  Vue.use(Vue2ProvideUnheadPlugin, head);

  const renderer = createRenderer();

  const app = new Vue({
    head,
    render: h => h(root),
  });

  const html = await renderer.renderToString(app);
  const headTags = await renderSSRHead(head);

  res.json({ headTags, html });
});

app.listen({ port: 9999 })

