const {getUsers} = require('../../db_functions/userMySQL')

const getUser = async (req,res)=>{
    const userid = req.params.userid
    const users = await getUsers();
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
    const users = await getUsers();
    console.log(users)
    if(users){
        return res.json({success:true,"data":users,"test":"yay"})
    }
    else
    {
        return res.status(400).json({success:false})
    }

}

module.exports = {getUser, getAllUsers}