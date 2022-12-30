import request, { baseQueryByPage } from '@/utils/request'
import type { IRequestResult } from './types'
import type { MerchantInfo, SubMerchantInfo, MerchantAuthInfo } from './types/merchant'

export function getMerchantByPlatformAppId (
  platformAppId: MerchantInfo['platformAppId']
): Promise<IRequestResult<MerchantInfo>> {
  return request.post(
    '/open/innerPublic/getMerchantByPlatformAppId',
    { platformAppId },
    { hideMsg: true }
  )
}

// 分页查询商户信息
export const getMerchantPageList = baseQueryByPage<
  {
    name?: string;
    platformAppId?: string;
  },
  MerchantInfo
>('/admin/merchant/pageList')

// 保存商户信息
export function saveMerchant (data: MerchantInfo): Promise<IRequestResult> {
  return request.post('/admin/merchant/save', data)
}

// 保存子商户信息
export function saveSubMerchant (data: SubMerchantInfo): Promise<IRequestResult> {
  return request.post('/admin/subMerchant/save', data)
}

// 更新商户状态(现有状态取反)
export function updateMerchantStatus (id: MerchantInfo['id']): Promise<IRequestResult> {
  return request.post('/admin/merchant/updateStatus', { id })
}

// 获取第三方平台授权列表
export const getAuthPageList = baseQueryByPage<
  {
    name?: string;
  },
  MerchantAuthInfo
>('/admin/wechatComponent/getAuthPageList')

// 获取第三方平台账号列表
export function getWechatComponentList (): Promise<
  IRequestResult<
    Array<{
      // 服务号ID
      appId: string;
      // 第三方平台名称
      name: string;
    }>
  >
  > {
  return request.get('/admin/wechatComponent/list', { hideMsg: true })
}

// 获取第三方公众号授权二维码
export function getAuthQRCode (data: { appId: string; name: string }): Promise<
  IRequestResult<{
    base64QRCode: string;
    key: string;
  }>
> {
  return request.post('/admin/wechatComponent/getAuthQRCode', data)
}

// 获取商户专属的平台入口
export function getPlatformEntrance (platformAppId: MerchantInfo['platformAppId']): Promise<
  IRequestResult<{
    // 管理端链接
    adminUrl: string;
    // 用户端二维码
    clientBase64QRCode: string;
  }>
> {
  return request.post('/admin/merchant/getPlatformEntrance', { platformAppId }, { hideMsg: true })
}
