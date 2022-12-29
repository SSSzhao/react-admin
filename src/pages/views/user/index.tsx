import { useState, useRef } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import MainContent from '@/components/global/MainContent'
import TableGroup from '@/components/global/TableGroup'
import TableSearch from '@/components/global/TableSearch'
import TableBtnGroup from '@/components/global/TableBtnGroup'
import type { ColumnsType } from 'antd/es/table'
import { Button, Input, Tag, Switch, Space, Popconfirm } from 'antd'
import { getUserPageList, updateUserStatus, deleteUser } from '@/api/user'
import type { UserInfo } from '@/api/types/user'
import { green } from '@ant-design/colors'

type GetUserPageListParams = Parameters<typeof getUserPageList>[0];

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default () => {
  const TableRef = useRef<any>()
  const [stateLoading, setStateLoading] = useState(false)

  const userStatusChange = async (user: UserInfo) => {
    setStateLoading(true)
    await updateUserStatus(user.id)
    setStateLoading(false)
  }

  const delUser = async (ids: UserInfo['id'][]) => {
    await deleteUser(ids)
  }

  const loadData = () => {
    TableRef.current.loadData()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '用户ID',
      dataIndex: 'id'
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname'
    },
    {
      title: '所属商户',
      dataIndex: 'merchantName'
    },
    {
      title: '所属子商户',
      dataIndex: 'subMerchantName'
    },
    {
      title: '所属群体',
      dataIndex: 'userGroup',
      render: text => (
        <Tag color="blue">
          {['合伙人', '客户群体'][text]}
        </Tag>
      )
    },
    {
      title: '工号',
      dataIndex: 'jobId'
    },
    {
      title: '手机号码',
      dataIndex: 'tel'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, row) => (
        <Switch defaultChecked={text === 1} checkedChildren="启用" unCheckedChildren="禁用" loading={stateLoading} onChange={() => userStatusChange(row as unknown as UserInfo)} />
      )
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime'
    },
    {
      title: '操作',
      dataIndex: '操作',
      render: (_, row) => {
        const rowData = row as unknown as UserInfo
        return <Space size="middle">
          <Popconfirm title="确定删除？" okType="danger" icon={<ExclamationCircleOutlined style={{ color: 'red' }} />} onConfirm={() => delUser([rowData.id])}>
            <Button type="text" danger>删除</Button>
          </Popconfirm>
        </Space>
      }
    }
  ]

  const form = [
    {
      name: 'jobId',
      label: '工号',
      component: <Input placeholder="请输入工号" allowClear />
    }
  ]

  return (
    <MainContent title="用户管理">
      <TableSearch form={form} onFinish={values => TableRef.current.loadData(values)}></TableSearch>
      <TableBtnGroup>
        <Button type="primary" style={{ background: green.primary, borderColor: green.primary }}>导入</Button>
        <Button type="primary">新增</Button>
      </TableBtnGroup>
      <TableGroup ref={TableRef} api={getUserPageList} columns={columns} />
    </MainContent>
  )
}
