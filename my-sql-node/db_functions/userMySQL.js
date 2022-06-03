const { connection } = require('../dbConfigMysql')

async function getUsers() {
    var users;
    const query = "SELECT * FROM users;"
    const response = await new Promise((resolve,reject)=>{
        connection.query(query, (error, ress) => {
            if (error) reject(new Error(error.message));
            resolve(ress);
            users = ress;
        })
    })

    // console.log(response);
    return response
}
module.exports = { getUsers }