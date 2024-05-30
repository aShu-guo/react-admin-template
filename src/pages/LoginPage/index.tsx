import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import VerificationCode from '@components/VerificationCode';
import { auth } from '@services/auth';
import useUserinfoStore from '@stores/userinfo';
import { post } from '@common/http';
import AuthApis from '@services/auth';

const { Option } = Select;

const App: React.FC = () => {
  const store = useUserinfoStore();
  const onFinish = async (values: any) => {
    const { Authorization, name, userId } = await post(AuthApis.doLogin, values, undefined, {
      needAuth: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    store.setUserInfo({ name, userId });
    store.setToken(Authorization);
  };

  return (
    <div className="flex-center">
      <Form
        name="complex-form"
        onFinish={onFinish}
        initialValues={{ username: 'admin', password: 'a1234567', verifyCode: '0000' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="" name="username">
          <Input style={{ width: 400, height: 48 }} placeholder="Please input" />
        </Form.Item>
        <Form.Item label="" name="password">
          <Input.Password style={{ width: 400, height: 48 }} placeholder="Please input" />
        </Form.Item>
        <Form.Item label="" style={{ marginBottom: 0 }}>
          <Form.Item
            name="verifyCode"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(96% - 8px)' }}
          >
            <Input placeholder="Input birth year" style={{ height: 48 }} />
          </Form.Item>
          <Form.Item
            name="uuid"
            style={{ display: 'inline-block', width: 'calc(4% - 8px)', margin: '0 8px' }}
          >
            <VerificationCode></VerificationCode>
          </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
