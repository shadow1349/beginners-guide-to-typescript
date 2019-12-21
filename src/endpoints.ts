import * as express from "express";
import { users } from "./data";
import { IUser } from "./models";
import * as uuid from "uuid/v4";

export const UserRouter = express.Router();

UserRouter.put("/", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.user) {
    return res.status(400).json({ error: "Please send a valid user document" });
  }

  const user: IUser = req.body.user;

  user.id = uuid();

  users.push(user);

  return res.status(200).json({ user });
});

UserRouter.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ users });
});

UserRouter.post("/:id", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.user) {
    return res.status(400).json({ error: "Please send a valid user document" });
  }

  const index = users.findIndex(x => x.id === req.params.id);

  if (index === -1) {
    return res
      .status(400)
      .json({ error: `No user found with id ${req.params.id}` });
  }

  const user = users[index];

  const userData: Partial<IUser> = req.body.user;

  if (userData.name) {
    user.name = userData.name;
  }

  if (userData.age) {
    user.age = userData.age;
  }

  return res.status(200).json({ user });
});

UserRouter.get("/:id", (req: express.Request, res: express.Response) => {
  const index = users.findIndex(x => x.id === req.params.id);

  if (index === -1) {
    return res
      .status(400)
      .json({ error: `No user found with id ${req.params.id}` });
  }

  const user = users[index];

  return res.status(200).json({ user });
});

UserRouter.delete("/:id", (req: express.Request, res: express.Response) => {
  const index = users.findIndex(x => x.id === req.params.id);

  if (index === -1) {
    return res
      .status(400)
      .json({ error: `No user found with id ${req.params.id}` });
  }

  users.splice(index, 1);

  return res.status(200).json({ message: "User deleted", id: req.params.id });
});
