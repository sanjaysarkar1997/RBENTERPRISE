import { Table } from "antd";
import React, { useEffect, useState } from "react";
import apis from "../apis/urls";
import { httpServicesGet } from "../services/httpServices";

export default function ViewCustomer() {
  const [dataSource, setDataSource] = useState([]);
  const getCustomers = async () => {
    let customers = await httpServicesGet(apis.GET_CUSTOMERS);
    setDataSource(customers);
  };
  useEffect(() => {
    getCustomers();
  }, []);
  const columns = [
    {
      title: "Sl No",
      render: (text, record, index) => <b>{index + 1}</b>,
    },
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
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        rowKey="_id"
      />
    </div>
  );
}
