import mysql from 'mysql2';
import dotenv from 'dotenv';

//setup env
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // port: process.env.DB_PORT
})

// console.log(process.env)

connection.connect((err)=>{
    if(err){
        console.log("ERROR CONNECTING WITH DB");
        console.log(err.message);
    }
    // console.log(connection)
    else
    console.log(`Database Connected Successfully`)
})


export {connection}