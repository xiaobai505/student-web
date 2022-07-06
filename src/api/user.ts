import { http } from "../utils/http";

interface userType extends Promise<any> {
  svg?: string;
  code?: number;
  info?: object;
}

// Role API接口
export const roles = (data: object) => {
  return http.get("/dgy/role/page", data);
};

// 获取验证码
export const getVerify = (): userType => {
  return http.get("/captcha");
};

// 登录
export const getLogin = (data: object) => {
  return http.post("/auth/login", { data });
};

// 刷新token
export const refreshToken = (data: object) => {
  return http.post("/refreshToken", { data });
};

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
