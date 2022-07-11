import { http } from "../utils/http";
import qs from "qs";

// 分页查询
export const getCourseUser = (params: object) => {
  const stringify = qs.stringify(params, { arrayFormat: "comma" });
  return http.get("/dgy/courseUser?" + stringify);
};

// 保存
export const saveCourseUser = (data: object) => {
  return http.post("/dgy/courseUser", { data });
};

// 删除
export const delCourseUser = (data: object) => {
  return http.delete("/dgy/courseUser", { data });
};
