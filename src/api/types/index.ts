export interface IRequestResult<T = any> {
  // 数据
  payload: T;
  // 操作提示
  msg: string;
  // 状态码 200 表示成功
  status: number;
  // 异常消息
  exception: string;
}

// 分页查询出来的数据
export interface IRequestPageResult<T> extends IRequestResult {
  // 分页数据
  payload: {
    records: T[];
    // 页码（从1开始）
    current: number;
    // 总行数
    total: number;
    // 页大小
    size: number;
    // 总页数
    pages: number;
  };
}

// 获取promise返回的返回值
export type GetPromiseReturn<F extends (...args: any) => Promise<any>> = F extends (
  ...args: any
) => Promise<infer R>
  ? R
  : never;
