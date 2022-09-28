import { http } from "../utils/http";
import qs from "qs";

interface ResponseType extends Promise<any> {
  data?: Array<object>;
  code?: number;
  msg?: string;
}

// 分页查询
export const CourseList = (): ResponseType => {
  return http.get("/dgy/course/list");
};

// 分页查询
export const getCourse = (params: object) => {
  const stringify = qs
    .stringify(params, { arrayFormat: "comma" })
    .replace("currentPage", "current");
  return http.get("/dgy/course?" + stringify);
};

// 保存用户
export const saveCourse = (data: object) => {
  return http.post("/dgy/course", { data });
};

// 更新
export const updateCourse = (data: object) => {
  return http.put("/dgy/course", { data });
};

// 删除
export const delCourse = (data: object) => {
  return http.delete("/dgy/course", { data });
};
