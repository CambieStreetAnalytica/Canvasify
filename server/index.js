const express = require('express');
const request = require('request');
const app = express();
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

app.get('/api/:endpoint', (req, response) => {
    let endpoint = req.params['endpoint'];
    request({
        url: 'https://canvas.ubc.ca/api/v1/' + endpoint,
        headers: {
            "Authorization": 'Bearer 11224~ErzGQ1qQ089CRPKMNPf2AEbWs3znatNQeisks2Hnl814zhTg3beMc0faxHo7FG6u'
        }
    }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
        response.status(200).json(body);
        response.end();
    });
});