// Role API接口
import { http } from "/@/utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
  records?: Array<object>;
}

// Role API接口
export const logininfors = (params: object): ResponseType => {
  return http.get("/dgy/logininfor/page", { params });
};
