import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.scss';
import { loginUserAPI } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';


const LoginPage = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setIsSubmit(true);
        const res = await loginUserAPI(
            values.username,
            values.password
        );
        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success('Đăng nhập thành công');
            navigate('/');
        } else {
            notification.error({
                message: "Đăng nhập thất bại",
                description: JSON.stringify(res.message)
                //     res.message && res.message.length > 0 ? res.message[0] : res.message,
                // duration: 5
            });
        }
        setIsSubmit(false);
    };


    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Nhập</h2>
                            <Divider />

                        </div>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="username"
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
                            >
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                    loading={isSubmit}
                                >
                                    Đăng Nhập
                                </Button>
                                <Divider />
                            </Form.Item>
                            <div className="text text-normal">Bạn chưa có tài khoản ?
                                <span>
                                    <Link to='/register' > Đăng Ký </Link>
                                </span>
                            </div>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LoginPage;
