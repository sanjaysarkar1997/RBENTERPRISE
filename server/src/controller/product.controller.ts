import Product from "../model/product.model";
import { error, success } from "../services/responseModifier";
const Mongoose = require("mongoose");

const products = async (req: any, res: any, next: any) => {
  try {
    let products = await Product.find();
    if (!products) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", products, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let product = await Product.findById(id);
    if (!product) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", product, 200));
    }
  } catch (error) {}
};

const createProduct = (req: any, res: any, next: any) => {
  let data = req.body;
  let product = new Product(data);
  product.save((err: any, result: any) => {
    if (err) {
      res.json(error("Failed", 300));
    } else {
      res.json(success("Creation Successful", result, 201));
    }
  });
};

const stockUpdate = async (req: any, res: any, next: any) => {
  try {
    let data = req.body;
    let product = await Product.update(
      { _id: Mongoose.Types.ObjectId(data._id) },
      { $inc: { stock: data.stock } }
    );
    if (!product) {
      res.json(error("Update Failed", 300));
    } else {
      res.json(success("Fetched Successful", product, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req: any, res: any, next: any) => {
  try {
    let data = req.body;
    let product = await Product.findByIdAndUpdate(req.body.id, data);
    if (!product) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { product }, 200));
    }
  } catch (error) {}
};

const deleteProduct = async (req: any, res: any, next: any) => {
  try {
    console.log(req.body);
    let id = req.body.id;
    let product = await Product.deleteOne({ _id: Mongoose.Types.ObjectId(id) });
    if (!product) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Deleted Successfully", { product }, 200));
    }
  } catch (error) {}
};

export {
  products,
  createProduct,
  getProduct,
  stockUpdate,
  updateProduct,
  deleteProduct,
};
