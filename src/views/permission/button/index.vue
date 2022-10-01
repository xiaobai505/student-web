<script setup lang="ts">
import { ref } from "vue";
import type { StorageConfigs } from "/#/index";
import { storageSession } from "@pureadmin/utils";

defineOptions({
  name: "PermissionButton"
});

const auth = ref(
  storageSession.getItem<StorageConfigs>("info").username || "admin"
);

function changRole(value) {
  storageSession.setItem("info", {
    username: value,
    accessToken: `eyJhbGciOiJIUzUxMiJ9.${value}`
  });
  window.location.reload();
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-radio-group v-model="auth" @change="changRole">
          <el-radio-button label="admin" />
          <el-radio-button label="test" />
        </el-radio-group>
      </div>
    </template>
    <p v-auth="'ROLE_ADMIN'">只有 admin 可看</p>
    <p v-auth="'ROLE_STUDENT'">只有 student 可看</p>
  </el-card>
</template>
