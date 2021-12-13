import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  TableOutlined,
} from "@ant-design/icons";
import Routes from "./Routes";
import { Link } from "react-router-dom";

function Home(props) {
  const { Header, Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("");

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const getLoaded = async () => {};

  useEffect(() => {
    setKey(window.location.pathname);
    getLoaded();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={180}>
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          {!collapsed ? "R B ENTERPRISE" : "RB"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={key}
          onClick={(e) => setKey(e.key)}
        >
          <Menu.Item key="/add-new-item" icon={<PlusOutlined />}>
            <Link to="/add-new-item">Add Item</Link>
          </Menu.Item>
          <Menu.Item key="/view-items" icon={<TableOutlined />}>
            <Link to="/view-items">View Items</Link>
          </Menu.Item>
          <Menu.Item key="/add-stocks" icon={<PlusOutlined />}>
            <Link to="/add-stocks">Add Stocks</Link>
          </Menu.Item>
          <Menu.Item key="/view-stocks" icon={<TableOutlined />}>
            <Link to="/view-stocks">View Stocks</Link>
          </Menu.Item>
          <Menu.Item key="/add-bulk-stocks" icon={<PlusOutlined />}>
            <Link to="/add-bulk-stocks">Add Bulk Stocks</Link>
          </Menu.Item>
          <Menu.Item key="/view-entries" icon={<TableOutlined />}>
            <Link to="/view-entries">View Stocks Entries</Link>
          </Menu.Item>
          <Menu.Item key="/create-customer" icon={<PlusOutlined />}>
            <Link to="/create-customer">Create Customer</Link>
          </Menu.Item>
          <Menu.Item key="/view-customers" icon={<TableOutlined />}>
            <Link to="/view-customers">View Customers</Link>
          </Menu.Item>
          <Menu.Item key="/create-bill" icon={<PlusOutlined />}>
            <Link to="/create-bill">Create Bill</Link>
          </Menu.Item>
          <Menu.Item key="/view-bills" icon={<TableOutlined />}>
            <Link to="/view-bills">View Bills</Link>
          </Menu.Item>
          <Menu.Item key="/create-non-gst-bill" icon={<PlusOutlined />}>
            <Link to="/create-non-gst-bill">Create Non GST Bill</Link>
          </Menu.Item>
          <Menu.Item key="/view-non-gst-bills" icon={<TableOutlined />}>
            <Link to="/view-non-gst-bills">View Non GST Bills</Link>
          </Menu.Item>
          {/* <Menu.Item key="/sales-report" icon={<TableOutlined />}>
            <Link to="/sales-report">Sales Report</Link>
          </Menu.Item>
          <Menu.Item key="/customer-report" icon={<TableOutlined />}>
            <Link to="/customer-report">Customer Report</Link>
          </Menu.Item> */}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, display: "flex" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <h2
            style={{
              lineHeight: "64px",
              textAlign: "center",
              marginBottom: "0px",
              fontSize: "22px",
            }}
          >
            RB Enterprise
          </h2>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            height: 280,
            overflow: "auto",
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}

const mapToStateProps = (state) => ({});

export default connect(mapToStateProps, {})(Home);
