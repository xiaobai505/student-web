import { http } from "../utils/http";
import qs from "qs";

// 分页查询
export const getCourse = (params: object) => {
  const stringify = qs.stringify(params, { arrayFormat: "comma" });
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
