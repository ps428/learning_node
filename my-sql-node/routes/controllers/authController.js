const authMySql = require('../../db_functions/authMySQL');

const getAuthPages = async (req, res) => {
    res.send("Auth Pages, login and register here.")
};

const getLogInPage = async (req, res) => {
    res.send("Log In Page")
};

const logInUser = async (req, res) => {
    const userid = req.body.userid
    const password = req.body.password
    
    const result = await authMySql.logInUser(userid, password)

    res.json(result)
};

const getRegisterPage = async (req, res) => {
    res.send("Sign In Page")
};

const registerUser = async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const userid = req.body.userid
    const email = req.body.email
    const image_link = req.body.image_link


    var resp = await authMySql.checkAvailableUserid(userid)
    if (resp['success'] == true) {
        const result = await authMySql.addNewUser(req.body)
        console.log(result)
        res.status(200).send(`Result is: ${result}`)
    }
    //duplicate user
    else {
        res.status(409).json(resp)
    }

};

module.exports = { getLogInPage, getRegisterPage, getAuthPages, logInUser, registerUser }