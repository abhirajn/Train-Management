const mysql = require('mysql2');

var done = false;

if(!done){
    const pool = mysql.createPool({
        host : "sql5.freemysqlhosting.net",
        user : 'sql5735320',
        database : 'sql5735320',
        password : 'mNncdHiSnD'
    })
done = true;   
module.exports = pool.promise(); 
}