<script setup lang="ts">
import { reactive, ref } from "vue";
import { getUser, updateUser } from "/@/api/user";
import { ElMessage, FormInstance } from "element-plus";

const data = reactive({
  user: {},
  rules: {
    nickName: [
      { required: true, message: "用户昵称不能为空", trigger: "blur" }
    ],
    email: [
      { required: true, message: "邮箱地址不能为空", trigger: "blur" },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"]
      }
    ],
    phone: [
      { required: true, message: "手机号码不能为空", trigger: "blur" },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
      }
    ]
  }
});

const ruleFormRef = ref<FormInstance>();

// 获取当前用户
getUser().then(res => {
  data.user = res;
});

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateUser([data.user]).then(() => {
        ElMessage.success({ message: "保存成功." });
        window.location.reload();
      });
    } else {
      ElMessage.success({ message: "保存成功." + fields });
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
      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="data.user.nickName" maxlength="30" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="data.user.phone" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="data.user.email" maxlength="50" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="data.user.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit(ruleFormRef)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
