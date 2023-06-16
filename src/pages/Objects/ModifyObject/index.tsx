// @ts-nocheck
import { useEffect, useState } from 'react';

import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { useParams } from 'react-router-dom';

import { Button, Radio, Form, Input, Select, notification } from 'antd';
import { DadataGeoPicker } from 'shared/ui/DadataGeoPicker';

import { useApi } from '../../../app/providers/with-api';
import { getDataByType, getFloorsByType, getAreasByTypeAndFloor, getHeightByTypeAndFloor } from '../utils';

import { default as SP2_DATA } from './data_sp2_.json';
import { default as F_DATA } from './f_sp2.json';

const makeOptionValue = (data) => `${data.f}#${data.name}`;
const CATEGORIES = ['А', 'Б', 'В1', 'В2', 'В3', 'В4', 'Г', 'Д'];

const ModifyObject = () => {
  const [floors, setFloors] = useState([]);
  const [areas, setAreas] = useState([]);
  const [heights, setHeights] = useState([]);
  const [dataByType, setDataByType] = useState([]);
  const [typeF, setTypeF] = useState(null);
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
    console.log('Success:', SP2_DATA, values);
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

  // const typeF = values?.selectedTopic?.id?.f;
  // const dataByType = getDataByType(SP2_DATA, typeF);
  // const currentFloor = values?.objectUpfloors?.value;
  // const currentArea = values?.objectFireRoomArea?.value;
  // const currentHeight = values?.objectHeight?.value;
  // const [objectClass, objectDegree, objectCategory] = getClassAndDegree(
  //   SP2_DATA,
  //   typeF,
  //   currentFloor,
  //   currentArea,
  //   currentHeight,
  // );
  console.log(typeF);

  const sp2Change = (val) => {
    // console.log(changed, allValues);
    const typeF = val?.split('#')[0];
    const dataByType = getDataByType(SP2_DATA, typeF);
    const floors = getFloorsByType(dataByType);

    setTypeF(typeF);
    setDataByType(dataByType);
    setFloors(floors);

    return val;
    // const [objectClass, objectDegree, objectCategory] = getClassAndDegree(
    //   SP2_DATA,
    //   typeF,
    //   currentFloor,
    //   currentArea,
    //   currentHeight,
    // );
  };
  const floorsChange = (val) => {
    const areas = getAreasByTypeAndFloor(dataByType, val);
    setAreas(areas);

    return val;
    // const [objectClass, objectDegree, objectCategory] = getClassAndDegree(
    //   SP2_DATA,
    //   typeF,
    //   currentFloor,
    //   currentArea,
    //   currentHeight,
    // );
  };
  const areaChange = (val, vals) => {
    const heights = getHeightByTypeAndFloor(dataByType, vals.objectFloors, val);
    setHeights(heights);
    console.log(val, heights, vals);

    return val;
    // const [objectClass, objectDegree, objectCategory] = getClassAndDegree(
    //   SP2_DATA,
    //   typeF,
    //   currentFloor,
    //   currentArea,
    //   currentHeight,
    // );
  };

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
      // onValuesChange={onFormValuesChanges}
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
        key="select_objectUpfloors"
        name="objectUpfloors"
        normalize={floorsChange}
      >
        <Select>
          {floors.map((item) => (
            <Select.Option id={item} value={item} />
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Площадь этажа пожарного отсека, м2"
        rules={[{ required: true, message: 'Задайте площадь' }]}
        key="select_objectFireRoomArea"
        name="objectFireRoomArea"
        normalize={areaChange}
      >
        <Select>
          {areas.map((item) => (
            <Select.Option id={item} value={item} />
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Высота здания, м"
        rules={[{ required: true, message: 'Задайте высоту' }]}
        key="select_objectHeight"
        name="objectHeight"
        // normalize={heightsChange}
      >
        <Select>
          {heights.map((item) => (
            <Select.Option id={item} value={item} />
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
            <Select.Option id={item} value={item} />
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
