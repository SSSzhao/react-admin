import type { IRequestResult, IRequestPageResult } from '@/api/types'
import router from '@/router'
import axios from 'axios'
import { TOKEN_NAME, getToken } from '@/utils/token'
import { message } from 'antd'

const request = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  baseURL: process.env.REACT_APP_BASE_URL
})

let loading: ReturnType<typeof message['loading']> | null = null

export function requestLoading () {
  return message.loading('加载中...', 0)
}

request.interceptors.request.use(config => {
  if (config.headers) {
    config.headers[TOKEN_NAME] = getToken()
    if (config.loading && !loading) {
      loading = requestLoading()
    }
  }
  return config
})

request.interceptors.response.use(
  async response => {
    const config = response.config
    if (loading) {
      loading()
    }
    const res = response.data as IRequestResult
    if (res.status === 200) {
      if (!config.hideMsg && res.msg) {
        message.success(config.msgText || res.msg)
      }
      return res
    } else {
      if (res.status === 401) {
        message.error(res.msg || '登录已过期')
        // console.log(location.href)
        // router.replace(loginUrl)
        // const userStore = useUserStore()
        // userStore.logout()
        return Promise.reject(res.msg)
      }
      // 失败

      if (!config.hideLogicalMsg) {
        message.error(res.msg)
      }
      return Promise.reject(res.msg)
    }
  },
  err => {
    if (loading) {
      loading()
    }
    return Promise.reject(err)
  }
)

export default request

export function baseQueryByPage<S = Record<string, string>, T = any, R = IRequestPageResult<T>> (
  url: string,
  paramHandler?: (search: S) => Record<string, any>,
  resultHandler?: (result: R) => void
) {
  return function (searchObj: S, current = 1, size = 10): Promise<R> {
    if (paramHandler) {
      searchObj = paramHandler(searchObj) as S
    }
    return request
      .post<R>(
        url,
        {
          ...searchObj,
          current,
          size
        },
        {
          // 隐藏默认的成功消息
          hideMsg: true
        }
      )
      .then(res => {
        if (resultHandler) {
          resultHandler(res)
        }
        return res
      })
  }
}

// 导出基本分页查询函数的类型
export type typeQueryByPageFn = (
  searchObj: Record<string, any>,
  current: number,
  size: number
) => Promise<IRequestPageResult<any>>;

// 导出基本查询函数的类型
export type typeQueryByFn = (searchObj: Record<string, any>) => Promise<IRequestResult<any>>;
