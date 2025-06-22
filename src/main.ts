import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
import "virtual:svg-icons-register";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import gloablComponent from "./components/index";

import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "./router";
import VueLazyLoad from "vue3-lazyload";



const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn
})

app.use(VueLazyLoad, {
    loading: "loading.gif", 
    error: "error.png", 
});

app.use(router);
app.use(gloablComponent);
app.mount('#app')
