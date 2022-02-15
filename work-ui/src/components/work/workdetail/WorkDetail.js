import React, {useEffect, useState} from "react";
import { Modal, Row, Col } from "antd";
import { loadWorkApi } from "../../../redux/api/work/api";

const WorkDetail = (props) => {
  const [work, setWork] = useState({});

  const convertDate = (dateInput) => {
    const date = new Date(dateInput);

    const [day, month, year] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ];
    const dayConvert = day / 10 >= 1 ? day : `0${day}`;
    const monthConvert = month / 10 >= 1 ? month : `0${month}`;

    return `${dayConvert}/${monthConvert}/${year}`;
  };

  useEffect(() => {
    if(props.workId) {
      loadWorkApi(props.workId).then((response) => {
        setWork(response.data);
      })
    }
  }, [props.workId, props.visitbleDetailForm])

  return (
    <div className="detail">
      <Modal
        title="Thông tin công việc"
        visible={props.visitbleDetailForm}
        onCancel={props.onCloseDetailForm}
        onOk={props.onCloseDetailForm}
        width={400}
      >
        <Row gutter={24}>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Tên công việc:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {work?.name}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Id người thực hiện:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {work?.assigneId}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Id người tạo:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {work?.creatorId}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Ngày giao việc:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {convertDate(work?.dueDate)}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Ngày bắt đầu:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {convertDate(work?.startDate)}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Ngày kết thúc:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {convertDate(work?.endDate)}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Đánh giá:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {work?.rate}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default WorkDetail;
