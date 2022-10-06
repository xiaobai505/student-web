<script setup lang="ts">
import { reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps, VXETable } from "vxe-table";
import { delCourse, getCourse, saveCourse, updateCourse } from "/@/api/course";

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
        return getCourse(Object.assign(page, form));
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
          saveCourse(body.insertRecords).then(() => {
            window.location.reload();
          });
        }
        if (body.updateRecords.length > 0) {
          console.log("更新:" + body.insertRecords);
          updateCourse(body.updateRecords);
        }
        if (body.removeRecords.length > 0 || body.pendingRecords.length > 0) {
          const array = [...body.removeRecords, ...body.pendingRecords];
          console.log("删除:" + array);
          delCourse(array);
        }
        VXETable.modal.message({
          content: `新增 ${body.insertRecords.length},更新 ${body.updateRecords.length},删除 ${body.removeRecords.length} 记录！`,
          status: "success"
        });
        return new Promise(resolve => {
          resolve({});
        });
      }
    }
  },
  columns: [
    { field: "id", title: "id" },
    {
      field: "courseName",
      title: "课程名称",
      editRender: {},
      slots: { default: "courseName_default", edit: "courseName_edit" }
    },
    {
      field: "courseTeacher",
      title: "授课老师",
      editRender: {},
      slots: { default: "courseTeacher_default", edit: "courseTeacher_edit" }
    },
    {
      field: "timeTable",
      title: "上课时间",
      editRender: {},
      slots: { default: "timeTable_default", edit: "timeTable_edit" }
    },
    {
      field: "stock",
      title: "座位数量",
      editRender: {},
      slots: { default: "stock_default", edit: "stock_edit" }
    },
    {
      field: "isMustDisplay",
      title: "是否必修",
      editRender: {},
      slots: { default: "isMust_default", edit: "isMust_edit" }
    },
    {
      field: "graduate",
      title: "学分",
      editRender: {},
      slots: { default: "graduate_default", edit: "graduate_edit" }
    },
    {
      field: "startTime",
      title: "授课开始时间",
      editRender: {},
      slots: { default: "startTime_default", edit: "startTime_edit" }
    },
    {
      field: "endTime",
      title: "授课结束时间",
      editRender: {},
      slots: { default: "endTime_default", edit: "endTime_edit" }
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
const saveRowEvent = async (row: any) => {
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.clearActived();
    gridOptions.loading = true;
    // 模拟异步保存
    setTimeout(() => {
      console.log(row);
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

// fk: 翻译字段不变，提交不了。
const change = (row: any) => {
  if (row.isMust == "1") {
    row.isMustDisplay = "必修";
  } else {
    row.isMustDisplay = "选修";
  }
};
</script>

<template>
  <div id="course" class="common-layout">
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
      <template #courseName_default="{ row }">
        <span>{{ row.courseName }}</span>
      </template>
      <template #courseName_edit="{ row }">
        <vxe-input v-model="row.courseName" transfer />
      </template>
      <template #courseTeacher_default="{ row }">
        <span>{{ row.courseTeacher }}</span>
      </template>
      <template #courseTeacher_edit="{ row }">
        <vxe-input v-model="row.courseTeacher" transfer />
      </template>
      <template #timeTable_default="{ row }">
        <span>{{ row.timeTable }}</span>
      </template>
      <template #timeTable_edit="{ row }">
        <vxe-input v-model="row.timeTable" transfer />
      </template>
      <template #stock_default="{ row }">
        <span>{{ row.stock }}</span>
      </template>
      <template #stock_edit="{ row }">
        <vxe-input v-model="row.stock" transfer />
      </template>
      <template #isMust_default="{ row }">
        <span>{{ row.isMustDisplay }}</span>
      </template>
      <template #isMust_edit="{ row }">
        <vxe-select v-model="row.isMust" @change="change(row)">
          <vxe-option value="0" label="选修" />
          <vxe-option value="1" label="必修" />
        </vxe-select>
      </template>
      <template #graduate_default="{ row }">
        <span>{{ row.graduate }}</span>
      </template>
      <template #graduate_edit="{ row }">
        <vxe-input v-model="row.graduate" transfer />
      </template>
      <template #startTime_default="{ row }">
        <span>{{ row.startTime }}</span>
      </template>
      <template #startTime_edit="{ row }">
        <vxe-input v-model="row.startTime" transfer />
      </template>

      <template #endTime_default="{ row }">
        <span>{{ row.endTime }}</span>
      </template>
      <template #endTime_edit="{ row }">
        <vxe-input v-model="row.endTime" transfer />
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
          <vxe-button
            icon="fa fa-trash"
            title="删除"
            circle
            @click="removeRowEvent(row)"
          />
        </template>
      </template>
    </vxe-grid>
  </div>
</template>
