<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { ElTreeV2 } from "element-plus";
import { transformI18n } from "@/plugins/i18n";
import ElTreeLine from "@/components/ReTreeLine";
import { extractPathList } from "@pureadmin/utils";
import type { TreeNode } from "element-plus/es/components/tree-v2/src/types";

interface treeNode extends TreeNode {
  meta: {
    title: string;
  };
}

const dialog = reactive({
  // 弹出层标题
  title: "菜单树结构",
  // 是否显示弹出层
  open: false,
  // 加载显示
  loading: false
});

const query = ref("");
const dataProps = ref({
  value: "uniqueId",
  children: "children"
});
const treeRef = ref<InstanceType<typeof ElTreeV2>>();

const menusData = computed(() => {
  return null;
});

const expandedKeys = extractPathList(menusData.value);

const onQueryChanged = (query: string) => {
  (treeRef as any).value!.filter(query);
};

const filterMethod = (query: string, node: treeNode) => {
  return transformI18n(node.meta.title)!.indexOf(query) !== -1;
};

// const getCheckedNodes = () => {
//   let nodes = (treeRef as any).value!.getCheckedNodes(false);
//   console.log(nodes);
// };
// const getCheckedKeys = () => {
//   let nodes = (treeRef as any).value!.getCheckedKeys(false);
//   console.log(nodes);
// };

const resetChecked = () => {
  (treeRef as any).value!.setCheckedKeys([]);
};

// 子组件暴露的方法
const showMeun = (row: any) => {
  console.log(row);
  dialog.open = true;
};

// 使用defineExpose暴露showRole
defineExpose({
  showMeun
});
</script>

<template>
  <el-dialog
    :title="dialog.title"
    v-model="dialog.open"
    width="500px"
    append-to-body
  >
    <el-input
      class="mb-4"
      v-model="query"
      placeholder="请输入关键字查找"
      clearable
      @input="onQueryChanged"
    />
    <div class="buttons">
      <!--      <el-button @click="getCheckedNodes">get by node</el-button>-->
      <!--      <el-button @click="getCheckedKeys">get by key</el-button>-->
      <el-button @click="resetChecked">重置</el-button>
    </div>
    <el-tree-v2
      ref="treeRef"
      :data="menusData"
      :props="dataProps"
      show-checkbox
      :height="550"
      :filter-method="filterMethod"
      :default-expanded-keys="expandedKeys"
    >
      <template v-slot:default="{ node }">
        <el-tree-line
          :node="node"
          :treeData="menusData"
          :showLabelLine="true"
          :indent="30"
        >
          <template v-slot:node-label>
            <span class="text-sm">
              {{ transformI18n(node.data.meta.title) }}
            </span>
          </template>
        </el-tree-line>
      </template>
    </el-tree-v2>
  </el-dialog>
</template>
