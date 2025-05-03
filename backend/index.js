const express = require('express');
const connectToMongo = require('./db');
// const app = express();
const cors = require('cors');
const path = require('path');
const port = 3000;
const { server, app } = require('./socketio/server');

connectToMongo();
app.use(express.urlencoded ({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use ('/api/auth', require('./routes/auth'));
app.use ('/api/posts', require('./routes/posts'));
app.use ('/api/message', require('./routes/message'));

server.listen (port, () => {
    console.log(`server listening on port ${port}`);
})