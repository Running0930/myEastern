import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from 'vue-lazyload'
import { Input,Select,Button,Checkbox,TabPane,Tabs,Alert,MessageBox} from 'element-ui';
// 获取浏览记录轮播图组件
import ImageListFot from './pages/goodsDetail/ImageListFot/ImageListFot.vue'
import * as Api from "./api"

//引入swiper插件
import '@/plugins/swiper'
Vue.prototype.$api = Api

// import 'element-ui/lib/theme-chalk/index.css';
// 使用插件
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Button.name, Button);
Vue.component(Checkbox.name, Checkbox);
Vue.component(TabPane.name, TabPane);
Vue.component(Tabs.name, Tabs);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = MessageBox;


// 浏览记录轮播图为公共组件
Vue.component('ImageListFot',ImageListFot)

const loadimage = require('./static/images/loading.gif')
// 使用懒加载
Vue.use(VueLazyload,{
  preLoad: 1.3,
  // error: errorimage,
  loading:loadimage,
  attempt: 1
})

// 全局变量
Vue.prototype.baseUrl=`http://ceair.oss-cn-shanghai.aliyuncs.com/image`;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
