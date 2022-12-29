import request, { baseQueryByPage } from '@/utils/request'
import type { IRequestResult } from './types'
import type { MerchantInfo, SubMerchantInfo } from './types/merchant'
import type { LoginParams, UserInfo } from '@/api/types/user'
import type { AuthInfo, RoleInfo } from './types/role'

// 根据授权码获取Token
export function getTokenByAuthCode (authCode: string): Promise<IRequestResult<LoginParams>> {
  return request.post('/admin/login/createTokenByAuthCode', { authCode }, { loading: true })
}

// 根据Token查询用户信息
export function getUserByToken (): Promise<IRequestResult<LoginParams>> {
  // isPlatformAdmin 是平台管理员 1是 空或者其他都不是
  return request.get('/admin/user/getCurrentUser', { hideMsg: true })
}

// 根据工号登录
export function jobIdLogin (data: {
  jobId: UserInfo['jobId'];
  password: UserInfo['password'];
}): Promise<IRequestResult<{ authCode: string }>> {
  return request.post('/client/login/jobIdLogin', { ...data, platformAppId: '0j5v9336' }, { loading: true, hideMsg: true })
}

// 获取用户权限列表
export function getUserAuth (): Promise<IRequestResult<AuthInfo[]>> {
  return request.get('/admin/userPermissions/getTreeByCurrentUser', { hideMsg: true })
}

// 分页查询用户信息
export const getUserPageList = baseQueryByPage<
  Partial<
    {
      merchantId: MerchantInfo['id'];
      subMerchantId: SubMerchantInfo['id'];
    } & Pick<
      UserInfo,
      'jobId' | 'nickname' | 'tel' | 'cityCode' | 'cityName' | 'countyCode' | 'countyName'
    >
  >,
  UserInfo
>('/admin/user/pageList')

// 保存用户信息
export function saveUser (data: UserInfo): Promise<IRequestResult> {
  return request.post('/admin/user/save', data)
}

// 更新用户状态(现有状态取反)
export function updateUserStatus (userId: UserInfo['id']): Promise<IRequestResult> {
  return request.post('/admin/user/updateStatus', { userId })
}

// 删除用户信息
export function deleteUser (userIdSet: UserInfo['id'][]): Promise<IRequestResult> {
  return request.post('/admin/user/deleteByIds', { userIdSet })
}
