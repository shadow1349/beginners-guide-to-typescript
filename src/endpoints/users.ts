import * as express from "express";
import { IUser } from "./../models";
import Database from "./../database";

const users = new Database().getCollection<IUser>("users");

export const UsersRouter = express.Router();

UsersRouter.put("/", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.user) {
    return res.status(400).json({ error: "Please send a valid user document" });
  }

  const user = users.addDocument(req.body.user);

  return res.status(200).json({ user });
});

UsersRouter.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ user: users.getDocuments() });
});
