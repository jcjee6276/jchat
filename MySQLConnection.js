//MySQLConnection.js
import mysql from 'mysql';
import serverConfig from'./serverConfig.js'

const connection = mysql.createConnection({
    host: serverConfig.mysqlHost,
    user: serverConfig.mysqlUser,
    password: serverConfig.mysqlPassword,
    database: serverConfig.mysqlDatabase
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류: ' + err.statck);
        return;
    }

    console.log('mysql 연결 성공');

})





export default connection;