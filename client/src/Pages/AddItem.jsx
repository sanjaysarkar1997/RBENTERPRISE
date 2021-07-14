import { Form, Input, Button, Typography } from "antd";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";

const AddItem = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    props.loading(true);
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Typography.Title style={{ textAlign: "center" }} level={1}>
        Add Item
      </Typography.Title>
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
        label="MRP"
        name="MRP"
        rules={[
          {
            required: true,
            message: "Please input your password!",
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
            message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 12,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add
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
