// http://localhost:5000
// https://rbenterprise.herokuapp.com

const apis = {
  baseUrl: "https://rbenterprise.herokuapp.com/api/v1/",
//   baseUrl: "http://localhost:5000/api/v1/",
  ADD_ITEM: "create-product",
  GET_ITEMS: "get-products",
  CREATE_BILL: "create-bill",
  UPDATE_BILL: "update-bill",
  VIEW_BILLS: "get-bills",
  VIEW_BILL: "get-bill",
  CREATE_NON_GST_BILL: "create-non-gst-bill",
  VIEW_NON_GST_BILLS: "get-non-gst-bills",
  VIEW_NON_GST_BILL: "get-non-gst-bill",
  DELETE_NON_GST_BILL: "delete-non-gst-bill",
  UPDATE_STOCK: "update-stock",
  GET_ITEM: "get-product",
  UPDATE_ITEM: "update-item",
  DELETE_ITEM: "delete-item",
  GET_CUSTOMERS: "get-customers",
  CREATE_CUSTOMER: "create-customer",
  UPDATE_CUSTOMER: "update-customer",
  GET_CUSTOMER: "get-customer",
  DELETE_CUSTOMER: "delete-customer",
  DELETE_BILL: "delete-bill",
};

export default apis;
