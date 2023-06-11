import { DaDataAddress, DaDataSuggestion } from 'react-dadata';

import { Button, Checkbox, Form, Input, Select } from 'antd';
import { DadataGeoPicker } from 'shared/ui/DadataGeoPicker';

import { default as MOCK_DATA } from './f_sp2.json';

const ModifyObject = () => {
  const onFinish = (values: any) => {
    console.log('Success:', MOCK_DATA, values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const ddd = {
    x: 1,
    u: 1,
  };
  return (
    <Form
      name="object"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800 }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Название объекта" name="name" rules={[{ required: true, message: 'Введите название' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item
        label="Адрес"
        name="geo"
        // rules={zodToAntdRule(createBuildingDtoSchema.geo)}
        getValueFromEvent={(v: DaDataSuggestion<DaDataAddress>) => {
          return {
            rawValue: v,
            lat: v.data.geo_lat,
            lon: v.data.geo_lon,
            houseNumber: v.data.house,
            street: v.data.street,
            city: v.data.city,
            district: v.data.city_district,
          };
        }}
      >
        <DadataGeoPicker />
      </Form.Item>
      <Form.Item label="Select">
        <Select>
          <Select.Option value={ddd}>Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModifyObject;
