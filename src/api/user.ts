import { http } from "@/utils/http";
import { baseUrlApi } from "@/utils/http/utils";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>(
    "post",
    baseUrlApi("/auth/login"),
    { data },
    // 自定义的axios配置在下面对象填写即可
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};

// 获取用户
export const getUser = () => {
  return http.get("/dgy/user");
};

// 分页查询pageUser
export const pageUser = (params?: object) => {
  return http.get("/dgy/user/page", { params });
};

// 保存用户
export const saveUser = (data: object) => {
  return http.post("/dgy/user", { data });
};
// 更新用户
export const updateUser = (data: object) => {
  return http.put("/dgy/user", { data });
};
// 删除用户
export const delUser = (data: object) => {
  return http.delete("/dgy/user", { data });
};

// 更新用户
export const resetPwd = (data: object) => {
  return http.put("/dgy/user/resetPwd", { data });
};
