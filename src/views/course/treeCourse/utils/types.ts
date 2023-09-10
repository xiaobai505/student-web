interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;

  deptId: number;

  higherDeptOptions: Record<string, unknown>[];

  courseName: string;

  courseTeacher: string;

  timeTable: string;

  isMust: number;

  stock: number;

  graduate: number;

  startTime: any;

  endTime: any;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
