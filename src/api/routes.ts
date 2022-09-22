import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
}

// RouteConfigsTable 路由配置类型
export const getAsyncRoutes = (params?: string): ResponseType => {
  return http.get("/routes/getAsyncRoutes/" + params);
};

export const getRoutes = (): ResponseType => {
  return http.get("/routes");
};
