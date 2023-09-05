<script setup lang="ts">
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useSelectCourse } from "./utils/hook";
import { ref } from "vue";
import Delete from "@iconify-icons/ep/delete";
import Search from "@iconify-icons/ep/search";
import SetUp from "@iconify-icons/ep/set-up";
import router from "@/router";

defineOptions({
  name: "SelectCourse"
});
const tableRef = ref();

const {
  loading,
  columns,
  pagination,
  dataList,
  onSearch,
  openDialog,
  handleAdd,
  handleDelete
} = useSelectCourse();
</script>

<template>
  <div class="main">
    <PureTableBar
      title="已选课程"
      :columns="columns"
      :tableRef="tableRef?.getTableRef()"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          @click="router.push({ path: '/course/resultCourse/index' })"
        >
          已选课程
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          adaptive
          :adaptiveConfig="{ offsetBottom: 32 }"
          align-whole="center"
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          default-expand-all
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
        >
          <template #operation="{ row }">
            <el-button
              v-if="row.count === null"
              class="reset-margin"
              link
              type="success"
              :size="size"
              :icon="useRenderIcon(SetUp)"
              @click="handleAdd(row)"
              v-auth="'student'"
            >
              选择报名
            </el-button>
            <el-popconfirm
              :title="`是否确认取消${row.courseName}的这门课程`"
              @confirm="handleDelete(row)"
              v-if="row.count !== null"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="danger"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                  v-auth="'student'"
                >
                  取消报名
                </el-button>
              </template>
            </el-popconfirm>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :icon="useRenderIcon(Search)"
              @click="openDialog(row)"
              v-auth="'teacher'"
            >
              查看报名
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
