import { onMounted, reactive, ref, toRaw } from "vue";
import { PaginationProps } from "@pureadmin/table";
import { getCourse } from "@/api/course";
import { getDeptList } from "@/api/dept";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";

export function useTreeCourse() {
  const form = reactive({
    deptId: 101,
    username: undefined,
    phone: undefined,
    status: undefined
  });
  const loading = ref(true);
  const dataList = ref([]);
  const higherDeptOptions = ref();
  const treeData = ref([]);
  const treeLoading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "序号",
      type: "index",
      width: 70,
      fixed: "left"
    },
    {
      label: "课程名称",
      prop: "courseName",
      minWidth: 130,
      cellRenderer: ({ row }) => (
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          {{
            default: () => (
              <>
                <div>上课时间: {row.timeTable}</div>
                <div>座位数量: {row.stock}</div>
                <div>已占座: {row.sale}</div>
              </>
            ),
            reference: () => <el-tag>{row.courseName}</el-tag>
          }}
        </el-popover>
      )
    },
    {
      label: "课程类型",
      prop: "isMust",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.isMust === 1 ? "danger" : ""}
          effect="plain"
        >
          {row.isMust === 1 ? "必修" : "选修"}
        </el-tag>
      )
    },
    {
      label: "授课老师",
      prop: "courseTeacher",
      minWidth: 130
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];

  async function onSearch() {
    loading.value = true;
    const raw = Object.assign(form, {
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize
    });
    await getCourse(toRaw(raw))
      .then(res => {
        dataList.value = res.data["records"];
        pagination.total = res.data["total"];
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function onTreeSelect({ id, selected }) {
    form.deptId = selected ? id : 101;
    onSearch();
  }

  function openDialog(title = "新增", row) {
    console.log(title + ":openDialog", row);
    message(`正在开发！`, { type: "error" });
  }

  function handleDelete(row) {
    if (row.sale > 0) {
      message(`有学生已经报名，不能删除！`, { type: "error" });
      return;
    }
    console.log(row);
  }

  onMounted(async () => {
    // 归属部门
    const { data } = await getDeptList();
    higherDeptOptions.value = handleTree(data);
    treeData.value = handleTree(data);
    treeLoading.value = false;

    await onSearch();
  });

  return {
    loading,
    dataList,
    treeData,
    treeLoading,
    onTreeSelect,
    pagination,
    columns,
    onSearch,
    openDialog,
    handleDelete
  };
}
