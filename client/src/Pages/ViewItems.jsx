import { Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";

export const ViewBills = (props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Product Code",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "MRP",
      dataIndex: "MRP",
      key: "productName",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
    },
  ];

  useEffect(() => {
    props.loading(true);
    http
      .get(apis.GET_ITEMS)
      .then((res) => {
        if (!res.data.error) {
          setData(res.data.results.product);
        }
      })
      .finally(() => props.loading(false));
  }, []);

  return (
    <div>
      <Typography.Title style={{ textAlign: "center" }} level={1}>
        View Items
      </Typography.Title>
      <Table columns={columns} dataSource={data} size="middle" />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loading };

export default connect(mapStateToProps, mapDispatchToProps)(ViewBills);
