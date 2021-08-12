const Mongoose = require("mongoose");
import BillNonGST from "../model/billNonGST.model";
import Product from "../model/product.model";
import { error, success } from "../services/responseModifier";

const billsNonGST = async (req: any, res: any, next: any) => {
  try {
    let bill = await BillNonGST.find();
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", bill, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

const getBillNonGST = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let bill = await BillNonGST.findById(id).populate("cinemas");
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", bill, 200));
    }
  } catch (error) {}
};

const createBillNonGST = async (req: any, res: any, next: any) => {
  try {
    let data = req.body;

    let input = data.products;

    let bill = new BillNonGST(data);
    bill.save(async (err: any, result: any) => {
      if (err) {
        res.json(error("Failed", 300));
      } else {
        let bulkArr = [];

        for (const i of input) {
          if(!i.isVoucher)
          bulkArr.push({
            updateOne: {
              filter: { _id: Mongoose.Types.ObjectId(i.productId) },
              update: { $inc: { stock: -i.quantity } },
            },
          });
        }

        await Product.bulkWrite(bulkArr);
        res.json(success("Creation Successful", result, 201));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBillNonGST = async (req: any, res: any, next: any) => {
  try {
    console.log(req.body);
    let id = req.body.id;
    let bill = await BillNonGST.deleteOne({ _id: Mongoose.Types.ObjectId(id) });
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Deleted Successfully", bill, 200));
    }
  } catch (error) {}
};

const updateBillNonGST = async (req: any, res: any, next: any) => {};

export { billsNonGST, createBillNonGST, updateBillNonGST, getBillNonGST, deleteBillNonGST };

// {
//   "productName": "This is product 3",
//   "productCode": "L 34",
//   "SKU": "TGY7O0GYB8",
//   "GST": "12",
//   "MRP": "700",
//   "salePrice": "600",
//   "stock": "700"
// }
