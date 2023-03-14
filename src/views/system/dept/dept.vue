<script setup lang="ts">
import { reactive } from "vue";
import { saveDept } from "@/api/dept";
import { cloneDeep } from "lodash-unified";
import { getDeptList } from "@/api/system";
import { getUserPage } from "@/api/user";

const dialog = reactive({
  // 弹出层标题
  title: "新增部门",
  // 是否显示弹出层
  open: false,
  // 加载显示
  loading: false,
  // 表单参数
  form: {},
  // 表单校验
  rules: {
    parentId: [
      { required: true, message: "上级部门不能为空", trigger: "blur" }
    ],
    name: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
    sort: [{ required: true, message: "显示排序不能为空", trigger: "blur" }],
    leaderuserid: [
      { required: true, message: "负责人不能为空", trigger: "blur" }
    ],
    email: [
      {
        required: true,
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur"]
      }
    ],
    phone: [
      {
        required: true,
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
      }
    ]
  },
  // 部门树选项
  deptOptions: [],
  // 用户列表选择
  userOptions: []
});

// 重置表单
const reset = () => {
  dialog.title = "修改";
  dialog.form = {};
  dialog.form["status"] = 0;
  dialog.userOptions = [];
};

// 子组件暴露的方法
const showDept = (row: any) => {
  reset();
  if (row !== null) {
    dialog.form = cloneDeep(row);
    dialog.title = "修改部门";
    dialog.userOptions = [{ id: row.leaderuserid, name: row.leader }];
  }
  getDeptList().then(data => {
    // dialog.deptOptions = handleTree(data as any);
    dialog.deptOptions = data.data;
    dialog.open = true;
  });
};

// 提交表单
const submitForm = () => {
  saveDept(dialog.form).then(res => {
    console.log(res);
    dialog.open = false;
    // 返回给父页面
    emit("onSearch");
  });
};

const emit = defineEmits<{ (e: "onSearch") }>();

const cancel = () => {
  dialog.open = false;
};

const remoteMethod = (query: string) => {
  dialog.userOptions = [];
  if (query) {
    dialog.loading = true;
    getUserPage({ name: query }).then(res => {
      dialog.userOptions = res["records"];
      dialog.loading = false;
    });
  }
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
                  :key="item['id']"
                  :label="item['name']"
                  :value="parseInt(item['id'])"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name">
              <el-input
                v-model="dialog.form['name']"
                placeholder="请输入部门名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="sort">
              <el-input-number
                v-model="dialog.form['sort']"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leaderuserid">
              <el-select
                v-model="dialog.form['leaderuserid']"
                filterable
                remote
                placeholder="请输入负责人"
                :remote-method="remoteMethod"
                :loading="dialog.loading"
              >
                <el-option
                  v-for="item in dialog.userOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="dialog.form['phone']"
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
                v-model="dialog.form['email']"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="dialog.form['remark']"
                placeholder="请输入备注"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="dialog.form['status']" class="ml-4">
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
