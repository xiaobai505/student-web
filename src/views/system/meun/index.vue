<script setup lang="ts">
import { computed, ref } from "vue";
import type { ElTreeV2 } from "element-plus";
import { transformI18n } from "/@/plugins/i18n";
import ElTreeLine from "/@/components/ReTreeLine";
import { extractPathList, deleteChildren } from "@pureadmin/utils";
import { usePermissionStoreHook } from "/@/store/modules/permission";
import type { TreeNode } from "element-plus/es/components/tree-v2/src/types";

interface treeNode extends TreeNode {
  meta: {
    title: string;
  };
}
const query = ref("");
let dataProps = ref({
  value: "uniqueId",
  children: "children"
});
const treeRef = ref<InstanceType<typeof ElTreeV2>>();

let menusData = computed(() => {
  return deleteChildren(usePermissionStoreHook().menusTree);
});

let expandedKeys = extractPathList(menusData.value);

const onQueryChanged = (query: string) => {
  (treeRef as any).value!.filter(query);
};

const filterMethod = (query: string, node: treeNode) => {
  return transformI18n(node.meta.title)!.indexOf(query) !== -1;
};

const getCheckedNodes = () => {
  let nodes = (treeRef as any).value!.getCheckedNodes(false);
  console.log(nodes);
};
const getCheckedKeys = () => {
  let nodes = (treeRef as any).value!.getCheckedKeys(false);
  console.log(nodes);
};
const resetChecked = () => {
  (treeRef as any).value!.setCheckedKeys([]);
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 普通树结构 </span>
      </div>
    </template>
    <el-input
      class="mb-4"
      v-model="query"
      placeholder="请输入关键字查找"
      clearable
      @input="onQueryChanged"
    />
    <div class="buttons">
      <el-button @click="getCheckedNodes">get by node</el-button>
      <el-button @click="getCheckedKeys">get by key</el-button>
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
  </el-card>
</template>
