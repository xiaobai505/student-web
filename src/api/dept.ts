import { http } from "/@/utils/http";

interface ResponseType extends Promise<any> {
  data?: Array<object>;
  code?: number;
  msg?: string;
}
// 获取部门管理列表
export const getDeptList = (data?: object): ResponseType => {
  return http.get("/dgy/dept?", { data });
};
