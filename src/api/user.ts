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

// 获取用户
export const getUser = () => {
  return http.get("/sys/user");
};

// 分页查询pageUser
export const getUserPage = (params?: object) => {
  return http.get<object, Result>("/sys/user/page", { params });
};

// 保存用户
export const saveUser = (data: object) => {
  return http.post("/sys/user", { data });
};
// 更新用户
export const updateUser = (data: object) => {
  return http.put("/sys/user", { data });
};
// 删除用户
export const delUser = (id: number) => {
  return http.delete<object, Result>("/sys/user/" + id);
};

// 更新用户
export const resetPwd = (data: object) => {
  return http.put("/sys/user/resetPwd", { data });
};
