import { http } from "../utils/http";
import qs from "qs";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
}

// 分页查询pageUser
export const pageUser = (params: object) => {
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

// user API接口
export const getRolesById = (id: number) => {
  return http.get("/dgy/roleUser/" + id);
};

// user API接口
export const setRolesById = (id: number, ids: Array<number>) => {
  return http.post("/dgy/roleUser/" + id, { data: ids });
};

// Role API接口
export const roles = (data: object) => {
  return http.get("/dgy/role", data);
};

// 获取用户管理列表
export const getUserList = (data?: object): ResponseType => {
  return http.request("post", "/user", { data });
};

// 获取角色管理列表
export const getRoleList = (data?: object): ResponseType => {
  return http.request("post", "/role", { data });
};

// 获取部门管理列表
export const getDeptList = (data?: object): ResponseType => {
  return http.request("post", "/dept", { data });
};
