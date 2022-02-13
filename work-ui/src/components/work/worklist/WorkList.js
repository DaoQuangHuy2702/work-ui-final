import { message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListContainer from "../../common/list-container/ListContainer";
import {
  loadWorksStart,
  deleteWorkStart,
} from "../../../redux/actions/work/actions";
import WorkDetail from "../workdetail/WorkDetail";
import WorkAdd from "../workadd/WorkAdd";

const { Title } = Typography;

const WorkList = () => {
  const columns = {
    name: "Tên công việc",
    assigneId: "ID người thực hiện",
    creatorId: "ID người tạo",
    dueDate: "Ngày giao việc",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    rate: "Đánh giá",
  };

  const sortType = {
    ascend: "asc",
    descend: "desc",
  };

  let formatedData = [];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSIze] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState();
  const [visitbleDetailForm, setVisibleDetailForm] = useState(false);
  const [visitbleAddForm, setVisibleAddForm] = useState(false);
  const [workId, setWorkId] = useState(null);

  const { data, loading } = useSelector(
    (state) => state.workReducer
  );

  const dispatch = useDispatch();

  const loadWorksData = () => {
    let params = { page, pageSize, sort };
    if (search !== "") {
      params = { ...params, search };
    }
    dispatch(loadWorksStart(params));
  };

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

  const formatData = () => {
    formatedData = data?.items?.map((item, index) => ({
      ...item,
      dueDate: convertDate(item.dueDate),
      startDate: convertDate(item.startDate),
      endDate: convertDate(item.endDate),
    }));

    console.log(formatedData);
  };


  const handleOnChangeTable = (pagination, filters, sorter, extra) => {
    if (sorter.order !== undefined && sorter.order != null) {
      const sort = `${sorter.field}:${sortType[sorter.order]}`;
      setSort(sort);
    } else {
      setSort(null);
    }
    setPage(pagination.current);
  };

  const handleOnDeleteWork = (selectedRowKeys) => {
    if (selectedRowKeys.length === 0) {
      message.error("Chọn phần tử cần xóa");
    } else {
      selectedRowKeys.forEach((key) => {
        dispatch(deleteWorkStart(key));
      });
      setTimeout(() => {
        if (loading !== true) {
          loadWorksData();
        }
      }, selectedRowKeys.length * 500);
      setTimeout(message.success("Xóa thành công"), 2000);
    }
  };

  const handleOnSearchWork = (searchTerm) => {
    console.log(searchTerm);
    setSearch(searchTerm);
  };


  const handleOnOpenDetailForm = (workId) => {
    setVisibleDetailForm(true);
    setWorkId(workId);
  };

  const handleOnCloseDetailForm = () => {
    setVisibleDetailForm(false);
  };

  const handleOnOpenUpdateForm = (workId) => {
    setVisibleAddForm(true);
    console.log(workId);
    setWorkId(workId);
  };

  const handleOnOpenAddForm = () => {
    setWorkId(null);
    setVisibleAddForm(true);
  };

  const handleOnCloseAddForm = () => {
    setVisibleAddForm(false);
  };

  useEffect(() => {
    loadWorksData();
  }, [page, search, sort]);

  return (
    <div>
      {formatData()}
      <Title level={3} style={{ marginBottom: "20px" }}>
        Danh sách công việc
      </Title>

      <ListContainer
        loading={loading}
        columns={columns}
        totalCount={data.totalCount}
        pageSize={pageSize}
        data={formatedData}
        rowKey={"id"}
        workId={workId}
        onChangeTable={handleOnChangeTable}
        onClickHandleDelete={handleOnDeleteWork}
        onChangeHandleSearch={handleOnSearchWork}
        onOpenDetailForm={handleOnOpenDetailForm}
        onOpenAddForm={handleOnOpenAddForm}
        onOpenUpdateForm={handleOnOpenUpdateForm}
      />

      <WorkDetail
        visitbleDetailForm={visitbleDetailForm}
        workId={workId}
        onCloseDetailForm={handleOnCloseDetailForm}
      />

      <WorkAdd
        visible={visitbleAddForm}
        onCloseAddWorkForm={handleOnCloseAddForm}
        workId={workId}
      />
    </div>
  );
};

export default WorkList;
