<script setup lang="ts">
import Tree from "@/views/system/user/tree.vue";
import { useCourse } from "@/views/course/hook";
import { PureTableBar } from "@/components/RePureTableBar";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Course"
});

const { loading, dataList, pagination, deptIdChange, columns, onSearch } =
  useCourse();
</script>

<template>
  <div class="main">
    <tree class="w-[17%] float-left" @deptIdChange="deptIdChange" />
    <div class="float-right w-[82%]">
      <PureTableBar title="课程管理" :columns="columns" @refresh="onSearch">
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            border
            adaptive
            align-whole="center"
            table-layout="auto"
            :loading="loading"
            :size="size"
            :data="dataList"
            :columns="dynamicColumns"
            :pagination="pagination"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="{
              background: 'var(--el-table-row-hover-bg-color)',
              color: 'var(--el-text-color-primary)'
            }"
          />
        </template>
      </PureTableBar>
    </div>
  </div>
</template>
