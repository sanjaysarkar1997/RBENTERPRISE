import { Divider, Input, Table, Tag, Typography, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import apis from "../apis/urls";
import { colorGenerator, company } from "../services/colorGenerator";
import { httpServicesGet } from "../services/httpServices";
import ReactExport from "react-export-excel";
import moment from "moment";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ViewStocks = (props) => {
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [productName, setProductName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [stocks, setStocks] = useState(undefined);
  const [companyName, setCompanyName] = useState("All");

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
      render: (MRP) => <label style={{ fontWeight: "800" }}> {MRP}</label>,
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
      render: (SP) => <label style={{ fontWeight: "800" }}> {SP}</label>,
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
          <b>₹ {Number(record).toFixed(2)}</b>
        </Tag>
      ),
      dataIndex: "totalValue",
      key: "GST",
    },
  ];

  const getColor = (number) => {
    let color = ["red", "#FFC107", "green"];
    if (number <= 50) {
      return color[0];
    } else if (number < 100) {
      return color[1];
    } else {
      return color[2];
    }
  };

  const getItems = async () => {
    let data = await httpServicesGet(apis.GET_ITEMS);
    for (let i = 0; i < data.length; i++) {
      data[i].totalValue = data[i].salePrice * data[i].stock;
    }
    setData(data);
    setFilteredData(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < filteredData.length; i++) {
      total = total + filteredData[i].salePrice * filteredData[i].stock;
    }
    return Number(total).toFixed(2);
  };

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

  function handleChange(value) {
    setStocks(value);
    console.log(`selected ${value}`);
  }

  function handleChangeCompany(value) {
    setCompanyName(value);
  }

  useEffect(() => {
    let filterData = data.filter((e) => {
      if (stocks === 100) {
        return e.stock >= 99;
      } else if (stocks === 99) {
        return e.stock >= 50 && e.stock < 100;
      } else if (stocks === 49) {
        return e.stock > 0 && e.stock < 50;
      } else {
        return e.stock <= stocks;
      }
    });

    setFilteredData(filterData);
  }, [stocks]);

  useEffect(() => {
    let filterData = data.filter((e) => {
      if (companyName === "All") {
        return e;
      } else {
        return e.companyName === companyName;
      }
    });

    setFilteredData(filterData);
  }, [companyName]);

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Stocks
      </Typography.Title>

      <div style={{ display: "flex" }}>
        <Input
          placeholder="Search Product"
          onChange={(e) => setProductName(e.target.value)}
        />
        &emsp;
        <Select
          style={{ width: 200 }}
          onChange={handleChangeCompany}
          placeholder="Select Company"
        >
          <Option value={"All"}>All</Option>
          {company.map((ele) => (
            <Option value={ele.name}>{ele.name}</Option>
          ))}
        </Select>
        &emsp;
        <Select
          style={{ width: 200 }}
          onChange={handleChange}
          placeholder="Select Stock Type"
        >
          <Option value={0}>No Stock</Option>
          <Option value={49}>1 to 50</Option>
          <Option value={99}>50 to 100</Option>
          <Option value={100}>Above 100</Option>
        </Select>
        &emsp;
        <ExcelFile
          element={<Button type="primary">Download</Button>}
          filename={`Stocks - ${companyName} - ${moment().format("DD MMM YYYY hh-mm a")}`}
        >
          <ExcelSheet data={filteredData} name={`Stocks`}>
            {columns.map((ele) => (
              <ExcelColumn label={ele.title} value={ele.dataIndex} />
            ))}
          </ExcelSheet>
        </ExcelFile>
      </div>
      <Divider></Divider>

      <Table
        columns={columns}
        dataSource={filteredData}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStocks);
