import Vue from 'vue'
import App from './App.vue'
//移动端适配
import 'amfe-flexible'
//引入 router模块
import router from '@/router'
//引入图标
// import '../font/iconfont.css'
import '../font/iconfont.css'
//引入vuex
import store from './store'
//引入时间过滤器
import '@/utils/dayFilter'

import {DatetimePicker , Picker , Divider , Loading , Sticky , Search , Icon , Popup ,PullRefresh , List , Tab, Tabs , Dialog ,NavBar ,  Field , Form , Button , Toast , Tabbar, TabbarItem , Image as VanImage , Grid, GridItem , Cell, CellGroup} from 'vant';

Vue.use(NavBar);
Vue.use(Field);
Vue.use(Form);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Sticky);
Vue.use(Loading);
Vue.use(Divider);
Vue.use(Picker);
Vue.use(DatetimePicker);


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
