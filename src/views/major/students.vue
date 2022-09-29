<script setup lang="ts">
import { reactive } from "vue";

const rowRoles = reactive({
  // 是否打開
  flag: false,
  // 专业id
  id: null,
  // 已关联学生
  data: [],
  // 所有的学生
  options: []
});

// 子组件暴露的方法
const exposeFun = (id: number) => {
  rowRoles.data = [];
  rowRoles.id = id;
  rowRoles.flag = true;
  console.log(id);
};

const submit = () => {
  console.log("id : " + rowRoles.data);
};

// 使用defineExpose暴露inputVal和exposeFun
defineExpose({
  exposeFun
});
</script>

<template>
  <div>
    <vxe-modal
      v-model="rowRoles.flag"
      id="rolesModal"
      width="607"
      height="486"
      min-width="607"
      min-height="486"
      show-zoom
      resize
      storage
      transfer
    >
      <template #title>
        <span style="color: red">权限列表</span>
      </template>
      <template #default>
        <!--  穿梭框    -->
        <el-transfer
          v-model="rowRoles.data"
          :data="rowRoles.options"
          :props="{ key: 'id', label: 'roleName' }"
          :titles="['课程目录', '专业课程']"
        />
        <el-button type="success" @click="submit" style="margin: 3% 45%"
          >保存</el-button
        >
      </template>
    </vxe-modal>
  </div>
</template>
