const mysql = require('mysql2');

var connection = {};

connection.getConnection = () =>{
    return new Promise(function (resolve, reject) {
        console.log('mysql connection request');
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'q5f10csw15605',
            database: 'uniremington'
        });

        if(connection){
            resolve(connection);
        }else{
            reject('mysql connection request error');
        }
    });
};

module.exports = connection;
