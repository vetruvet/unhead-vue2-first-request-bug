import express from 'express';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { createHead, Vue2ProvideUnheadPlugin } from '@unhead/vue';
import { renderSSRHead } from '@unhead/ssr';

import root from './root.vue';

const app = express();

const template = `
<!doctype html>
<html>
<head>
  <!--head.headTags-->
</head>
<body>
  <!--head.bodyTagsOpen-->
  <div id="app"><!--content--></div>
  <!--head.bodyTags-->
  
  <script src="/dist/main.js" defer></script>
</body>
</html>
`;

app.use('/dist', express.static(`${__dirname}/../browser`));

app.get('*', async (req, res) => {
  const head = createHead();

  Vue.use(head);
  Vue.use(Vue2ProvideUnheadPlugin, head);

  const renderer = createRenderer();

  const app = new Vue({
    head,
    render: h => h(root),
  });

  let html = template.replace('<!--content-->', await renderer.renderToString(app));
  Object.entries(await renderSSRHead(head)).forEach(([key, value]) => {
    html = html.replace(`<!--head.${key}-->`, value);
  });

  res.end(html);
});

app.listen({ port: 9999 })

