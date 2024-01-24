import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { delRole, getRolePage, saveOrUpdateRole, updateRole } from "@/api/role";
import { ElMessageBox } from "element-plus";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import MeunRole from "@/views/system/role/meunRole.vue";

export function useRole() {
  const form = reactive({
    roleNameEq: undefined,
    roleCodeEq: undefined,
    statusEq: undefined
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "角色编号",
      prop: "id",
      minWidth: 100
    },
    {
      label: "角色名称",
      prop: "roleName",
      minWidth: 120
    },
    {
      label: "角色标识",
      prop: "roleCode",
      minWidth: 150
    },
    {
      label: "状态",
      minWidth: 130,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "排序号",
      prop: "roleSort",
      minWidth: 150
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  function onChange({ row }) {
    if (row.roleCode === "admin") {
      message(`管理员不能修改！`, { type: "error" });
      return;
    }
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.roleName
      }</strong>吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        updateRole(row).then(() => {
          message(`已 ${row.status === 0 ? "停用" : "启用"} ${row.roleName}`, {
            type: "success"
          });
        });
      })
      .catch(() => {
        onSearch();
      });
  }

  function handleDelete(row) {
    if (row.roleCode === "admin") {
      message(`管理员不能删除！`, { type: "error" });
      return;
    }
    delRole(row.id).then(() => {
      message(`您删除了角色名称为${row.roleName}的这条数据`, {
        type: "success"
      });
      onSearch();
    });
  }

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
    const { data } = await getRolePage(toRaw(raw));
    dataList.value = data.records;
    pagination.total = data.total;
    pagination.pageSize = data.size;
    pagination.currentPage = data.current;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    if (row !== undefined && row.roleCode === "admin") {
      message(`管理员不能修改！`, { type: "error" });
      return;
    }
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          id: row?.id ?? undefined,
          roleName: row?.roleName ?? undefined,
          roleCode: row?.roleCode ?? undefined,
          roleSort: row?.roleSort ?? undefined
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
          saveOrUpdateRole(curData).then(() => {
            message(`您${title}了角色名称为:${curData.roleName} 的这条数据`, {
              type: "success"
            });
            done(); // 关闭弹框
            onSearch(); // 刷新表格数据
          });
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  /** 菜单权限 */
  function handleMenu(row?: FormItemProps) {
    addDialog({
      title: `菜单权限`,
      props: {
        formInline: {
          id: row?.id ?? undefined,
          roleName: row?.roleName ?? undefined,
          roleCode: row?.roleCode ?? undefined,
          roleSort: row?.roleSort ?? undefined
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(MeunRole, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const curData = options.props.formInline as FormItemProps;
        message(`成功 ${curData.id}！`, { type: "success" });
        done(); // 关闭弹框
        onSearch(); // 刷新表格数据
      }
    });
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
