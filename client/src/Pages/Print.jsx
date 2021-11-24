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
    let data = printDetails?.products;
    for (let i = 0; i < data?.length; i++) {
      total =
        total +
        getNetAmount(
          getAmount(
            getTotalValue(data[i].salePrice.toFixed(2), data[i].quantity),
            data[i]?.discount
          ),
          data[i].gst
        );
    }
    return Number(Number(total));
  };

  const getTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < printDetails?.products?.length; i++) {
      total =
        total +
        getAmount(
          getTotalValue(
            printDetails?.products[i].salePrice.toFixed(2),
            printDetails?.products[i].quantity
          ),
          printDetails?.products[i].discount
        );
    }
    return Number(total);
  };

  const getTotalValue = (value, qty) => {
    value = Number(value);
    qty = Number(qty);
    return Number(Number(value * qty));
  };

  const getGSTValue = () => {
    let gstTotal = 0;
    for (let i = 0; i < printDetails?.products?.length; i++) {
      if (printDetails?.products[i].gst > 0) {
        gstTotal =
          gstTotal +
          getAmount(
            getTotalValue(
              printDetails?.products[i].salePrice.toFixed(2),
              printDetails?.products[i].quantity
            ),
            printDetails?.products[i].discount
          ) *
            (printDetails?.products[i].gst / 100);
      }
    }
    gstTotal = (gstTotal / 2).toFixed(2);
    return Number(gstTotal);
  };

  const getAmount = (total, discount) => {
    let amount = 0;
    total = Number(total);
    discount = Number(discount);
    amount = total - (total * discount) / 100;
    amount = amount.toFixed(2);
    return Number(amount);
  };

  const getNetAmount = (total, gst) => {
    let amount = 0;
    total = Number(total);
    gst = Number(gst);
    amount = total + (total * gst) / 100;
    amount = amount.toFixed(2);
    return Number(amount);
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

            <div className="table-responsive-sm" style={{ minHeight: "40vh" }}>
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th style={{ minWidth: "200px" }}>Particular</th>
                    <th className="right">MRP</th>
                    <th>HSN Code</th>
                    <th className="center">Qty.(pcs)</th>
                    <th className="center">Rate</th>

                    <th className="right">Disc. (%)</th>
                    <th>GST (%)</th>
                    <th style={{ minWidth: "60px" }}>Amount</th>
                    <th style={{ minWidth: "60px" }}>Net. Amt. </th>
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
                      <td style={{ padding: "1px 4px" }} className="center">
                        {ele.salePrice.toFixed(2)}
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {ele?.discount} %
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {ele?.gst} %
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {getAmount(
                          getTotalValue(ele.salePrice.toFixed(2), ele.quantity),
                          ele?.discount
                        )}
                      </td>
                      <td style={{ padding: "1px 4px" }} className="right">
                        {getNetAmount(
                          getAmount(
                            getTotalValue(
                              ele.salePrice.toFixed(2),
                              ele.quantity
                            ),
                            ele?.discount
                          ),
                          ele.gst
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
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td></td>
                      <td className="left" style={{ minWidth: "70px" }}>
                        {getTotalAmount()}
                      </td>
                      <td className="left" style={{ minWidth: "70px" }}>
                        {getTotal()}
                      </td>
                    </tr>
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        CGST
                      </td>
                      <td className="right" style={{ padding: "2px 6px" }}>
                        {getGSTValue()}
                      </td>
                    </tr>
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        SGST
                      </td>
                      <td className="right" style={{ padding: "2px 6px" }}>
                        {getGSTValue()}
                      </td>
                    </tr>
                    <tr>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        Round Off
                      </td>
                      <td></td>
                      <td className="left" style={{ padding: "2px 6px" }}>
                        {" "}
                        {Number(getTotal().toFixed(0) - getTotal()).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ minWidth: "200px" }}>
                <p
                  className="ml-center"
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {toWords.convert(getTotal().toFixed(0), {
                    currency: true,
                  })}
                </p>
              </div>
              <div style={{ minWidth: "150px" }}>
                <p
                  className="ml-center"
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid gray",
                  }}
                >
                  Total Payable:
                  <strong> {Number(getTotal().toFixed(0))}</strong>
                </p>
              </div>
            </div>

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
