import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/css/main.less";
import SvgIcon from "@/components/svgIcon/index.vue"; // svg component
import "virtual:svg-icons-register";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/common/utils/permission";

// 生产环境配置mock
import { setupProdMockServer } from "@/mock";
if (process.env.NODE_ENV === "production") {
  setupProdMockServer();
}

const app = createApp(App);

// 注册el-icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("SvgIcon", SvgIcon);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
