import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = () => {
  return http.get<null, Result>("/routes/getAsyncRoutes");
};
