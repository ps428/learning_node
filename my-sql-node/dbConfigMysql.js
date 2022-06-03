const mysql = require('mysql2');
const dotenv = require('dotenv');

//setup env
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // port: process.env.DB_PORT
})

connection.connect((err)=>{
    if(err){
        console.log("ERROR CONNECTING WITH DB");
        console.log(err.message);
    }
    // console.log(connection)
    console.log(`Database Connected Successfully`)
})


module.exports = {connection}