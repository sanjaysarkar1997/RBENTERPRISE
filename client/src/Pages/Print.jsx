import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import moment from "moment";
import http from "../apis/instance";
import apis from "../apis/urls";
import { ToWords } from "to-words";

const toWords = new ToWords();
export default function Print() {
  const { id } = useParams();
  const [printDetails, setPrintDetails] = useState({});

  useEffect(() => {
    http.get(apis.VIEW_BILL + "/" + id).then((res) => {
      if (!res.data.error) {
        setPrintDetails(res.data.results);
      }
    });
  }, [id]);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < printDetails?.products?.length; i++) {
      total = total + printDetails?.products[i].total;
    }
    return Number(Number(total).toFixed(2));
  };

  const getTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < printDetails?.products?.length; i++) {
      total =
        total +
        getTotalValue(
          printDetails?.products[i].salePrice,
          printDetails?.products[i].quantity
        );
    }
    return Number(total).toFixed(2);
  };

  const getTotalValue = (value, qty) => {
    value = Number(value);
    qty = Number(qty);
    return Number(Number(value * qty).toFixed(2));
  };

  const getGSTValue = () => {
    let gstTotal = 0;
    for (let i = 0; i < printDetails?.products?.length; i++) {
      if (printDetails?.products[i].gst) {
        gstTotal =
          gstTotal +
          getTotalValue(
            printDetails?.products[i].salePrice,
            printDetails?.products[i].quantity
          ) *
            (printDetails?.products[i].gst / 100);
      }
    }
    return Number(Number(gstTotal / 2).toFixed(2));
  };

  return (
    <div className="container-fluid print">
      <div style={{ display: "flex" }}>
        <div className="card" style={{ width: "100%" }}>
          <div
            className="card-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              Bill No :&nbsp;
              <strong>{printDetails?.billNo}</strong>
            </div>
            <div>
              Date: {moment(printDetails?.dateOfBilling).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h6 className="mb-2" style={{ fontSize: "14px" }}>
                  From:
                </h6>
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
                <h6 className="mb-2" style={{ fontSize: "14px" }}>
                  To:
                </h6>
                <div>
                  <strong>{printDetails?.customerName}</strong>
                </div>
                <div>{printDetails?.Address1}</div>
                <div>{printDetails?.Address2}</div>
                <div>
                  <b>{printDetails?.mobileNumber}</b>
                </div>
                {printDetails?.gstNumber && (
                  <div>
                    GST NO: <b>{printDetails?.gstNumber}</b>
                  </div>
                )}
              </div>
              <div>
                <h6 className="mb-3" style={{ textAlign: "right" }}>
                  Scan to view:
                </h6>
                <div style={{ textAlign: "right" }}>
                  <QRCode value={window.location.href} size={100} />
                </div>
              </div>
            </div>
            <br />

            <div className="table-responsive-sm">
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th style={{ minWidth: "200px" }}>Particular</th>
                    <th className="right">MRP</th>
                    <th>HSN Code</th>
                    <th className="center" style={{ maxWidth: "40px" }}>
                      Qty.(pcs)
                    </th>
                    <th className="right" style={{ maxWidth: "40px" }}>
                      Disc. (%)
                    </th>
                    <th style={{ maxWidth: "40px" }}>GST (%)</th>
                    <th>Amount</th>
                    <th>Net. Amt. </th>
                    {/* <th className="right">Total</th> */}
                  </tr>
                </thead>
                <tbody>
                  {printDetails?.products?.map((ele, i) => (
                    <tr key={i}>
                      <td style={{ padding: "1px 4px" }} className="center">
                        {i + 1}
                      </td>
                      <td
                        style={{ padding: "1px 4px" }}
                        className="left strong"
                      >
                        {ele.particular} - {ele.desc}
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {ele.mrp}
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {ele.hsnCode}
                      </td>
                      <td style={{ padding: "1px 4px" }} className="center">
                        {ele.quantity}
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {ele?.discount} %
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {ele?.gst} %
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {getTotalValue(ele.salePrice, ele.quantity)}
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {getTotalValue(ele?.netPrice, ele.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <table className="table table-clear">
                  <tbody>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        <strong>Total:</strong>
                      </td>
                      <td className="right" style={{ padding: "2px 6px" }}>
                        {toWords.convert(getTotal().toFixed(0), {
                          currency: true,
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left"></td>
                      <td className="left">
                        {/* <strong>{getTotalAmount()}</strong> */}
                      </td>
                      <td className="left">
                        {/* <strong>{getTotal()}</strong> */}
                      </td>
                    </tr>
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        <strong>CGST</strong>
                      </td>
                      <td className="right" style={{ padding: "2px 6px" }}>
                        <strong>{getGSTValue()}</strong>
                      </td>
                      <td className="right"></td>
                    </tr>
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        <strong>SGST</strong>
                      </td>
                      <td className="right" style={{ padding: "2px 6px" }}>
                        <strong> {getGSTValue()}</strong>
                      </td>
                      <td className="right"></td>
                    </tr>
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        <strong>Round Off</strong>
                      </td>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        <strong>
                          {" "}
                          {Number(getTotal().toFixed(0) - getTotal()).toFixed(
                            2
                          )}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        <strong>Total</strong>
                      </td>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        <strong> {Number(getTotal().toFixed(0))}</strong>
                      </td>
                      <td className="right"></td>
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
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        {/* <strong>Grand Total</strong> */}
                      </td>
                      <td className="right"></td>
                    </tr>
                  </tbody>
                </table>
                <p className="ml-center" style={{ textAlign: "center" }}>
                  Customer Signature
                </p>
              </div>

              <div style={{ width: "200px" }}>
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        {/* <strong>Grand Total</strong> */}
                      </td>
                      <td className="right"></td>
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
