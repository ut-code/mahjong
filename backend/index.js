const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.json({id: 1});
});

app.listen('3500', () => {
    console.log('api started');
})
