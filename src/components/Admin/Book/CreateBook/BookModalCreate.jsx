import { Form } from 'antd';
import React, { useState } from 'react';

const BookModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setIsSubmit(true);
    }
}

export default BookModalCreate;