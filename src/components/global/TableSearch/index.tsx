import React, { PropsWithChildren } from 'react'
import { Button, Form, Col } from 'antd'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'

type PropsType = PropsWithChildren & {
  form: Array<{
    name: string
    label: string
    component: React.ReactNode
  }>
  value?: Record<string, any>
  onFinish?: (values: any) => void
}

export default (props: PropsType) => {
  const [form] = Form.useForm()

  const onFinish = (values: any = {}) => {
    props.onFinish && props.onFinish(values)
  }

  const onFieldsChange = debounce(() => {
    onFinish(form.getFieldsValue())
  }, 500)

  const resetFields = () => {
    form.resetFields()
    onFinish()
  }

  return (
    <Form
      className="py-2"
      form={form}
      layout="inline"
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
    >
      {props.form.map(i => (
        <Form.Item label={i.label} name={i.name} key={i.name} className="!mb-4">
          {i.component}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          查询
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          ghost
          icon={<SyncOutlined />}
          onClick={resetFields}
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}
