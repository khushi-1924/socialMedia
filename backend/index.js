const express = require('express');
const connectToMongo = require('./db');
const app = express();
var cors = require('cors')
const port = 3000;

connectToMongo();
app.use(express.json());
app.use(cors());

app.use ('/api/auth', require('./routes/auth'));

app.listen (port, () => {
    console.log(`server listening on port ${port}`);
})