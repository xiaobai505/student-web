// Role API接口
import { http } from "@/utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
  records?: Array<object>;
}

// Role API接口
export const roles = (data: object): ResponseType => {
  return http.get("/sys/role/page", data);
};

export const getRolesById = (id: number): ResponseType => {
  return http.get("/sys/role/" + id);
};

// 保存部门
export const saveRole = (data: object) => {
  return http.post("/sys/role", { data });
};

// 更新部门
export const updateRole = (data: object) => {
  return http.put("/sys/role", { data });
};

// 删除
export const delRole = (id: number) => {
  return http.delete("/sys/role/" + id);
};

// roleUser API接口
export const setRolesById = (id: number, ids: Array<number>) => {
  return http.post("/sys/roleUser/" + id, { data: ids });
};
