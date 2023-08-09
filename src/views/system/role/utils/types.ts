// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** id */
  id: string;
  /** 角色名称 */
  roleName: string;
  /** 角色编号 */
  roleCode: string;
  /** 排序号 */
  roleSort: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
