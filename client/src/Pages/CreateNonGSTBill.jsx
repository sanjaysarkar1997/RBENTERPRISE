import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Typography,
  DatePicker,
  Table,
  InputNumber,
  Divider,
  Modal,
  Input,
} from "antd";
import { connect } from "react-redux";
import http from "../apis/instance";
import apis from "../apis/urls";
import moment from "moment";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { loading } from "../Redux/action/loading";
import customId from "../services/customId";
import { httpServicesGet } from "../services/httpServices";
import store from "../store";
import Checkbox from "antd/lib/checkbox/Checkbox";

export const CreateNonGSTBill = (props) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [dateOfBilling, setDateOfBilling] = useState(moment());
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [key, setKey] = useState([]);
  const [isGiftVisible, setIsGiftVisible] = useState(false);
  const [voucher, setVoucher] = useState({});

  const history = useHistory();

  const { id } = useParams();

  const getBills = async () => {
    let data = await httpServicesGet(apis.VIEW_BILL + "/" + id);
    setCustomer({
      customerName: data.customerName,
      Address1: data.Address1,
      Address2: data.Address2,
      mobileNumber: data.mobileNumber,
      _id: data._id,
    });
    setDataSource(data.products);
    setDateOfBilling(data.dateOfBilling);
  };

  useEffect(() => {
    if (id) {
      getBills();
    }
  }, [id]);

  const handleOk = () => {
    setIsModalVisible(false);
    setProduct({});
    setQuantity(0);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setProduct({});
    setQuantity(0);
  };

  const getItems = async () => {
    let data = await httpServicesGet(apis.GET_ITEMS);
    setProducts(data);
  };

  useEffect(() => {
    getCustomer();
    getItems();
  }, []);

  const getCustomer = async () => {
    let data = await httpServicesGet(apis.GET_CUSTOMERS);
    setCustomers(data);
  };

  const initiatedFree = (id) => {
    let data = dataSource;
    for (let i = 0; i < data.length; i++) {
      if (data[i].productId === id) {
        data[i].isFree = !data[i].isFree;
        data[i].rate = 0;
        data[i].total = 0;
      }
    }
    console.log(data);
    setDataSource(data);
    setKey((prev) => [...prev, 0]);
  };

  const columns = [
    {
      title: "Free",
      render: (record) => (
        <Checkbox
          value={record.productId}
          defaultChecked={record.isFree}
          onChange={() => initiatedFree(record.productId)}
          disabled={record.isFree}
        >
          Free
        </Checkbox>
      ),
      key: "_id",
    },
    {
      title: "Particular",
      dataIndex: "particular",
      key: "particular",
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Edit",
      render: (record) => (
        <Button type="primary" onClick={() => deleteItem(record.productId)}>
          Delete
        </Button>
      ),
      key: "_id",
    },
  ];

  function handleChange(value) {
    let product = products.find((ele) => ele.productCode === value);
    setProduct(product);
  }

  function handleCustomer(value) {
    let customer = customers.find((ele) => ele.customerName === value);
    console.log(customer);
    setCustomer(customer);
  }

  const addProduct = () => {
    let data = dataSource;

    let obj = {
      particular: product.productCode,
      mrp: product.MRP,
      quantity: quantity,
      rate: product.salePrice,
      total: Number((Number(product.salePrice) * Number(quantity)).toFixed(3)),
      productId: product._id,
      gst: product.GST,
      isFree: false,
      isVoucher: false,
    };

    data.push(obj);
    setDataSource(data);
    setIsModalVisible(false);
    setProduct({});
    setQuantity(0);
    setKey((prev) => [...prev, 0]);
  };

  const addVoucher = () => {
    let data = dataSource;
    let obj = {
      particular: voucher.name,
      mrp: 0,
      quantity: 1,
      rate: voucher.price,
      total: voucher.price,
      productId: customId(10),
      gst: 0,
      isFree: true,
      isVoucher: true,
    };
    data.push(obj);
    setIsGiftVisible(false);
    setVoucher({});
    setDataSource(data);
    setKey((prev) => [...prev, 0]);
  };

  const deleteItem = (id) => {
    let data = dataSource;
    const filteredData = data.filter((ele) => ele.productId !== id);
    setDataSource(filteredData);
  };

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].isVoucher) {
        total = total - dataSource[i].total;
      } else {
        total = total + dataSource[i].total;
      }
    }
    return Number(total).toFixed(2);
  };

  const createBill = () => {
    store.dispatch(loading(true));

    if (id) {
    } else {
      let data = customer;
      data.dateOfBilling = dateOfBilling;
      data.billNo = customId(6);
      data.products = dataSource;
      delete data.__v;
      delete data._id;

      if (Object.keys(data).length > 0) {
        http
          .post(apis.CREATE_NON_GST_BILL, data)
          .then((res) => {
            if (res.data.error) {
              console.log(res);
            } else {
              Swal.fire("Success", "Bill Created Successfully", "success").then(
                () => history.push("/view-non-gst-bills")
              );
            }
          })
          .finally(() => store.dispatch(loading(false)));
        console.log(data);
      } else {
        console.log("Error");
      }
    }
  };

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        {id ? "Update" : "Create Non GST"} Bill
      </Typography.Title>
      {console.log(customer)}
      <div style={{ display: "flex" }}>
        <Select
          placeholder="Select Customer"
          style={{ width: "100%" }}
          onChange={handleCustomer}
          defaultValue={customer.customerName}
          showSearch
          key={customer.customerName}
        >
          {customers.map((ele, i) => (
            <Option value={ele?.customerName} key={i}>
              {ele.customerName + " - " + ele.Address1}
            </Option>
          ))}
        </Select>
        &emsp;
        <DatePicker
          key={customer.dateOfBilling}
          format={"DD/MM/YYYY"}
          onChange={(e) => setDateOfBilling(e)}
          value={dateOfBilling}
          // disabled={id !== undefined}
        />
      </div>
      <br />
      <Divider style={{ margin: "10px 0px" }}></Divider>
      <Typography.Title style={{ textAlign: "center" }} level={4}>
        Products
      </Typography.Title>
      {Object.keys(dataSource).length !== 0 && (
        <Table
          key={key.length}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            defaultPageSize: 20,
            showSizeChanger: false,
          }}
          s
          footer={() => (
            <Typography.Title
              level={5}
              style={{ textAlign: "right", marginRight: "50px" }}
            >
              Grand Total: {getTotal()}
            </Typography.Title>
          )}
          size="small"
          rowKey="productId"
        />
      )}
      <div>
        <Button
          style={{ display: "block", margin: "auto" }}
          type="ghost"
          onClick={() => setIsModalVisible(true)}
        >
          Add Product
        </Button>
      </div>

      <div>
        <Button
          style={{ display: "block", margin: "20px  auto" }}
          type="ghost"
          onClick={() => setIsGiftVisible(true)}
        >
          Add Gift
        </Button>
      </div>

      <br />
      <Button
        type="primary"
        style={{ display: "block", margin: "auto" }}
        onClick={() =>
          Modal.confirm({
            title: "Confirm",
            icon: "",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: () => createBill(),
          })
        }
        disabled={Object.keys(customer).length === 0 || dataSource.length === 0}
      >
        {id ? "Update" : "Create"}
      </Button>

      <Modal
        title="Add Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => addProduct()}>
            Add
          </Button>,
        ]}
      >
        <table className="table">
          <thead>
            <tr>
              <td>Select Product</td>
              <td>Quantity</td>
              <td>MRP</td>
              <td>SP</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <Select
                  placeholder="Search Product"
                  style={{ width: 200 }}
                  onChange={handleChange}
                  showSearch
                >
                  {products.map((ele, i) => {
                    if (ele.stock) {
                      return (
                        <Option value={ele?.productCode} key={i}>
                          {ele.productCode + " - " + ele.productName}
                        </Option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Select>
              </td>

              <td>
                <InputNumber
                  min={1}
                  max={product.stock}
                  onChange={(e) => setQuantity(e)}
                />
              </td>
              <td>
                <h3 style={{ margin: "0 5px" }}>
                  {product?.MRP ? product.MRP : 0}
                </h3>
              </td>
              <td>
                <h3 style={{ margin: "0 5px" }}>
                  {product?.salePrice ? product.salePrice : 0}
                </h3>
              </td>
              <td>
                <h3 style={{ margin: "0 5px" }}>
                  {" "}
                  {Number(
                    (Number(product.salePrice) * Number(quantity)).toFixed(3)
                  )
                    ? Number(
                        (Number(product.salePrice) * Number(quantity)).toFixed(
                          3
                        )
                      )
                    : 0}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
      <Modal
        title="Add Gift Card"
        visible={isGiftVisible}
        onOk={() => setIsGiftVisible(false)}
        onCancel={() => setIsGiftVisible(false)}
        width={700}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => addVoucher()}>
            Add
          </Button>,
        ]}
      >
        <div style={{ display: "flex" }}>
          <Input
            placeholder="Name"
            onChange={(e) =>
              setVoucher((ele) => ({ ...ele, name: e.target.value }))
            }
            value={voucher.name}
          />
          &emsp;
          <InputNumber
            placeholder="Amount"
            min={1}
            style={{ width: "300px" }}
            value={voucher.price}
            onChange={(e) => setVoucher((ele) => ({ ...ele, price: e }))}
          />
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loading };

export default connect(mapStateToProps, mapDispatchToProps)(CreateNonGSTBill);
