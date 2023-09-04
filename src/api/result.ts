import { http } from "@/utils/http";
import qs from "qs";

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
}

// 分页查询
export const getResult = (params: object) => {
  const stringify = qs.stringify(params, { arrayFormat: "comma" });
  return http.get<object, Result>("/dgy/result?" + stringify);
};

// 保存用户
export const saveResult = (data: object): ResponseType => {
  return http.post<object, Result>("/dgy/result", { data });
};

// 更新
export const updateResult = (data: object): ResponseType => {
  return http.put<object, Result>("/dgy/result", { data });
};

// 删除
export const delResult = (data: object): ResponseType => {
  return http.delete("/dgy/result", { data });
};
