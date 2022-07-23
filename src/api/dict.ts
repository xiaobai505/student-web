import { http } from "../utils/http";
import qs from "qs";

// 分页查询
export const getDict = (params: object) => {
  const stringify = qs.stringify(params, { arrayFormat: "comma" });
  return http.get("/dgy/dict?" + stringify);
};
