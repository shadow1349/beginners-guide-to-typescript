import * as express from "express";
import { IUser } from "./../models";
import Database from "./../database";

const users = new Database().getCollection<IUser>("users");

export const UserRouter = express.Router();

UserRouter.get("/:id", (req: express.Request, res: express.Response) => {
  const user = users.getDocumentById(req.params.id);

  console.log('USER: ', user);

  if (!user) {
    return res
      .status(400)
      .json({ error: `No user found with the id ${req.params.id}` });
  }

  return res.status(200).json({ user });
});

UserRouter.post("/:id", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.user) {
    return res.status(400).json({ error: "Please send a valid user document" });
  }

  const user = users.modifyDocument(req.params.id, req.body.user);

  if (!user) {
    return res.status(400).json({ error: "Could not modify this user" });
  }

  return res.status(200).json({ user });
});

UserRouter.delete("/:id", (req: express.Request, res: express.Response) => {
  const deleted = users.deleteDocument(req.params.id);

  if (!deleted) {
    return res
      .status(400)
      .json({ error: "There was a problem deleting this user." });
  }

  return res.status(200).json({ success: true });
});
