import { Router } from "express";
import { parseTarget, parseUser } from "./decoders";
import * as Service from "../service";

const router = Router();

router.post("/user", async (req, res) => {
  try {
    const user = parseUser(req.body.user);
    const result = await Service.createUser(user);
    res.send({ user: result });
  } catch (e) {
    console.error("Error", e);
    res.status(500).send("An Unexpected Error Occurred");
  }
});

router.get("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const result = await Service.getUser(username);
    res.send({ user: result });
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("An Unexpected Error Occurred");
  }
});

router.post("/calculate", async (req, res) => {
  try {
    const user = parseUser(req.body.user);
    const target = parseTarget(req.body.target);
    const result = await Service.calculate(user.username, target);
    res.send({ result });
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("An Unexpected Error Occurred");
  }
});

export default router;
