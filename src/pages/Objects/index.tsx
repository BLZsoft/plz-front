// @ts-nocheck
import { useEffect, useState, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { Card, Space, Row, Col, Popover, FloatButton } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { TooltipCustom } from 'shared/ui/TooltipCustom';
// import Button from 'antd/es/button';

import { useApi } from '../../app/providers/with-api';

// import { objectsPaths } from './routes';

const floatingBtnStyle = {
  right: '10%',
  bottom: '10%',
  width: '60px',
  height: '60px',
};
const CardExtraComponent = ({ name, handleDelete }) => (
  <Space direction="horizontal" size={10}>
    <Popover title={`Удалить объект ${name} ?`} trigger="click" content={<a onClick={handleDelete}>Да</a>}>
      <TooltipCustom key={'Удалить'} placement="bottom" title={'Удалить'}>
        <DeleteTwoTone twoToneColor="#ff3f3d" />
      </TooltipCustom>
    </Popover>
  </Space>
);

const Objects = () => {
  // const navigate = useNavigate();
  // TODO для демонстрации
  const [objects, setObjectsList] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(true);

  const api = useApi();

  const navigate = useNavigate();

  const deleteObject = (id: string) => () => {
    api.partners.partnersControllerRemove({ id }).then(() => {
      setUpdateFlag(true);
    });
  };

  useEffect(() => {
    if (updateFlag === true) {
      api.partners.partnersControllerFind().then((data: unknown) => {
        if (data && data?.data?.data) {
          setObjectsList(data?.data?.data);
        }
      });
      setUpdateFlag(false);
    }
  }, [updateFlag]);

  const renderObjectsList = useMemo(
    () =>
      objects?.length ? (
        <Space direction="horizontal" size={16}>
          {objects.map((obj: Record<string, string>) => (
            <Card
              key={obj?.id}
              hoverable
              title={obj?.name}
              extra={<CardExtraComponent handleDelete={deleteObject(obj?.id)} name={obj?.name} />}
              style={{ width: 400 }}
              onClick={() => navigate(`/objects/modify/${obj?.id}`)}
            >
              <Row>
                <Col span={6}>
                  <Paragraph strong>Адрес</Paragraph>
                </Col>
                <Col span={10} offset={8}>
                  <Paragraph type="secondary">{obj?.objectAddress || 'Курск, Ленина 42'}</Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Paragraph strong>{obj?.sp2type}</Paragraph>
                </Col>
                <Col span={10} offset={8}>
                  <Paragraph type="secondary">{obj?.sp2name}</Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Paragraph strong>Класс</Paragraph>
                </Col>
                <Col span={10} offset={8}>
                  <Paragraph type="secondary">{obj?.class}</Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Paragraph strong>Категория</Paragraph>
                </Col>
                <Col span={10} offset={8}>
                  <Paragraph type="secondary">{obj?.category || '-'}</Paragraph>
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      ) : null,
    [objects],
  );

  return (
    <div>
      {renderObjectsList}
      <FloatButton
        tooltip={<div>Добавить объект</div>}
        onClick={() => navigate('/objects/modify/new')}
        trigger="click"
        icon={<PlusOutlined />}
        type="primary"
        style={floatingBtnStyle}
      />
    </div>
  );
};

export default Objects;
