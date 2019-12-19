import * as express from "express";
import { createServer } from "http";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";

const app = express();
const server = createServer(app);

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req: express.Request, res: express.Response) => {
  return res.json({ hello: "world" });
});

server.listen(8080, () => {
  console.log("API running");
});
