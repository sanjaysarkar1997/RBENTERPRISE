import jwt from "jsonwebtoken";
import { error, success } from "../services/responseModifier";
import bcrypt from "bcrypt";
import UserDetails from "../model/signUp.model";
import { errorLog } from "../services/logServices";

// SignUp Controller Mongo
const signUp = (req: any, res: any, next: any) => {
  let data = req.body;
  const saltRounds = 10;
  let password = req.body.password;
  try {
    UserDetails.findOne({ email: data.email }, (err: any, result: any) => {
      if (err) {
        res.json(error("Failed", 500));
      } else if (result) {
        res.json(error("User Already Exist", 402));
      } else {
        bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
          // Store hash in your password DB.
          data.password = hash;
          let user = new UserDetails(data);
          user.save((err: any, result: any) => {
            if (err) {
              res.json(error("Save Failed", 404));
            } else {
              res.json(success("Creation Successful", [], 201));
            }
          });
        });
      }
    });
  } catch (error) {
    errorLog(error);
  }
};

// Login Controller Mongo
const Login = (req: any, res: any) => {
  let data = req.body;
  var token = jwt.sign(req.body, "Sanjay@1997");

  try {
    UserDetails.findOne({ email: data.email }, (err: any, doc: any) => {
      if (err) {
        res.json(error("Failed", 500));
      } else if (!doc) {
        res.json(error("User Not Found", 404));
      } else {
        let hashPassword = doc.password;
        bcrypt.compare(
          req.body.password,
          hashPassword,
          function (err: any, result: any) {
            if (result) {
              res
                .status(200)
                .json(
                  success("Login Successfully", { data: [], token: token }, 200)
                );
            } else {
              res.status(401).json(error("Invalid UserName or Password", 401));
            }
          }
        );
      }
    });
  } catch (error) {
    errorLog(error);
  }
};

// User Details
const getUserDetails = async (req: any, res: any, next: any) => {
  let email = req.user.email;
  let user = await UserDetails.findOne({ email: email });
  if (user) {
    res.json(success("Details Fetch Successfully", { data: user }, 200));
  } else {
    res.json(error("No User Found", 200));
  }
};

export { Login, signUp, getUserDetails };
