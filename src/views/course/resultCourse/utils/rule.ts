import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  result: [{ required: true, message: "分数为必填项", trigger: "blur" }]
});
