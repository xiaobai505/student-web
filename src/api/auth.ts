import { http } from "@/utils/http";
import { baseUrlApi } from "@/utils/http/utils";

export type TokenResult = {
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

/** 登录token */
export const getLogin = (data?: object) => {
  return http.request<TokenResult>(
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
  return http.post<object, TokenResult>("/auth/refreshToken", { data });
};
