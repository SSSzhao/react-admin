import { observable, action, makeObservable } from 'mobx'
import type { UserInfo } from '@/api/types/user'
import { getTokenByAuthCode, getUserByToken, getUserAuth } from '@/api/user'
import type { AuthInfo } from '@/api/types/role'
import { setToken } from '@/utils/token'

export const TOKEN_NAME = 'AuthorizationToken'

class User {
  constructor () {
    makeObservable(this, {
      userInfo: observable,
      authList: observable,
      setUserInfo: action.bound,
      getAuthInfo: action.bound,
      getUserByToken: action.bound,
      getUserAuthList: action.bound
    })
  }

  userInfo = {} as UserInfo
  authList = [] as AuthInfo[]

  setUserInfo (userInfo = {} as UserInfo) {
    this.userInfo = userInfo
  }

  async getAuthInfo (authCode: string) {
    const { payload: { authorizationToken, user } } = await getTokenByAuthCode(authCode)
    setToken(authorizationToken)
    this.setUserInfo(user)
  }

  async getUserByToken () {
    // await new Promise(resolve => setTimeout(resolve, 50000))
    const { payload } = await getUserByToken()
    this.setUserInfo(payload.user)
  }

  // 获取用户权限列表
  async getUserAuthList () {
    const { payload } = await getUserAuth()
    this.authList = payload || []
  }

  logout () {
    setToken()
    this.setUserInfo()
  }
}

export default new User()
