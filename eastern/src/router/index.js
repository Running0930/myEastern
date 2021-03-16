import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
import weAjax from '@/utils/weAjax'
import store from '@/store'
import cookie from 'js-cookie'
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});
router.beforeEach(async (to, from, next) => {
  const cookieVal=cookie.get('userId')
  if(cookieVal){
    const result = await weAjax.post("/loginId", {'userId':cookieVal});
    store.commit('GETNAMECN', result.data)
  }
  next()
})

export default router;
