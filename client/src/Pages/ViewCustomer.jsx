import { Button, Table, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apis from "../apis/urls";
import { DeleteOutlined } from "@ant-design/icons";
import { httpServicesGet, httpServicesPost } from "../services/httpServices";
import Swal from "sweetalert2";

export default function ViewCustomer() {
  const [dataSource, setDataSource] = useState([]);
  const getCustomers = async () => {
    let customers = await httpServicesGet(apis.GET_CUSTOMERS);
    setDataSource(customers);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    let deleted = await httpServicesPost(apis.DELETE_CUSTOMER, { id }, {});
    if (Object.keys(deleted).length > 0) {
      Swal.fire("Success", "Customer Deleted Successfully", "success").then(
        () => getCustomers()
      );
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Address",
      dataIndex: "Address1",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      render: (number) => <label>{number ? number : "NA"}</label>,
    },
    {
      title: "Update",
      dataIndex: "_id",
      render: (id) => <Link to={`/update-customer/${id}`}>Update</Link>,
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
              onOk: () => deleteCustomer(record._id),
            });
          }}
        >
          <DeleteOutlined />
        </Button>
      ),
      key: "GST",
    },
  ];
  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        View Customers
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        rowKey="_id"
      />
    </>
  );
}
