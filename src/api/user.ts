import { http } from "../utils/http";
import qs from "qs";

interface ResponseType extends Promise<any> {
  name?: string;
  data?: object;
  code?: number;
  msg?: string;
}

// 获取用户
export const getUser = (): ResponseType => {
  return http.get("/dgy/user");
};

// 获取用户管理列表
export const getUserList = (data?: object): ResponseType => {
  return http.request("post", "/user", { data });
};

// 分页查询pageUser
export const pageUser = (params?: object) => {
  const stringify = qs
    .stringify(params, { arrayFormat: "comma" })
    .replace("currentPage", "current");
  return http.get("/dgy/user/page?" + stringify);
};

// 分页查询
export const userPage = (data: object) => {
  return http.post("/dgy/user/selectPage", { data });
};

// 保存用户
export const saveUser = (data: object) => {
  return http.post("/dgy/user", { data });
};
// 更新用户
export const updateUser = (data: object) => {
  return http.put("/dgy/user", { data });
};
// 删除用户
export const delUser = (data: object) => {
  return http.delete("/dgy/user", { data });
};
