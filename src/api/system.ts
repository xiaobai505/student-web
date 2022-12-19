import { http } from "@/utils/http";

type ResultDept = {
  success: boolean;
  data?: Array<any>;
};

/** 获取用户管理列表 */
export const getUserPage = (params?: object) => {
  return http.get("dgy/user/page", { params });
};

/** 获取角色管理列表 */
export const getRoleList = (params?: object) => {
  return http.get("dgy/role/page", { params });
};

/** 获取部门管理列表 */
export const getDeptList = (params?: object) => {
  return http.get<object, ResultDept>("dgy/dept", { params });
};
