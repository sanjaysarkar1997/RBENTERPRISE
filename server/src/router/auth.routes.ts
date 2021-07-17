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
import { bills, createBill, getBill } from "../controller/bill.controller";
import { createCustomer, customers } from "../controller/customer.controller";

const router = express.Router();

router.get("/get-products", products);
router.get("/get-product/:id", getProduct);
router.get("/get-bills", bills);
router.get("/get-bill/:id", getBill);
router.post("/create-bill", createBill);
router.post("/create-product", createProduct);
router.post("/update-stock", stockUpdate);
router.post("/update-item", updateProduct);
router.post("/delete-item", deleteProduct);
router.post("/create-customer", createCustomer);
router.get("/get-customers", customers);

router.post("/login", Login);
router.post("/signup", signUp);

export default router;
