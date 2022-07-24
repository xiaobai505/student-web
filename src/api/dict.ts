import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
}

// 分页查询
export const getDict = (): ResponseType => {
  return http.get("/dgy/dict");
};

// 保存用户
export const saveDict = (data: object): ResponseType => {
  return http.post("/dgy/dict", { data });
};

// 更新
export const updateDict = (data: object): ResponseType => {
  return http.put("/dgy/dict", { data });
};

// 删除
export const delDict = (id: number): ResponseType => {
  return http.delete("/dgy/dict/" + id);
};
