import * as express from "express";
import { users } from "./data";

export const UserRouter = express.Router();

UserRouter.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ users });
});

UserRouter.get("/:id", (req: express.Request, res: express.Response) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const index = users.findIndex(x => x.id === id);

  if (index >= 0) {
    const user = users[index];

    return res.status(200).json({ user });
  }

  return res.status(400).json({ error: "Something went wrong" });
});
