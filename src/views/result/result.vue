<script setup lang="ts">
import { reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps, VXETable } from "vxe-table";
import { getResult, updateResult } from "/@/api/result";
import { usePermissionStoreHook } from "/@/store/modules/permission";
import { useColumns } from "/@/views/result/columns";

defineOptions({
  name: "Result"
});

let { columns } = useColumns();

// 判断当前用户是否有学生权限
const buttonAuth = usePermissionStoreHook().buttonAuth.includes("ROLE_STUDENT");
if (buttonAuth) {
  // 操作列 删除
  columns.splice(columns.length - 1);
}

const xGrid = ref<VxeGridInstance>();
const gridOptions = reactive<VxeGridProps>({
  border: true,
  showOverflow: true,
  resizable: true,
  keepSource: true,
  align: "center",
  exportConfig: {},
  columnConfig: {
    resizable: true
  },
  pagerConfig: {
    pageSize: 10
  },
  formConfig: {
    items: [
      {
        field: "course",
        title: "课程名",
        itemRender: {},
        slots: { default: "major_item" }
      },
      { itemRender: {}, slots: { default: "submit_item" } }
    ]
  },
  editConfig: {
    trigger: "manual",
    mode: "row",
    showStatus: true
  },
  toolbarConfig: {
    perfect: true
  },
  proxyConfig: {
    form: true, // 启用表单代理
    props: {
      result: "records",
      total: "total"
    },
    ajax: {
      // 接收 Promise API
      query: ({ page, form }) => {
        return getResult(Object.assign(page, form));
      }
    }
  },
  columns: columns
});
// Table "解锁" 按钮
const editRowEvent = (row: any) => {
  const $grid = xGrid.value;
  if ($grid) {
    $grid.setActiveRow(row);
    VXETable.modal.message({ content: "解锁成功🔓！", status: "success" });
  }
};
// Table "锁定" 按钮
const saveRowEvent = async (row: any) => {
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.clearActived();
    gridOptions.loading = true;
    // 模拟异步保存
    updateResult([row]).then(() => {
      gridOptions.loading = false;
      VXETable.modal.message({ content: "锁定成功🔒！", status: "success" });
    });
  }
};
// Table "恢复" 按钮
const cancelRowEvent = async () => {
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.clearActived();
  }
};
</script>

<template>
  <div id="course" class="common-layout">
    <p v-auth="'ROLE_ADMIN'">管理员权限</p>
    <p v-auth="'ROLE_TEACHER'">教师权限</p>
    <p v-auth="'ROLE_STUDENT'">学生权限</p>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #major_item="{ data }">
        <vxe-input v-model="data.major" type="text" placeholder="专业检索" />
      </template>
      <template #submit_item>
        <vxe-button type="submit" status="primary" content="查询" />
      </template>

      <!-- 编辑页面插槽   -->
      <template #result_default="{ row }">
        <span>{{ row.result }}</span>
      </template>
      <template #result_edit="{ row }">
        <vxe-input v-model="row.result" transfer />
      </template>
      <!-- 操作列 插槽   -->
      <template #operate="{ row }">
        <template v-if="$refs.xGrid.isActiveByRow(row)">
          <vxe-button
            icon="fa fa-check"
            status="success"
            title="锁定"
            circle
            @click="saveRowEvent(row)"
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
        </template>
      </template>
    </vxe-grid>
  </div>
</template>

<style scoped></style>
