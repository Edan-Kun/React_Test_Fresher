import React, { useState } from 'react';
import { Divider, Form, Input, message, Modal, notification } from 'antd';
import { createUserAPI } from '../../../services/api';

const UserModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setIsSubmit(true);
        const res = await createUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        );
        if (res && res.data) {
            message.success('Tạo mới user thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchUser();
        } else {
            notification.error({
                message: 'Tạo mới user thất bại',
                description: JSON.stringify(message.res)
            })
        }
        setIsSubmit(false);
    }

    return (
        <>
            <Modal
                title="Basic Modal"
                open={openModalCreate}
                onOk={() => form.submit()}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo Mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />
                <Form
                    form={form}
                    name='basic'
                    layout='vertical'
                    style={{ maxWidth: "600" }}
                    onFinish={onFinish}
                    autoComplete='off'
                >
                    <Form.Item
                        label="Tên Hiển Thị"
                        name="fullName"
                        rules={[{ required: true, message: 'Tên hiển thị không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Password không được để trống' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserModalCreate;