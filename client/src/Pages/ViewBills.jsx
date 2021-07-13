import { Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import http from "../apis/instance";
import apis from "../apis/urls";

export const ViewBills = (props) => {
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
      key: "date",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "address",
    },
    {
      title: "View",
      dataIndex: "_id",
      render: (record, test) => (
        <a href={`/print/${record}`} target="_blank">
          View
        </a>
      ),
      key: "rate",
    },
  ];

  useEffect(() => {
    http.get(apis.VIEW_BILLS).then((res) => {
      if (!res.data.error) {
        setData(res.data.results.bill);
      }
    });
  }, []);

  return (
    <div>
      <Typography.Title style={{ textAlign: "center" }} level={1}>
        View Bills
      </Typography.Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBills);
