<script script setup lang="ts">
import { reactive } from "vue";
import { CourseList } from "/@/api/course";
import { getMajorCourse, setCoursesByMajorId } from "/@/api/majorCourse";

const data = reactive({
  // 是否打開
  flag: false,
  // 专业id
  id: null,
  // 已选课程
  data: [],
  // 所有课程
  options: []
});

// 子组件暴露的方法
const exposeFun = (id: number) => {
  data.id = id;
  data.data = [];
  CourseList().then(res => {
    data.options = res;
  });
  getMajorCourse({ majorId: id }).then(res => {
    data.flag = true;
    data.data = res;
  });
};

const submit = () => {
  setCoursesByMajorId(data.id, data.data).then(() => {
    data.flag = false;
  });
};

// 使用defineExpose暴露inputVal和exposeFun
defineExpose({
  exposeFun
});
</script>

<template>
  <div>
    <vxe-modal
      v-model="data.flag"
      id="rolesModal"
      width="607"
      height="486"
      min-width="607"
      min-height="486"
      show-zoom
      resize
      storage
      transfer
    >
      <template #title>
        <span style="color: red">权限列表</span>
      </template>
      <template #default>
        <!--  穿梭框    -->
        <el-transfer
          v-model="data.data"
          :data="data.options"
          :props="{ key: 'id', label: 'courseName' }"
          :titles="['所有课程', '已选课程']"
        />
        <el-button type="success" @click="submit" style="margin: 3% 45%"
          >保存</el-button
        >
      </template>
    </vxe-modal>
  </div>
</template>
