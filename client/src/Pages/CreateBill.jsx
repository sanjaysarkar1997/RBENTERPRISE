import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  Typography,
  DatePicker,
  Table,
  InputNumber,
  Divider,
} from "antd";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import http from "../apis/instance";
import apis from "../apis/urls";
import moment from "moment";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { loading } from "../Redux/action/loading";

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

  useEffect(() => {
    http.get(apis.GET_ITEMS).then((res) => {
      if (res.data.error) {
      } else {
        setProducts(res.data.results.products);
      }
    });
  }, []);

  useEffect(() => {
    http.get(apis.GET_CUSTOMERS).then((res) => {
      if (res.data.error) {
      } else {
        setCustomers(res.data.results.customers);
      }
    });
  }, []);

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
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
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
    };

    data.push(obj);
    setDataSource(data);
    setIsModalVisible(false);
    setProduct({});
    setQuantity(0);
  };

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < dataSource.length; i++) {
      console.log(dataSource[i].total);
      total = total + dataSource[i].total;
    }
    return Number(total).toFixed(2);
  };

  const createBill = () => {
    props.loading(true);

    let data = customer;
    data.dateOfBilling = dateOfBilling;
    data.products = dataSource;

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
  };

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        Create Bill
      </Typography.Title>
      <div style={{ display: "flex" }}>
        <Select
          placeholder="Select Customer"
          style={{ width: "100%" }}
          onChange={handleCustomer}
          showSearch
        >
          {customers.map((ele, i) => (
            <Option value={ele?.customerName} key={i}>
              {ele.customerName + " - " + ele.Address1}
            </Option>
          ))}
        </Select>
        &emsp;
        <DatePicker
          format={"DD/MM/YYYY"}
          onChange={(e) => setDateOfBilling(e)}
          defaultValue={moment()}
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
          footer={() => (
            <Typography.Title
              level={5}
              style={{ textAlign: "right", marginRight: "50px" }}
            >
              Grand Total: {getTotal()}
            </Typography.Title>
          )}
          size="small"
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
        onClick={createBill}
      >
        Create
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
                  {products.map((ele, i) => (
                    <Option value={ele?.productCode} key={i}>
                      {ele.productCode + " - " + ele.productName}
                    </Option>
                  ))}
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
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loading };

export default connect(mapStateToProps, mapDispatchToProps)(CreateBill);
