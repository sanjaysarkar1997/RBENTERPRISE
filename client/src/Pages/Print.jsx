import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    return total;
  };
  
  return (
    <div>
      <div class="container-fluid">
        <div class="card">
          <div class="card-header">
            Invoice:&emsp;
            <strong>{printDetails.dateOfBilling}</strong>
          </div>
          <div class="card-body">
            <div class="row mb-4">
              <div class="col-sm-6">
                <h6 class="mb-3">From:</h6>
                <div>
                  <strong>RB ENTERPRISE</strong>
                </div>
                <div>Ashutosh Pally</div>
                <div>FALAKATA, Alipurduar</div>
                <div>Email: bardhanrupam5@gmail.com</div>
                <div>Phone: 8101397644</div>
                <div>GST NO: 19AIAPB3656R1ZV</div>
              </div>

              <div class="col-sm-6">
                <h6 class="mb-3">To:</h6>
                <div>
                  <strong>{printDetails?.customerName}</strong>
                </div>
                <div>{printDetails?.Address}</div>
              </div>
            </div>

            <div class="table-responsive-sm">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="center">#</th>
                    <th>Particular</th>
                    <th>Description</th>

                    <th class="right">MRP</th>
                    <th class="center">Qty</th>
                    <th>Rate</th>
                    <th class="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {printDetails?.products?.map((ele, i) => (
                    <tr>
                      <td class="center">{i + 1}</td>
                      <td class="left strong">{ele.particular}</td>
                      <td class="left">{"NA"}</td>

                      <td class="right">₹ {ele.mrp}</td>
                      <td class="center">{ele.quantity}</td>
                      <td class="right">₹ {ele.rate}</td>
                      <td class="right">
                        ₹ {Number(ele.rate) * Number(ele.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-lg-8 col-xl-8 col-sm-5"></div>

              <div class="col-lg-4 col-sm-5 ml-auto">
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
            <br />
            <div class="row">
              <div class="col-lg-4 col-sm-5 ">
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left">{/* <strong>Grand Total</strong> */}</td>
                      <td class="right">
                        {/* <strong>₹ {getTotal()}</strong> */}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="ml-center" style={{ textAlign: "center" }}>
                  Customer Signature
                </p>
              </div>

              <div class="col-lg-4 col-sm-5 offset-lg-4">
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left">{/* <strong>Grand Total</strong> */}</td>
                      <td class="right">
                        {/* <strong>₹ {getTotal()}</strong> */}
                      </td>
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
      </div>
    </div>
  );
}
