import { Modal, notification, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from 'xlsx';
import { useState } from "react";
import { importUserAPI } from "../../../../services/api";
import templateFile from './template.xlsx?url';

const { Dragger } = Upload;

const UserImport = (props) => {
    const { openModalImport, setOpenModalImport } = props;
    const [dataExcel, setDataExcel] = useState([])

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("Ok");
        }, 1000);
    };

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest: dummyRequest,
        onChange(info) {
            console.log("Check Info", info)
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        let data = new Uint8Array(e.target.result);
                        let workbook = XLSX.read(data, { type: 'array' });
                        // find the name of your sheet in the workbook first
                        let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                        // convert to json format
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                            header: ["fullName", "email", "phone"],
                            range: 1
                        });
                        if (jsonData && jsonData.length > 0) {
                            setDataExcel(jsonData)
                        }
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    }

    const handleSubmit = async () => {
        const data = dataExcel.map(item => {
            item.password = '123456';
            return item;
        })
        const res = await importUserAPI(data);
        if (res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
                message: "Upload thành công",
            })
            setDataExcel([]);
            setOpenModalImport(false);
            props.fetchUser();
        } else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra",
            })
        }
    }

    return (
        <>
            <Modal
                title="Import data user"
                width={"50vw"}
                open={openModalImport}
                onOk={() => handleSubmit()}
                onCancel={() => {
                    setOpenModalImport(false);
                    setDataExcel([]);
                }}
                okText="Import Data"
                okButtonProps={{
                    disabled: dataExcel.length < 1
                }}
                maskClosable={false}
            >
                <Dragger
                    {...propsUpload}
                    showUploadList={dataExcel.length > 0}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx
                        &nbsp;
                        <a
                            onClick={event => event.stopPropagation()}
                            href={templateFile}
                            download
                        >
                            Download Sample File
                        </a>
                    </p>
                </Dragger>
                <div style={{ paddingTop: "20px" }}>
                    <Table
                        dataSource={dataExcel}
                        title={() => <span>Dữ Liệu Upload</span>}
                        columns={[
                            {
                                dataIndex: 'fullName',
                                title: 'Tên Hiển Thị',
                            },
                            {
                                dataIndex: 'email',
                                title: 'Email'
                            },
                            {
                                dataIndex: 'phone',
                                title: 'Số Điện Thoại'
                            }
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default UserImport;