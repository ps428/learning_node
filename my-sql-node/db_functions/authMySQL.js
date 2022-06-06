const { response } = require('express');
const { connection } = require('../dbConfigMysql')

async function checkAvailableUserid(userid) {

    const query = `SELECT * FROM users WHERE LOWER(userid) = LOWER('${userid}');`
    // const query = `SELECT * FROM users;`
    var result;
    const response = await new Promise((resolve, reject) => {
        connection.query(query, (error, ress) => {
            if (ress.length > 0) {
                // console.log(ress.length>0)
                resolve(ress);
                result = { success: false, data: 'User already exists with this userid' }
            }
            else {
                resolve(error);
                result = { success: true, data: 'Registration in progress... Adding user to the database' }
            }
        })
    })
    // console.log(response)
    return result
}

async function addNewUser(userData) {
    const name = userData['name']
    const password = userData['password']
    const userid = userData['userid']
    const email = userData['email']
    const image_link = userData['image_link']

    const query = "INSERT INTO users VALUES (?,?,?,?,?);"

    var result;
    try {
        const response = await new Promise((resolve, reject) => {
            connection.query(query, [name, password, userid, email, image_link], (err, results) => {
                if (err) {
                    result = { success: false, data: err.message }
                    // console.log(err.message)
                    reject(err.message)
                }
                else {
                    resolve(results);
                    result = { success: true, data: "Added user successfully" }
                }
            })
        })
    } catch (error) {
        console.log(error);
        result = { success: false, data: error.message }
    }
    return result
}


async function logInUser(userid, password) {
    const query = `SELECT * FROM users WHERE LOWER(userid) = LOWER('${userid}') AND password = '${password}'`

    var result;
    try {
        const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    result = {
                        success: false, data: err.message
                    }                    // console.log(err.message)
                    reject(err.message)
                }
                else {
                    resolve(results);
                    // console.log(results)
                    result = { success: true, data: results };
                }

            })
        })
    } catch (error) {
        console.log(error);
        result = "Error!"
    }
    // console.log(response);
    console.log(result);
    return result
}

module.exports = { checkAvailableUserid, addNewUser, logInUser }