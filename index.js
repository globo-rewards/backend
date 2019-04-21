const AssistantV1 = require('watson-developer-cloud/assistant/v1');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connFactory = require("./connection/connFactory.js");

var cors = require('cors');
app.use(cors())

let Promise = require('bluebird');

let paramsCloudant = {
    "username": "96ba32ad-e17d-494f-a93e-72240b1e0b16-bluemix",
    "host": "96ba32ad-e17d-494f-a93e-72240b1e0b16-bluemix.cloudant.com",
    "dbname": "globo-rewards",
    "password": "e373c010bcb53c3ea89a59f7fa2642789e7bfe3128bab1c3e2762b713ab04641"
};


// PROGRAMAANUNCIANTE
// TELESPECTADOR
// PROGRAMA
// ANUNCIANTE
// ATIVIDADE

app.get('/', function (req, res) {
    res.send("response");
});

app.get('/telespectador', function (req, res) {
    let query = {
        selector: {
            tipo: "TELESPECTADOR"
        }
    };

    let request = connFactory.getDocument(paramsCloudant, query)
    request.then(function (result) {
        if (result[0] != undefined) {
            res.send(result);
        } else {
            res.send({});
        }
    })
});

app.get('/programa', function (req, res) {
    let query = {
        selector: {
            tipo: "PROGRAMA"
        }
    };

    let request = connFactory.getDocument(paramsCloudant, query)
    request.then(function (result) {
        if (result[0] != undefined) {
            res.send(result);
        } else {
            res.send({});
        }
    })
});

app.get('/anunciante', function (req, res) {
    let query = {
        selector: {
            tipo: "ANUNCIANTE"
        }
    };

    let request = connFactory.getDocument(paramsCloudant, query)
    request.then(function (result) {
        if (result[0] != undefined) {
            res.send(result);
        } else {
            res.send({});
        }
    })
});

app.get('/atividade', function (req, res) {
    let query = {
        selector: {
            tipo: "ATIVIDADE"
        }
    };

    let request = connFactory.getDocument(paramsCloudant, query)
    request.then(function (result) {
        if (result[0] != undefined) {
            res.send(result);
        } else {
            res.send({});
        }
    })
});




var port = process.env.PORT || 3001
app.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});