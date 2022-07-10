<template>
  <div id="userInfo" class="common-layout">
    <el-card>
      <el-container>
        <!--  header的按钮  -->
        <el-header>header</el-header>
        <!--  中间的main  -->
        <el-main>
          <el-table :data="data.user" style="width: 100%">
            <el-table-column prop="name" label="名字" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="roles" label="职位" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="userEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <!--  Footer    -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

let data = reactive<any>({
  user: undefined,
  search: "",
  userAndRole: { roles: "", name: "" }
});

let page = reactive<any>({
  current: 1,
  size: 5,
  total: 0,
  pages: 0
});
</script>
