const Mongoose = require("mongoose");
import Bill from "../model/bill.model";
import Product from "../model/product.model";
import { error, success } from "../services/responseModifier";

const bills = async (req: any, res: any, next: any) => {
  try {
    let bill = await Bill.find();
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", bill, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

const getBill = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let bill = await Bill.findById(id);
    bill.products = bill.products.map((i: any) => {
      delete i.addedOrNot;
      return i;
    });
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", bill, 200));
    }
  } catch (error) {}
};

const createBill = async (req: any, res: any, next: any) => {
  try {
    let data = req.body;

    let input = data.products;

    let bill = new Bill(data);
    bill.save((err: any, result: any) => {
      if (err) {
        res.json(error("Failed", 300));
      } else {
        let bulkArr = [];

        for (const i of input) {
          bulkArr.push({
            updateOne: {
              filter: { _id: Mongoose.Types.ObjectId(i.productId) },
              update: { $inc: { stock: -i.quantity } },
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

const deleteBill = async (req: any, res: any, next: any) => {
  try {
    console.log(req.body);
    let id = req.body.id;
    let bill = await Bill.deleteOne({ _id: Mongoose.Types.ObjectId(id) });
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Deleted Successfully", bill, 200));
    }
  } catch (error) {}
};

const updateBill = async (req: any, res: any, next: any) => {
  try {
    let data = req.body;

    let input = data.products;
    let deletedProducts = data.deletedData;

    let bill = await Bill.updateOne(
      { _id: Mongoose.Types.ObjectId(data._id) },
      data
    );

    if (bill) {
      let bulkArr = [];

      for (const i of input) {
        if (i?.addedOrNot) {
          bulkArr.push({
            updateOne: {
              filter: { _id: Mongoose.Types.ObjectId(i.productId) },
              update: { $inc: { stock: -i.quantity } },
            },
          });
        }
      }

      for (const i of deletedProducts) {
        bulkArr.push({
          updateOne: {
            filter: { _id: Mongoose.Types.ObjectId(i.productId) },
            update: { $inc: { stock: +i.quantity } },
          },
        });
      }

      Product.bulkWrite(bulkArr);
      res.json(success("Update Successful", {}, 201));
    }
  } catch (error) {
    console.log(error);
  }
};

export { bills, createBill, updateBill, getBill, deleteBill };

// {
//   "productName": "This is product 3",
//   "productCode": "L 34",
//   "SKU": "TGY7O0GYB8",
//   "GST": "12",
//   "MRP": "700",
//   "salePrice": "600",
//   "stock": "700"
// }
