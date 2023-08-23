<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getRoleList, getRolesById } from "@/api/role";
import { storageSession } from "@pureadmin/utils";
import { FormProps } from "@/views/system/user/utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: undefined,
    name: undefined,
    ids: [] // 已經選擇數據
  })
});

const newFormInline = ref(props.formInline);
const rowRoles = reactive({
  optionsRoles: [] // 所有的選項
});

async function generateData() {
  const newVar = storageSession().getItem<[]>("allRoles");
  if (newVar === null) {
    await getRoleList().then(res => {
      rowRoles.optionsRoles = res["data"];
      storageSession().setItem("allRoles", res["data"]);
    });
  } else {
    rowRoles.optionsRoles = newVar;
  }

  await getRolesById(Number(newFormInline.value.id)).then(res => {
    newFormInline.value.ids = res["data"];
  });
}

onMounted(() => {
  generateData();
});
</script>

<template>
  <div class="main">
    <!--  穿梭框    -->
    <el-transfer
      v-model="newFormInline.ids"
      :data="rowRoles.optionsRoles"
      :props="{ key: 'id', label: 'roleName' }"
      :titles="['未授权角色', '已授权角色']"
    />
  </div>
</template>
