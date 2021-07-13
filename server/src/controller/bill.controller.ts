import Bill from "../model/bill.modal";
import { error, success } from "../services/responseModifier";

const bills = async (req: any, res: any, next: any) => {
  try {
    let bill = await Bill.find();
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { bill }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

const getBill = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let bill = await Bill.findById(id).populate("cinemas");
    if (!bill) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { bill }, 200));
    }
  } catch (error) {}
};

const createBill = (req: any, res: any, next: any) => {
  let data = req.body;
  let bill = new Bill(data);
  bill.save((err: any, result: any) => {
    if (err) {
      res.json(error("Failed", 300));
    } else {
      res.json(success("Creation Successful", { bill: result }, 201));
    }
  });
};

const updateMovie = async (req: any, res: any, next: any) => {};

export { bills, createBill, updateMovie, getBill };
