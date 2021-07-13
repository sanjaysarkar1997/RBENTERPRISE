import jwt from "jsonwebtoken";

import UserDetails from "../model/signUp.model";
import { infoLog } from "../services/logServices";
import { error } from "../services/responseModifier";
const isAuthenticated = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      infoLog(`Request came with token : ${token}`);
      let decoded = jwt.verify(token, "Sanjay@1997");
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        res.json(error("Token is not valid", 200));
      }
    } else {
      res.json(error("No Token found", 200));
    }
  } catch (err) {
    res.json(error(err.message, 300));
  }
};

export { isAuthenticated };
