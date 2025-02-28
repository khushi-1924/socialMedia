const express = require('express');
const connectToMongo = require('./db');
const app = express();
const port = 3000;

connectToMongo();
app.use(express.json());

app.use ('/api/auth', require('./routes/auth'));

app.listen (port, () => {
    console.log(`server listening on port ${port}`);
})