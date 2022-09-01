<script setup lang="ts">
import { reactive } from "vue";
import { getDeptList } from "/@/api/dept";
import { cloneDeep } from "lodash-unified";

const dialog = reactive({
  // 弹出层标题
  title: "新增部门",
  // 是否显示弹出层
  open: false,
  // 表单参数
  form: {
    parentId: 0
  },
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
  },
  // 部门树选项
  deptOptions: [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1"
            }
          ]
        }
      ]
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1"
            }
          ]
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1"
            }
          ]
        }
      ]
    },
    {
      value: "3",
      label: "Level one 3",
      children: [
        {
          value: "3-1",
          label: "Level two 3-1",
          children: [
            {
              value: "3-1-1",
              label: "Level three 3-1-1"
            }
          ]
        },
        {
          value: "3-2",
          label: "Level two 3-2",
          children: [
            {
              value: "3-2-1",
              label: "Level three 3-2-1"
            }
          ]
        }
      ]
    }
  ]
});

// 子组件暴露的方法
const showDept = (row: any) => {
  dialog.form = cloneDeep(row);
  if (row.id == null) {
    dialog.title = "新增部门";
  }
  getDeptList().then(data => {
    // dialog.deptOptions = handleTree(data as any);
    dialog.deptOptions = data;
    dialog.open = true;
  });
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
  dialog.form = { parentId: 0 };
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
      <el-form
        ref="form"
        :model="dialog.form"
        :rules="dialog.rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24" v-if="dialog.form.parentId !== 0">
            <el-form-item label="上级部门" prop="parentId">
              <el-select v-model="dialog.form.parentId" class="m-2">
                <el-option
                  v-for="item in dialog.deptOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="parseInt(item.id)"
                />
              </el-select>
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
                <el-radio :label="0" size="small">开启</el-radio>
                <el-radio :label="1" size="small">关闭</el-radio>
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
