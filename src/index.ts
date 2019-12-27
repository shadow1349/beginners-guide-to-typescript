import * as express from "express";
import { createServer } from "http";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";
import { UserRouter, UsersRouter } from "./endpoints";

const app = express();
const server = createServer(app);

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/users", UsersRouter);
app.use("/user", UserRouter);

server.listen(8080, () => {
  console.log("API running");
});
