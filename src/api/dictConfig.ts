import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: null;
}

// 分页查询
export const getDictConfig = (id: number): ResponseType => {
  return http.get("/sys/dictConfig/" + id);
};

// 保存用户
export const saveDictConfig = (data: object): ResponseType => {
  return http.post("/sys/dictConfig", { data });
};

// 更新
export const updateDictConfig = (data: object): ResponseType => {
  return http.put("/sys/dictConfig", { data });
};

// 删除
export const delDictConfig = (id: number): ResponseType => {
  return http.delete("/sys/dictConfig/" + id);
};
