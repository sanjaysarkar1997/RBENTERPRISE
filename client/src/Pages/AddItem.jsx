import {
  Form,
  Input,
  Button,
  Typography,
  InputNumber,
  Select,
  Row,
  Col,
} from "antd";
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
  const [companyName, setCompanyName] = useState("");

  const history = useHistory();

  const { id } = useParams();

  const getProduct = () => {
    http.get(apis.GET_ITEM + "/" + id).then((res) => {
      if (res.data.error) {
      } else {
        let product = res.data.results;
        setSKU(product.SKU);
        setCompanyName(product.companyName);

        form.setFieldsValue(product);
      }
    });
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const salePriceUpdate = (e) => {
    if (companyName === "Little Angel") {
      let MRP = form.getFieldValue("MRP");
      let disCom = form.getFieldValue("distributorCommission");
      let salePrice = Number((MRP / disCom / e).toFixed(2));
      form.setFieldsValue({ salePrice: salePrice });
    } else {
      let MRP = form.getFieldValue("MRP");
      let salePrice = Number((MRP / e).toFixed(2));
      form.setFieldsValue({ salePrice: salePrice });
    }
  };

  const netPriceUpdate = (e) => {
    let MRP = form.getFieldValue("MRP");
    let salePrice = 0;

    console.log(form.getFieldValue("companyName"));
    let disCom = form.getFieldValue("distributorCommission");
    let retailCom = form.getFieldValue("retailCommission");
    if (companyName === "Little Angel") {
      salePrice = MRP / disCom / retailCom;
    } else {
      salePrice = MRP / disCom;
    }

    let netPrice = Number((salePrice - (salePrice / 100) * e).toFixed(2));
    form.setFieldsValue({ netPrice: netPrice });
  };

  const gstUpdate = (e) => {
    let gst = Number((e / 2).toFixed(2));
    form.setFieldsValue({ sGST: gst, cGST: gst });
  };

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
      <Row gutter="24">
        <Col span="10">
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
        </Col>
        <Col span="10">
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
        </Col>
        <Col span="4">
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
            <Select onChange={(e) => setCompanyName(e)}>
              {company.map((ele) => (
                <Select.Option key={ele.name} value={ele.name}>
                  {ele.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="6">
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
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span="6">
          <Form.Item
            label="Distribution Commission (%)"
            name="distributorCommission"
            rules={[
              {
                required: true,
                message: "Please input your Distribution Commission!",
              },
            ]}
            // initialValue={1.2}
          >
            <InputNumber
              style={{ width: "100%" }}
              onChange={(e) => salePriceUpdate(e)}
            />
          </Form.Item>
        </Col>

        <Col span="6">
          <Form.Item
            label="Retail Commission (%)"
            name="retailCommission"
            rules={[
              {
                required: companyName === "Little Angel",
                message: "Please input your Discount!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled={companyName !== "Little Angel"}
              onChange={(e) => salePriceUpdate(e)}
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item
            label="Discount (%)"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your Discount!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              onChange={(e) => netPriceUpdate(e)}
            />
          </Form.Item>
        </Col>
        <Col span="8">
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
            <InputNumber disabled={id} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span="8">
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
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            label="Net Price"
            name="netPrice"
            rules={[
              {
                required: true,
                message: "Please input your Net Price!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            label="GST (%)"
            name="GST"
            rules={[
              {
                required: true,
                message: "Please input your GST!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              onChange={(e) => gstUpdate(e)}
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            label="SGST (%)"
            name="sGST"
            rules={[
              {
                required: true,
                message: "Please input your GST!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            label="CGST (%)"
            name="cGST"
            rules={[
              {
                required: true,
                message: "Please input your GST!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span="12">
          <Form.Item label="HSN Code" name="hsnCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Comment" name="comment">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <br />
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
