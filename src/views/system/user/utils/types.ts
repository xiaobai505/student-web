interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  higherDeptOptions: Record<string, unknown>[];
  parentId: number;
  name: string;
  username: string;
  password: string;
  phone: string | number;
  email: string;
  sex: string | number;
  status: number;
  deptId: number;
  dept?: {
    id?: number;
    name?: string;
  };
  address: string;
}
interface FormProps {
  formInline: FormItemProps;
}

interface RoleFormItemProps {
  /** id */
  id: number;
  name: string;
  /** 角色列表 */
  roleOptions: any[];
  /** 选中的角色列表 */
  ids: Record<number, unknown>[];
}
interface RoleFormProps {
  formInline: RoleFormItemProps;
}

export type { FormItemProps, FormProps, RoleFormItemProps, RoleFormProps };
