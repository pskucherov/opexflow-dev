/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const app = express();

const http = require('http').Server(app);

const corsOptions = {
    origin: (o, next) => {
        next(null, o);
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ip = '0.0.0.0';
const port = process.env.SERVERPORT || 8000;

http.listen(port, ip, () => {
    console.log(`we are listening on port ${port}`);
});

const io = require('socket.io')(http, {
    path: '/api/socket',
    cors: {
        origin: (_req, callback) => {
            const result = _req === 'http://localhost:3000/api' ||
                _req === 'https://opexflow.com';

            callback(null, result);
        },
        credentials: true,
    },
});

module.exports = {
    app,
    io,
};
