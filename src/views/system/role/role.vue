<script setup lang="ts">
import { reactive } from "vue";
import { cloneDeep } from "lodash-unified";
import { saveRole, updateRole } from "@/api/role";

const dialog = reactive({
  // 弹出层标题
  title: "新增角色",
  // 是否显示弹出层
  open: false,
  // 加载显示
  loading: false,
  // 表单参数
  form: {},
  // 表单校验
  rules: {
    roleName: [
      { required: true, message: "角色名称不能为空", trigger: "blur" }
    ],
    roleCode: [
      { required: true, message: "权限字符不能为空", trigger: "blur" }
    ],
    roleSort: [{ required: true, message: "角色顺序不能为空", trigger: "blur" }]
  }
});

// 重置表单
const reset = () => {
  dialog.title = "修改";
  dialog.form = {};
  dialog.form["status"] = 0;
};

// 子组件暴露的方法
const showRole = (row: any) => {
  reset();
  if (row !== null) {
    dialog.form = cloneDeep(row);
    dialog.title = "修改角色";
  }
  dialog.open = true;
};

// 使用defineExpose暴露showRole
defineExpose({
  showRole
});

// 取消
const cancel = () => {
  dialog.open = false;
};

const emit = defineEmits<{ (e: "onSearch") }>();

// 提交表单
const submitForm = async () => {
  if (dialog.form["id"] == null) {
    await saveRole(dialog.form);
  } else {
    await updateRole(dialog.form);
  }
  dialog.open = false;
  // 返回给父页面
  emit("onSearch");
};
</script>

<template>
  <div>
    <el-dialog
      :title="dialog.title"
      v-model="dialog.open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="dialog.form"
        :rules="dialog.rules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="dialog.form.roleName"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleCode">
          <el-input
            v-model="dialog.form.roleCode"
            placeholder="请输入权限字符"
          />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number
            v-model="dialog.form.roleSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="dialog.form['status']" class="ml-4">
            <el-radio :label="1" size="small">开启</el-radio>
            <el-radio :label="0" size="small">关闭</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="dialog.form['remark']"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>

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
