import express from "express";
import { Login, signUp } from "../controller/Auth.controller";

import { createProduct, products } from "../controller/product.controller";
import { bills, createBill, getBill } from "../controller/bill.controller";

const router = express.Router();

// router.get("/details", isAuthenticated, getUserDetails);
router.get("/get-products", products);
router.get("/get-bills", bills);
router.get("/get-bill/:id", getBill);
router.post("/create-bill", createBill);
router.post("/create-product", createProduct);

router.post("/login", Login);
router.post("/signup", signUp);

export default router;
