const express = require('express');
const request = require('request');
const app = express();
require('dotenv').config();
const token = process.env.CANVAS_TOKEN;
app.listen(8000, () => {
    console.log("Server Started");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.get('/api', (req, response) => {
    let endpoint = req.query['endpoint'];
    console.warn(endpoint);
    request({
        url: 'https://canvas.ubc.ca/api/v1/' + endpoint,
        headers: {
            "Authorization": 'Bearer ' + token
        }
    }, (err, res, body) => {
        if (err) { console.log(err);
            response.status(200).json('{"status": "unauthorized"}');
            response.end();
        }
        console.log("NEW REQUEST");
        console.log(body);
        response.status(200).json(body);
        response.end();
    });
});
