// import React from 'react'
import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { jobIdLogin, getTokenByAuthCode } from '@/api/user'
import { setToken } from '@/utils/token'
import { useNavigate } from 'react-router-dom'

type JobIdLoginParams = Parameters<typeof jobIdLogin>[0]

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: JobIdLoginParams) => {
    console.log('Success:', values)
    setLoading(true)
    const { payload: { authCode } } = await jobIdLogin(values)
    const { payload } = await getTokenByAuthCode(authCode)
    setToken(payload.authorizationToken)
    setLoading(false)
    navigate('/', { replace: true })
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

export default Login
