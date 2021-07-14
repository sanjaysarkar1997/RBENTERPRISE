import React from "react";
import { Route, Switch } from "react-router-dom";
import AddItem from "./AddItem";
import CreateBill from "./CreateBill";
import ViewBills from "./ViewBills";
import ViewItems from "./ViewItems";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/add-new-item">
          <AddItem />
        </Route>
        <Route exact path="/view-items">
          <ViewItems />
        </Route>
        <Route path="/create-bill">
          <CreateBill />
        </Route>
        <Route path="/view-bills">
          <ViewBills />
        </Route>
      </Switch>
    </div>
  );
}
