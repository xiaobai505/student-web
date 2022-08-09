import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
}

export const getAsyncRoutes = (params?: string): ResponseType => {
  return http.get("/routes/getAsyncRoutes/" + params);
};
