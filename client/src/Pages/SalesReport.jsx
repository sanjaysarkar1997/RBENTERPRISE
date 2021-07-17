import React from "react";
import { Typography } from "antd";
import { Line } from "@ant-design/charts";
import { connect } from "react-redux";

export const SalesReport = (props) => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 1000,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "circle",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        Sales Report
      </Typography.Title>
      <Line {...config} style={{ height: "65vh" }} />;
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);
