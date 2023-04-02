import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from 'antd/es/button';
import Paragraph from 'antd/es/typography/Paragraph';

import { useApi } from '../../app/providers/with-api';

import { partnersPaths } from './routes';

const Partners = () => {
  const navigate = useNavigate();

  const api = useApi();

  useEffect(() => {
    console.log('call fetch');
    api.partners.partnersControllerFindAll({ skip: 0, take: 10 }).then((d) => console.log(d));
  }, []);

  return (
    <div>
      <Paragraph>Список партнеров</Paragraph>
      <Button type="primary" onClick={() => navigate(partnersPaths.modify)} size="large">
        Создать партнера
      </Button>
    </div>
  );
};

export default Partners;
