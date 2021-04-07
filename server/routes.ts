import express from "express";
import knex from "config/knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await knex("users").where({ username }).first();
  if (!user) return res.status(404).send("Not found");
  const passCorrect = await bcrypt.compare(password, user.password);
  if (!passCorrect) return res.status(404).send("Not found");

  const token = jwt.sign(user, process.env.SECRET);
  res.cookie("token", token);
  res.status(200).send("Logged in");
});

router.get("/user", async (req, res) => {
  const user = jwt.verify(req.cookies.token, process.env.SECRET);
  if (!user) return res.status(404).send("User not found");
  res.status(200).send(user);
});

router.post("/register", async (req, res) => {
  const { username, password, email, key } = req.body;
  if (key !== process.env.KEY) return res.status(403).send("Forbidden");
  const hashedPass = await bcrypt.hash(password, 10);
  const exists = await knex("users").where({ username }).first();
  if (exists) return res.status(400).send("Username already taken");
  const user = await knex("users").insert(
    {
      username,
      password: hashedPass,
      email,
    },
    ["id", "username"]
  );
  res.status(200).send(user[0]);
});

export default router;
