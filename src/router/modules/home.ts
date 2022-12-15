import { $t } from "@/plugins/i18n";
import { home } from "@/router/enums";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "homeFilled",
    title: $t("menus.hshome"),
    rank: home
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.hshome")
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/views/welcome/profile/index.vue"),
      meta: {
        title: $t("buttons.info"),
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
