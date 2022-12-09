// 角色信息
export interface RoleInfo {
  id: number;
  merchantId: number;
  name: string;
  roleType: number;
  createTime: string;
  updateTime: string;
}

// 菜单信息
export enum AuthTypeEnum {
  // 0菜单 1按钮 2接口
  MENU = 0,
  BUTTON = 1,
  INTERFACE = 2
}
export interface AuthInfo {
  code: string;
  name: string;
  parentCode: string;
  type: AuthTypeEnum;
  url: string;
  children: AuthInfo[];
  updateTime: string;
  createTime: string;
}
