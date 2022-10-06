<script setup lang="ts">
import UserInfo from "/@/views/welcome/profile/userInfo.vue";
import ResetPwd from "/@/views/welcome/profile/resetPwd.vue";
import { reactive } from "vue";
const data = reactive({
  activeTab: "userinfo"
});
</script>

<template>
  <el-row>
    <el-col :span="18" :xs="24">
      <el-card>
        <template #header>
          <span>基本资料</span>
        </template>
        <el-tabs v-model="data.activeTab">
          <el-tab-pane label="基本资料" name="userinfo">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="resetPwd">
            <reset-pwd />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>
