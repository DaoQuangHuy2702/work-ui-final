import React, { useState } from "react";
import { Table, Button, Input, Popconfirm, Space } from "antd";
import "./ListContainer.css";

const ListContainer = (props) => {
  let columns = Object.keys(props.columns).map((column) => ({
    title: props.columns[column],
    dataIndex: column,
    key: column,
    sorter: true,
  }));

  columns = [
    ...columns,
    {
        title: 'Hành động',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => props.onOpenUpdateForm(record[props.rowKey])}>Cập nhật</a>
            <a onClick={() => props.onOpenDetailForm(record[props.rowKey])}>Xem chi tiết</a>
          </Space>
        ),
      },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div className="list-container">
      <div className="action">
        <Button
          type="primary"
          className="action__btn"
          onClick={props.onOpenAddForm}
        >
          Thêm công việc
        </Button>
        <Popconfirm
          onConfirm={() => props.onClickHandleDelete(selectedRowKeys)}
          okText="Có"
          cancelText="Không"
          title="Bạn có muốn xóa không?"
        >
          <Button type="primary" className="action__btn">
            Xóa công việc
          </Button>
        </Popconfirm>
      </div>

      <div className="search">
        <Input.Search
          className="search__input"
          allowClear
          onChange={(event) => props.onChangeHandleSearch(event.target.value)}
        />
      </div>

      <Table
        rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={props.data}
        pagination={{ total: props.totalCount, pageSize: props.pageSize }}
        rowKey={props.rowKey}
        onChange={props.onChangeTable}
        loading={props.loading}
      />
    </div>
  );
};

export default ListContainer;
