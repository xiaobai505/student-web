import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  name?: string;
  data?: object;
  code?: number;
  msg?: string;
}
// Role API接口
export const roles = (data: object) => {
  return http.get("/dgy/role/page", data);
};

// 获取验证码
export const getVerify = (): ResponseType => {
  return http.get("/captcha");
};

// 登录
export const getLogin = (data: object): ResponseType => {
  return http.post("/auth/login", { data });
};

// 登录
export const getWechatUrl = () => {
  return http.get("/wechat");
};

// 登录
export const getUser = (): ResponseType => {
  return http.get("/dgy/user");
};

// 刷新token
export const refreshToken = (data: object): ResponseType => {
  return http.post("/refreshToken", { data });
};

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
