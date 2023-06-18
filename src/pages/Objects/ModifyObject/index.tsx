import { useEffect, useState } from 'react';

import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { useParams } from 'react-router-dom';

import { Button, Radio, Form, Input, Select, notification } from 'antd';
import { CreateObjectDto } from 'services/api';
import { useApi } from 'shared/hooks/useApi';
import { DadataGeoPicker } from 'shared/ui/DadataGeoPicker';

import { getDataByType, getFloorsByType, getAreasByTypeAndFloor, getHeightByTypeAndFloor } from '../utils';

import { default as SP2_DATA } from './data_sp2_.json';
import { default as F_DATA } from './f_sp2.json';

const makeOptionValue = (data: { f: string; name: string }) => `${data.f}#${data.name}`;
const CATEGORIES = ['А', 'Б', 'В1', 'В2', 'В3', 'В4', 'Г', 'Д'];

const ModifyObject = () => {
  const [floors, setFloors] = useState([]);
  const [areas, setAreas] = useState([]);
  const [heights, setHeights] = useState([]);
  const [dataByType, setDataByType] = useState([]);
  const [typeF, setTypeF] = useState<string | null>(null);
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
    const createObjectDto: CreateObjectDto = {
      name: values.name,
      sp2type: values.sp2.split('#')[0] as string,
      sp2name: values.sp2.split('#')[1] as string,
      sp2questions: '',
      address: 'values.geo',
      typeOfBuild: values.typeOfBuild,
      upFloors: Number(values.upFloors),
      isUnderFloor: true,
      underFloors: 2,
      fireRoomArea: Number(values.fireRoomArea),
      tradeArea: 0,
      blackTradeRooms: true,
      height: Number(values.height) || 9,
      volume: 235,
      _class: 'C01',
      degree: 'IV',
    };

    if (objectId && objectId === 'new') {
      api
        .objectsControllerCreate({ createObjectDto })
        .then(() => {
          openNotification(values.name, 'Объект сохранен');
        })
        .catch(() => console.log('error'));
    } else if (objectId) {
      api
        .objectsControllerUpdate({
          id: Number(objectId),
          updateObjectDto: createObjectDto,
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
      api.objectsControllerFindOne({ id: Number(objectId) }).then((data) => {
        form.setFieldsValue(data);
      });
    }
  }, [objectId]);

  console.log(typeF, dataByType);

  const sp2Change = (val: string) => {
    const typeF = val?.split('#')[0];
    const dataByType = getDataByType(SP2_DATA, typeF);
    const floors = getFloorsByType(dataByType);

    setTypeF(typeF);
    setDataByType(dataByType);
    setFloors(floors);

    return val;
  };
  const floorsChange = (val: number) => {
    setAreas(getAreasByTypeAndFloor(dataByType, val));

    return val;
  };
  const areaChange = (val: unknown, prevValue: { objectFloors: number }, values: { upFloors: number }) => {
    setHeights(getHeightByTypeAndFloor(dataByType, values.upFloors, val));

    return val;
  };

  return (
    <Form
      form={form}
      name="object"
      size="large"
      labelCol={{ span: 8 }}
      // layout="vertical"
      style={{ maxWidth: 1024, width: '100%' }}
      initialValues={{ type: 'building' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      // onValuesChange={onFormValuesChanges}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item label="Название объекта" name="name" rules={[{ required: true, message: 'Введите название' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Тип здания" name="typeOfBuild">
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
      <Form.Item label="Тип СП2" name="sp2" rules={[{ required: true, message: 'Выберите СП2' }]} normalize={sp2Change}>
        <Select>
          {F_DATA.map((option) => (
            <Select.Option key={option._id.$oid} value={makeOptionValue(option)}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Ширина здания, м" name="objectWidth" rules={[{ required: true, message: 'Выберите ширину' }]}>
        <Select>
          <Select.Option value={50}>менее 60</Select.Option>
          <Select.Option value={70}>более 60</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Количество надземных этажей"
        rules={[{ required: true, message: 'Выберите этаж' }]}
        key="select_upFloors"
        name="upFloors"
        normalize={floorsChange}
        dependencies={['sp2']}
      >
        <Select>
          {floors.map((item) => (
            <Select.Option id={item} value={item} children={item} />
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Площадь этажа пожарного отсека, м2"
        rules={[{ required: true, message: 'Задайте площадь' }]}
        key="select_fireRoomArea"
        name="fireRoomArea"
        normalize={areaChange}
        dependencies={['upFloors']}
      >
        <Select>
          {areas.map((item) => (
            <Select.Option id={item} value={item} children={item} />
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Высота здания, м"
        rules={[{ required: true, message: 'Задайте высоту' }]}
        key="select_height"
        name="height"
        dependencies={['upFloors', 'fireRoomArea']}
      >
        <Select>
          {heights.map((item) => (
            <Select.Option id={item} value={item} children={item} />
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Категория по взрывопожарной или пожарной опасности"
        rules={[{ required: true, message: 'Выберите Категорию' }]}
        key="select_objectCategory"
        name="objectCategory"
      >
        <Select>
          {CATEGORIES.map((item) => (
            <Select.Option id={item} value={item} children={item} />
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

// .string('name')
// .string('sp2type')
// .string('sp2name')
// .string('sp2questions')
// .int('upFloors')
// .boolean('isUnderFloor')
// .int('underFloors')
// .float('fireRoomArea')
// .float('tradeArea')
// .boolean('blackTradeRooms')
// .float('height')
// .float('volume')
// .string('class')
// .string('degree');
