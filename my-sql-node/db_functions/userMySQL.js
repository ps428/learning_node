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

    var returnValue = 'failure';

    const query = "INSERT INTO users VALUES (?,?,?,?,?);"

    try {
        var response = await new Promise((resolve, reject) => {
            connection.query(query, [name, password, userid, email, image_link], (err, results) => {
                if (err){
                    returnValue={success:false,data: err.message}
                    // console.log(err.message)
                    reject(err.message)
                }
                else {
                    resolve(results);
                    returnValue = {success:true};
                }
            })
        });
        // console.log(response)
        return returnValue
        
    } catch (error) {
        console.log(error);
        returnValue = {success:false, data:error.message}
    }
    return returnValue
}



module.exports = { getUsersMySQL, addUserMySQL }