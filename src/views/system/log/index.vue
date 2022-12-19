<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { type FormInstance } from "element-plus";
import { PureTableBar } from "@/components/RePureTableBar";
import { type PaginationProps } from "@pureadmin/table";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { logininfors } from "@/api/Logininfor";
import { logColumns } from "@/views/system/log/columns";

defineOptions({
  name: "log"
});

const form = reactive({
  userName: ""
});

const dataList = ref([]);
const loading = ref(true);
const { columns } = logColumns();

const formRef = ref<FormInstance>();

const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true
});

function onSearch() {
  loading.value = true;
  const params = Object.assign(pagination, form, {
    size: pagination.pageSize
  });
  logininfors(params).then(data => {
    loading.value = false;
    dataList.value = data["records"];
    pagination["total"] = parseInt(data["total"]);
  });
}

function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`);
  pagination.currentPage = val;
  onSearch();
}

function handleSizeChange(val: number) {
  pagination.pageSize = val;
  onSearch();
}

function handleSelectionChange(val) {
  console.log("handleSelectionChange", val);
}

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="登录账号：" prop="userName">
        <el-input
          v-model="form.userName"
          placeholder="请输入登录账号"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('search')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="登录日志"
      :loading="loading"
      :dataList="dataList"
      @refresh="onSearch"
    >
      <template #buttons />
      <template v-slot="{ size, checkList }">
        <PureTable
          border
          align="center"
          showOverflowTooltip
          table-layout="auto"
          :size="size"
          :data="dataList"
          :columns="columns"
          :checkList="checkList"
          :pagination="pagination"
          :paginationSmall="size === 'small'"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </PureTableBar>
  </div>
</template>
