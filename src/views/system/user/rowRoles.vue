<script setup lang="ts">
// 打开权限页面
import { reactive } from "vue";
import { storageLocal } from "@pureadmin/utils";
import { getRolesById } from "/@/api/system";
import { setRolesById } from "/@/api/role";

interface Option {
  id: number;
  roleName: string;
  disabled: boolean;
}

const generateData = (): Option[] => {
  return storageLocal.getItem("rolesList");
};

const rowRoles = reactive({
  flag: false, // 是否打開
  optionsRoles: generateData(), // 所有的選項
  id: null,
  data: [] // 已經選擇數據
});

// 子组件暴露的方法
const exposeFun = (id: number) => {
  rowRoles.data = [];
  rowRoles.id = id;
  const role = getRolesById(id);
  role.then((result: number[]) => {
    rowRoles.data = result;
    rowRoles.flag = true;
  });
};

// 使用defineExpose暴露inputVal和exposeFun
defineExpose({
  exposeFun
});

const emit = defineEmits<{ (e: "handleClose", v: number) }>();

// 保存用户权限
const submit = () => {
  setRolesById(rowRoles.id, rowRoles.data).then(() => {
    rowRoles.flag = false;
    // 把id返回给父页面
    emit("handleClose", null);
  });
};
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
          :data="rowRoles.optionsRoles"
          :props="{ key: 'id', label: 'roleName' }"
          :titles="['未授权角色', '已授权角色']"
        />
        <el-button type="success" @click="submit" style="margin: 3% 45%"
          >保存</el-button
        >
      </template>
    </vxe-modal>
  </div>
</template>
