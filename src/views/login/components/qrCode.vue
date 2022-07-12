<script setup lang="ts">
import Motion from "../utils/motion";
import { useUserStoreHook } from "/@/store/modules/user";
import { getWechatUrl } from "/@/api/user";
import { reactive } from "vue";

let wechat: {
  url: any;
} = reactive({
  url: "123"
});

getWechatUrl().then(res => {
  wechat.url = res;
});
</script>

<template>
  <Motion class="-mt-2 -mb-2">
    <el-image alt="Scan me!" :src="wechat.url" />
  </Motion>
  <Motion :delay="100">
    <el-divider>
      <p class="text-gray-500 text-xs">扫码后点击"确认"，即可完成登录</p>
    </el-divider>
  </Motion>
  <Motion :delay="150">
    <el-button
      class="w-full mt-4"
      @click="useUserStoreHook().SET_CURRENTPAGE(0)"
    >
      返回
    </el-button>
  </Motion>
</template>
