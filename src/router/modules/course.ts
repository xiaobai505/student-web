import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const courseRouter = {
  path: "/course",
  component: Layout,
  redirect: "/course/page",
  meta: {
    icon: "set-up",
    title: $t("menus.hsCourse"),
    rank: 2
  },
  children: [
    {
      path: "/course/page",
      name: "course",
      component: () => import("/@/views/course/course.vue"),
      meta: {
        title: $t("menus.hsCourse")
      }
    },
    {
      path: "/course/studentCourse",
      name: "studentCourse",
      component: () => import("/@/views/course/studentCourse.vue"),
      meta: {
        title: $t("menus.hsStudentCourse")
      }
    }
  ]
};

export default courseRouter;
