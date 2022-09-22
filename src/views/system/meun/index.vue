<script setup lang="ts">
import { reactive, ref } from "vue";
import XEUtils from "xe-utils";
import VXETable, { VxeTableInstance, VxeToolbarInstance } from "vxe-table";
import { getRoutes } from "/@/api/routes";

const demo3 = reactive({
  tableData: []
});

getRoutes().then(res => {
  demo3.tableData = res;
});

const xTree = ref<VxeTableInstance>();
const xToolbar = ref<VxeToolbarInstance>();

const removeRowEvent = async (row: any) => {
  const type = await VXETable.modal.confirm("您确定要删除吗？");
  if (type === "confirm") {
    const matchObj = XEUtils.findTree(demo3.tableData, item => item === row);
    if (matchObj) {
      // 从树节点中移除
      matchObj.items.splice(matchObj.index, 1);
    }
  }
};
const edit = async (row: any) => {
  console.log(row);
};
const searchMethod = async (row: any) => {
  console.log(row);
};
</script>

<template>
  <el-card>
    <vxe-toolbar
      ref="xToolbar"
      :refresh="{ query: searchMethod }"
      export
      print
      custom
    >
      <template #buttons>
        <vxe-button @click="$refs.xTree.setAllTreeExpand(true)"
          >展开所有</vxe-button
        >
        <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      show-overflow
      ref="xTree"
      border="inner"
      :row-config="{ isHover: true, useKey: true }"
      :data="demo3.tableData"
      :checkbox-config="{ labelField: 'name' }"
      :scroll-y="{ enabled: false }"
      :tree-config="{
        transform: true,
        accordion: false, //是否只展开一个
        line: true,
        iconOpen: 'fa fa-minus-square-o',
        iconClose: 'fa fa-plus-square-o'
      }"
    >
      <vxe-column title="目录" type="checkbox" tree-node>
        <template #default="{ row }">
          <span>
            <template v-if="row.children && row.children.length">
              <i
                class="tree-node-icon fa"
                :class="
                  $refs.xTree.isTreeExpandByRow(row)
                    ? 'fa-folder-open-o'
                    : 'fa-folder-o'
                "
              />
            </template>
            <template v-else>
              <i class="tree-node-icon fa fa-file-o" />
            </template>
            <span>{{ row.remark }}</span>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="name" title="英文名" />
      <vxe-column field="path" title="路径" />
      <vxe-column field="menuType" title="类型" />
      <vxe-column field="meta.icon" title="图表" />
      <vxe-column field="meta.rank" title="排序" />
      <vxe-column field="meta.title" title="标题" />
      <vxe-column title="操作" width="140">
        <template #default="{ row }">
          <vxe-button type="text" icon="fa fa-eye" />
          <vxe-button type="text" icon="fa fa-edit" @click="edit(row)" />
          <vxe-button
            type="text"
            icon="fa fa-trash-o"
            @click="removeRowEvent(row)"
          />
          <vxe-button type="text" icon="fa fa-id-card-o" />
        </template>
      </vxe-column>
    </vxe-table>
  </el-card>
</template>

<style scoped>
.tree-node-icon {
  width: 16px;
  text-align: center;
}
</style>
