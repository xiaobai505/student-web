import { http } from "../utils/http";
import qs from "qs";

// 分页查询
export const getMajor = (params: object) => {
  const stringify = qs
    .stringify(params, { arrayFormat: "comma" })
    .replace("currentPage", "current");
  return http.get("/dgy/major?" + stringify);
};

// 保存用户
export const saveMajor = (data: object) => {
  return http.post("/dgy/major", { data });
};

// 更新
export const updateMajor = (data: object) => {
  return http.put("/dgy/major", { data });
};

// 删除
export const delMajor = (data: object) => {
  return http.delete("/dgy/major", { data });
};
