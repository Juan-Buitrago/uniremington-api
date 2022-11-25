const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const connection = require('./services/connection');

const app = express();

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.options('*', cors(corsOptions));

app.get('/getRecordStates', cors(corsOptions), function (req, res) {

    try {

        connection.getConnection().then((conn) => {

            let query = `SELECT *
                        FROM record_status
                        WHERE active = true;`;

            conn.query(query, (err, data) => {

                if (err) {

                    conn.end();
                    res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});

                } else {

                    conn.end();
                    res.send({error: false, message: 'Sucess', data: data});
                }
            });

        });

    } catch (ex) {
        res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});
    }
});

app.get('/getRecordByStateCreate', cors(corsOptions), function (req, res) {

    try {

        connection.getConnection().then((conn) => {

            let query = `SELECT r.id,
                               r.title,
                               r.description,
                               CONCAT('$',FORMAT(r.price,0)) AS price,
                               r.state,
                               r.active
                        FROM record r
                                 INNER JOIN record_status rs on r.state = rs.id
                        WHERE rs.name = 'create' 
                        ORDER BY r.id DESC;`;

            conn.query(query, (err, data) => {

                if (err) {

                    conn.end();
                    res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});

                } else {

                    conn.end();
                    res.send({error: false, message: 'Sucess', data: data});
                }
            });

        });

    } catch (ex) {
        res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});
    }
});

app.get('/getRecordByStateClose', cors(corsOptions), function (req, res) {

    try {

        connection.getConnection().then((conn) => {

            let query = `SELECT r.id,
                               r.title,
                               r.description,
                               r.price,
                               r.state,
                               r.active
                        FROM record r
                                 INNER JOIN record_status rs on r.state = rs.id
                        WHERE rs.name = 'close'
                        ORDER BY r.id DESC;`;

            conn.query(query, (err, data) => {

                if (err) {

                    conn.end();
                    res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});

                } else {

                    conn.end();
                    res.send({error: false, message: 'Success', data: data});
                }
            });

        });

    } catch (ex) {
        res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});
    }
});

app.get('/getRecordByStateDelete', cors(corsOptions), function (req, res) {

    try {

        connection.getConnection().then((conn) => {

            let query = `SELECT r.id,
                               r.title,
                               r.description,
                               r.price,
                               r.state,
                               r.active
                        FROM record r
                                 INNER JOIN record_status rs on r.state = rs.id
                        WHERE rs.name = 'delete'
                        ORDER BY r.id DESC;`;

            conn.query(query, (err, data) => {

                if (err) {

                    conn.end();
                    res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});

                } else {

                    conn.end();
                    res.send({error: false, message: 'Success', data: data});
                }
            });

        });

    } catch (ex) {
        res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});
    }
});

app.post('/saveRecord', cors(corsOptions), function (req, res) {

    try {

        if (!req.body || Object.keys(req.body).length != 3) {
            res.send({error: true, message: 'Es obligatorio enviar un objeto para almacenar', data: null});
        }

        let data = req.body;

        connection.getConnection().then((conn) => {

            let query = `INSERT INTO record (title, description, price, state, active)
                         VALUES ('${data.title}', '${data.description}', ${data.price}, 1, true);`;

            conn.query(query, (err, affect) => {

                if (err) {

                    conn.end();
                    res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});

                } else {

                    conn.end();

                    if (affect.affectedRows > 0) {
                        res.send({error: false, message: 'Success', data: affect.affectedRows});
                    } else {
                        res.send({
                            error: true,
                            message: 'Ocurrio un error al ejecutar la consulta a mysql',
                            data: null
                        });
                    }
                }
            });
        });

    } catch (ex) {
        res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});
    }
});

app.put('/updateRecord', cors(corsOptions), function (req, res) {

    try {

        if (!req.body || Object.keys(req.body).length != 5) {
            res.send({error: true, message: 'Es obligatorio enviar un objeto para almacenar', data: null});
        }

        let data = req.body;

        connection.getConnection().then((conn) => {

            let query = `UPDATE record
                        SET title       = '${data.title}',
                            description = '${data.description}',
                            price       =  ${data.price}
                        WHERE id = ${data.id};`;

            conn.query(query, (err, affect) => {

                if (err) {

                    conn.end();
                    res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});

                } else {

                    conn.end();

                    if (affect.affectedRows > 0) {
                        res.send({error: false, message: 'Success', data: affect.affectedRows});
                    } else {
                        res.send({
                            error: true,
                            message: 'Ocurrio un error al ejecutar la consulta a mysql',
                            data: null
                        });
                    }
                }
            });
        });

    } catch (ex) {
        res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});
    }
});


app.put('/updateStateByRecord', cors(corsOptions), function (req, res) {

    try {

        if (!req.body || Object.keys(req.body).length != 2) {
            res.send({error: true, message: 'Es obligatorio enviar un objeto para almacenar', data: null});
        }

        let data = req.body;

        connection.getConnection().then((conn) => {

            let query = `UPDATE record
                        SET state       = ${data.state}
                        WHERE id        = ${data.id};`;

            conn.query(query, (err, affect) => {

                if (err) {

                    conn.end();
                    res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});

                } else {

                    conn.end();

                    if (affect.affectedRows > 0) {
                        res.send({error: false, message: 'Success', data: affect.affectedRows});
                    } else {
                        res.send({
                            error: true,
                            message: 'Ocurrio un error al ejecutar la consulta a mysql',
                            data: null
                        });
                    }
                }
            });
        });

    } catch (ex) {
        res.send({error: true, message: 'Ocurrio un error al ejecutar la consulta a mysql', data: null});
    }
});

app.listen(() => {
    console.log("El servidor está inicializado en el puerto 3000");
});
