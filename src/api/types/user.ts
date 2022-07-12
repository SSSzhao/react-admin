import type { MerchantInfo } from './merchant'

// 用户基本信息
export interface UserInfo {
  // 头像地址
  avatarImgUrl: string;
  // 用户ID
  id: string;
  // 所属群体 0合伙人 1客户群体
  userGroup: 0 | 1;
  // 工号
  jobId: string;
  // 所属商户ID
  merchantId: number;
  // 所在商户名称
  merchantName: number;
  // 昵称
  nickname: string;
  // 密码
  password?: string;
  // 注册时间
  registerTime: string;
  // 状态 0禁用1启用
  status: 0 | 1;
  // 手机号码
  tel: string;
}

// 登录返回信息
export interface LoginParams {
  authorizationToken: string;
  // 是平台管理员 1是 空或者其他都不是
  isPlatformAdmin: 1 | 0;
  merchant: MerchantInfo;
  user: UserInfo;
}
