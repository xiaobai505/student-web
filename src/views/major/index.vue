<script setup lang="ts">
import { reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps, VXETable } from "vxe-table";
import { delMajor, getMajor, saveMajor, updateMajor } from "/@/api/major";
import Courses from "/@/views/major/courses.vue";

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
        field: "school",
        title: "学校",
        itemRender: {},
        slots: { default: "school_item" }
      },
      {
        field: "major",
        title: "专业",
        itemRender: {},
        slots: { default: "major_item" }
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
    perfect: true,
    buttons: [
      {
        code: "insert_actived",
        name: "新增",
        status: "perfect",
        icon: "fa fa-plus"
      },
      {
        code: "save",
        name: "提交",
        status: "perfect",
        icon: "fa fa-save"
      }
    ]
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
        return getMajor(Object.assign(page, form));
      },
      delete: ({ body }) => {
        return new Promise(resolve => {
          console.log("刪除" + body);
          resolve({});
        });
      },
      save: ({ body }) => {
        if (body.insertRecords.length > 0) {
          console.log("新增:" + body.insertRecords);
          saveMajor(body.insertRecords);
        }
        if (body.updateRecords.length > 0) {
          console.log("更新:" + body.insertRecords);
          updateMajor(body.updateRecords);
        }
        if (body.removeRecords.length > 0 || body.pendingRecords.length > 0) {
          const array = [...body.removeRecords, ...body.pendingRecords];
          console.log("删除:" + array);
          delMajor(array);
        }
        return new Promise(resolve => {
          resolve({});
        });
      }
    }
  },
  columns: [
    { field: "id", title: "id", width: 200 },
    {
      field: "school",
      title: "学校",
      editRender: {},
      slots: { default: "school_default", edit: "school_edit" }
    },
    {
      field: "major",
      title: "专业",
      editRender: {},
      slots: { default: "major_default", edit: "major_edit" }
    },
    {
      field: "majorCode",
      title: "code",
      editRender: {},
      slots: { default: "code_default", edit: "cede_edit" }
    },
    { title: "操作", width: 200, slots: { default: "operate" } }
  ]
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
const saveRowEvent = async () => {
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.clearActived();
    gridOptions.loading = true;
    // 模拟异步保存
    setTimeout(() => {
      gridOptions.loading = false;
      VXETable.modal.message({ content: "锁定成功🔒！", status: "success" });
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
const coursesRef = ref<{ exposeFun(id: number): void }>();
// 使用子组件暴露的内容
const editRowRoles = (row: any) => {
  coursesRef.value?.exposeFun(row.id);
};
</script>

<template>
  <div id="major" class="common-layout">
    <!-- 专业-课程 弹出窗   -->
    <courses ref="coursesRef" />
    <!--  专业列表  -->
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #school_item="{ data }">
        <vxe-input
          v-model="data.school"
          type="text"
          placeholder="请输入学校名称"
        />
      </template>
      <template #major_item="{ data }">
        <vxe-input v-model="data.major" type="text" placeholder="专业检索" />
      </template>
      <template #submit_item>
        <vxe-button type="submit" status="primary" content="查询" />
      </template>
      <template #reset_item>
        <vxe-button type="reset" content="重置" />
      </template>

      <!-- 编辑页面插槽   -->
      <template #school_default="{ row }">
        <span>{{ row.school }}</span>
      </template>
      <template #school_edit="{ row }">
        <vxe-input v-model="row.school" transfer />
      </template>
      <template #major_default="{ row }">
        <span>{{ row.major }}</span>
      </template>
      <template #major_edit="{ row }">
        <vxe-input v-model="row.major" transfer />
      </template>
      <template #code_default="{ row }">
        <span>{{ row.majorCode }}</span>
      </template>
      <template #cede_edit="{ row }">
        <vxe-input v-model="row.majorCode" transfer />
      </template>

      <!-- 操作列 插槽   -->
      <template #operate="{ row }">
        <template v-if="$refs.xGrid.isActiveByRow(row)">
          <vxe-button
            icon="fa fa-check"
            status="success"
            title="锁定"
            circle
            @click="saveRowEvent()"
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
          <vxe-button
            icon="vxe-icon-arrow-up"
            title="权限"
            @click="editRowRoles(row)"
            circle
          />
        </template>
      </template>
    </vxe-grid>
  </div>
</template>
