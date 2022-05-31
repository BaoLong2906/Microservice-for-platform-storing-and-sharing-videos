var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "genkidamarankingvideo",
    multipleStatements: true
});

connection.connect(function(error) {
    if (error) {
        console.log("KET NOI DATABASE KHONG THANH CONG");
    } else {
        console.log("KET NOI DATABASE THANH CONG");
    }
});


module.exports = connection;