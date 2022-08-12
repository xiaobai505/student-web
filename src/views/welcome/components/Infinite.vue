<script setup lang="ts">
import { ref, reactive } from "vue";
import { templateRef } from "@vueuse/core";
import SeamlessScroll from "/@/components/ReSeamlessScroll";

const scroll = templateRef<ElRef | null>("scroll", null);

let listData = ref([
  {
    date: "2022-07-25",
    name: "北京邮电大学在贵州省长顺县举办“基于新一代的信息技术下的课堂教学模式”专题培训",
    star: "1000"
  },
  {
    date: "2022-07-17",
    name: "网络教育学院（继续教育学院）成功举办 中国留学服务中心/北京邮电大学 出国留学培训项目/英国高等教育文凭项目推介会",
    star: "1100"
  },
  {
    date: "2022-07-17",
    name: "网络教育学院（继续教育学院）举行 “贵州省长顺县教师有效课堂教学评估”专题培训开班仪式",
    star: "1200"
  },
  {
    date: "2022-06-27",
    name: "网络教育学院（继续教育学院）举行 中国留学服务中心/北京邮电大学出国留学项目 2022届学生毕业典礼",
    star: "1300"
  },
  {
    date: "2022-04-27",
    name: "网络教育学院（继续教育学院）参加2022中国留学教育论坛 亮相中国国际教育巡回展",
    star: "1400"
  },
  {
    date: "2022-04-27",
    name: "网络教育学院（继续教育学院）圆满完成2022年上半年自学考试网络答辩工作",
    star: "1500"
  },
  {
    date: "2022-04-09",
    name: "北京邮电大学2022年教育技术研究所硕士生招生调剂复试结果公示",
    star: "1600"
  },
  {
    date: "2022-04-07",
    name: "北京邮电大学2022年教育技术研究所硕士生招生调剂复试名单（一）",
    star: "1700"
  },
  {
    date: "2022-03-31",
    name: "北京邮电大学网络教育学院（教育技术研究所）2022年硕士研究生招生缺额信息公布",
    star: "1800"
  },
  {
    date: "2022-03-30",
    name: "网络教育学院一行到访国际学院交流调研",
    star: "1900"
  }
]);

let classOption = reactive({
  direction: "top"
});
</script>

<template>
  <div class="infinite bg-[#fafafa] dark:bg-dark">
    <ul class="top">
      <li>发布日期</li>
      <li>学校新闻</li>
      <li>阅读次数</li>
    </ul>
    <SeamlessScroll
      ref="scroll"
      :data="listData"
      :class-option="classOption"
      class="warp"
    >
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span v-text="item.date" />
          <span v-text="item.name" />
          <span v-text="item.star" />
        </li>
      </ul>
    </SeamlessScroll>
  </div>
</template>

<style lang="scss" scoped>
.infinite {
  .top {
    width: 95%;
    height: 40px;
    line-height: 40px;
    display: flex;
    margin: 0 auto;
    font-size: 14px;
    color: #909399;
    font-weight: 400;
    // background: #fafafa;

    li {
      width: 34%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .warp {
    width: 95%;
    height: 215px;
    margin: 0 auto;
    overflow: hidden;

    li {
      height: 30px;
      line-height: 30px;
      display: flex;
      font-size: 15px;
    }

    span {
      width: 34%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
