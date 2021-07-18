import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Divider, InputNumber, Select, Typography, Form } from "antd";
import Swal from "sweetalert2";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";
import { httpServicesGet } from "../services/httpServices";

const { Option } = Select;

export const AddStocks = (props) => {
  const [form] = Form.useForm();

  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const getProducts = async () => {
    let data = await httpServicesGet(apis.GET_ITEMS);
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  function handleChange(value) {
    let product = products.find((ele) => ele.productCode === value);
    setProduct(product);
  }

  const onFinish = (values) => {
    values._id = product._id;
    console.log(values);
    // props.loading(true);
    http.post(apis.UPDATE_STOCK, values).then((res) => {
      if (res.data.error) {
        console.log(res);
      } else {
        Swal.fire("Success", "Stock Updated", "success")
          .then(() => form.resetFields())
          .then(() => history.push("/view-stocks"));
      }
    });
    //   .finally(() => props.loading(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        Add Stocks
      </Typography.Title>

      <br />
      <Select
        placeholder="Select Product"
        style={{ width: "100%" }}
        onChange={handleChange}
        showSearch
      >
        {products.map((ele, i) => (
          <Option value={ele?.productCode} key={i}>
            {ele.productCode + " - " + ele.productName}
          </Option>
        ))}
      </Select>
      <Divider></Divider>
      {Object.keys(product).length > 0 && (
        <Form
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          {console.log(product)}
          <Typography.Title level={5} style={{ textAlign: "center" }}>
            {product.productCode} - {product.productName}
          </Typography.Title>
          <Typography.Title
            level={5}
            style={{ textAlign: "center", marginTop: ".5px" }}
          >
            Remaining - {product.stock} pcs
          </Typography.Title>
          <br />
          <Form.Item
            label="Add Stocks"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input your GST!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add Stocks
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {
//   loading,
// };
function mapDispatchToProps(dispatch) {
  return {
    loading: () => dispatch(loading()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStocks);
