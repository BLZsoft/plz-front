import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from 'antd/es/button';
import Paragraph from 'antd/es/typography/Paragraph';

import { useApi } from '../../app/providers/with-api';

import { calcsPaths } from './routes';

const Objects = () => {
  const navigate = useNavigate();

  const api = useApi();

  useEffect(() => {
    api.partners.partnersControllerFind().then((d: unknown) => console.log(d));
  }, []);

  return (
    <div>
      <Paragraph>Калькуляторы</Paragraph>
      <Button type="primary" onClick={() => navigate(calcsPaths.modify)} size="large">
        Создать объект
      </Button>
    </div>
  );
};

export default Objects;
