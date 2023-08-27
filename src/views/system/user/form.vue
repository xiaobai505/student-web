<script setup lang="ts">
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import ReCol from "@/components/ReCol";
import { ref } from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  FormItemProps: () => ({
    id: 0,
    higherDeptOptions: [],
    deptId: undefined,
    username: "",
    name: "",
    sex: "",
    phone: "",
    email: "",
    status: 1,
    remark: ""
  })
});
const ruleFormRef = ref();
const newFormInline = ref(props.FormItemProps);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <div class="main">
    <el-form
      ref="ruleFormRef"
      :model="newFormInline"
      :rules="formRules"
      label-width="82px"
    >
      <el-row :gutter="30">
        <re-col>
          <el-form-item label="所属部门" prop="deptId">
            <el-cascader
              class="w-full"
              v-model="newFormInline.deptId"
              :options="newFormInline.higherDeptOptions"
              :props="{
                value: 'id',
                label: 'name',
                emitPath: false,
                checkStrictly: true
              }"
              placeholder="请选择部门"
            >
              <template #default="{ node, data }">
                <span>{{ data.name }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="newFormInline.username"
              clearable
              placeholder="请输入用户名"
            />
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="名字" prop="name">
            <el-input
              v-model="newFormInline.name"
              clearable
              placeholder="请输入名字"
            />
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="newFormInline.phone"
              clearable
              placeholder="请输入手机号"
            />
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="newFormInline.email"
              clearable
              placeholder="请输入邮箱"
            />
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="newFormInline.sex">
              <el-option label="男" :value="0" />
              <el-option label="女" :value="1" />
            </el-select>
          </el-form-item>
        </re-col>
      </el-row>
    </el-form>
  </div>
</template>
