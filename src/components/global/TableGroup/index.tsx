import { useState, PropsWithChildren, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { PaginationProps } from 'antd'
import type { typeQueryByPageFn, typeQueryByFn } from '@/utils/request'

type PropsType = PropsWithChildren & {
  api: typeQueryByPageFn | typeQueryByFn,
  columns: ColumnsType<any>,
  rowKey?: string
}

const TableGroup = (props: PropsType, ref: any) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const columns = props.columns.map(i => Object.assign({ align: 'center' }, i))

  // 暴露方法
  useImperativeHandle(ref, () => ({ loadData }))

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: [10, 20, 50, 100],
    showQuickJumper: true,
    showSizeChanger: true,
    onChange (page: number, pageSize: number) {
      setPagination({
        ...pagination,
        current: page,
        pageSize
      })
    }
  })

  const loadData = async (values?: Record<string, any>) => {
    setLoading(true)
    const { payload } = await props.api(values || {}, pagination.current, pagination.pageSize)
    const records = payload.records
    pagination.total = payload.total
    setPagination({
      ...pagination,
      total: payload.total
    })
    setData(records)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [pagination.current, pagination.pageSize])

  return (
    <Table rowKey={props.rowKey || 'id'} loading={loading} columns={columns} dataSource={data} pagination={pagination} />
  )
}

export default forwardRef(TableGroup)
