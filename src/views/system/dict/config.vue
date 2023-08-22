<script setup lang="ts">
import { ref, reactive } from "vue";
import { getDictConfig } from "@/api/dictConfig";

const drawer = ref(false);

const configData = reactive({
  tableData: [
    {
      dictDisplay: "禁用",
      dictValue: "0"
    },
    {
      dictDisplay: "启用",
      dictValue: "1"
    }
  ],
  isAllChecked: false,
  isIndeterminate: false,
  selectRecords: [] as any[],
  tablePage: {
    total: 0,
    currentPage: 1,
    pageSize: 10
  }
});

async function getdata(id: number) {
  drawer.value = !drawer.value;
  await getDictConfig(id).then(data => {
    configData.tableData = data;
  });
}

// 使用defineExpose暴露inputVal和exposeFun
defineExpose({
  getdata
});
</script>

<template>
  <div class="config">字典配置</div>
</template>
