import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
}

// 登录
export const getLogin = (data: object): ResponseType => {
  return http.post("/auth/login", { data });
};

// 获取验证码
export const getVerify = (): ResponseType => {
  return http.get("/captcha");
};

// 刷新token
export const refreshToken = (data: object): ResponseType => {
  return http.post("/refreshToken", { data });
};

export const searchVague = (data: object) => {
  return http.request("post", "/searchVague", { data });
};

// user API接口
export const getRolesById = (id: number) => {
  return http.get("/dgy/roleUser/" + id);
};
