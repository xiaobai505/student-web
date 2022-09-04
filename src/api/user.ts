import { http } from "../utils/http";
// import qs from "qs";
// const stringify = qs
//     .stringify(params, { arrayFormat: "comma" })
//     .replace("currentPage", "current");

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

// 分页查询pageUser
export const pageUser = (params?: object) => {
  return http.get("/dgy/user/page", { params });
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
