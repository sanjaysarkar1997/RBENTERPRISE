import { Table, Typography, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";
import moment from "moment";
import { httpServicesGet } from "../services/httpServices";
import { DeleteOutlined } from "@ant-design/icons";
import http from "../apis/instance";

const ViewBills = (props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "dateOfBilling",
      render: (data) => (
        <p style={{ marginBottom: "0px" }}>
          {moment(data).format("DD MMM YYYY")}
        </p>
      ),
      key: "date",
    },
    {
      title: "Address",
      dataIndex: "Address1",
      key: "address",
    },

    {
      title: "View",
      dataIndex: "_id",
      render: (record, test) => (
        <a href={`/print/${record}`} target="_blank" rel="noreferrer">
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
    let data = await httpServicesGet(apis.VIEW_BILLS);
    setData(data);
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Bills
      </Typography.Title>
      <Table columns={columns} dataSource={data} size="small" rowKey="_id" />
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, loading)(ViewBills);
