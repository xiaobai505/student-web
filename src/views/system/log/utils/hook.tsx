import dayjs from "dayjs";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, toRaw } from "vue";
import { logininfors } from "@/api/Logininfor";

export function log() {
  const form = reactive({
    userNameEq: undefined,
    statusEq: undefined
  });
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "id",
      prop: "id",
      minWidth: 100
    },
    {
      label: "登录用户",
      prop: "userName",
      minWidth: 120
    },
    {
      label: "登录IP地址",
      prop: "ipaddr",
      minWidth: 150
    },
    {
      label: "登录地点",
      prop: "loginLocation",
      minWidth: 150
    },
    {
      label: "浏览器类型",
      prop: "browser",
      minWidth: 150
    },
    {
      label: "操作系统",
      prop: "os",
      minWidth: 150
    },
    {
      label: "登录状态",
      prop: "status",
      minWidth: 150
    },
    {
      label: "提示消息",
      prop: "msg",
      minWidth: 150
    },
    {
      label: "访问时间",
      minWidth: 180,
      prop: "loginTime",
      formatter: ({ loginTime }) =>
        dayjs(loginTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ];

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    pagination.pageSize = val;
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const raw = Object.assign(form, {
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize
    });
    const { data } = await logininfors(toRaw(raw));
    dataList.value = data.records;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    pagination.pageSize = 10;
    pagination.currentPage = 1;
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
