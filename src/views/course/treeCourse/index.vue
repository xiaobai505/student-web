<script setup lang="ts">
import Tree from "@/views/system/user/tree.vue";
import { useCourse } from "@/views/course/treeCourse/hook";
import { PureTableBar } from "@/components/RePureTableBar";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "TreeCourse"
});

const {
  loading,
  dataList,
  treeData,
  treeLoading,
  onTreeSelect,
  pagination,
  columns,
  onSearch
} = useCourse();
</script>

<template>
  <div class="flex justify-between">
    <tree
      ref="treeRef"
      class="min-w-[200px] mr-2"
      :treeData="treeData"
      :treeLoading="treeLoading"
      @tree-select="onTreeSelect"
    />
    <div class="w-[calc(100%-200px)]">
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
