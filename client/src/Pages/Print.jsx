import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import moment from "moment";
import http from "../apis/instance";
import apis from "../apis/urls";

export default function Print() {
  const { id } = useParams();
  const [printDetails, setPrintDetails] = useState({});
  console.log(id);
  useEffect(() => {
    http.get(apis.VIEW_BILL + "/" + id).then((res) => {
      if (!res.data.error) {
        setPrintDetails(res.data.results.bill);
      }
    });
  }, [id]);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < printDetails?.products?.length; i++) {
      total = total + printDetails?.products[i].total;
    }
    return Number(total).toFixed(2);
  };

  return (
    <div class="container-fluid">
      <div style={{ display: "flex" }}>
        {/* {data.map((ele) => ( */}
        <div class="card" style={{ width: "100%" }}>
          <div
            class="card-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              Bill No:&emsp;
              <strong>{printDetails?.billNo}</strong>
            </div>
            <div>
              Date: {moment(printDetails?.dateOfBilling).format("DD/MM/YYYY")}
            </div>
          </div>
          <div class="card-body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h6 class="mb-3">From:</h6>
                <div>
                  <strong>R B ENTERPRISE</strong>
                </div>
                <div>Ashutosh Pally</div>
                <div>FALAKATA, Alipurduar</div>
                <div>Phone: 8101397644</div>
                <div>
                  GST NO: <b>19AIAPB3656R1ZV</b>
                </div>
              </div>

              <div>
                <h6 class="mb-3">To:</h6>
                <div>
                  <strong>{printDetails?.customerName}</strong>
                </div>
                <div>{printDetails?.Address}</div>
              </div>
              <div>
                <h6 class="mb-3" style={{ textAlign: "right" }}>
                  Scan to view:
                </h6>
                <div style={{ textAlign: "right" }}>
                  <QRCode value={window.location.href} size={100} />
                </div>
              </div>
            </div>
            <br />

            <div class="table-responsive-sm">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="center">#</th>
                    <th>Particular</th>
                    <th class="right">MRP</th>
                    <th class="center">Qty</th>
                    <th>Rate</th>
                    <th class="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {printDetails?.products?.map((ele, i) => (
                    <tr>
                      <td style={{ padding: "0px 3px" }} class="center">
                        {i + 1}
                      </td>
                      <td style={{ padding: "0px 3px" }} class="left strong">
                        {ele.particular}
                      </td>
                      <td style={{ padding: "0px 3px" }} class="right">
                        ₹ {ele.mrp}
                      </td>
                      <td style={{ padding: "0px 3px" }} class="center">
                        {ele.quantity}
                      </td>
                      <td style={{ padding: "0px 3px" }} class="right">
                        ₹ {ele.rate}
                      </td>
                      <td style={{ padding: "0px 3px" }} class="right">
                        ₹{" "}
                        {Number(
                          (Number(ele.rate) * Number(ele.quantity)).toFixed(3)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div>
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left">
                        <strong>Grand Total</strong>
                      </td>
                      <td class="right">
                        <strong>₹ {getTotal()}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br />
            <br />

            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "200px" }}>
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left">{/* <strong>Grand Total</strong> */}</td>
                      <td class="right"></td>
                    </tr>
                  </tbody>
                </table>
                <p className="ml-center" style={{ textAlign: "center" }}>
                  Customer Signature
                </p>
              </div>

              <div style={{ width: "200px" }}>
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left">{/* <strong>Grand Total</strong> */}</td>
                      <td class="right"></td>
                    </tr>
                  </tbody>
                </table>
                <p className="ml-center" style={{ textAlign: "center" }}>
                  Signature
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}
