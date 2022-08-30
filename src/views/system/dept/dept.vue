<script setup lang="ts">
import { reactive } from "vue";

const dialog = reactive({
  // 弹出层标题
  title: "",
  // 是否显示弹出层
  open: false
});

// 子组件暴露的方法
const showDept = (row: any) => {
  dialog.open = true;
  console.log(row);
};

// 使用defineExpose暴露inputVal和exposeFun
defineExpose({
  showDept
});
</script>

<template>
  <div>
    <el-dialog
      :title="dialog.title"
      v-model:visible="dialog.open"
      width="600px"
      append-to-body
    />
  </div>
</template>
