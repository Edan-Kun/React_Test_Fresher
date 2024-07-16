import { Button, Divider, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserAPI } from '../../services/api';
import './register.scss';

const RegisterPage = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        setIsSubmit(true);
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        );
        setIsSubmit(false);
        if (res?.data?._id) {
            message.success('Đăng ký tài khoản thành công!');
            navigate('/login');
        } else {
            notification.error({
                message: "Đăng ký tài khoản thất bại",
                description: JSON.stringify(res.message)
                //     res.message && res.message.length > 0 ? res.message[0] : res.message,
                // duration: 5
            });
        }
    };


    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
                            <Divider />
                        </div>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Họ tên"
                                name="fullName"
                                rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password onKeyDown={(event) => {
                                    if (event.key === 'Enter') form.submit()
                                }} />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                    loading={isSubmit}
                                >
                                    Đăng ký
                                </Button>
                                <Divider />
                            </Form.Item>
                            <div className="text text-normal">Bạn đã có tài khoản ?
                                <span>
                                    <Link to='/login' > Đăng Nhập </Link>
                                </span>
                            </div>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default RegisterPage;