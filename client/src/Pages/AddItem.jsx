import { Form, Input, Button, Typography, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";
import { company } from "../services/colorGenerator";
import customId from "../services/customId";

const AddItem = (props) => {
  const [form] = Form.useForm();
  const [SKU, setSKU] = useState("");
  const history = useHistory();

  const { id } = useParams();

  const getProduct = () => {
    http.get(apis.GET_ITEM + "/" + id).then((res) => {
      if (res.data.error) {
      } else {
        let product = res.data.results;
        setSKU(product.SKU);

        form.setFieldsValue(product);
      }
    });
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const onFinish = (values) => {
    // props.loading(true);
    if (id) {
      values.SKU = SKU;
      values.id = id;
      http
        .post(apis.UPDATE_ITEM, values)
        .then((res) => {
          if (res.data.error) {
            console.log(res);
          } else {
            Swal.fire("Success", "Item Updated", "success").then(() =>
              history.push("/view-items")
            );
          }
        })
        .finally(() => props.loading(false));
    } else {
      values.SKU = customId(10);
      http
        .post(apis.ADD_ITEM, values)
        .then((res) => {
          if (res.data.error) {
            console.log(res);
          } else {
            Swal.fire("Success", "Item Addded", "success").then(() =>
              form.resetFields()
            );
          }
        })
        .finally(() => props.loading(false));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        {id ? "Update " : "Add "}Item
      </Typography.Title>
      <br />
      <Form.Item
        label="Product Name"
        name="productName"
        rules={[
          {
            required: true,
            message: "Please input your product name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Product Code"
        name="productCode"
        rules={[
          {
            required: true,
            message: "Please input your product code!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[
          {
            required: true,
            message: "Please input your product code!",
          },
        ]}
      >
        <Select>
          {company.map((ele) => (
            <Select.Option value={ele.name}>{ele.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="MRP"
        name="MRP"
        rules={[
          {
            required: true,
            message: "Please input your MRP!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Sale Price"
        name="salePrice"
        rules={[
          {
            required: true,
            message: "Please input your Sale Price!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Stock"
        name="stock"
        rules={[
          {
            required: true,
            message: "Please input your Stock!",
          },
        ]}
      >
        <InputNumber disabled={id} />
      </Form.Item>
      <Form.Item
        label="Good & Service Tax"
        name="GST"
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
        label="Discount"
        name="discount"
        rules={[
          {
            required: true,
            message: "Please input your Discount!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {id ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
