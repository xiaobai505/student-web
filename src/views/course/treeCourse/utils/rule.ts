import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  courseName: [
    { required: true, message: "课程名称为必填项", trigger: "blur" }
  ],
  timeTable: [{ required: true, message: "课程名称为必填项", trigger: "blur" }],
  deptId: [{ required: true, message: "隶属专业为必填项", trigger: "blur" }],
  isMust: [{ required: true, message: "必修/选修为必填项", trigger: "blur" }],
  stock: [{ required: true, message: "座位数为必填项", trigger: "blur" }],
  courseTeacher: [
    { required: true, message: "授课老师为必填项", trigger: "blur" }
  ],
  startTime: [{ required: true, message: "开始结束为必填项", trigger: "blur" }],
  endTime: [{ required: true, message: "开始结束为必填项", trigger: "blur" }]
});
