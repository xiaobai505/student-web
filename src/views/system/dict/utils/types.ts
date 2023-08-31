interface FormItemProps {
  id: number;
  higherDeptOptions: Record<string, unknown>[];
  parentId: number;
  name: string;
  leaderuserid: string;
  phone: string | number;
  email: string;
  sort: number;
  status: number;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
