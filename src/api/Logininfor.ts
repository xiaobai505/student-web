import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    records: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

// logininfor API接口
export const logininfors = (params: object) => {
  return http.get<object, Result>("/sys/logininfor", { params });
};
