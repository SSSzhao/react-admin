// import React from 'react'
import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { jobIdLogin, getTokenByAuthCode } from '@/api/user'
import { setToken } from '@/utils/token'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import userStore from '@/store/user'

type JobIdLoginParams = Parameters<typeof jobIdLogin>[0]

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: JobIdLoginParams) => {
    console.log('Success:', values)
    setLoading(true)
    try {
      const { payload: { authCode } } = await jobIdLogin(values)
      await userStore.getAuthInfo(authCode)
      setLoading(false)
      navigate('/', { replace: true })
    } catch {
      setLoading(false)
    }
  }

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ jobId: '001', password: '123456' }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="工号"
        name="jobId"
        rules={[{ required: true, message: '请输入工号' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(Login)
