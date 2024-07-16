import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Badge, Drawer, message } from 'antd';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AccountBookOutlined, CaretDownOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router';
import { logoutUserAPI } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await logoutUserAPI();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success("Logout thành công");
            navigate('/');
        }
    }

    const items = [
        {
            label: <label style={{ cursor: "pointer" }}>Tài Khoản</label>,
            key: 'account',
            icon: <AccountBookOutlined />
        },
        {
            label:
                <label
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLogout()}
                >
                    Đăng Xuất
                </label>,
            key: 'logout',
            icon: <LogoutOutlined />
        }

    ];
    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo'>
                                <FaReact className='rotate icon-react' /> Edan Nguyễn
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Badge
                                    count={5}
                                    size={"small"}
                                >
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}>Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Xin chào! {user?.fullName}
                                                <CaretDownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Tài Khoản</p>
                <Divider />

                <p>Đăng Xuất</p>
                <Divider />
            </Drawer>
        </>
    )
};



export default Header;