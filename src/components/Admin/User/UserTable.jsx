import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button } from 'antd';
import InputSearch from './InputSearch';
import { fetchListUserAPI } from '../../../services/api';
import { CloudUploadOutlined, DeleteTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async (searchFilter) => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if (searchFilter) {
            query += `&${searchFilter}`
        }
        const res = await fetchListUserAPI(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Tên Hiển Thị',
            dataIndex: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Vai Trò',
            dataIndex: 'role',
            sorter: true
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa user"}
                        description={"Bạn có chắc chắn muốn xóa user này ?"}
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{ cursor: "pointer" }}>
                            <DeleteTwoTone twoToneColor="#ff4d4f" />
                        </span>
                    </Popconfirm>
                )
            }
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleDeleteUser = async (userId) => {
        const res = await callDeleteUser(userId);
        if (res && res.data) {
            message.success('Xóa user thành công');
            fetchUser();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    };


    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                    >
                        Export
                    </Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                    >
                        Import
                    </Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                    >
                        Thêm mới
                    </Button>
                    <Button type='ghost' onClick={() => loadUser()}>
                        <ReloadOutlined />
                    </Button>


                </span>
            </div>
        )
    }


    const handleSearch = (query) => {
        loadUser(query)
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch handleSearch={handleSearch} />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}

                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total
                            }
                        }
                    />
                </Col>
            </Row>
        </>
    )

}

export default UserTable;
