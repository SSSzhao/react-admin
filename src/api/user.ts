import request from '@/utils/request'
import type { IRequestResult } from './types'
import type { MerchantInfo } from './types/merchant'
import type { LoginParams, UserInfo } from '@/api/types/user'

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
