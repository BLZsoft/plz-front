import React, { Dispatch, useEffect } from 'react';

import { useLogto } from '@logto/react';
import { Upload as UploadIcon } from '@styled-icons/material/Upload';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { useUserInfo } from 'app/providers/with-user-info';
import { Resources } from 'shared/config/logto';
import { z } from 'zod';

import { UpdateProfileFormData, updateProfileSchema } from './model';

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<boolean>;
};

export const UserInfoModal = ({ open, setOpen }: ModalProps) => {
  const logto = useLogto();
  const { userData } = useUserInfo();
  const [form] = Form.useForm();

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        username: userData.username || '',
        primaryEmail: userData.email || '',
        primaryPhone: userData.phone_number || '',
        name: userData.name || '',
        avatar: userData.picture ? [{ url: userData.picture, status: 'done' }] : [],
      });
    }
  }, [userData, form]);

  const validateMessages = {
    required: '${label} обязательное!',
    types: {
      email: '${label} не валидный email!',
    },
  };

  const handleSubmit = async (values: UpdateProfileFormData) => {
    try {
      const token = await logto.getAccessToken(Resources.API);
      const validatedData = updateProfileSchema.parse(values);

      const formData = new FormData();

      if (validatedData.avatar?.file?.originFileObj) {
        formData.append('avatar', validatedData.avatar?.file?.originFileObj);
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

      await logto.fetchUserInfo();

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
    <Modal open={open} title="Редактировать профиль" footer={null} onCancel={() => setOpen(false)}>
      <Form form={form} onFinish={handleSubmit} validateMessages={validateMessages} autoComplete="off">
        <Form.Item name="username" label="Имя пользователя" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="primaryEmail" label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="primaryPhone" label="Телефон" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="Аватар" valuePropName="file">
          <Upload name="avatar" listType="picture">
            <Button icon={<UploadIcon />}>Выбрать файл</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
