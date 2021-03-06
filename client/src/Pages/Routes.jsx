import React from "react";
import { Route, Switch } from "react-router-dom";
import { AddBulkStocks } from "./AddBulkStocks";
import AddItem from "./AddItem";
import { AddStocks } from "./AddStocks";
import CreateBill from "./CreateBill";
import CreateCustomer from "./CreateCustomer";
import { CreateNonGSTBill } from "./CreateNonGSTBill";
import { CustomerReport } from "./CustomerReport";
import { SalesReport } from "./SalesReport";
import ViewBills from "./ViewBills";
import ViewCustomer from "./ViewCustomer";
import { ViewEntries } from "./ViewEntries";
import ViewItems from "./ViewItems";
import ViewNonGSTBill from "./ViewNonGSTBill";
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
      <Route path="/update-bill/:id">
        <CreateBill />
      </Route>
      <Route path="/create-non-gst-bill">
        <CreateNonGSTBill />
      </Route>
      <Route path="/add-stocks">
        <AddStocks />
      </Route>
      <Route path="/view-bills">
        <ViewBills />
      </Route>
      <Route path="/view-non-gst-bills">
        <ViewNonGSTBill />
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
      <Route path="/add-bulk-stocks">
        <AddBulkStocks />
      </Route>
      <Route path="/view-entries">
        <ViewEntries />
      </Route>
    </Switch>
  );
}
