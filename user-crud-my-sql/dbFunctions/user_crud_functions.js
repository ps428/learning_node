import { connection } from '../dbConfig.js';

const userTable = process.env.USER_TABLE;


const checkAvailableUserid = async (userid) => {

  const query = `SELECT * FROM ${userTable} WHERE LOWER(userid) = LOWER('${userid}');`

  let result = 0;
  try {
    const response = await new Promise((resolve, reject) => {
      connection.query(query, (error, res) => {
        if (res) {
          // console.log(ress.length>0)
          // console.log(res)
          resolve(res)
          if (res.length > 0)
            result = { success: false, data: 'User already exists with these details: userid, mobile and email must be unique' }
          else
            result = { success: true, data: 'Registration in progress... Adding user to the database' }

        }
        else if (error) {
          resolve(error)
          result = { success: false, data: error }
        }
        else {
          result = { success: true, data: 'Registration in progress... Adding user to the database' }
        }
      })
    }
    )
  }
  catch (e) {

    result = { success: false, error: e }
  }

  // console.log(result)
  return result
}


async function addNewUser(userData) {
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

async function getUserData(userid) {

  const query = `SELECT * FROM ${userTable} WHERE userid = "${userid}"`;
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
          result = { success: true, msg: "User data fetched successfully", values: results }
        }
      })
    })
  } catch (error) {
    result = { success: false, msg: error }
  }
  return result

}

export { addNewUser, checkAvailableUserid, getUserData }