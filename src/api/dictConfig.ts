import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: null;
}

// 分页查询
export const getDictConfig = (id: number): ResponseType => {
  return http.get("/dgy/dictConfig/" + id);
};

// 保存用户
export const saveDictConfig = (data: object): ResponseType => {
  return http.post("/dgy/dictConfig", { data });
};

// 更新
export const updateDictConfig = (data: object): ResponseType => {
  return http.put("/dgy/dictConfig", { data });
};

// 删除
export const delDictConfig = (id: number): ResponseType => {
  return http.delete("/dgy/dictConfig/" + id);
};
