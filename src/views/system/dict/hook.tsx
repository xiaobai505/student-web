import { onMounted, reactive, ref } from "vue";
import { handleTree } from "@/utils/tree";
import { getDict } from "@/api/dict";
import dayjs from "dayjs";
import { PaginationProps } from "@pureadmin/table";

export function useDict() {
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      width: 55,
      align: "left"
    },
    {
      label: "序号",
      type: "index",
      minWidth: 70
    },
    {
      label: "字典名称",
      prop: "name",
      width: 180,
      align: "left"
    },
    {
      label: "字典类型",
      prop: "model",
      minWidth: 70
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 200
    },
    {
      label: "创建时间",
      minWidth: 200,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
      slot: "operation"
    }
  ];
  const dataList = ref([]);
  const loading = ref(true);
  async function onSearch() {
    const { data } = await getDict();
    dataList.value = handleTree(data);
    console.log("dataList", dataList.value);
    loading.value = false;
  }
  onMounted(() => {
    onSearch();
  });
  function handleSelectionChange(val) {
    pagination.pageSize = val;
    onSearch();
  }
  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }
  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleAdd(val) {
    console.log("handleAdd", val);
  }
  function handleUpdate(val) {
    console.log("handleUpdate", val);
  }
  function handleDelete(val) {
    console.log("handleDelete", val);
  }

  return {
    pagination,
    columns,
    dataList,
    loading,
    onSearch,
    handleSelectionChange,
    handleSizeChange,
    handleCurrentChange,
    handleAdd,
    handleUpdate,
    handleDelete
  };
}
