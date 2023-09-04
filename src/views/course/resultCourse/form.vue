<script setup lang="ts">
import { FormProps } from "./utils/types";
import { formRules } from "./utils/rule.ts";
import ReCol from "@/components/ReCol";
import { ref } from "vue";
import { usePublicHooks } from "@/views/system/hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: undefined,
    courseName: undefined,
    result: undefined,
    isReset: undefined
  })
});
const newFormInline = ref(props.formInline);
const { switchStyle } = usePublicHooks();
const ruleFormRef = ref();

function getRef() {
  return ruleFormRef.value;
}
defineExpose({ getRef });
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="newFormInline"
      :rules="formRules"
      label-width="82px"
    >
      <el-row :gutter="30">
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="课程编码" prop="id">
            <el-input disabled v-model="newFormInline.id" />
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="课程名" prop="courseName">
            <el-input disabled v-model="newFormInline.courseName" />
          </el-form-item>
        </re-col>

        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="成绩" prop="result">
            <el-input
              v-model="newFormInline.result"
              clearable
              placeholder="请输入部门名称"
            />
          </el-form-item>
        </re-col>
        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="补考标记" prop="isReset">
            <el-switch
              v-model="newFormInline.isReset"
              inline-prompt
              :active-value="1"
              :inactive-value="0"
              active-text="未补考"
              inactive-text="补考"
              :style="switchStyle"
            />
          </el-form-item>
        </re-col>
      </el-row>
    </el-form>
  </div>
</template>
