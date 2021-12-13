import { Button, Modal, Typography, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import apis from "../apis/urls";
import { httpServicesGet } from "../services/httpServices";
import http from "../apis/instance";

export const ViewEntries = (props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Date Of Entry",
      dataIndex: "dateOfBilling",
      render: (data) => (
        <p style={{ marginBottom: "0px" }}>
          {moment(data).format("DD MMM YYYY")}
        </p>
      ),
      key: "date",
    },
    {
      title: "View",
      dataIndex: "_id",
      render: (record, test) => (
        <a href={`/view-entry/${record}`} target="_blank" rel="noreferrer">
          View
        </a>
      ),
      key: "rate",
    },
    {
      title: "Delete",
      render: (record) => (
        <Button
          type="text"
          onClick={function confirm() {
            Modal.confirm({
              title: "Confirm",
              icon: "",
              okText: "Yes",
              cancelText: "Cancel",
              onOk: () => deleteBill(record._id),
            });
          }}
        >
          <DeleteOutlined />
        </Button>
      ),
      key: "GST",
    },
  ];

  const deleteBill = (id) => {
    http
      .post(apis.DELETE_BILL, { id: id })
      .then((res) => console.log(res))
      .finally(() => getBills());
  };

  const getBills = async () => {
    let data = await httpServicesGet(apis.VIEW_ENTRIES);
    setData(data);
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Bulk Entries
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={data.reverse()}
        size="small"
        rowKey="_id"
      />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEntries);
