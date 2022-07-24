import {
  Table,
  Typography,
  Button,
  Modal,
  Input,
  Divider,
  DatePicker,
  Row,
  Col,
  Pagination,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";
import moment from "moment";
import { httpServicesGet } from "../services/httpServices";
import http from "../apis/instance";
import { DeleteOutlined } from "@ant-design/icons";

import { ToWords } from "to-words";

const toWords = new ToWords();
const { RangePicker } = DatePicker;

const ViewBills = (props) => {
  const [filterData, setFilterData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    dateFilter: [],
    customerName: "",
  })

  const [total, setTotal] = useState(0)

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
      title: "Total",
      dataIndex: "products",
      key: "total",
      render: (data) => <span>₹ {getTotal(data)}</span>,
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
      title: "Edit",
      dataIndex: "_id",
      render: (record, test) => (
        <Button
          type="text"
          onClick={() => {
            window.location.href = `/update-bill/${record}`;
          }}
        >
          Edit
        </Button>
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

  const getTotal = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total = total + data[i].total;
    }
    return Number(total).toFixed(0);
  };

  const deleteBill = (id) => {
    http
      .post(apis.DELETE_BILL, { id: id })
      .then((res) => console.log(res))
      .finally(() => getBills());
  };

  const getBills = async () => {
    let data = await httpServicesGet(apis.VIEW_BILLS_PAGINATION + `?page=${pagination.current}&limit=${pagination.pageSize}&customerName=${pagination.customerName ? pagination.customerName : ""}`);
    setFilterData(data.bill);
    setTotal(data.docLength)
  };

  useEffect(() => {
    getBills();
  }, [pagination]);

  // const handleChange = (e) => {
  //   const filteredData = data.filter((ele) =>
  //     ele.customerName.includes(e.target.value.toUpperCase())
  //   );
  //   setFilterData(filteredData);
  // };

  // const rangePicker = (e) => {
  //   const filteredData = data.filter((ele) =>
  //     moment(ele.dateOfBilling).isBetween(e[0], e[1])
  //   );
  //   setFilterData(filteredData);
  // };

  // const getTotalAmount = (data) => {
  //   let total = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = 0; j < data?.[i].products?.length; j++) {
  //       total =
  //         total +
  //         getAmount(
  //           getTotalValue(
  //             data?.[i].products[j].salePrice.toFixed(2),
  //             data?.[i].products[j].quantity
  //           ),
  //           data?.[i].products[j].discount
  //         );
  //     }
  //   }
  //   total = total.toFixed(2);
  //   return Number(total);
  // };

  // const getTotalValue = (value, qty) => {
  //   value = Number(value);
  //   qty = Number(qty);
  //   return Number(Number(value * qty));
  // };

  // const getAmount = (total, discount) => {
  //   let amount = 0;
  //   total = Number(total);
  //   discount = Number(discount);
  //   amount = total - (total * discount) / 100;
  //   amount = amount.toFixed(2);
  //   return Number(amount);
  // };

  const handleChange = (e) => {
    setPagination({ ...pagination, [e.target.name]: e.target.value });
  }

  // const handleDateChange = (e) => {
  //   setPagination({ ...pagination, dateFilter: e });
  // }


  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Bills
      </Typography.Title>

      <Row>
        <Col span={24}>
          <Input
            type={"search"}
            name={"customerName"}
            placeholder={"Search By Name"}
            onChange={handleChange}
          />
        </Col>
        {/* <Col span={8} offset={1}>
          <RangePicker

            onChange={handleDateChange}
          />
        </Col> */}
      </Row>
      <Divider></Divider>
      <Table
        columns={columns}
        dataSource={filterData}
        size="small"
        rowKey="_id"
        pagination={false}
        footer={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >

            <div></div>
            <Pagination
              onChange={(page, pageSize) =>
                setPagination({
                  current: page,
                  pageSize: pageSize,
                })
              }
              pageSizeOptions={[10, 20, 30, 40, 50]}
              showSizeChanger
              total={total}
              current={pagination.current}
            />
          </div>
        )}
      />

    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, loading)(ViewBills);
