import React, { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { useLogto } from '@logto/react';
import { Button, Form, Input, message, Select, Upload, UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useUserInfo } from 'app/providers/with-user-info';
import { Resources } from 'shared/config/logto';
import { z } from 'zod';

import { UpdateProfileFormData, updateProfileSchema } from './model';

const Profile = () => {
  const logto = useLogto();
  const { userData, loadUserData } = useUserInfo();
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        username: userData.username || '',
        primaryEmail: userData.email || '',
        primaryPhone: userData.phone_number || '',
        name: userData.name || '',
      });

      if (userData.picture) {
        setFileList([
          {
            uid: userData.sub,
            name: userData.sub,
            url: userData.picture,
            status: 'done',
          },
        ]);
      }
    }
  }, [userData, form]);

  const validateMessages = {
    required: '${label} обязательное!',
    types: {
      email: '${label} не валидный email!',
    },
  };

  const handleBeforeUpload = (file: RcFile) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setFileList([
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: reader.result as string,
        },
      ]);
    };

    //Prevent file uploading
    return false;
  };

  const handleSubmit = async (values: UpdateProfileFormData) => {
    try {
      const token = await logto.getAccessToken(Resources.API);
      const validatedData = updateProfileSchema.parse(values);

      const formData = new FormData();

      if (values.avatar?.file) {
        formData.append('avatar', values.avatar?.file);
      }

      formData.append('username', validatedData.username);
      formData.append('primaryEmail', validatedData.primaryEmail);
      formData.append('primaryPhone', validatedData.primaryPhone);
      formData.append('name', validatedData.name);

      await fetch('https://пожликбез.рф/api/profile', {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      await loadUserData();

      message.success('Профиль успешно обновлен');
    } catch (err) {
      if (err instanceof z.ZodError) {
        form.setFields(
          err.errors.map((error) => ({
            name: error.path,
            errors: [error.message],
          })),
        );
      } else {
        message.error('Произошла ошибка при обновлении профиля');
      }
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} validateMessages={validateMessages} autoComplete="off">
      <h2 style={{ marginBottom: '28px' }}>Мой профиль</h2>
      <Form.Item name="username" label="Имя пользователя" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="primaryPhone" label="Телефон" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="primaryEmail" label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="avatar" label="Аватар" valuePropName="file">
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          fileList={fileList}
          beforeUpload={handleBeforeUpload}
        >
          {fileList.length && fileList[0]?.url ? (
            <img
              key={Date.now()}
              src={fileList[0]?.url}
              alt="avatar"
              style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <div>
              <PlusOutlined rev={undefined} />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <h2 style={{ marginBottom: '28px' }}>Организация</h2>

      <Form.Item label={'Организация'}>
        <Select
          labelInValue
          defaultValue={{ value: '0', label: 'Пожбез 101' }}
          style={{ width: 120 }}
          options={[
            {
              value: '0',
              label: 'Пожбез 101',
            },
            {
              value: '1',
              label: 'МЧС по Московскому региону',
            },
          ]}
        />
      </Form.Item>

      <Form.Item label={'Должность'}>
        <Select
          labelInValue
          defaultValue={{ value: '0', label: 'Пожарный инспектор' }}
          style={{ width: 120 }}
          options={[
            {
              value: '0',
              label: 'Пожарный инспектор',
            },
            {
              value: '1',
              label: 'Модератор',
            },
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
