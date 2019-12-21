import * as express from "express";
import { users } from "./data";
import { IUser } from "./models";

export const UserRouter = express.Router();

UserRouter.put("/", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.user) {
    return res.status(400).json({ error: "Please send a valid user document" });
  }

  const user: IUser = req.body.user;

  user.id = users.length + 1;

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

  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const index = users.findIndex(x => x.id === id);

  if (index === -1) {
    return res.status(400).json({ error: `No user found with id ${id}` });
  }

  const user = users[index];

  const userData: Partial<IUser> = req.body.user;

  if (userData.name) {
    user.name = userData.name;
  }

  if (userData.age) {
    user.age = userData.age;
  }

  console.log(users[index]);

  return res.status(200).json({ user });
});

UserRouter.get("/:id", (req: express.Request, res: express.Response) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const index = users.findIndex(x => x.id === id);

  if (index === -1) {
    return res.status(400).json({ error: `No user found with id ${id}` });
  }

  const user = users[index];

  return res.status(200).json({ user });
});

UserRouter.delete("/:id", (req: express.Request, res: express.Response) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const index = users.findIndex(x => x.id === id);

  if (index === -1) {
    return res.status(400).json({ error: "" });
  }

  users.splice(index, 1);

  return res.status(200).json({ message: "User deleted", id });
});
