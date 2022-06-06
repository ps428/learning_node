const userMySQL = require('../../db_functions/userMySQL')

const getUser = async (req,res)=>{
    const userid = req.params.userid
    const users = await userMySQL.getUsersMySQL();
    const user = users.find((currentUser)=>currentUser.userid== userid)
    console.log(user)
    if(user){
        res.json({success:true,data:user})
    }
    else{
        res.status(200).json({success:false,data:"USER NOT FOUND"})
    }
}

const getAllUsers = async (req,res)=>{
    const users = await userMySQL.getUsersMySQL();
    console.log(users)
    if(users){
        return res.json({success:true,"data":users,"test":"yay"})
    }
    else
    {
        return res.status(400).json({success:false})
    }

}

const addUser = async (req,res)=>{
    const userData = req.body   
    // console.log(userData)
    var result=''
    try{
        console.log(`Running`)
        result = await userMySQL.addUserMySQL(userData)
        result = `result was: ${result}`
        console.log(result)

    }
    catch(err){
        console.log(`Error`)
        console.log(err)

    }
    res.send(result);

}

module.exports = {getUser, getAllUsers, addUser}