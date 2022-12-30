import { PropsWithChildren, useState, useEffect } from 'react'
import { Select } from 'antd'
import { getMerchantPageList } from '@/api/merchant'
import type { MerchantInfo } from '@/api/types/merchant'

type PropsType = PropsWithChildren

export default (props: PropsType) => {
  const [merchantList, setMerchantList] = useState<MerchantInfo[]>([])
  const getMerchant = async () => {
    const {
      payload: { records }
    } = await getMerchantPageList({}, 1, 10)
    setMerchantList(records)
  }

  useEffect(() => {
    getMerchant()
  }, [])

  return (
    <Select
      options={merchantList}
      fieldNames={{
        value: 'id',
        label: 'name'
      }}
      placeholder="请选择"
      style={{ width: 200 }}
      allowClear
      {...props}
    />
  )
}
