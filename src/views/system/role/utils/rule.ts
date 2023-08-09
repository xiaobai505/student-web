import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  roleName: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
  roleCode: [{ required: true, message: "角色标识为必填项", trigger: "blur" }],
  roleSort: [{ required: true, message: "排序号为必填项", trigger: "blur" }]
});
