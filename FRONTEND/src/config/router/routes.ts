import Home from "~/views/Home.vue"
import Catalog from "~/views/articles/Catalog.vue"
import SubmitArticle from "~/views/articles/SubmitArticle.vue"
import EditArticle from "~/views/articles/[id]/EditArticle.vue"
import ViewOneArticle from "~/views/articles/[id]/ViewOneArticle.vue"
import Checkout from "~/views/articles/Checkout.vue"
import UserView from "~/views/users/[id]/UserView.vue"
import ShopView from "~/views/users/[id]/ShopView.vue"
import AdminView from "~/views/users/[id]/AdminView.vue"
import Login from "~/views/users/Login.vue"
import Register from "~/views/users/Register.vue"

import type { NavigationGuardNext as Next, RouteLocationNormalized as Location, RouteRecordRaw as Route } from "vue-router";
import { useUsersStore } from "~/stores/users/users"
import { UserRole } from "~/utils/user"
import { useToastStore } from "~/stores/toast"

const guardUser = (to:Location, from:Location, next:Next) => guard(to, from, next, [UserRole.ADMIN, UserRole.SHOP, UserRole.USER]);
const guardShop = (to:Location, from:Location, next:Next) => guard(to, from, next, [UserRole.ADMIN, UserRole.SHOP]);
const guardAdmin = (to:Location, from:Location, next:Next) => guard(to, from, next, [UserRole.ADMIN]);
const guard = (to:Location, _from:Location, next:Next, allowed:UserRole[]) => {
  if (useUsersStore().allowedRole(allowed))
    next();
  else {
    useToastStore().setError("Unauthorized : "+to.fullPath);
    next({ name: "catalog" });
    return false
  }
}

const routes: Route[] = [
  { path: '/',                name:"index", component: Home},
  { path: '/articles',        name:"catalog", component: Catalog},
  { path: '/articles/submit', name:"submitArticle", component: SubmitArticle,   beforeEnter: guardShop},
  { path: '/articles/:id/edit', name:"editArticle", component: EditArticle,     beforeEnter: guardUser},
  { path: '/articles/:id',    name:"viewOneArticle", component: ViewOneArticle},
  { path: '/articles/checkout', name:"checkout", component: Checkout,           beforeEnter: guardShop},
  { path: '/users/register',  name:"register", component: Register,             beforeEnter: guardShop},
  { path: '/users/login',     name:"login", component: Login},
  { path: '/users/:id',       name:"userView", component: UserView,             beforeEnter: guardUser},
  { path: '/shop/:id',        name:"shopView", component: ShopView,             beforeEnter: guardShop},
  { path: '/admin/:id',       name:"adminView", component: AdminView,           beforeEnter: guardAdmin},
]

export default routes