// 商户信息
export interface MerchantInfo {
  // 客户端自动注册（适用于手机号码和微信登录）0否1是
  clientAutoRegister: 0 | 1;
  // 创建时间
  createTime: string;
  // 开启用户群体区分 0否 1是 未开启时，扫描任务码后产生的用户将进入普通用户群体，否则将进入客户用户群体
  enabledDistinguishUser: 0 | 1;
  // 开启工号登录 0否1是
  enabledJobIdLogin: 0 | 1;
  // 开启手机号码登录 0否1是
  enabledTelLogin: 0 | 1;
  // 开启微信登录 0否1是
  enabledWechatLogin: 0 | 1;
  // 商户ID
  id: number;
  // 商户名称
  name: string;
  // 合伙人平台AppId
  platformAppId: string;
  // 合伙人平台密钥
  platformAppSecret: string;
  // 状态 0禁用1启用
  status: 0 | 1;
  // 更新时间
  updateTime: string;
  // 微信第三放平台授权信息ID
  wechatComponentAuthId: number | null;
  // 微信登录授权方式 0静默 1非静默
  wechatLoginScope: 0 | 1;
}

// 第三方平台授权列表信息
export interface MerchantAuthInfo {
  id: number;
  // 名称
  name: number;
  // 第三方平台appId
  comAppId: number;
  // 授权方appid
  authorizerAppId: number;
  // 授权时间
  authTime: number;
}
