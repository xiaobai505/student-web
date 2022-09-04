import { http } from "/@/utils/http";

interface ResponseType extends Promise<any> {
  data?: Array<object>;
  code?: number;
  msg?: string;
}
// 获取部门管理列表
export const getDeptList = (params?: object): ResponseType => {
  return http.get("dgy/dept", { params });
};

// 保存部门
export const saveDept = (data: object) => {
  return http.post("/dgy/dept", { data });
};

// 删除
export const delDept = (id: number): ResponseType => {
  return http.delete("/dgy/dept/" + id);
};
