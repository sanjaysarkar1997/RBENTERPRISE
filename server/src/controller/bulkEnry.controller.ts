const Mongoose = require("mongoose");
import Entry from "../model/entry.modal";
import Product from "../model/product.model";
import { error, success } from "../services/responseModifier";

const entries = async (req: any, res: any, next: any) => {
  try {
    let entries = await Entry.find();
    if (!entries) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", entries, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

const getEntry = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let entry = await Entry.findById(id).populate("cinemas");
    if (!entry) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", entry, 200));
    }
  } catch (error) {}
};

const createEntry = async (req: any, res: any, next: any) => {
  try {
    let data = req.body;

    let input = data.products;

    let entry = new Entry(data);
    entry.save((err: any, result: any) => {
      if (err) {
        res.json(error("Failed", 300));
      } else {
        let bulkArr = [];

        for (const i of input) {
          bulkArr.push({
            updateOne: {
              filter: { _id: Mongoose.Types.ObjectId(i.productId) },
              update: { $inc: { stock: +i.quantity } },
            },
          });
        }

        Product.bulkWrite(bulkArr);
        res.json(success("Creation Successful", result, 201));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteEntry = async (req: any, res: any, next: any) => {
  try {
    console.log(req.body);
    let id = req.body.id;
    let entry = await Entry.deleteOne({ _id: Mongoose.Types.ObjectId(id) });
    if (!entry) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Deleted Successfully", entry, 200));
    }
  } catch (error) {}
};

const updateEntry = async (req: any, res: any, next: any) => {};

export { entries, createEntry, updateEntry, getEntry, deleteEntry };

// {
//   "productName": "This is product 3",
//   "productCode": "L 34",
//   "SKU": "TGY7O0GYB8",
//   "GST": "12",
//   "MRP": "700",
//   "salePrice": "600",
//   "stock": "700"
// }
