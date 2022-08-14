<script setup lang="ts">
import { reactive, ref } from "vue";
import XEUtils from "xe-utils";
import VXETable, { VxeTableInstance, VxeToolbarInstance } from "vxe-table";
import { getRoutes } from "/@/api/routes";

const demo3 = reactive({
  tableData: [
    {
      id: 10000,
      parentId: null,
      name: "test abc1",
      type: "mp3",
      size: 1024,
      date: "2020-08-01"
    },
    {
      id: 10050,
      parentId: null,
      name: "Test2",
      type: "mp4",
      size: null,
      date: "2021-04-01"
    },
    {
      id: 24300,
      parentId: 10050,
      name: "Test3",
      type: "avi",
      size: 1024,
      date: "2020-03-01"
    },
    {
      id: 20045,
      parentId: 24300,
      name: "test abc4",
      type: "html",
      size: 600,
      date: "2021-04-01"
    },
    {
      id: 10053,
      parentId: 24300,
      name: "test abc96",
      type: "avi",
      size: null,
      date: "2021-04-01"
    },
    {
      id: 24330,
      parentId: 10053,
      name: "test abc5",
      type: "txt",
      size: 25,
      date: "2021-10-01"
    },
    {
      id: 21011,
      parentId: 10053,
      name: "Test6",
      type: "pdf",
      size: 512,
      date: "2020-01-01"
    },
    {
      id: 22200,
      parentId: 10053,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 23666,
      parentId: null,
      name: "Test8",
      type: "xlsx",
      size: 2048,
      date: "2020-11-01"
    },
    {
      id: 23677,
      parentId: 23666,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 23671,
      parentId: 23677,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 23672,
      parentId: 23677,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 23688,
      parentId: 23666,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 23681,
      parentId: 23688,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 23682,
      parentId: 23688,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 24555,
      parentId: null,
      name: "test abc9",
      type: "avi",
      size: 224,
      date: "2020-10-01"
    },
    {
      id: 24566,
      parentId: 24555,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    },
    {
      id: 24577,
      parentId: 24555,
      name: "Test7",
      type: "js",
      size: 1024,
      date: "2021-06-01"
    }
  ]
});

getRoutes().then(res => {
  console.log(res);
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
      <vxe-column title="name" type="checkbox" tree-node>
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
            <span>{{ row.name }}</span>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="remark" title="remark" />
      <vxe-column field="path" title="path" />
      <vxe-column field="menuType" title="menuType" />
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
