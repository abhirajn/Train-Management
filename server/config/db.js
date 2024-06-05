const mysql = require('mysql2');

var done = false;

if(!done){
    const pool = mysql.createPool({
        host : "localhost",
        user : 'root',
        database : 'irctc',
        password : '12345678'
    })
done = true;   
module.exports = pool.promise(); 
}
// 
