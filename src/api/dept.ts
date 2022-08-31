import { http } from "/@/utils/http";
import qs from "qs";

interface ResponseType extends Promise<any> {
  data?: Array<object>;
  code?: number;
  msg?: string;
}
// 获取部门管理列表
export const getDeptList = (data?: object): ResponseType => {
  const stringify = qs.stringify(data, { arrayFormat: "comma" });
  return http.get("/dgy/dept?" + stringify);
};
