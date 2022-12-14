import { $t } from "@/plugins/i18n";
import type { RouteConfigsTable } from "/#/index";
const Layout = () => import("@/layout/index.vue");

const homeRouter: RouteConfigsTable = {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "home-filled",
    title: $t("menus.hshome"),
    rank: 0
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
};

export default homeRouter;
