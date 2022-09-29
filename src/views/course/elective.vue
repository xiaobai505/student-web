<script setup lang="ts">
import { reactive, ref } from "vue";
import { getCourse } from "/@/api/course";
import { VxeGridInstance, VxeGridProps } from "vxe-table";
import { saveCourseUser } from "/@/api/courseUser";

const electiveCourse = reactive({
  flag: false
});

const xGrid = ref<VxeGridInstance>();
const gridOptions = reactive<VxeGridProps>({
  border: true,
  height: 530,
  align: "center",
  rowConfig: {
    keyField: "id"
  },
  columnConfig: {
    resizable: true
  },
  checkboxConfig: {
    reserve: true
  },
  pagerConfig: {
    pageSize: 10
  },
  columns: [
    { field: "id", title: "id" },
    { field: "courseName", title: "课程名称" },
    { field: "courseTeacher", title: "授课老师" },
    { field: "stock", title: "座位数量" },
    { field: "sale", title: "报名人数" },
    { field: "timeTable", title: "上课时间" },
    { field: "startTime", title: "授课开始时间" },
    { field: "endTime", title: "授课结束时间" },
    { title: "操作", width: 200, slots: { default: "operate" } }
  ],
  proxyConfig: {
    form: true, // 启用表单代理
    seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
    props: {
      result: "records",
      total: "total"
    },
    ajax: {
      // 接收 Promise
      query: ({ page, form }) => {
        return getCourse(Object.assign(page, form, { isMust: false }));
      }
    }
  }
});

const openElective = async () => {
  electiveCourse.flag = true;
  refresh();
};
const refresh = async () => {
  const $grid = xGrid.value;
  if ($grid) {
    await $grid.commitProxy("reload");
  }
};

const emit = defineEmits<{ (e: "refresh") }>();

const saveRowEvent = async (row: any) => {
  await saveCourseUser(row);
  electiveCourse.flag = false;
  // 把id返回给父页面
  emit("refresh");
};

// 使用defineExpose暴露inputVal和exposeFun
defineExpose({
  openElective
});
</script>
<template>
  <div>
    <vxe-modal v-model="electiveCourse.flag" width="1200">
      <template #default>
        <vxe-grid ref="xGrid" v-bind="gridOptions">
          <!-- 操作列 插槽   -->
          <template #operate="{ row }">
            <vxe-button
              icon="fa fa-check"
              status="success"
              circle
              @click="saveRowEvent(row)"
            />
          </template>
        </vxe-grid>
      </template>
    </vxe-modal>
  </div>
</template>
