import { h, onMounted, reactive, ref } from "vue";
import { PaginationProps } from "@pureadmin/table";
import { FormItemProps } from "./types";
import { addDialog } from "@/components/ReDialog/index";
import editForm from "../form.vue";
import { getResult, updateResult } from "@/api/result";
import { message } from "@/utils/message";

export function useResultCourse() {
  const form = reactive({
    roleNameEq: undefined,
    roleCodeEq: undefined,
    statusEq: undefined
  });
  const formRef = ref();
  const loading = ref(true);
  const dataList = ref([]);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

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
      minWidth: 100
    },
    {
      label: "课程成绩",
      prop: "result",
      minWidth: 50
    },
    {
      label: "课程开始时间",
      prop: "createTime",
      minWidth: 70
    },
    {
      label: "学分",
      prop: "graduate",
      minWidth: 50
    },
    {
      label: "学生姓名",
      prop: "studentName",
      minWidth: 50
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
      slot: "operation"
    }
  ];

  async function onSearch() {
    loading.value = true;
    console.log("onSearch");
    await getResult({})
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
      title: `课程成绩打分`,
      props: {
        formInline: {
          id: row?.id ?? undefined,
          courseName: row?.courseName ?? undefined,
          result: row?.result ?? undefined,
          isReset: row?.isReset ?? 1
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          updateResult(curData)
            .then(res => {
              if (res.code === 200) {
                message(`修改成功！`, { type: "success" });
              }
            })
            .finally(() => {
              done(); // 关闭弹框
              onSearch(); // 刷新表格数据
            });
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            chores();
          }
        });
      }
    });
  }

  onMounted(async () => {
    await onSearch();
  });

  return {
    form,
    resetForm,
    loading,
    dataList,
    pagination,
    columns,
    onSearch,
    openDialog
  };
}
