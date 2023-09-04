import { onMounted, reactive, ref } from "vue";
import { PaginationProps } from "@pureadmin/table";
import { getCourse } from "@/api/course";
import { getDeptList } from "@/api/dept";
import { handleTree } from "@/utils/tree";

export function useCourse() {
  const form = reactive({
    username: undefined,
    phone: undefined,
    status: undefined,
    deptId: 101
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
      minWidth: 130
    },
    {
      label: "授课老师",
      prop: "courseTeacher",
      minWidth: 130
    }
  ];

  async function onSearch() {
    loading.value = true;
    console.log("onSearch");
    await getCourse(null)
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
    onSearch
  };
}
