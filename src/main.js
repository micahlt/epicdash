import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
const isDev = import.meta.env.DEV;
const app = createApp(App);
app.use(router);
/* The following line determines the API server to in dev and prod.  `vercel dev` doesn't play well with Vite at the moment, so by default the dev server is set to the production instance.  See https://github.com/vercel/vercel/issues/7283 */
app.config.globalProperties.$api = isDev
  ? "https://dashboard.epicsolutions.com"
  : "";
app.config.globalProperties.$modal = reactive({
  open: false,
  title: "Modal",
  description: "Hello modal sir",
  options: {
    primary: "Hello there",
    secondary: null,
  },
  response: 0,
});
app.mount("#app");
