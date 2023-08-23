// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface RolesProps {
  /** id */
  id: number;

  name: string;

  ids: [];
}
interface FormProps {
  formInline: RolesProps;
}

export type { RolesProps, FormProps };
