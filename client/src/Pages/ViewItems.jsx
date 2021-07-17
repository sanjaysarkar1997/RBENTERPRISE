import { Button, Table, Tag, Typography, Modal, Input, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const ViewBills = (props) => {
  const [data, setData] = useState([]);
  const [productName, setProductName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
      title: "Stock",
      dataIndex: "stock",
      render: (stock) => (
        <Tag color="#fff" style={{ backgroundColor: getColor(stock) }}>
          <b>{stock}</b>
        </Tag>
      ),
      key: "GST",
    },
    {
      title: "Update",
      dataIndex: "_id",
      render: (id) => <Link to={`/update-item/${id}`}>Update</Link>,
      key: "GST",
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
              onOk: () => deleteProduct(record._id),
            });
          }}
        >
          <DeleteOutlined />
        </Button>
      ),
      key: "GST",
    },
  ];

  const deleteProduct = (id) => {
    console.log(id);
    http
      .post(apis.DELETE_ITEM, { id: id })
      .then((res) => console.log(res))
      .finally(() => getItems());
  };

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

  const getItems = () => {
    console.log(props);
    props.loading(true);
    http
      .get(apis.GET_ITEMS)
      .then((res) => {
        if (!res.data.error) {
          setData(res.data.results.products);
          setFilteredData(res.data.results.products);
        }
      })
      .finally(() => props.loading(false));
  };

  useEffect(() => {
    getItems();
  }, []);

  const filterProducts = (filter) => {
    let filterData = data.filter(
      (e) =>
        e.productName.toLowerCase().includes(productName) ||
        e.productCode.toLowerCase().includes(productName)
    );

    setFilteredData(filterData);
  };

  useEffect(() => {
    filterProducts(productName.trim().toLowerCase());
  }, [productName]);

  return (
    <div>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Items
      </Typography.Title>
      <Input
        placeholder="Search Product"
        onChange={(e) => setProductName(e.target.value)}
      />
      <Divider></Divider>
      <Table columns={columns} dataSource={filteredData} size="small" />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loading };

export default connect(mapStateToProps, mapDispatchToProps)(ViewBills);