// Role API接口
import { http } from "@/utils/http";

type ResultLog = {
  success: boolean;
  data?: Array<any>;
};

// Role API接口
export const logininfors = (params: object) => {
  return http.get<object, ResultLog>("/dgy/logininfor/page", { params });
};
