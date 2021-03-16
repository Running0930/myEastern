import Search from "../pages/search/search.vue";
import Login from "../pages/login/login.vue";
import Register from "../pages/register/register.vue";
import Home from "../pages/home/home.vue";
import ShopCart from "@/pages/shopcart/shopcart.vue";
import TypeDetail from "@/pages/typeDetail/typeDetail.vue";
import GoodsDetail from "@/pages/goodsDetail/goodsDetail.vue"
export default [
  // 首页
  {
    path: "/",
    name: "home",
    component: Home,
  },
  // 商品详情页
  {
    path: "/goodsDetail/:skyId?",
    name: "goodsDetail",
    component: GoodsDetail,
  },
  // 商品分类详情
  {
    path: "/typeDetail",
    name: "typeDetail",
    component: TypeDetail,
    meta: {
      isHide: true,
    },
  },
  // 购物车
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
  },
  // 登录页
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isHide: true,
    },
  },
  // 注册页
  {
    path: "/register",
    name: "searegisterrch",
    component: Register,
    meta: {
      isHide: true,
    },
  },
  // 搜索
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  // 重定向首页
  {
    path:'/home',
    redirect:'/'
  }
];
