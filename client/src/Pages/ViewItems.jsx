import { Button, Table, Tag, Typography, Modal, Input, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import http from "../apis/instance";
import apis from "../apis/urls";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { httpServicesGet } from "../services/httpServices";
import { colorGenerator } from "../services/colorGenerator";

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
      title: "Company Name",
      dataIndex: "companyName",
      render: (name) => (
        <Tag color={colorGenerator(name).color} style={{ fontWeight: "600" }}>
          {name}
        </Tag>
      ),
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
      title: "Discount",
      dataIndex: "discount",
      render: (discount) => <label style={{ fontWeight: "800" }}>{discount}%</label>,
      key: "discount",
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

  const getItems = async () => {
    let data = await httpServicesGet(apis.GET_ITEMS);
    setData(data);
    setFilteredData(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const filterProducts = (filter) => {
    let filterData = data.filter(
      (e) =>
        e.productName.toLowerCase().includes(filter) ||
        e.productCode.toLowerCase().includes(filter)
    );
    setFilteredData(filterData);
  };

  useEffect(() => {
    filterProducts(productName.trim().toLowerCase());
  }, [productName]);

  // useEffect(() => {
  //   filterProducts(productName.trim().toLowerCase());
  // }, [filteredData]);

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Items
      </Typography.Title>
      <Input
        placeholder="Search Product"
        onChange={(e) => setProductName(e.target.value)}
      />
      <Divider></Divider>
      <Table
        columns={columns}
        dataSource={filteredData}
        size="small"
        rowKey="_id"
      />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBills);
