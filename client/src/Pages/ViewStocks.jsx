import { Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";

export const ViewStocks = (props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Product Code",
      dataIndex: "productCode",
      render: (Code) => <label style={{ fontWeight: "800" }}>{Code}</label>,
      key: "productCode",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (Code) => <label style={{ fontWeight: "500" }}>{Code}</label>,
      key: "productName",
    },
    {
      title: "MRP",
      dataIndex: "MRP",
      render: (MRP) => <label style={{ fontWeight: "800" }}>{MRP}</label>,
      key: "productName",
    },
    {
      title: "GST",
      dataIndex: "GST",
      render: (GST) => <label style={{ fontWeight: "800" }}>{GST}%</label>,
      key: "GST",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      render: (SP) => <label style={{ fontWeight: "800" }}>{SP}</label>,
      key: "salePrice",
    },
    {
      title: "STOCK",
      dataIndex: "stock",
      render: (stock) => (
        <Tag color="#fff" style={{ backgroundColor: getColor(stock) }}>
          <b>{stock}</b>
        </Tag>
      ),
      key: "GST",
    },
    {
      title: "Total Value",
      render: (record) => (
        <Tag color="#108ee9">
          <b>₹ {Number(record.salePrice * record.stock).toFixed(2)}</b>
        </Tag>
      ),
      key: "GST",
    },
  ];

  const getColor = (number) => {
    let color = ["red", "#FFC107", "green"];
    if (number < 20) {
      return color[0];
    } else if (number < 100) {
      return color[1];
    } else {
      return color[2];
    }
  };

  useEffect(() => {
    http.get(apis.GET_ITEMS).then((res) => {
      if (!res.data.error) {
        setData(res.data.results.products);
      }
    });
  }, []);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total = total + data[i].salePrice * data[i].stock;
    }
    return Number(total).toFixed(2);
  };

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Stocks
      </Typography.Title>
      <br />
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        rowKey="_id"
        footer={() => (
          <Typography.Title
            level={5}
            style={{ textAlign: "right", marginRight: "10px" }}
          >
            Total: {getTotal()}
          </Typography.Title>
        )}
      />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loading };

export default connect(mapStateToProps, mapDispatchToProps)(ViewStocks);
