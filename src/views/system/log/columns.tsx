import { ref } from "vue";
import dayjs from "dayjs";

export function logColumns() {
  const columns = ref([
    {
      type: "selection",
      width: 55,
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 70,
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "编号",
      prop: "id"
    },
    {
      label: "登录账号",
      prop: "userName"
    },
    {
      label: "登录IP",
      prop: "ipaddr"
    },
    {
      label: "登录地点",
      prop: "loginLocation"
    },
    {
      label: "操作系统",
      prop: "os"
    },
    {
      label: "状态",
      prop: "status"
    },
    {
      label: "提示消息",
      prop: "msg"
    },
    {
      label: "登录时间",
      width: 180,
      prop: "loginTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ]);

  return {
    columns
  };
}
