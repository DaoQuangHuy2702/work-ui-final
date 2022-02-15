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
import moment from 'moment';
import { addWorkStart, updateWorkStart, } from "../../../redux/actions/work/actions";
import "antd/dist/antd.css";
import "./WorkAdd.css";
import { useDispatch } from "react-redux";
import { loadWorkApi } from "../../../redux/api/work/api";


const WorkAdd = (props) => {
  const dispatch = useDispatch();

  const handleSubmitFailed = (errorInfo) => {
    message.error("Vui lòng nhập đúng và đầy đủ thông tin");
    console.log("Failed:", errorInfo);
  };

  const handleSubmitForm = (work) => {
    if (work.startDate > work.endDate) {
      message.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      return;
    }
    console.log(work);
    if(props.workId) {
      dispatch(updateWorkStart(props.workId, work));
    } else {
      dispatch(addWorkStart(work));
      props.addWorkForm.resetFields();
    }
    props.onCloseAddWorkForm();
  };

  useEffect(() => {
    if(props.workId) {
      loadWorkApi(props.workId).then((response) => {
        console.log(response.data);
        const startDate = moment(response.data.startDate);
        const endDate = moment(response.data.endDate);
        props.addWorkForm.setFieldsValue({...response.data, startDate: startDate, endDate: endDate})
      })
    }
    else {
      props.addWorkForm.resetFields();
    }
  }, [props.workId])

  return (
    <div className="drawer">
      <Drawer
        title={props.workId ? "Cập nhật công việc" : "Thêm mới công việc"}
        onClose={props.onCloseAddWorkForm}
        visible={props.visible}
        placement="right"
        width="500"
      >
        <Form
          name="basic"
          form={props.addWorkForm}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={handleSubmitForm}
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
            <Input placeholder={"Nhập tên công việc"} />
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
                message: "Vui lòng nhập điểm đánh giá trong khoảng 1-10 điểm!",
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
              {props.workId ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default WorkAdd;
