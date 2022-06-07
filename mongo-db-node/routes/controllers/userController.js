const express = require('express')
const app = express()
//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//bcrypt to encrypt password
const bcrypt = require("bcrypt");


const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017/mydb"

//---------CREATE USER: DONE
const checkDuplicateUsername = async (Username) => {
    const client = new MongoClient(url)
    var duplicate = 0
    async function run() {
        try {
            await client.connect()
            const database = client.db("userDB")
            const collection = database.collection("users")

            const cursor = collection.find({}, {})
            await cursor.forEach((doc) => {
                if (doc.Username == Username)
                    duplicate = 1
            })
        }
        catch (e) {
            console.log(`Error: ${e}`);
        }
        finally {
            await client.close()
        }
    }
    await run().catch(console.dir)
    return duplicate
}

const createUser = async (req, res) => {
    const client = new MongoClient(url)

    const Name = req.body.Name
    const Add1 = req.body.Address.Add1
    const Add2 = req.body.Address.Add2
    const Add3 = req.body.Address.Add3
    const Area = req.body.Address.Area
    const City = req.body.Address.City
    const State = req.body.Address.State
    const Country = req.body.Address.Country
    const Pincode = req.body.Address.Pincode
    const Mobile = req.body.ContactDetails.Mobile
    const Email = req.body.ContactDetails.Email
    const Picture = req.body.Picture
    var UserType = req.body.UserType
    const Username = req.body.Username
    const Password = req.body.Password


    if (await checkDuplicateUsername(Username) == 1) {
        return res.status(409).send(`Error! duplicate username: ${Username}`)
    }

    //set default user type as cs
    if (UserType == "") {
        UserType = "CS"
    }

    //tokenize the password with bcrypt or JWT something, TODO
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    TokenizedPasswrod = await bcrypt.hash(Password, salt);

    //how to get username?
    async function run() {
        try {
            await client.connect()
            const database = client.db("userDB")
            const collection = database.collection("users")

            const result = await collection.insertOne(({ Name: Name, Address: { Add1: Add1, Add2: Add2, Add3: Add3, Area: Area, City: City, State: State, Country: Country, Pincode: Pincode }, ContactDetails: { Mobile: Mobile, Email: Email }, Picture: Picture, UserType: UserType, Username: Username, Password: TokenizedPasswrod }))

            res.json(result)
        }
        catch (e) {
            console.log(`Error: ${e}`);
        }
        finally {
            await client.close()
        }
    }
    run().catch(console.dir)
}


//---------GET PROFILE: DONE
const fetchProfileData = async (Username, Password) => {
        try {
            const client = new MongoClient(url)
    var profile = { success: 0, data: "Wrong credentials" }
    var success = 0
             console.log("Step 1")   
            await client.connect()
            const database = client.db("userDB")
            const collection = database.collection("users")
            console.log("Step 2")
            const cursor = await collection.findOne({ Username: Username })
            console.log("Step 3")

            console.log(JSON.stringify(cursor))
            
           
           
            let result = await cursor.forEach ((doc) => {
                console.log("Step 4")
                console.log(doc.Username, Username)
                if (doc.Username == Username) {
                    bcrypt.compare(Password, doc.Password, function (err, isMatch) {
                        // console.log(Password,doc.Password);
                        if (err) {
                            throw err
                        } else if (!isMatch) {
                            profile = { success: 0, data: "Wrong credentials are wrong" };

                            console.log("Password doesn't match!")
                        } else {
                            profile = { success: 1, data: doc };
                            console.log("Password matches!")
                            success = 1;
                            // console.log(profile);
                            // return profile

                        }
                    })
                }
            })
            console.log(" step  5" ,profile)
            return profile
        }
        catch (e) {
            console.log(`Error: ${e}`);
            profile = { success: 0, data: e.message };
            return profile
        }
}

const logIn = async (req, res) => {

    const Username = req.body.Username
    const Password = req.body.Password

    // console.log(`Getting profile of user: ${req.params.username}`);
    const result = await fetchProfileData(Username, Password)
    console.log(result)
    if ((await result.success == 1)) {
        res.json(result)
    }
    else {
        res.status(409).json(result)
    }
}


//---------UPDATE USER: TODO
const updateUser = async (req, res) => {
    const client = new MongoClient(url)

    const Name = req.body.Name
    const Add1 = req.body.Address.Add1
    const Add2 = req.body.Address.Add2
    const Add3 = req.body.Address.Add3
    const Area = req.body.Address.Area
    const City = req.body.Address.City
    const State = req.body.Address.State
    const Country = req.body.Address.Country
    const Pincode = req.body.Address.Pincode
    const Mobile = req.body.ContactDetails.Mobile
    const Email = req.body.ContactDetails.Email
    const Picture = req.body.Picture
    var UserType = req.body.UserType


    async function run() {
        try {
            await client.connect()
            const database = client.db("intro")
            const collection = database.collection("quotes")

            const updateDoc = {
                $set: {
                    writer: writer,
                },
            }

            const result = await collection.updateOne({}, updateDoc, {});

            res.json(`Updated author name to: ${writer}`)
        }
        catch (error) {
            console.warn("ERROR: " + error);
        }
        finally {
            await client.close()
        }
    }
    run().catch(console.dir)
}


//---------DELETE USER: DONE
const deleteUser = async (req, res) => {
    const client = new MongoClient(url)
    const Username = req.body.Username
    console.log(Username)

    //Check if user exists or not before deletion
    if (!(await checkDuplicateUsername(Username))) {
        return res.status(409).send("User not found")
    }
    async function run() {
        try {
            await client.connect()
            const database = client.db("userDB")
            const collection = database.collection("users")

            const query = { Username: Username }
            const result = await collection.deleteOne(query);

            if (result.deletedCount === 1) {
                res.end(`Successfully deleted the user ${Username}.`);
            } else {
                res.end("Unable to delete the user.");
            }
        }
        catch (error) {
            console.warn("ERROR: " + error);
        }
        finally {
            await client.close()
        }
    }
    run().catch(console.dir)
}


//---------CHANGE PASSWORD: TODO
const changePassword = async (req, res) => {
    const client = new MongoClient(url)

    const Username = req.body.Username
    const OldPassword = req.body.OldPassword
    const NewPassword = req.body.NewPassword

    //Check if user exists or not before updation
    if (! await checkDuplicateUsername(Username)) {
        return res.status(409).send(`Error! Username: ${Username} not found`)
    }

    async function run() {
        try {
            await client.connect()
            const database = client.db("userDB")
            const collection = database.collection("users")

            const updateDoc = {
                $set: {
                    writer: writer,
                },
            }

            const result = await collection.updateOne({}, updateDoc, {});

            res.json(`Updated author name to: ${writer}`)
        }
        catch (error) {
            console.warn("ERROR: " + error);
        }
        finally {
            await client.close()
        }
    }
    run().catch(console.dir)
}



module.exports = { addUser: createUser, getProfile: logIn, updateUser, deleteUser, changePassword }