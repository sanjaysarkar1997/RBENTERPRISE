import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
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

  useEffect(() => {
    setKey(window.location.pathname);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          {!collapsed ? " R B ENTERPRISE" : "RB"}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={key}>
          <Menu.Item
            key="/add-new-item"
            icon={<UserOutlined />}
            onClick={() => setKey("/add-new-item")}
          >
            <Link to="/add-new-item">Add Item</Link>
          </Menu.Item>
          <Menu.Item
            key="/view-items"
            icon={<UserOutlined />}
            onClick={() => setKey("/view-items")}
          >
            <Link to="/view-items">View Items</Link>
          </Menu.Item>
          <Menu.Item
            key="/create-bill"
            active={key === "/create-bill"}
            icon={<VideoCameraOutlined />}
            onClick={() => setKey("/create-bill")}
          >
            <Link to="/create-bill">Create Bill</Link>
          </Menu.Item>
          <Menu.Item
            key="/view-bills"
            onClick={() => setKey("/view-bills")}
            icon={<UploadOutlined />}
          >
            <Link to="/view-bills">View Bills</Link>
          </Menu.Item>
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
          <h2 style={{ lineHeight: "64px", textAlign: "center" }}>
            RB Enterprise
          </h2>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
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
