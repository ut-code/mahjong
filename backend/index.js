const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client")
const client = new PrismaClient();

app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.json({id: 1});
});

app.get('/questions', async (req, res) => {
    const questions = await client.post.findMany();
    res.json({posts: questions})
});

app.post('/questions', async (req, res) => {
    const todos = await client.post.create({data: {body: res.body.body}})
}) 

app.listen('3500', () => {
    console.log('api started');
})
