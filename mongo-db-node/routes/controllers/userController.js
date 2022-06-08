const express = require('express')
const app = express()
//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//bcrypt to encrypt password
const bcrypt = require("bcrypt");

//env config
const dotenv = require('dotenv');
dotenv.config()
const dbName = process.env.dbName
const collectionName = process.env.collectionName
const saltValue = process.env.saltValue;

const { MongoClient } = require('mongodb')
const url = process.env.dbURL

//---------CREATE USER: DONE
const checkDuplicateUsername = async (Username) => {
    const client = new MongoClient(url)
    var duplicate = 0
    async function run() {
        try {
            await client.connect()
            const database = client.db(dbName)
            const collection = database.collection(collectionName)

            const user = await collection.findOne({ Username: Username })
            if (user.Username == Username)
                duplicate = 1
        }
        catch (e) {
            if (e != "TypeError: Cannot read properties of null (reading 'Username')")

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

    //can use schema here but then unhashed password would be sent, so doing it here like this
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
    // now we set user password to hashed password
    const salt = await bcrypt.genSalt(Number(saltValue));

    TokenizedPasswrod = await bcrypt.hash(Password, salt);

    //how to get username?
    async function run() {
        try {
            await client.connect()
            const database = client.db(dbName)
            const collection = database.collection(collectionName)

            const result = await collection.insertOne(({ Name: Name, Address: { Add1: Add1, Add2: Add2, Add3: Add3, Area: Area, City: City, State: State, Country: Country, Pincode: Pincode }, ContactDetails: { Mobile: Mobile, Email: Email }, Picture: Picture, UserType: UserType, Username: Username, Password: TokenizedPasswrod }))

            //retreving the sent data back from DB
            const user = await collection.findOne({ Username: Username })

            res.json({ result: result, data: user })
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


//---------GET PROFILE: DONE: Basic Login work
const fetchProfileData = async (Username, Password) => {
    try {
        const client = new MongoClient(url)
        var profile = { success: 0, data: "Wrong credentials" }
        var success = 0
        await client.connect()
        const database = client.db(dbName)
        const collection = database.collection(collectionName)
        const userData = await collection.findOne({ Username: Username })

        // console.log((userData['Password']))

        await bcrypt.compare(Password, userData['Password']).then((result) => {
            // console.log(Password,userData['Password']);
            if (!result) {
                profile = { success: 0, data: "Wrong credentials!!" };

                console.log("Password doesn't match!")
            } else {
                profile = { success: 1, data: userData };
                console.log("Password matches!")
                success = 1;
                // console.log(profile);
                // return profile
            }
        })

        console.log(profile)
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
    var Username = req.body.Username

    if (await checkDuplicateUsername(Username) == 0) {
        return res.status(409).send(`Error! Username not found: ${Username}`)
    }

    async function run() {
        try {
            await client.connect()
            const database = client.db(dbName)
            const collection = database.collection(collectionName)

            const query =  {Username: Username}
            const update = { $set: {Name: Name,Address: { Add1: Add1, Add2: Add2, Add3: Add3, Area: Area, City: City, State: State, Country: Country, Pincode: Pincode }, ContactDetails: { Mobile: Mobile, Email: Email }, Picture: Picture, UserType: UserType}}

            const results = await collection.updateOne(query, update)

            console.log((results));
            const userUpdated = await collection.findOne({ Username: Username })
            
            return res.json({success:true,newData:userUpdated})
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
    // console.log(Username)

    //Check if user exists or not before deletion
    if (!(await checkDuplicateUsername(Username))) {
        return res.status(409).send("User not found")
    }
    async function run() {
        try {
            await client.connect()
            const database = client.db(dbName)
            const collection = database.collection(collectionName)

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
            const database = client.db(dbName)
            const collection = database.collection(collectionName)

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



module.exports = { createUser, logIn, updateUser, deleteUser, changePassword }