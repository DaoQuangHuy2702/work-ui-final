import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import "antd/dist/antd.css";
import "./WorkUpdate.css";
import moment from 'moment';
import { loadWorkApi } from "../../../redux/api/work/api";

const WorkUpdate = (props) => {
  const [updateWorkForm] = Form.useForm();
  const handleSubmitFailed = (errorInfo) => {
    message.error("Lỗi cập nhật thông tin");
    console.log("Failed:", errorInfo);
    console.log(props.data);
  };

  const onSubmitUpdateWork = () => {
      return null;
  }

  useEffect(() => {
    loadWorkApi(props.workId).then((response) => {
      console.log(response.data);
      const startDate = moment(response.data.startDate);
      const endDate = moment(response.data.endDate);
      updateWorkForm.setFieldsValue({...response.data, startDate: startDate, endDate: endDate})
    })
  }, [props.workId])

  return (
    <div className="drawer">
      <Drawer
        title="Cập nhật công việc"
        onClose={props.onCloseUpdateWorkForm}
        visible={props.visible}
        placement="right"
        width="500"
      >
        <Form
          name="basic"
          form={updateWorkForm}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
          onFinish={onSubmitUpdateWork}
          onFinishFailed={handleSubmitFailed}
        >
          <Form.Item
            label="Tên công việc"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên công việc!",
              },
            ]}
          >
            <Input placeholder={"Nhập tên công việc"}/>
          </Form.Item>

          <Form.Item
            label="ID người thực hiện"
            name="assigneId"
            rules={[
              {
                type: "number",
                min: 1,
                required: true,
                message: "Vui lòng nhập ID người thực hiện!",
              },
            ]}
          >
            <InputNumber
              placeholder={"Nhập ID người thực hiện"}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="ID người tạo"
            name="creatorId"
            rules={[
              {
                type: "number",
                min: 1,
                required: true,
                message: "Vui lòng nhập ID người tạo!",
              },
            ]}
          >
            <InputNumber
              placeholder={"Nhập ID người tạo"}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày bắt đầu!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày kết thúc!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Đánh giá"
            name="rate"
            rules={[
              {
                type: "number",
                min: 1,
                max: 10,
                required: true,
                message: "Vui lòng nhập đánh giá!",
              },
            ]}
          >
            <InputNumber
              placeholder={"Nhập đánh giá"}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm công việc
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default WorkUpdate;
