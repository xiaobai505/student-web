<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { resetPwd } from "@/api/user";

const equalToPassword = (rule, value, callback) => {
  if (data.user.newPassword !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else if (data.user.oldPassword == value) {
    callback(new Error("旧密码不能新密码一样！"));
  } else {
    callback();
  }
};

const data = reactive({
  user: {
    oldPassword: undefined,
    newPassword: undefined,
    confirmPassword: undefined
  },
  rules: {
    oldPassword: [
      { required: true, message: "旧密码不能为空", trigger: "blur" }
    ],
    newPassword: [
      { required: true, message: "新密码不能为空", trigger: "blur" },
      { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
    ],
    confirmPassword: [
      { required: true, message: "确认密码不能为空", trigger: "blur" },
      { required: true, validator: equalToPassword, trigger: "blur" }
    ]
  }
});
const ruleFormRef = ref<FormInstance>();

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      resetPwd(data.user).then(res => {
        if (res) {
          window.location.reload();
          ElMessage.success("重置密码成功.");
        } else {
          ElMessage.error("重置密码失败，请校验旧密码是否正确.");
        }
      });
    } else {
      console.log(fields);
    }
  });
};
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="data.user"
      :rules="data.rules"
      label-width="80px"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="data.user.oldPassword"
          placeholder="请输入旧密码"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="data.user.newPassword"
          placeholder="请输入新密码"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="data.user.confirmPassword"
          placeholder="请确认新密码"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submit(ruleFormRef)"
          >保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
