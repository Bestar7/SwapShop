import { createApp, App } from 'vue';
import "./global.scss";
import MainApp from '~/MainApp.vue';
import store from "~/config/store/pinia";
import router from "~/config/router/vue-router";
import i18n from "~/config/i18n/vue-i18n";
import head from "~/config/head/vueUnhead";

const app: App = createApp(MainApp);

app.use(store);
app.use(router);
app.use(i18n);
app.use(head);

app.mount('#app');

export default app;