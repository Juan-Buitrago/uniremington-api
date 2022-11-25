const mysql = require('mysql2');

var connection = {};

connection.getConnection = () =>{
    return new Promise(function (resolve, reject) {
        console.log('mysql connection request');
        let connection = mysql.createConnection({
            host: 'db-operation-mia-mysql-8.cluster-ccf4ypftnbam.eu-central-1.rds.amazonaws.com',
            user: 'uniremington',
            password: 'WIlSrbYU6Vx9',
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
