import ArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line";
import CloseCircleLine from "@iconify-icons/ri/close-circle-line";

export function useColumns() {
  const failColumns = [
    {
      cellRenderer: () => {
        return (
          <div class="w-full">
            <div class="flex items-center">
              <iconify-icon-offline
                icon={CloseCircleLine}
                width="18px"
                height="18px"
              />
              <span class="ml-1 mr-4">您的账户已被冻结</span>
              <a
                href="javascript:void(0);"
                class="flex items-center"
                style="color: var(--el-color-primary)"
              >
                立即解冻
                <iconify-icon-offline
                  icon={ArrowRightSLine}
                  color="var(--el-color-primary)"
                  width="18px"
                  height="18px"
                />
              </a>
            </div>
            <br />
            <div class="flex items-center">
              <iconify-icon-offline
                icon={CloseCircleLine}
                width="18px"
                height="18px"
              />
              <span class="ml-1 mr-4">您的账户还不具备申请资格</span>
              <a
                href="javascript:void(0);"
                class="flex items-center"
                style="color: var(--el-color-primary)"
              >
                立即升级
                <iconify-icon-offline
                  icon={ArrowRightSLine}
                  color="var(--el-color-primary)"
                  width="18px"
                  height="18px"
                />
              </a>
            </div>
          </div>
        );
      }
    }
  ];
  const columns = [
    { field: "id", title: "id" },
    {
      field: "studentName",
      title: "学生名"
    },
    {
      field: "courseName",
      title: "课程名"
    },
    {
      field: "result",
      title: "考试分数",
      editRender: {},
      slots: { default: "result_default", edit: "result_edit" }
    },
    {
      field: "isReset",
      title: "补考标记",
      editRender: {},
      slots: { default: "isReset_default", edit: "isReset_edit" }
    },
    {
      field: "graduate",
      title: "学分"
    },
    {
      field: "endTime",
      title: "考试时间"
    },
    {
      title: "操作",
      width: "200",
      slots: { default: "operate" }
    }
  ];

  return {
    failColumns,
    columns
  };
}
