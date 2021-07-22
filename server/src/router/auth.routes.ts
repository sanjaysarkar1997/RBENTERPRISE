import express from "express";
import { Login, signUp } from "../controller/Auth.controller";

import {
  createProduct,
  deleteProduct,
  getProduct,
  products,
  stockUpdate,
  updateProduct,
} from "../controller/product.controller";
import {
  bills,
  createBill,
  getBill,
  updateBill,
} from "../controller/bill.controller";
import {
  createCustomer,
  customers,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../controller/customer.controller";

const router = express.Router();

router.get("/get-products", products);
router.get("/get-product/:id", getProduct);
router.get("/get-customer/:id", getCustomer);
router.get("/get-bills", bills);
router.get("/get-bill/:id", getBill);
router.post("/create-bill", createBill);
router.post("/update-bill", updateBill);
router.post("/create-product", createProduct);
router.post("/update-stock", stockUpdate);
router.post("/update-item", updateProduct);
router.post("/delete-item", deleteProduct);
router.post("/create-customer", createCustomer);
router.get("/get-customers", customers);
router.post("/update-customer", updateCustomer);
router.post("/delete-customer", deleteCustomer);

router.post("/login", Login);
router.post("/signup", signUp);

export default router;
