import Product from "../model/product.model";
import { error, success } from "../services/responseModifier";

const products = async (req: any, res: any, next: any) => {
  try {
    let product = await Product.find();
    if (!product) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { product }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

// const getMovie = async (req: any, res: any, next: any) => {
//   try {
//     let id = req?.params?.id;
//     let movie = await Person.findById(id).populate("cinemas");
//     if (!movie) {
//       res.json(error("Fetch Failed", 300));
//     } else {
//       res.json(success("Fetched Successful", { movie }, 200));
//     }
//   } catch (error) {}
// };

const createProduct = (req: any, res: any, next: any) => {
  let data = req.body;
  let product = new Product(data);
  product.save((err: any, result: any) => {
    if (err) {
      res.json(error("Failed", 300));
    } else {
      res.json(success("Creation Successful", { product: result }, 201));
    }
  });
};

const updateMovie = async (req: any, res: any, next: any) => {};

export { products, createProduct, updateMovie };
