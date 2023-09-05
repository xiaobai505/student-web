import dayjs from "dayjs";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { getDeptList } from "@/api/dept";
import { usePublicHooks } from "../../hooks";
import { reactive, ref, onMounted } from "vue";
import { type FormItemProps } from "../utils/types";
import { isAllEmpty } from "@pureadmin/utils";

export function useDept() {
  const form = reactive({
    name: "",
    status: null
  });

  const dataList = ref([]);
  const loading = ref(true);
  const { tagStyle } = usePublicHooks();

  const columns: TableColumnList = [
    {
      label: "部门名称",
      prop: "name",
      width: 180,
      align: "left"
    },
    {
      label: "排序",
      prop: "sort",
      minWidth: 70
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status === 1 ? "启用" : "停用"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      minWidth: 200,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 320
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
      slot: "operation"
    }
  ];

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getDeptList(); // 这里是返回一维数组结构，前端自行处理成树结构，返回格式要求：唯一id加父节点parentId，parentId取父节点id
    let newData = data;
    if (!isAllEmpty(form.name)) {
      // 前端搜索部门名称
      newData = newData.filter(item => item.name.includes(form.name));
    }
    if (!isAllEmpty(form.status)) {
      // 前端搜索状态
      newData = newData.filter(item => item.status === form.status);
    }
    dataList.value = handleTree(newData); // 处理成树结构
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    console.log(title + "---" + row);
  }

  function handleDelete(row) {
    message(`您删除了部门名称为${row.name}的这条数据`, { type: "success" });
    onSearch();
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、编辑部门 */
    openDialog,
    /** 删除部门 */
    handleDelete,
    handleSelectionChange
  };
}
