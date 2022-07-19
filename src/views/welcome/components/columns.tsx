import { IconifyIconOffline } from "/@/components/ReIcon";
import { getUser } from "/@/api/user";
import { reactive } from "vue";

export function useColumns() {
  const lists = [
    { type: "", label: "学霸" },
    { type: "success", label: "三好学生" },
    { type: "info", label: "文艺委员" },
    { type: "danger", label: "学生会主席" },
    { type: "warning", label: "国家奖学金" }
  ];

  const data: {
    user: {
      name: string;
      phone: number;
    };
  } = reactive({
    user: {
      name: "asd",
      phone: null
    }
  });

  getUser().then(data => {
    data["user"] = data;
  });

  const columnsA = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="user" />
          </el-icon>
          姓名
        </div>
      ),
      value: data.user.name
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="iphone" />
          </el-icon>
          手机号
        </div>
      ),
      value: data.user.phone
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="location" />
          </el-icon>
          居住地
        </div>
      ),
      value: "上海"
    }
  ];

  const columnsB = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="tickets" />
          </el-icon>
          标签
        </div>
      ),
      cellRenderer: () => {
        return lists.map(v => {
          return (
            <el-tag class="mr-10px" type={v.type} size="small" effect="dark">
              {v.label}
            </el-tag>
          );
        });
      }
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="office-building" />
          </el-icon>
          联系地址
        </div>
      ),
      value: "上海市徐汇区"
    }
  ];

  const columnsC = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="notebook" />
          </el-icon>
          好好学习，天天向上
        </div>
      ),
      value: "上海市徐汇区"
    }
  ];

  return {
    columnsA,
    columnsB,
    columnsC
  };
}
