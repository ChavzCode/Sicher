const mysql = require('mysql');
const { database } = require('./keys');
const util = require('util');
const connection = mysql.createConnection(database);

connection.connect((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('Database connection was closed');
        }
        if(err.code === 'ER-CON-COUNT-ERROR'){
            console.log('Database has too many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('Database connection was refused');
        }
    }
    if(connection){
        console.log('DB is connected')
    }else{
        console.log("DB isn't connected")
    }
    return;
});

//Implement promises in connection.query
connection.query = util.promisify(connection.query);

//Exporting Modules
module.exports = connection;
