import express from "express";
import knex from "config/knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
const rootFolder =
  process.env.NODE_ENV === "development"
    ? path.join(__dirname, "..", "public")
    : path.join(__dirname, "..");
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

router.get("/images", async (req, res) => {
  const user: any = jwt.verify(req.cookies.token, process.env.SECRET);
  if (!user) return;
  const images = await knex("images").where("user_id", user.id);
  res.status(200).send(images);
});

const storage = multer.diskStorage({
  destination: rootFolder + "/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
router.post("/upload", upload.single("image"), async (req, res) => {
  const user: any = jwt.verify(req.cookies.token, process.env.SECRET);
  if (!user) return res.status(403).send("Forbidden");
  const randomString = crypto.randomBytes(16).toString("hex");
  const image = await knex("images").insert(
    {
      user_id: user.id,
      hex: randomString,
      path: `/images/${req.file.filename}`,
    },
    "*"
  );
  res.send(image);
});

router.get("/image", async (req, res) => {
  if (typeof req.query.hex !== "string")
    return res.status(404).send("Not found");

  const image = await knex("images").where("hex", req.query.hex).first();
  res.status(200).send(image);
});

router.post("/delete", async (req, res) => {
  const user: any = jwt.verify(req.cookies.token, process.env.SECRET);
  if (!user) return res.status(403).send("Forbidden");
  const image = await knex("images")
    .where("hex", req.body.hex)
    .where("user_id", user.id)
    .first();
  if (!image) return res.status(404).send("Not found");
  fs.unlinkSync(`${rootFolder}/${image.path}`);

  await knex("images")
    .where("hex", req.body.hex)
    .where("user_id", user.id)
    .delete();
  res.status(200).send("Deleted");
});

export default router;
