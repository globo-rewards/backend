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
    
app.get('/match', function (req, res) {
    let query = {
        selector: {
            tipo: "MATCH"
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

app.get('/atividade/:idProgramaAnunciante', function (req, res) {
    let query = {
        selector: {
            tipo: "PROGRAMAANUNCIANTE",
            _id: (req.params.idProgramaAnunciante)
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

app.get('/anuncio/:globoCode', function (req, res) {
    let query = {
        selector: {
            tipo: "PROGRAMA",
            globo_code_offline: (req.params.globoCode)
        }
    };

    let request = connFactory.getDocument(paramsCloudant, query)
    request.then(function (result) {
        if (result != undefined) {
            if (result[0]._id != undefined) {
                query = {
                    selector: {
                        tipo: "PROGRAMAANUNCIANTE",
                        idPrograma: (result[0]._id)
                    }
                };

                request = connFactory.getDocument(paramsCloudant, query)
                request.then(function (resultAnuncios) {
                    if (resultAnuncios[0] != undefined) {

                        let idProgramaAnunciante = "";

                        let listRequest = [];
                        for (let anuncio of resultAnuncios) {



                            query = {
                                selector: {
                                    tipo: "ANUNCIANTE",
                                    _id: anuncio.idAnunciante,

                                }
                            };

                            listRequest.push(
                                {
                                    idProgramaAnunciante: anuncio._id,
                                    anunciante: connFactory.getDocument(paramsCloudant, query)
                                }
                            )
                        }

                        Promise.all(listRequest.map(item => item.anunciante.then(anunciante => ({ item, anunciante })))).then(results => {
                            let response = [];

                            for (let result of results) {
                                if (result.anunciante[0] != undefined) {
                                    result.anunciante[0].idProgramaAnunciante = result.item.idProgramaAnunciante;
                                    response.push(result.anunciante[0]);
                                }
                            }

                            res.send(response);
                        });
                    } else {
                        res.send({});
                    }
                })

            }
        }
    })
});

// {
//     "marca": "BOSCH",
//     "categoria": "automobilistico",
//     "tipo": "ANUNCIANTE",
//     "link": "1234",
//     "imagem": "123123"
// }

app.post('/anunciante', function (req, res) {
    let request = connFactory.insert(req, paramsCloudant, req.body)
    request.then(function (result) {
        res.json(result);
    });
});

// {
//     "_id": "f82255959faffa64e0e247b13e5c1d01",
//     "_rev": "2-0512be20a008c14d6f0baa1c848d9a31",
//     "tipo": "ATIVIDADE",
//     "tipoAtividade": "acesso_url",
//     "estalecas": "5"
//   }

app.post('/atividade', function (req, res) {
    let request = connFactory.insert(req, paramsCloudant, req.body)
    request.then(function (result) {
        res.json(result);
    });
});

// {
//     "_id": "ba5cbb781d27fcff8ad643bb78ea1461",
//     "_rev": "3-0d867aabf9c959d04c8d8b9e94f5b528",
//     "idTelespectador": "756bfa7969828a83afa71abb50a48727",
//     "idProgramaAnunciante": "22c62de9d71d8ecc96120ab5d8dd9d58",
//     "data_hora": "20/04/2019 08:30:00",
//     "localizacao": "lat: 123, lng: 123",
//     "idAtividade": "f82255959faffa64e0e247b13e5c1d01",
//     "tipo": "MATCH"
//   }

app.post('/match', function (req, res) {
    let request = connFactory.insert(req, paramsCloudant, req.body)
    request.then(function (result) {
        res.json(result);
    });
});


// {
//     "_id": "a57435360a4e19824bd2bede2d1758d5",
//     "_rev": "2-ed00f0eff6c4ca9a3f976a68838c5351",
//     "nome": "Mais você",
//     "categoria": "Dia a Dia",
//     "horario_inicio": "08:00",
//     "horario_fim": "10:00",
//     "dias_semana": "segunda, terca, quarta, quinta, sexta",
//     "globo_code_online": "linkonline",
//     "globo_code_offline": "linktest",
//     "tipo": "PROGRAMA"
// }

app.post('/programa', function (req, res) {
    let request = connFactory.insert(req, paramsCloudant, req.body)
    request.then(function (result) {
        res.json(result);
    });
});

// {
//     "_id": "22c62de9d71d8ecc96120ab5d8dd9d57",
//     "_rev": "3-f69dbd1e8b6d527a705835f856f0ea9a",
//     "idPrograma": "a57435360a4e19824bd2bede2d1758d5",
//     "idAnunciante": "bd1a59780458be26aa59c90d299840e5",
//     "status": "ATIVO",
//     "idAtividade": "f82255959faffa64e0e247b13e5c1d01",
//     "tipo": "PROGRAMAANUNCIANTE"
// }

app.post('/programaAnunciante', function (req, res) {
    let request = connFactory.insert(req, paramsCloudant, req.body)
    request.then(function (result) {
        res.json(result);
    });
});

// {
//     "_id": "756bfa7969828a83afa71abb50a48727",
//     "_rev": "1-0c90011580ce68e17e31b211068388bd",
//     "email": "matheuscatossi@gmail.com",
//     "nome": "Matheus Catossi",
//     "idade": "21",
//     "sexo": "Masculino",
//     "estalecas": "25",
//     "tipo": "TELESPECTADOR"
// }

app.post('/telespectador', function (req, res) {
    let request = connFactory.insert(req, paramsCloudant, req.body)
    request.then(function (result) {
        res.json(result);
    });
});

// {
//     idPrograma: '123',
//     idAtividade: '123',
//     marca: 'mememme'
// }


// enviar idPrograma
// enviar idAtividade

// {
//     "_id": "marca",
//     "marca": "BOSCH",
//     "categoria": "automobilistico",
//     "tipo": "ANUNCIANTE",
//     "link": "1234",
//     "imagem": "123123"
//   }

// {
//     "idPrograma": "a57435360a4e19824bd2bede2d1758d5",
//     "idAnunciante": "bd1a59780458be26aa59c90d299840e5",
//     "status": "ATIVO",
//     "idAtividade": "f82255959faffa64e0e247b13e5c1d01",
//     "tipo": "PROGRAMAANUNCIANTE"
//   }

app.post('/anuncio', function (req, res) {

    let anunciante = {
        _id: req.body.marca,
        marca: req.body.marca,
        categoria: req.body.categoria,
        tipo: "ANUNCIANTE",
        link: req.body.link,
        imagem: req.body.imagem
    }

    let programaanunciante = {
        idPrograma: req.body.idPrograma,
        idAnunciante: req.body.marca,
        status: "ATIVO",
        tipo: "PROGRAMAANUNCIANTE",
        idAtividade: "f82255959faffa64e0e247b13e5c1d01",
    }

    let request = connFactory.insert(req, paramsCloudant, anunciante)
    request.then(function (result) {
        let request = connFactory.insert(req, paramsCloudant, programaanunciante)
        request.then(function (result2) {
            res.json(result2);
        });
    });
});

var port = process.env.PORT || 3001
app.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

