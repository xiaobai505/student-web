<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FormProps } from "./utils/types";
import { formRules } from "./utils/rule";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: undefined,
    title: "新增",
    deptId: undefined,
    higherDeptOptions: [],
    courseName: "",
    courseTeacher: "",
    timeTable: "",
    isMust: 1,
    stock: 1,
    graduate: 1,
    startTime: undefined,
    endTime: undefined
  })
});
const isMustOptions = [
  {
    value: 0,
    label: "选修"
  },
  {
    value: 1,
    label: "必修"
  }
];

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });

onMounted(async () => {});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="课程名称" prop="courseName">
          <el-input
            v-model="newFormInline.courseName"
            clearable
            placeholder="请输入课程名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="授课时间" prop="timeTable">
          <el-input
            v-model="newFormInline.timeTable"
            clearable
            placeholder="请输入授课时间"
          />
        </el-form-item>
      </re-col>
    </el-row>

    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="隶属专业" prop="deptId">
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
            clearable
            filterable
            placeholder="请选择归属专业/班级"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="必修选修" prop="isMust">
          <el-select
            v-model="newFormInline.isMust"
            :disabled="newFormInline.id !== undefined"
            placeholder="必修/选修"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in isMustOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>

    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="座位数量" prop="stock">
          <el-input
            v-model="newFormInline.stock"
            clearable
            placeholder="请输入授课时间"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="课程学分" prop="graduate">
          <el-input
            v-model="newFormInline.graduate"
            clearable
            placeholder="请输入课程学分"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="newFormInline.startTime" type="date" />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="newFormInline.endTime" type="date" />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="授课老师" prop="courseTeacher">
          <el-input
            v-model="newFormInline.courseTeacher"
            placeholder="请输入授课老师"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
