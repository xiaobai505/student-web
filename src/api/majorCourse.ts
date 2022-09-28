import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
}

// 分页查询
export const getMajorCourse = (params?: object): ResponseType => {
  return http.get("/dgy/majorCourse", { params });
};

// roleUser API接口
export const setCoursesByMajorId = (majorId: number, ids: Array<number>) => {
  return http.post("/dgy/majorCourse/" + majorId, { data: ids });
};
