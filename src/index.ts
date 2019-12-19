import * as express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

server.listen(8080, () => {
  console.log("User management API running");
});
