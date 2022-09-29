<script setup lang="ts">
import { reactive, ref } from "vue";
import draggable from "vuedraggable/src/vuedraggable";

defineOptions({
  name: "Draggable"
});

const data = reactive({
  addStr: ""
});

let list1 = ref<Array<Object>>([
  { name: "英语雅思", id: 0 },
  { name: "java复习", id: 1 },
  { name: "计算机4级考试", id: 2 }
]);

let list2 = ref<Array<Object>>([
  { name: "滑雪", id: 0 },
  { name: "计算机3级考试", id: 1 },
  { name: "毕业设计", id: 2 },
  { name: "游泳", id: 3 }
]);

let list3 = ref<Array<Object>>([
  { name: "英语4级考试", id: 1 },
  { name: "计算机初级工程师", id: 2 },
  { name: "软件设计初级", id: 3 },
  { name: "教师资格证", id: 4 }
]);

const add = async () => {
  list1.value.push({ name: data.addStr });
};
</script>

<template>
  <div class="row">
    <el-row :gutter="25">
      <el-col :xs="25" :sm="8" :md="8" :lg="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>任务列表</span>
            </div>
          </template>
          <draggable
            id="first"
            data-source="juju"
            :list="list1"
            chosen-class="chosen"
            animation="300"
            force-fallback="true"
            group="a"
            item-key="name"
          >
            <template #item="{ element }">
              <div class="list-group-item item">
                {{ element.name }}
              </div>
            </template>

            <template #footer>
              <el-input v-model="data.addStr" placeholder="Approved by">
                <template #append>
                  <el-button type="primary" @click="add">ADD</el-button>
                </template>
              </el-input>
            </template>
          </draggable>
        </el-card>
      </el-col>
      <el-col :xs="25" :sm="8" :md="8" :lg="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>进行中</span>
            </div>
          </template>
          <draggable
            id="first"
            data-source="juju"
            :list="list2"
            class="list-group"
            group="a"
            item-key="name"
          >
            <template #item="{ element }">
              <div class="list-group-item item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </el-card>
      </el-col>
      <el-col :xs="25" :sm="8" :md="8" :lg="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>已经完成</span>
            </div>
          </template>
          <draggable :list="list3" class="list-group" group="a" item-key="name">
            <template #item="{ element }">
              <div class="list-group-item item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
/* grid列表拖拽 */
.grid-container {
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 33.3% 33.3% 33.3%;
}

.item-single {
  font-size: 1.5em;
  height: 77px;
  text-align: center;
  line-height: 85px;
  border: 1px solid #e5e4e9;
  cursor: move;
}

.item-cut {
  font-size: 1.5em;
  height: 77px;
  line-height: 77px;
  text-align: center;
  border: 1px solid #e5e4e9;
  cursor: move;
}

.item {
  font-size: 2em;
  text-align: center;
  line-height: 100px;
  border: 1px solid #e5e4e9;
  cursor: move;
  @media screen and (max-width: 750px) {
    line-height: 90px;
  }
}

.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
}

.item-9 {
  background-color: #4dc7ec;
}

.chosen {
  border: solid 2px #3089dc !important;
}
</style>
