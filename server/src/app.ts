// Npm Modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

// Files Modules
import routes from "./router/auth.routes";

import { success } from "./services/responseModifier";
import connectMongoDB from "./db/MongoDB";
import { infoLog } from "./services/logServices";
import cronRunner from "./services/cronService";

require("dotenv").config();

const app = express();

// MongoDB Connection
connectMongoDB;

// MiddleWares
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CronRunner
cronRunner();

// Routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.json(success("Node Server on Typescript", [], 200));
});

app.listen(process.env.PORT || 3333, () =>
  infoLog(`Server Started on http://localhost:${process.env.PORT}`)
);
