import { Space, Spin } from "antd";
import React, { PureComponent, Suspense } from "react";

function LazyLoader(WrappedComponent) {
  return class Wrapped extends PureComponent {
    render() {
      return (
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Space size="large">
                <Spin size="large"></Spin>
              </Space>
            </div>
          }
        >
          <WrappedComponent {...this.props} />
        </Suspense>
      );
    }
  };
}

export default LazyLoader;
