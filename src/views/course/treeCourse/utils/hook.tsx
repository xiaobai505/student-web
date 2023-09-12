import { h, onMounted, reactive, ref, toRaw } from "vue";
import { PaginationProps } from "@pureadmin/table";
import { delCourse, getCourse, saveCourse } from "@/api/course";
import { getDeptList } from "@/api/dept";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog/index";
import editForm from "../from.vue";
import { FormItemProps } from "./types";

export function useTreeCourse() {
  const form = reactive({
    deptId: 101,
    username: undefined,
    phone: undefined,
    status: undefined
  });
  const formRef = ref();
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
      label: "学分",
      prop: "graduate",
      minWidth: 130
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

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row) {
    addDialog({
      title: `${title}课程`,
      props: {
        formInline: {
          title,
          id: row?.id ?? undefined,
          deptId: row?.deptId ?? 101,
          higherDeptOptions: formatHigherDeptOptions(higherDeptOptions.value),
          courseName: row?.courseName ?? "",
          isMust: row?.isMust ?? 0,
          timeTable: row?.timeTable ?? "",
          stock: row?.stock ?? 10,
          courseTeacher: row?.courseTeacher ?? "",
          graduate: row?.graduate ?? 1,
          startTime: row?.startTime ?? undefined,
          endTime: row?.endTime ?? undefined
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          saveCourse(curData)
            .then(res => {
              if (res.code === 200) {
                message(`您${title}了名称为${curData.courseName}的数据`, {
                  type: "success"
                });
              }
            })
            .finally(() => {
              done(); // 关闭弹框
              onSearch(); // 刷新表格数据
            });
        }
        FormRef.validate(valid => {
          if (valid) {
            chores();
          }
        });
      }
    });
  }

  function handleDelete(row) {
    if (row.sale > 0) {
      message(`有学生已经报名，不能删除！`, { type: "error" });
      return;
    }
    delCourse(row.id)
      .then(res => {
        if (res.code === 200) {
          message(`删除成功！`, { type: "success" });
        }
      })
      .finally(() => {
        onSearch();
      });
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
