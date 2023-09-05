import { h, onMounted, reactive, ref, toRaw } from "vue";
import { PaginationProps } from "@pureadmin/table";
import { delCourseUser, saveCourseUser } from "@/api/courseUser";
import { message } from "@/utils/message";
import { FormItemProps } from "../../resultCourse/utils/types";
import { addDialog } from "@/components/ReDialog/index";
import editForm from "../form.vue";
import { getCourse } from "@/api/course";

export function useSelectCourse() {
  const form = reactive({
    name: "",
    status: null
  });
  const formRef = ref();
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
      label: "课程学分",
      prop: "graduate",
      minWidth: 70
    },
    {
      label: "授课老师",
      prop: "courseTeacher",
      minWidth: 100
    },
    {
      label: "上课时间",
      prop: "timeTable",
      minWidth: 100
    },
    {
      label: "剩余座位",
      prop: "stock",
      minWidth: 70
    },
    {
      label: "已报名",
      prop: "sale",
      minWidth: 70
    },
    {
      label: "开始时间",
      prop: "startTime",
      minWidth: 70
    },
    {
      label: "结束时间",
      prop: "endTime",
      minWidth: 70
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
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

  function openDialog(row?: FormItemProps) {
    addDialog({
      title: `已经报名学生`,
      props: {
        formInline: {
          id: row?.id ?? undefined
        }
      },
      width: "40%",
      contentRenderer: () => h(editForm, { ref: formRef })
    });
  }

  function handleAdd(row) {
    saveCourseUser(row)
      .then(res => {
        if (res.code === 200) {
          message(`您报名了:${row.courseName}的这门课程！`, {
            type: "success"
          });
        }
      })
      .finally(() => {
        onSearch();
      });
  }

  function handleDelete(row) {
    delCourseUser({ courseId: row.id })
      .then(res => {
        if (res.code === 200) {
          message(`您取消了:${row.courseName}的这门课程！`, {
            type: "success"
          });
        }
      })
      .finally(() => {
        onSearch();
      });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    handleSelectionChange,
    openDialog,
    handleAdd,
    handleDelete
  };
}
