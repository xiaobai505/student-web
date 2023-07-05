import { http } from "../utils/http";
import qs from "qs";

interface ResponseType extends Promise<any> {
  data?: object;
}

// 分页查询
export const getResult = (params: object) => {
  const stringify = qs.stringify(params, { arrayFormat: "comma" });
  return http.get("/sys/result?" + stringify);
};

// 保存用户
export const saveResult = (data: object): ResponseType => {
  return http.post("/sys/result", { data });
};

// 更新
export const updateResult = (data: object) => {
  return http.put("/sys/result", { data });
};

// 删除
export const delResult = (data: object) => {
  return http.delete("/sys/result", { data });
};
