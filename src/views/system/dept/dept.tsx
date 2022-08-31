/**
 * Dept对象，部门表
 */
export interface Dept {
  /**
   * 祖级列表
   */
  ancestors?: string;
  /**
   * 创建人标识
   */
  createBy?: string;
  /**
   * 创建人姓名
   */
  createByName?: string;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 删除标记（0：正常，1：删除）
   */
  delFlag?: number;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * id主键
   */
  id?: number;
  /**
   * 1 公司 2 分公司 3 部门
   */
  leaderuserid?: number;
  /**
   * 公司名字
   */
  name?: string;
  /**
   * 父id
   */
  parentId?: number;
  /**
   * 联系方式
   */
  phone?: string;
  /**
   * 理由
   */
  remark?: string;
  /**
   * 排序字段
   */
  sort?: string;
  /**
   * 部门状态（0正常 1停用）
   */
  status?: number;
  /**
   * 最后修改人标识
   */
  updateBy?: string;
  /**
   * 最后修改人姓名
   */
  updateByName?: string;
  /**
   * 最后修改时间
   */
  updateTime?: Date;
}
