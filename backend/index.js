const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ id: 1 });
});

app.post("/answers", async (req, res) => {
  const answer = await client.answer.create({
    data: {
      body: req.body.body,
      choice: Number(req.body.choice),
      postId: Number(req.body.postId),
    },
  });
  res.json({ post: answer });
});

app.get("/question", async (req, res) => {
  const question = await client.post.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });
  res.json({ post: question });
});

app.get("/questions", async (req, res) => {
  const questions = await client.post.findMany();
  res.json({ posts: questions });
});

app.post("/questions", async (req, res) => {
  const post = await client.post.create({
    data: { body: req.body.body, choices: req.body.choices },
  });
  res.json({ post: post });
});

app.listen("3500", () => {
  console.log("api started");
});
