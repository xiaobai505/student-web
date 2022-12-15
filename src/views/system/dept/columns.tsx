import dayjs from "dayjs";

export function useColumns() {
  const columns: TableColumnList = [
    {
      type: "selection",
      width: 55,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 60,
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "部门名称",
      prop: "name",
      width: 300,
      align: "left"
    },
    {
      label: "排序",
      prop: "sort",
      width: 60
    },
    {
      label: "状态",
      prop: "status",
      width: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.status === 1 ? "danger" : "success"}
          effect="plain"
        >
          {row.status === 0 ? "开启" : "关闭"}
        </el-tag>
      )
    },
    {
      label: "负责人",
      width: 100,
      prop: "leader"
    },
    {
      label: "负责人电话",
      width: 120,
      prop: "phone"
    },
    {
      label: "负责人邮箱",
      width: 120,
      prop: "email"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "创建时间",
      width: 180,
      prop: "email",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];

  return {
    columns
  };
}
