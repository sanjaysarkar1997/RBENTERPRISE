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
  }, []);
  return (
    <div class="invoice-card">
      <div class="invoice-title">
        <div id="main-title">
          <h4>RB ENTERPRISE</h4>
          <span>#89 292</span>
        </div>

        <span id="date">{printDetails?.dateOfBilling}</span>
      </div>

      <div class="invoice-details">
        <table class="invoice-table">
          <thead>
            <tr>
              <td>SL. No</td>
              <td>PARTICULAR</td>
              <td>UNIT</td>
              <td>PRICE</td>
            </tr>
          </thead>

          <tbody>
            {printDetails?.products?.map((ele, i) => (
              <tr class="row-data">
                <td>{i + 1}</td>
                <td>{ele.particular}</td>
                <td id="unit">{ele.quantity}</td>
                <td>2.90</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div class="invoice-footer">
        <button class="btn btn-secondary" id="later">
          LATER
        </button>
        <button class="btn btn-primary">PAY NOW</button>
      </div>
    </div>
  );
}
