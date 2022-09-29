<script setup lang="ts">
import { useColumns } from "./columns";
import { getUser } from "/@/api/user";
import { reactive } from "vue";
const { columnsA, columnsB, columnsC } = useColumns();

const data = reactive([]);
const list = [
  {
    columns: columnsA,
    column: 3
  },
  {
    columns: columnsB,
    column: 2
  },
  {
    columns: columnsC,
    column: 1
  }
];
getUser().then(res => {
  data.push(res);
});
</script>

<template>
  <PureDescriptions
    v-for="(item, index) in list"
    :data="data"
    :key="index"
    :columns="item.columns"
    :column="item.column"
    class="margin-top"
    direction="vertical"
    border
  />
</template>
