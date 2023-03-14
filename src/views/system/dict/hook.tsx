import { onMounted, ref } from "vue";
import { handleTree } from "@/utils/tree";
import { getDict } from "@/api/dict";
import dayjs from "dayjs";

export function useDict() {
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
      minWidth: 70,
      hide: ({ checkList }) => !checkList.includes("序号列")
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
    loading.value = false;
  }
  onMounted(() => {
    onSearch();
  });
  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
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
    columns,
    dataList,
    loading,
    onSearch,
    handleSelectionChange,
    handleAdd,
    handleUpdate,
    handleDelete
  };
}
