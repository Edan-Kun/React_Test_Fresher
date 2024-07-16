import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CaretDownOutlined,
    AccountBookOutlined,
    LogoutOutlined,

} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import './layout.scss';
import { useSelector } from 'react-redux';

const { Content, Footer, Sider } = Layout;

const items = [
    {
        label: <Link to='/admin'>DashBoard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <span>Manage Users</span>,
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to='/admin/user'>CRUD</Link>,
                key: 'crud',
                icon: <TeamOutlined />
            },
            {
                label: 'Files1',
                key: 'files1',
                icon: <TeamOutlined />
            }
        ]
    },
    {
        label: <Link to='/admin/book'>Manage Books</Link>,
        key: 'book',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/order'>Manage Orders</Link>,
        key: 'order',
        icon: <DollarCircleOutlined />
    },

];

const itemsDropdown = [
    {
        label: <label>Tài Khoản</label>,
        key: 'account',
        icon: <AccountBookOutlined />
    },
    {
        label: <label>Đăng Xuất</label>,
        key: 'logout',
        icon: <LogoutOutlined />
    }
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const user = useSelector(state => state.account.user);

    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className="layout-admin"
        >
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, textAlign: 'center', fontFamily: "JetBrains Mono", fontSize: "20px" }}>
                    Admin
                </div>
                <Menu
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout>
                <div className='admin-header'>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Xin chào! {user?.fullName}
                                <CaretDownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content>
                    <Outlet />
                </Content>
                <Footer style={{ padding: 0 }}>
                    ReactJS 2024 &copy; by Edan Nguyễn <HeartTwoTone />
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;