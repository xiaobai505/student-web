<script setup lang="ts">
import { FormProps } from "../resultCourse/utils/types";
import { onMounted, ref } from "vue";
import { getResult } from "@/api/result";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: undefined,
    courseName: undefined,
    result: undefined,
    isReset: undefined
  })
});
const newFormInline = ref(props.formInline);
const dataList = ref([]);

onMounted(() => {
  getResult({ courseIdEq: newFormInline.value.id }).then(res => {
    dataList.value = res.data["records"];
  });
});
</script>

<template>
  <el-table :data="dataList" style="width: 100%">
    <el-table-column prop="studentName" label="报名的学生" width="180" />
    <el-table-column prop="courseName" label="报名课程" width="180" />
  </el-table>
</template>
