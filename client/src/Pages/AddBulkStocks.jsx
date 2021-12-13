import {
  Button,
  Divider,
  InputNumber,
  Modal,
  Typography,
  Select,
  Table,
  DatePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import apis from "../apis/urls";
import { httpServicesGet } from "../services/httpServices";
import { loading } from "../Redux/action/loading";
import customId from "../services/customId";
import http from "../apis/instance";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import store from "../store";

export const AddBulkStocks = (props) => {
  const { Option } = Select;

  const history = useHistory();

  const { id } = useParams();

  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [dateOfEntry, setDateOfEntry] = useState(moment());

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
      title: "GST",
      dataIndex: "gst",
      render: (gst) => <label>{gst}%</label>,
      key: "gst",
    },
    {
      title: "Net Amount",
      dataIndex: "netPrice",
      key: "netRate",
    },
    {
      title: "Total Net Amount",
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

  const getItems = async () => {
    let data = await httpServicesGet(apis.GET_ITEMS);
    setProducts(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const deleteItem = (id) => {
    let data = dataSource;
    const filteredData = data.filter((ele) => ele.productId !== id);
    setDataSource(filteredData);
  };

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

  const addProduct = () => {
    let data = dataSource;

    let obj = {
      particular: product.productCode,
      desc: product.productName,
      mrp: product.MRP,
      quantity: quantity,
      salePrice: product.salePrice,
      netPrice: product.netPrice,
      total: Number((Number(product.netPrice) * Number(quantity)).toFixed(2)),
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

    console.log(obj);

    data.push(obj);
    setDataSource(data);
    setIsModalVisible(false);
    setProduct({});
    setQuantity(0);
  };

  function handleChange(value) {
    let product = products.find(
      (ele) => ele?.productCode + " " + ele?.productName === value
    );
    if (product) {
      setProduct(product);
    }
  }

  const createEntry = () => {
    store.dispatch(loading(true));

    if (id) {
    } else {
      let data = {};
      data.dateOfBilling = dateOfEntry;
      data.entryNo = customId(6);
      data.products = dataSource;
      delete data.__v;
      delete data._id;

      if (Object.keys(data).length > 0) {
        http
          .post(apis.CREATE_ENTRY, data)
          .then((res) => {
            if (res.data.error) {
              console.log(res);
            } else {
              Swal.fire(
                "Success",
                "Entry Created Successfully",
                "success"
              ).then(() => history.push("/view-entries"));
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
        Add Bulk Stocks
      </Typography.Title>

      <DatePicker
        style={{ width: "100%" }}
        format={"DD/MM/YYYY"}
        onChange={(e) => setDateOfEntry(e)}
        value={dateOfEntry}
        // disabled={id !== undefined}
      />
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
            ></Typography.Title>
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
            onOk: () => createEntry(),
          })
        }
        disabled={dataSource.length === 0}
      >
        Create
      </Button>

      <Modal
        title="Add Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            disabled={!quantity}
            type="primary"
            onClick={() => addProduct()}
          >
            Add
          </Button>,
        ]}
      >
        <table className="table">
          <thead>
            <tr>
              <td style={{ width: "300px" }}>Select Product</td>
              <td>Quantity</td>
              <td>MRP</td>
              <td>Rate</td>
              <td>Amount</td>
              <td>Net Amount</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <Select
                  placeholder="Search Product"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  showSearch
                >
                  {products.map((ele, i) => {
                    return (
                      <Option
                        value={ele?.productCode + " " + ele?.productName}
                        key={`product-${i}`}
                      >
                        {ele.productCode + " - " + ele.productName}
                      </Option>
                    );
                  })}
                </Select>
              </td>

              <td>
                <InputNumber min={1} onChange={(e) => setQuantity(e)} />
              </td>
              <td>
                <h5 style={{ margin: "0 5px" }}>
                  {product?.MRP ? product.MRP : 0}
                </h5>
              </td>
              <td>
                <h6 style={{ margin: "0 5px" }}>
                  {product?.salePrice
                    ? Number(product.salePrice.toFixed(2))
                    : 0}
                </h6>
              </td>

              <td>
                <h6 style={{ margin: "0 5px" }}>
                  {product?.netPrice ? Number(product.netPrice.toFixed(2)) : 0}
                </h6>
              </td>
              <td>
                <h6 style={{ margin: "0 5px" }}>
                  {" "}
                  {Number(
                    (Number(product.netPrice) * Number(quantity)).toFixed(2)
                  )
                    ? Number(
                        (Number(product.netPrice) * Number(quantity)).toFixed(2)
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBulkStocks);
