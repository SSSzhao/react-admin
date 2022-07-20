import { observable, action, makeObservable } from 'mobx'
import type { UserInfo } from '@/api/types/user'
import { getTokenByAuthCode, getUserByToken } from '@/api/user'
import { setToken } from '@/utils/token'

export const TOKEN_NAME = 'AuthorizationToken'

class User {
  constructor () {
    makeObservable(this, {
      userInfo: observable,
      setUserInfo: action.bound,
      getAuthInfo: action.bound,
      getUserByToken: action.bound
    })
  }

  userInfo = {} as UserInfo
  setUserInfo (userInfo = {} as UserInfo) {
    this.userInfo = userInfo
  }

  async getAuthInfo (authCode: string) {
    const { payload: { authorizationToken, user } } = await getTokenByAuthCode(authCode)
    setToken(authorizationToken)
    this.setUserInfo(user)
  }

  async getUserByToken () {
    const { payload } = await getUserByToken()
    this.setUserInfo(payload.user)
  }

  logout () {
    setToken()
    this.setUserInfo()
  }
}

export default new User()
