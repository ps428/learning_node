const { connection } = require('../dbConfigMysql')

async function getUsersMySQL() {
    var users;
    const query = "SELECT * FROM users;"
    const response = await new Promise((resolve, reject) => {
        connection.query(query, (error, ress) => {
            if (error) reject(new Error(error.message));
            resolve(ress);
            users = ress;
        })
    })

    // console.log(response);
    return response
}

async function addUserMySQL(userData) {
    const name = userData['name']
    const password = userData['password']
    const userid = userData['userid']
    const email = userData['email']
    const image_link = userData['image_link']

    var returnValue = false;


    const query = "INSERT INTO users VALUES (?,?,?,?,?);"

    try {

        var response = new Promise((resolve, reject) => {

            connection.query(query, [name, password, userid, email, image_link], (err, results) => {
                if (err){
                    returnValue=false
                }
                else {
                    resolve(results);
                    returnValue = true;
                }
            })
        });
        return returnValue

    } catch (error) {
        console.log(error);
    }
    return returnValue
}
module.exports = { getUsersMySQL, addUserMySQL }