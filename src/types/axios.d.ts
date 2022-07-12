// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    // 是否隐藏接口成功的消息
    hideMsg?: boolean;
    // 成功的文本
    msgText?: string;
    // 是否有loading效果
    loading?: boolean;
    // loading加载的文本
    loadingText?: string;
    // 是否隐藏逻辑错误提示（比如密码错误）
    hideLogicalMsg?: boolean;
    // 是否隐藏错网页错误（比如网络、服务器内部错误）
    hideWebMsg?: boolean;
  }

  // 重载所有的快捷方法注释，返回的数据不通过热AxiosResponse包装
  export interface AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

    options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}
