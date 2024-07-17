import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";

const UserViewDetail = (props) => {
    const { dataViewDetail, setDataViewDetail,
        openViewDetail, setOpenViewDetail
    } = props;

    const onClose = () => {
        setDataViewDetail(null);
        setOpenViewDetail(false);
    }

    return (
        <Drawer
            width={"50vw"}
            title={"Chi tiết User"}
            onClose={() => onClose()}
            open={openViewDetail}
        >
            <Descriptions
                title={"Thông tin User"}
                bordered
                column={2}
            >
                <Descriptions.Item label="ID">{dataViewDetail?._id}</Descriptions.Item>
                <Descriptions.Item label="Tên Hiển Thị">{dataViewDetail?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                <Descriptions.Item label="Số Điện Thoại">{dataViewDetail?.phone}</Descriptions.Item>
                <Descriptions.Item label="Role" span={2}>
                    <Badge status="processing" text={dataViewDetail?.role} />
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Update At">
                    {moment(dataViewDetail?.updateAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
}
export default UserViewDetail;