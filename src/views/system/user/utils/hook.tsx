import dayjs from "dayjs";
import { message } from "@/utils/message";
import {
  delUser,
  getUserPage,
  resetPwd,
  saveOrUpdateUser,
  updateUser
} from "@/api/user";
import { ElMessageBox } from "element-plus";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted, h, toRaw } from "vue";
import { addDialog } from "@/components/ReDialog/index";
import { RolesProps } from "@/views/system/user/utils/types";
import { setRolesById } from "@/api/role";
import { cloneDeep } from "@pureadmin/utils";
import editForm from "../form.vue";
import RowRoles from "../rowRoles.vue";
import { type FormItemProps } from "../utils/types";
import { getDeptList } from "@/api/dept";
import { handleTree } from "@/utils/tree";

export function useUser() {
  const form = reactive({
    username: undefined,
    phone: undefined,
    status: undefined,
    deptId: 101
  });
  const formRef = ref();
  const dataList = ref([]);
  const treeData = ref([]);
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
      label: "用户名",
      prop: "username",
      minWidth: 130
    },
    {
      label: "姓名",
      prop: "name",
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
      prop: "deptName",
      minWidth: 90
      // formatter: ({ dept }) => dept.name
    },
    {
      label: "手机号码",
      prop: "phone",
      minWidth: 90
    },
    {
      label: "所属角色",
      prop: "roleNames",
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

  function onChange({ row }) {
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
        updateUser(row).then(() => {
          message("已成功修改用户状态", {
            type: "success"
          });
        });
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  function deptIdChange(id: number) {
    form.deptId = id;
    onSearch();
  }

  function handleSave(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}用户`,
      props: {
        FormItemProps: {
          id: row?.id ?? 0,
          higherDeptOptions: formatHigherDeptOptions(cloneDeep(treeData.value)),
          deptId: row?.deptId ?? undefined,
          username: row?.username ?? "",
          name: row?.name ?? "",
          sex: row?.sex ?? 0,
          phone: row?.phone ?? "",
          email: row?.email ?? "",
          status: row?.status ?? 0,
          remark: row?.remark ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.FormItemProps as FormItemProps;
        function chores() {
          console.log(curData);
          message(`您${title}了部门名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            saveOrUpdateUser(curData).then(() => {
              chores();
            });
          }
        });
      }
    });
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
      contentRenderer: () => h(RowRoles, { ref: formRef }),
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
  onMounted(async () => {
    onSearch();
    const { data } = await getDeptList();
    treeData.value = handleTree(data);
  });

  return {
    form,
    loading,
    columns,
    dataList,
    treeData,
    pagination,
    buttonClass,
    onSearch,
    deptIdChange,
    resetForm,
    handleSave,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleRoles,
    resetPassword
  };
}
