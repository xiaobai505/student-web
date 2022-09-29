import { IconifyIconOffline } from "/@/components/ReIcon";

export function useColumns() {
  const lists = [
    { type: "", label: "学霸" },
    { type: "success", label: "三好学生" },
    { type: "info", label: "文艺委员" },
    { type: "danger", label: "学生会主席" },
    { type: "warning", label: "国家奖学金" }
  ];

  const columnsA = [
    {
      prop: "name",
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="user" />
          </el-icon>
          用户名
        </div>
      )
    },
    {
      prop: "phone",
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="iphone" />
          </el-icon>
          手机号
        </div>
      )
    },
    {
      prop: "address",
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="location" />
          </el-icon>
          居住地
        </div>
      )
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
            <el-tag class="mr-[10px]" type={v.type} size="small" effect="dark">
              {v.label}
            </el-tag>
          );
        });
      }
    },
    {
      prop: "email",
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="office-building" />
          </el-icon>
          电子邮箱
        </div>
      )
    }
  ];

  const columnsC = [
    {
      prop: "deptName",
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <IconifyIconOffline icon="notebook" />
          </el-icon>
          所属学校（部门）信息
        </div>
      )
    }
  ];

  return {
    columnsA,
    columnsB,
    columnsC
  };
}
