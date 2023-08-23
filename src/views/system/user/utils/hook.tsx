import dayjs from "dayjs";
import { message } from "@/utils/message";
import { delUser, getUserPage, resetPwd } from "@/api/user";
import { ElMessageBox } from "element-plus";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted, h, toRaw } from "vue";
import { addDialog } from "@/components/ReDialog/index";
import RowRoles2 from "@/views/system/user/rowRoles.vue";
import { RolesProps } from "@/views/system/user/utils/types";
import { setRolesById } from "@/api/role";

export function useUser() {
  const form = reactive({
    username: undefined,
    phone: undefined,
    status: undefined,
    deptId: 101
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
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
      label: "用户编号",
      prop: "id",
      minWidth: 130
    },
    {
      label: "用户名称",
      prop: "username",
      minWidth: 130
    },
    {
      label: "用户昵称",
      prop: "nickName",
      minWidth: 130
    },
    {
      label: "性别",
      prop: "sex",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.sex === 1 ? "danger" : ""}
          effect="plain"
        >
          {row.sex === 1 ? "女" : "男"}
        </el-tag>
      )
    },
    {
      label: "部门",
      prop: "deptId",
      minWidth: 90
      // formatter: ({ dept }) => dept.name
    },
    {
      label: "手机号码",
      prop: "phone",
      minWidth: 90
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已开启"
          inactive-text="已关闭"
          inline-prompt
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "创建时间",
      minWidth: 90,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.username
      }</strong>用户吗?`,
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
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message("已成功修改用户状态", {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  function deptIdChange(id: number) {
    form.deptId = id;
    onSearch();
  }

  function handleUpdate(row) {
    console.log("handleUpdate" + row);
  }

  function handleDelete(row) {
    if (row.username === "admin") {
      message(`管理员不能删除！`, { type: "error" });
      return;
    }
    delUser(row.id)
      .then(() => {
        message(`删除 ${row.username} 成功！`, { type: "success" });
      })
      .finally(() => {
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
    await getUserPage(toRaw(raw)).then(res => {
      dataList.value = res.data["records"];
      pagination.total = res.data["total"];
      loading.value = false;
    });
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  function handleRoles(row?: RolesProps) {
    addDialog({
      title: `分配 ${row.name} 角色`,
      props: {
        formInline: {
          id: row.id,
          ids: []
        }
      },
      width: "40%",
      draggable: true,
      closeOnClickModal: false,
      contentRenderer: () => h(RowRoles2, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const curData = options.props.formInline as RolesProps;
        setRolesById(row.id, curData.ids)
          .then(() => {
            message(`重置了 ${row.name} 角色!`, { type: "success" });
          })
          .finally(() => {
            done(); // 关闭弹框
            onSearch(); // 刷新表格数据
          });
      }
    });
  }

  function resetPassword(row?: RolesProps) {
    resetPwd({ userId: row.id }).then(() => {
      message(`重置了 ${row.name} 密码!`, { type: "success" });
    });
  }

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    buttonClass,
    onSearch,
    deptIdChange,
    resetForm,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleRoles,
    resetPassword
  };
}
