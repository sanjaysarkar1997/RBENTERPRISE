import { Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";
import moment from "moment";

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
          {moment(data).format("DD/MM/YYYY")}
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
        <a href={`/print/${record}`} target="_blank">
          View
        </a>
      ),
      key: "rate",
    },
  ];

  useEffect(() => {
    props.loading(true);
    http
      .get(apis.VIEW_BILLS)
      .then((res) => {
        if (!res.data.error) {
          setData(res.data.results.bill);
        }
      })
      .finally(() => props.loading(false));
  }, []);

  return (
    <div>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Bills
      </Typography.Title>
      <Table columns={columns} dataSource={data} size="small" />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loading };

export default connect(mapStateToProps, mapDispatchToProps)(ViewBills);
