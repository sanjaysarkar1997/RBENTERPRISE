import cron from "node-cron";
import { infoLog } from "./logServices";

const cronRunner = async () => {
  cron.schedule("* * * * *", () => {
    infoLog("running a task every minute");
  });
};

export default cronRunner;
