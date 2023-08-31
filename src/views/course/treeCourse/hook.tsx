import { onMounted, reactive, ref } from "vue";
import { PaginationProps } from "@pureadmin/table";
import { getCourse } from "@/api/course";

export function useCourse() {
  const form = reactive({
    username: undefined,
    phone: undefined,
    status: undefined,
    deptId: 101
  });
  const loading = ref(true);
  const dataList = ref([]);
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

  function deptIdChange(id: number) {
    form.deptId = id;
    console.log(id);
  }

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

  onMounted(async () => {
    await onSearch();
  });

  return { loading, dataList, pagination, deptIdChange, columns, onSearch };
}
