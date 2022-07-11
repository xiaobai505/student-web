<script setup lang="ts">
import { reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps, VXETable } from "vxe-table";
import { delCourseUser, getCourseUser } from "/@/api/courseUser";
import Elective from "/@/views/course/elective.vue";

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
        field: "studentName",
        title: "学生姓名",
        itemRender: {},
        slots: { default: "studentName_item" }
      },
      {
        field: "major",
        title: "课程",
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
    refresh: true,
    slots: {
      // 自定义插槽模板
      buttons: "toolbar_buttons"
    }
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
        return getCourseUser(Object.assign(page, form, { isMust: false }));
      }
    }
  },
  columns: [
    { field: "id", title: "id" },
    {
      field: "userId",
      title: "用户id"
    },
    {
      field: "courseId",
      title: "课程编号"
    },
    {
      field: "bestScore",
      title: "最高成绩"
    },
    {
      field: "listScore",
      title: "历史成绩"
    },
    {
      field: "createTime",
      title: "选课时间"
    },
    {
      field: "createBy",
      title: "选课账号"
    },
    {
      field: "createByName",
      title: "选课人"
    },
    { title: "操作", width: 200, slots: { default: "operate" } }
  ]
});

// Table "删除" 按钮
const removeRowEvent = async (row: any) => {
  const type = await VXETable.modal.confirm("选修课座位数紧张，您确定要放弃?");
  const $grid = xGrid.value;
  if (type === "confirm") {
    delCourseUser(row);
    await $grid.remove(row);
  }
  console.log("删除" + row.id);
};

// 父组件接收子组件暴露的方法，使用子组件的ref
const electiveRef = ref<{ openElective(): void }>();
// 使用子组件暴露的内容
const open = () => {
  electiveRef.value?.openElective();
};
</script>

<template>
  <div id="course" class="common-layout">
    <elective ref="electiveRef" />
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <!--  查询菜单插槽    -->
      <template #studentName_item="{ data }">
        <vxe-input
          v-model="data.studentName"
          type="text"
          placeholder="请输入学生姓名"
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

      <!--   按钮插槽   -->
      <template #toolbar_buttons>
        <vxe-button content="报名选修课" @click="open" />
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
        <vxe-button
          icon="fa fa-trash"
          title="删除"
          circle
          @click="removeRowEvent(row)"
        />
      </template>
    </vxe-grid>
  </div>
</template>
