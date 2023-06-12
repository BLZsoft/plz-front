// @ts-nocheck
import { useEffect } from 'react';

import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { useParams } from 'react-router-dom';

import { Button, Radio, Form, Input, Select, notification } from 'antd';
import { DadataGeoPicker } from 'shared/ui/DadataGeoPicker';

import { useApi } from '../../../app/providers/with-api';

import { default as MOCK_DATA } from './f_sp2.json';

const makeOptionValue = (data) => `${data.f}#${data.name}`;

const ModifyObject = () => {
  const { id: objectId } = useParams();
  const [form] = Form.useForm();
  const api = useApi();
  const [notificationApi, contextHolder] = notification.useNotification();
  const openNotification = (title: string, description: string) => {
    notificationApi.info({
      message: title,
      description,
      placement: 'topRight',
    });
  };
  const onFinish = (values: any) => {
    console.log('Success:', MOCK_DATA, values);
    const createPartnerDto = {
      name: values.name,
      // type: values.type,
      sp2type: values.sp2.split('#')[0] as string,
      sp2name: values.sp2.split('#')[1] as string,
      sp2questions: '',
      upFloors: 2,
      isUnderFloor: true,
      underFloors: 2,
      fireRoomArea: 2222,
      tradeArea: 0,
      blackTradeRooms: true,
      height: 22,
      volume: 235,
      class: 'C01',
      degree: 'IV',
    };
    console.log('!!!!', objectId);

    if (objectId && objectId === 'new') {
      api.partners
        .partnersControllerCreate({
          createPartnerDto,
        })
        .then(() => {
          openNotification(values.name, 'Объект сохранен');
        })
        .catch(() => console.log('error'));
    } else if (objectId) {
      api.partners
        .partnersControllerUpdate({
          id: objectId,
          updatePartnerDto: createPartnerDto,
        })
        .then(() => {
          openNotification(values.name, 'Объект обновлен');
        })
        .catch(() => console.log('error'));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    openNotification('Ошибка', 'Не удалось сохранить объект');
  };

  useEffect(() => {
    if (objectId) {
      api.partners.partnersControllerFindOne({ id: objectId }).then((data) => {
        form.setFieldsValue(data?.data);
      });
    }
  }, [objectId]);

  return (
    <Form
      form={form}
      name="object"
      size="large"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800, width: '100%' }}
      initialValues={{ type: 'building' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item label="Название объекта" name="name" rules={[{ required: true, message: 'Введите название' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Тип здания" name="type">
        <Radio.Group>
          <Radio value="building">Здание</Radio>
          <Radio value="room">Помещение</Radio>
        </Radio.Group>
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
      <Form.Item label="Тип СП2" name="sp2" rules={[{ required: true, message: 'Выберите СП2' }]}>
        <Select>
          {MOCK_DATA.map((option) => (
            <Select.Option key={option._id.$oid} value={makeOptionValue(option)}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModifyObject;
