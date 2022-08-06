import { http } from "../utils/http";

export const getAsyncRoutes = (params?: string) => {
  return http.request("get", "/routes/getAsyncRoutes/" + params);
};
