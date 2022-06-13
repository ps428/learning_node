import { connection } from '../dbConfig.js';
import bcrypt from 'bcryptjs';


const userTable = process.env.USER_TABLE;

const saltValue = process.env.saltValue;

// const checkAvailableUserid = async (userid) => {

//   const query = `SELECT * FROM ${userTable} WHERE LOWER(userid) = LOWER('${userid}');`

//   let result = 0;
//   try {
//     const response = await new Promise((resolve, reject) => {
//       connection.query(query, (error, res) => {
//         if (res) {
//           // console.log(ress.length>0)
//           // console.log(res)
//           resolve(res)
//           if (res.length > 0)
//             result = { success: false, data: 'User exists' }
//           else
//             result = { success: true, data: 'User does not exist' }

//         }
//         else if (error) {
//           resolve(error)
//           result = { success: false, data: error }
//         }
//         else {
//           result = { success: true, data: 'User does not exist: Something is wrong' }
//         }
//       })
//     }
//     )
//   }
//   catch (e) {

//     result = { success: false, error: e }
//   }

  // console.log(result)
//   return result
// }


async function addNewUserDB(userData) {
  const name = userData['name']
  const mobile = userData['mobile']
  const email = userData['email']
  const picture = userData['picture']

  const userid = userData['userid']
  const password = userData['password']
  const js_time = new Date();
  const created_at = js_time.toISOString().split('T')[0] + ' ' + js_time.toTimeString().split(' ')[0];;

  const user_type_id = userData['user_type_id']

  const query = `INSERT INTO ${userTable} (name, mobile, email, picture, user_type_id, userid, password, created_at) VALUES (?,?,?,?,?,?,?,?);`

  var result;
  try {
    const response = await new Promise((resolve, reject) => {
      connection.query(query, [name, mobile, email, picture, user_type_id, userid, password, created_at], (err, results) => {
        if (err) {
          result = { success: false, msg: err }
          reject(err.message)
        }
        else {
          resolve(results);
          result = { success: true, msg: "Added user successfully" }
        }
      })
    })
  } catch (error) {
    result = { success: false, msg: error }
  }
  return result
}

// parameterType as in userid and paramaterName as in pranavs, there can be other combinations as well
// made a function to deal with userid, mobile and email, as all these are unique in the base scenario
// it can now be extended to any column of the db
async function getUserDataByParameterDB(criteria) {

  const query = `SELECT * FROM ${userTable} WHERE ${criteria}`;
  var result;
  try {
    const response = await new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          result = { success: false, msg: err }
          reject(err.message)
        }
        else {
          resolve(results);
          if(results.length==0)
            result = { success: false, msg: "User data not found", values: results }
          else
            result = { success: true, msg: "User data fetched successfully", values: results }
        }
      })
    })
  } catch (error) {
    result = { success: false, msg: error }
  }
  return result

}

async function updateDataDB(userData) {
  const name = userData['name']
  const mobile = userData['mobile']
  const email = userData['email']
  const picture = userData['picture']
  const user_type_id = userData['user_type_id']
  const updated_at = userData['updated_at']

  const query = `UPDATE ${userTable} SET name = ?, mobile = ?, email = ?, picture = ?, user_type_id = ?, updated_at = ? WHERE userid='${userData['userid']}';`
  var result;
  try {
    const response = await new Promise((resolve, reject) => {
      connection.query(query, [name, mobile, email, picture, user_type_id, updated_at], (err, results) => {
        if (err) {
          result = { success: false, msg: err }
          reject(err.message)
        }
        else {
          resolve(results);
          result = { success: true, msg: "Updated user successfully" }
        }
      })
    })
  } catch (error) {
    result = { success: false, msg: error }
  }
  return result
}

//acccess will be included once the user roles are defined.
// by default access=1 meaning that the user is admin and has all the previleges
async function deleteUserDB(userid, access=1){
  var result;
  if(access==1){
    const query = `DELETE FROM ${userTable} WHERE userid='${userid}';`
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            result = { success: false, msg: err }
            reject(err.message)
          }
          else {
            resolve(results);
            result = { success: true, msg: "Deleted user successfully" }
          }
        })
      })
    } catch (error) {
      result = { success: false, msg: error }
    }
  }
  else{
  }
  return result
}

async function passwordCheckDB(userid, password){
  
  try {
    let result = { success: 0, data: 'Wrong credentials' };
    
    const query = `SELECT password from ${userTable} WHERE userid="${userid}";`

    const response = await new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          result = { success: false, msg: err }
          reject(err.message)
        }
        else {
          resolve(results);
          result = { success: true, msg: results }
        }
      })
    })
    // console.log(result.msg[0].password)
    const hashedPassword = result.msg[0].password;
    // console.log(hashedPassword)
   
    const doPasswordsMatch = await bcrypt.compare(password, hashedPassword).then((results) => {
      if (!results) {
        result = { success: 0, data: 'Wrong credentials!!' };

        console.log('Password doesn\'t match!');
      } else {
        result = { success: 1, data: results };
        console.log('Password matches!');
        return result
      }
    });
    return result;
  } catch (e) {
    console.log(`Error: ${e}`);
   let  result = { success: 0, data: e.message };
    return result;
  }
}

async function updatePasswordDB(userid, newPassword){
  try {
    
    const salt = await bcrypt.genSalt(Number(saltValue));

    const TokenizedPasswrod = await bcrypt.hash(newPassword, salt);

    let result = { success: 0, data: '' };



    const query = `UPDATE ${userTable} SET password="${TokenizedPasswrod}" WHERE userid="${userid}";`;

    const response = await new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          result = { success: false, msg: err }
          reject(err.message)
        }
        else {
          resolve(results);
          result = { success: true, msg: results }
        }
      })
    })
    console.log(result)
    return result

  }
  catch(e){
    console.log("ERROR in updatePasswordDB: ",e)
    const result = {success:false, msg:e};
    return result
  }
}

export { addNewUserDB, getUserDataByParameterDB, updateDataDB, deleteUserDB, passwordCheckDB, updatePasswordDB}