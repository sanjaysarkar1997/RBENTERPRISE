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

export const CreateBill = (props) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [dateOfBilling, setDateOfBilling] = useState(moment());
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

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

  const columns = [
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
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (discount) => <label>{discount}%</label>,
      key: "discount",
    },
    {
      title: "Net Price",
      dataIndex: "netPrice",
      key: "netRate",
    },
    {
      title: "GST",
      dataIndex: "gst",
      render: (gst) => <label>{gst}%</label>,
      key: "gst",
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
    if (product) {
      setProduct(product);
    }
  }

  const newDiscount = (e) => {
    let netPrice = Number(
      (product.salePrice - (product.salePrice / 100) * e).toFixed(2)
    );
    let discount = e;
    setProduct({ ...product, netPrice, discount });
  };

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
      salePrice: product.salePrice,
      netPrice: product.netPrice,
      total: Number((Number(product.netPrice) * Number(quantity)).toFixed(3)),
      productId: product._id,
      gst: product.GST,
      discount: product.discount,
      hsnCode: product.hsnCode,
      comment: product.comment,
      cGST: product.cGST,
      sGST: product.sGST,
      companyName: product.companyName,
      distributorCommission: product.distributorCommission,
    };

    data.push(obj);
    setDataSource(data);
    setIsModalVisible(false);
    setProduct({});
    setQuantity(0);
  };

  const deleteItem = (id) => {
    let data = dataSource;
    const filteredData = data.filter((ele) => ele.productId !== id);
    setDataSource(filteredData);
  };

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < dataSource.length; i++) {
      total = total + dataSource[i].total;
    }
    return Number(total).toFixed(2);
  };

  const createBill = () => {
    props.loading(true);

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
          .post(apis.CREATE_BILL, data)
          .then((res) => {
            if (res.data.error) {
              console.log(res);
            } else {
              Swal.fire("Success", "Bill Created Successfully", "success").then(
                () => history.push("/view-bills")
              );
            }
          })
          .finally(() => props.loading(false));
        console.log(data);
      } else {
        console.log("Error");
      }
    }
  };

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        {id ? "Update" : "Create"} Bill
      </Typography.Title>
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
          key={Object.keys(dataSource).length}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            defaultPageSize: 20,
            showSizeChanger: false,
          }}
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
        width={800}
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
              <td>Discount</td>
              <td>NP</td>
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
                <h5 style={{ margin: "0 5px" }}>
                  {product?.MRP ? product.MRP : 0}
                </h5>
              </td>
              <td>
                <h6 style={{ margin: "0 5px" }}>
                  {product?.salePrice ? product.salePrice : 0}
                </h6>
              </td>
              <td>
                <h6 style={{ margin: "0 5px" }}>
                  <InputNumber
                    min={0}
                    max={100}
                    value={product.discount}
                    onChange={(e) => newDiscount(e)}
                  />
                </h6>
              </td>
              <td>
                <h6 style={{ margin: "0 5px" }}>
                  {product?.netPrice ? product.netPrice : 0}
                </h6>
              </td>
              <td>
                <h6 style={{ margin: "0 5px" }}>
                  {" "}
                  {Number(
                    (Number(product.netPrice) * Number(quantity)).toFixed(3)
                  )
                    ? Number(
                        (Number(product.netPrice) * Number(quantity)).toFixed(3)
                      )
                    : 0}
                </h6>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loading };

export default connect(mapStateToProps, mapDispatchToProps)(CreateBill);
