import React, {useMemo, useState} from 'react';
import {Button, Form, Input, Select} from 'antd';
import {v4 as uuidv4} from 'uuid';

const { Option } = Select;

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

const ApiHost = import.meta.env.VITE_API_HOST + '/uav-info-manage/uasmanage/verifyCode/generateVerifyCode?uuid=';

const LoginPage: React.FC = () => {
  const [uuid, setUuid] = useState(uuidv4().replace(/-/g, ''));
  const src = useMemo(() => ApiHost + uuid, [uuid]);

  return (
    <div className="flex-center">
      <Form
        name="complex-form"
        className="flex flex-col"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label=""
          name="username"
          style={{ marginBottom: 16 }}
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input style={{ width: 400, height: 48 }} placeholder="Please input" />
        </Form.Item>
        <Form.Item label="" name="password" rules={[{ required: true, message: 'Username is required' }]}>
          <Input style={{ width: 400, height: 48 }} placeholder="Please input" />
        </Form.Item>
        <Form.Item label="" style={{ width: 400, marginBottom: 0 }}>
          <Form.Item
            name="year"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input style={{ height: 48 }} placeholder="Input birth year" />
          </Form.Item>
          <Form.Item
            name="month"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <img width={120} height={48} src={src}></img>
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

export default LoginPage;
