<script setup lang="ts">
import Tree from "@/views/system/user/tree.vue";
import { useTreeCourse } from "@/views/course/treeCourse/utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";

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
  onSearch,
  openDialog,
  handleDelete
} = useTreeCourse();
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
        <template #buttons>
          <el-button type="primary" @click="openDialog('编辑', null)">
            新增课程
          </el-button>
        </template>
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
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('编辑', row)"
              >
                修改
              </el-button>
              <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>
