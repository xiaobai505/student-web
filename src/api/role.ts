// Role API接口
import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    records: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    size?: number;
    /** 当前页数 */
    current?: number;
  };
};

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
  records?: Array<object>;
}

// Role API接口
export const getRoleList = (): ResponseType => {
  return http.get("/sys/role");
};

export const getRolePage = (params?: object) => {
  return http.get<object, Result>("/sys/role/page", { params });
};

// 保存部门
export const saveOrUpdateRole = (data: object) => {
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

// 获取角色列表
export const getRolesById = (id: number): ResponseType => {
  return http.get("/sys/roleUser/" + id);
};

// roleUser API接口
export const setRolesById = (id: number, ids: Array<number>) => {
  return http.post("/sys/roleUser/" + id, { data: ids });
};
