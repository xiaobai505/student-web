import { http } from "@/utils/http";
import qs from "qs";

type Result = {
  success: boolean;
  code: number;
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

// 分页查询
export const getCourseUser = (params: object) => {
  const stringify = qs
    .stringify(params, { arrayFormat: "comma" })
    .replace("currentPage", "current");
  return http.get<object, Result>("/dgy/courseUser?" + stringify);
};

// 保存
export const saveCourseUser = (data: object) => {
  return http.post<object, Result>("/dgy/courseUser", { data });
};

// 删除
export const delCourseUser = (data: object) => {
  return http.delete<object, Result>("/dgy/courseUser", { data });
};
