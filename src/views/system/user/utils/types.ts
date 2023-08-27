// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface RolesProps {
  /** id */
  id: number;

  name: string;

  ids: [];
}

interface FormItemProps {
  id: number;
  higherDeptOptions: Record<string, unknown>[];
  deptId: number;
  username: string;
  name: string;
  sex: string | number;
  phone: string | number;
  email: string;
  status: number;
  remark: string;
}

interface FormProps {
  formInline: RolesProps;
  FormItemProps: FormItemProps;
}

export type { RolesProps, FormItemProps, FormProps };
