import { http } from "../utils/http";

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

// 分页查询
export const CourseList = () => {
  return http.get("/dgy/course/list");
};

// 分页查询
export const getCourse = (params?: object) => {
  return http.get<object, Result>("/dgy/course", { params });
};

// 保存用户
export const saveCourse = (data: object) => {
  return http.post("/dgy/course", { data });
};

// 更新
export const updateCourse = (data: object) => {
  return http.put("/dgy/course", { data });
};

// 删除
export const delCourse = (data: object) => {
  return http.delete("/dgy/course", { data });
};
