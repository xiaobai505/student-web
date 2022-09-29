<script setup lang="ts">
import { reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps, VXETable } from "vxe-table";
import { storageLocal } from "@pureadmin/utils";
import rowRoles from "/@/views/system/user/rowRoles.vue";
import Tree from "/@/views/system/user/tree.vue";
import { delUser, pageUser, saveUser, updateUser } from "/@/api/user";
import { roles } from "/@/api/role";

const xGrid = ref<VxeGridInstance>();
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  resizable: true,
  keepSource: true,
  height: 780,
  align: "center",
  printConfig: {},
  importConfig: {
    encoding: "utf-8"
  },
  exportConfig: {
    encoding: "utf-8"
  },
  rowConfig: {
    isCurrent: true
  },
  pagerConfig: {
    perfect: true,
    border: true,
    pageSize: 10
  },
  formConfig: {
    items: [
      {
        field: "name",
        title: "名称",
        itemRender: {},
        slots: { default: "name_item" }
      },
      {
        field: "roles",
        title: "角色",
        itemRender: {},
        slots: { default: "roles_item" }
      },
      { itemRender: {}, slots: { default: "submit_item" } },
      { itemRender: {}, slots: { default: "reset_item" } }
    ]
  },
  editConfig: {
    trigger: "manual",
    mode: "row",
    showStatus: true
  },
  toolbarConfig: {
    buttons: [
      {
        code: "insert_actived",
        name: "新增",
        status: "perfect",
        icon: "fa fa-plus"
      },
      {
        code: "delete",
        name: "删除",
        status: "perfect",
        icon: "fa fa-trash-o"
      },
      {
        code: "mark_cancel",
        name: "标记/取消",
        status: "perfect",
        icon: "vxe-icon--minus"
      },
      {
        code: "save",
        name: "提交",
        status: "success",
        icon: "fa fa-save"
      }
    ],
    perfect: true,
    refresh: {
      icon: "fa fa-refresh",
      iconLoading: "fa fa-spinner fa-spin"
    },
    import: {
      icon: "fa fa-upload"
    },
    export: {
      icon: "fa fa-download"
    },
    print: {
      icon: "fa fa-print"
    },
    zoom: {
      iconIn: "fa fa-arrows-alt",
      iconOut: "fa fa-expand"
    },
    custom: {
      icon: "fa fa-cog"
    }
  },
  proxyConfig: {
    form: true, // 启用表单代理
    props: {
      result: "records",
      total: "total"
    },
    ajax: {
      // 接收 Promise
      query: ({ page, form }) => {
        const params = Object.assign(page, form, {
          deptId: deptId.value,
          current: page.currentPage
        });
        delete params.currentPage;
        return pageUser(params);
      },
      // body 对象： { removeRecords }
      delete: ({ body }) => {
        return new Promise(resolve => {
          console.log("刪除" + body);
          resolve({});
        });
      },
      // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
      save: async ({ body }) => {
        if (body.insertRecords.length > 0) {
          console.log("新增:" + body.insertRecords);
          await saveUser(body.insertRecords);
        }
        if (body.updateRecords.length > 0) {
          console.log("更新:" + body.insertRecords);
          await updateUser(body.updateRecords);
        }
        if (body.removeRecords.length > 0 || body.pendingRecords.length > 0) {
          const array = [...body.removeRecords, ...body.pendingRecords];
          console.log("删除:" + array);
          await delUser(array);
        }
        return new Promise(resolve => {
          resolve({});
        });
      }
    }
  },
  columns: [
    { type: "checkbox", width: 50 },
    { field: "id", title: "id" },
    {
      field: "username",
      title: "用户名",
      editRender: {},
      slots: { default: "name_default", edit: "name_edit" }
    },
    { field: "name", title: "姓名", editRender: { name: "input" } },
    {
      field: "sex",
      title: "性别",
      editRender: {},
      slots: { default: "sex_default", edit: "sex_edit" }
    },
    {
      field: "roles",
      title: "角色",
      // editRender: {},
      slots: { default: "roles_default", edit: "roles_edit" }
    },
    {
      field: "address",
      title: "联系地址",
      showOverflow: true,
      editRender: { name: "input" }
    },
    { title: "操作", width: 200, slots: { default: "operate" } }
  ]
} as VxeGridProps);

// 格式化 男女
const formatSex = (value: any) => {
  if (value === "1") {
    return "男";
  }
  if (value === "0") {
    return "女";
  }
  return "";
};
// Table "解锁" 按钮
const editRowEvent = (row: any) => {
  const $grid = xGrid.value;
  if ($grid) {
    $grid.setActiveRow(row);
    VXETable.modal.message({ content: "解锁成功🔓！", status: "success" });
  }
};
// Table "锁定" 按钮
const saveRowEvent = async () => {
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.clearActived();
    gridOptions.loading = true;
    // 模拟异步保存
    setTimeout(() => {
      gridOptions.loading = false;
      VXETable.modal.message({ content: "解锁成功🔒！", status: "success" });
    }, 300);
  }
};
// Table "恢复" 按钮
const cancelRowEvent = async () => {
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.clearActived();
  }
};
// Table "删除" 按钮
const removeRowEvent = async (row: any) => {
  const type = await VXETable.modal.confirm("您确定要删除该数据?");
  const $grid = xGrid.value;
  if ($grid) {
    if (type === "confirm") {
      await $grid.remove(row);
    }
  }
  console.log("删除" + row.id);
};
// 父组件接收子组件暴露的方法，使用子组件的ref
const rolesRef = ref<{ exposeFun(id: number): void }>();
// 使用子组件暴露的内容
const editRowRoles = (row: any) => {
  rolesRef.value?.exposeFun(row.id);
};
// 获取角色列表
const getRoles = () => {
  const rolesList = storageLocal.getItem("rolesList") || null;
  if (rolesList !== null) {
    return rolesList;
  }
  roles(null).then(res => {
    storageLocal.setItem("rolesList", res.records);
    getRoles();
  });
};
const rolesList = ref<any>(getRoles());

const deptId = ref<number>(101);

const handleClose = async (id: number) => {
  deptId.value = id;
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.commitProxy("query", ["deptId", id]);
  }
};
</script>

<template>
  <div class="main flex">
    <tree @handleClose="handleClose" />
    <div class="flex-1 ml-4">
      <rowRoles ref="rolesRef" @handleClose="handleClose" />
      <vxe-grid ref="xGrid" v-bind="gridOptions">
        <!--  查询条件  -->
        <template #name_item="{ data }">
          <vxe-input v-model="data.name" type="text" placeholder="请输入名字" />
        </template>
        <template #roles_item="{ data }">
          <vxe-select v-model="data.roles" :multiple="true" transfer>
            <vxe-option
              v-for="item in rolesList"
              :key="item.id"
              :value="item.id"
              :label="item.roleName"
            />
          </vxe-select>
        </template>
        <template #submit_item>
          <vxe-button type="submit" status="primary" content="查询" />
        </template>
        <template #reset_item>
          <vxe-button type="reset" content="重置" />
        </template>

        <!-- 编辑页面插槽   -->
        <template #name_default="{ row }">
          <span>{{ row.username }}</span>
        </template>
        <template #name_edit="{ row }">
          <span v-if="row.id">{{ row.username }}</span>
          <vxe-input v-else v-model="row.username" transfer />
        </template>
        <template #sex_default="{ row }">
          <span>{{ formatSex(row.sex) }}</span>
        </template>
        <template #sex_edit="{ row }">
          <vxe-select v-model="row.sex" transfer>
            <vxe-option value="1" label="男" />
            <vxe-option value="0" label="女" />
          </vxe-select>
        </template>
        <template #roles_default="{ row }">
          <span>{{ row.roles }}</span>
        </template>
        <template #roles_edit="{ row }">
          <vxe-select v-model="row.roles" :multiple="true" transfer>
            <vxe-option
              v-for="item in rolesList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
        </template>

        <!-- 操作列 插槽   -->
        <template #operate="{ row }">
          <template v-if="$refs.xGrid.isActiveByRow(row)">
            <vxe-button
              icon="fa fa-check"
              status="success"
              title="锁定"
              circle
              @click="saveRowEvent"
            />
            <vxe-button
              icon="fa fa-close"
              status="danger"
              title="取消"
              circle
              @click="cancelRowEvent"
            />
          </template>
          <template v-else>
            <vxe-button
              icon="fa fa-edit"
              title="编辑"
              circle
              @click="editRowEvent(row)"
            />
            <vxe-button
              icon="fa fa-trash"
              title="删除"
              circle
              @click="removeRowEvent(row)"
            />
            <vxe-button
              icon="fa fa-gear"
              title="权限"
              @click="editRowRoles(row)"
              circle
            />
          </template>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
