import { http } from "@/utils/http";

type ResultLog = {
  success: boolean;
  data?: Array<any>;
};

// logininfor API接口
export const logininfors = (params: object) => {
  return http.get<object, ResultLog>("sys/logininfor/page", { params });
};
