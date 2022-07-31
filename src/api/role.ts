// Role API接口
import { http } from "/@/utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
}

// Role API接口
export const roles = (data: object): ResponseType => {
  return http.get("/dgy/role/page", data);
};

// 获取角色管理列表
export const getRoleList = (data?: object): ResponseType => {
  return http.request("post", "/role", { data });
};

// user API接口
export const setRolesById = (id: number, ids: Array<number>) => {
  return http.post("/dgy/roleUser/" + id, { data: ids });
};
