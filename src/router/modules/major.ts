import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const majorRouter = {
  path: "/major",
  component: Layout,
  redirect: "/major/page",
  meta: {
    icon: "set-up",
    title: $t("menus.hsMajor"),
    rank: 1
  },
  children: [
    {
      path: "/major/page",
      name: "major",
      component: () => import("/@/views/major/major.vue"),
      meta: {
        title: $t("menus.hsMajor")
      }
    }
  ]
};

export default majorRouter;
