import { http } from "@/utils/http";

type ResultDept = {
  success: boolean;
  data?: Array<any>;
};

/** 获取部门管理列表 */
export const getDeptList = (params?: object) => {
  return http.get<object, ResultDept>("/sys/dept", { params });
};

// 保存部门
export const saveOrUpdateDept = (data: object) => {
  return http.post("/sys/dept", { data });
};

// 删除
export const delDept = (id: number) => {
  return http.delete<object, ResultDept>("/sys/dept/" + id);
};
