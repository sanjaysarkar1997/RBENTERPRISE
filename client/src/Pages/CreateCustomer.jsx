import { Form, Input, Button, Typography } from "antd";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import http from "../apis/instance";
import apis from "../apis/urls";
import { loading } from "../Redux/action/loading";

const CreateCustomer = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.loading(true);
    http
      .post(apis.CREATE_CUSTOMER, values)
      .then((res) => {
        if (res.data.error) {
          console.log(res);
        } else {
          Swal.fire("Success", "Customer Addded", "success").then(() =>
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
        Create Customer
      </Typography.Title>

      <Form.Item
        label="Customer Name"
        name="customerName"
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
        label="Address 1"
        name="Address1"
        rules={[
          {
            required: true,
            message: "Please input your product code!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Address 2" name="Address2">
        <Input />
      </Form.Item>

      <Form.Item label="Mobile Number" name="mobileNumber">
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 12,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add Customer
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loading,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer);
