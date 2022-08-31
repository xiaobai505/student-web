<script setup lang="ts">
import { reactive } from "vue";

const dialog = reactive({
  // 弹出层标题
  title: "修改",
  // 是否显示弹出层
  open: false,
  // 表单参数
  form: {},
  // 表单校验
  rules: {
    parentId: [
      { required: true, message: "上级部门不能为空", trigger: "blur" }
    ],
    name: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
    sort: [{ required: true, message: "显示排序不能为空", trigger: "blur" }],
    email: [
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"]
      }
    ],
    phone: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
      }
    ]
  }
});

// 子组件暴露的方法
const showDept = (row: any) => {
  dialog.form = row;
  if (row.id == null) {
    dialog.title = "新增";
  }
  dialog.open = true;
  console.log(dialog);
};

const submitForm = () => {
  console.log("submitForm!");
};

const cancel = () => {
  reset();
  dialog.open = false;
};

const reset = () => {
  dialog.title = "修改";
  dialog.form = {};
};

// 使用defineExpose暴露inputVal和exposeFun
defineExpose({
  showDept
});
</script>

<template>
  <div>
    <el-dialog
      :title="dialog.title"
      v-model="dialog.open"
      width="600px"
      append-to-body
    >
      {{ dialog.form }}
      <el-form
        ref="form"
        :model="dialog.form"
        :rules="dialog.rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24" v-if="dialog.form.parentId !== 0">
            <el-form-item label="上级部门" prop="parentId">
              <!--              <treeselect-->
              <!--                v-model="dialog.form.parentId"-->
              <!--                :options="deptOptions"-->
              <!--                :normalizer="normalizer"-->
              <!--                placeholder="选择上级部门"-->
              <!--              />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name">
              <el-input
                v-model="dialog.form.name"
                placeholder="请输入部门名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="sort">
              <el-input-number
                v-model="dialog.form.sort"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input
                v-model="dialog.form.leader"
                placeholder="请输入负责人"
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="dialog.form.phone"
                placeholder="请输入联系电话"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="dialog.form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="dialog.form.status" class="ml-4">
                <el-radio label="1" size="small">开启</el-radio>
                <el-radio label="2" size="small">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
