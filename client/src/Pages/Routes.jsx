import React from "react";
import { Route, Switch } from "react-router-dom";
import AddItem from "./AddItem";
import { AddStocks } from "./AddStocks";
import CreateBill from "./CreateBill";
import CreateCustomer from "./CreateCustomer";
import { CustomerReport } from "./CustomerReport";
import { SalesReport } from "./SalesReport";
import ViewBills from "./ViewBills";
import ViewCustomer from "./ViewCustomer";
import ViewItems from "./ViewItems";
import { ViewStocks } from "./ViewStocks";

export default function Routes() {
  return (
    <Switch>
      <Route path="/add-new-item">
        <AddItem />
      </Route>
      <Route path="/update-item/:id">
        <AddItem />
      </Route>
      <Route path="/update-customer/:id">
        <CreateCustomer />
      </Route>
      <Route exact path="/view-items">
        <ViewItems />
      </Route>
      <Route path="/create-bill">
        <CreateBill />
      </Route>
      <Route path="/add-stocks">
        <AddStocks />
      </Route>
      <Route path="/view-bills">
        <ViewBills />
      </Route>
      <Route path="/create-customer">
        <CreateCustomer />
      </Route>
      <Route path="/view-stocks">
        <ViewStocks />
      </Route>
      <Route path="/sales-report">
        <SalesReport />
      </Route>
      <Route path="/customer-report">
        <CustomerReport />
      </Route>
      <Route path="/view-customers">
        <ViewCustomer />
      </Route>

      {/* <Route path="/edit-bill/:id">
        <CreateBill />
      </Route> */}
    </Switch>
  );
}
