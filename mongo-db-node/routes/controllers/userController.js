const express = require('express')
const app = express()
//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017/mydb"



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

const addUser = async (req, res) => {
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

    //tokenize the password with JWT, TODO
    TokenizedPasswrod = Password

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

const fetchProfileData = async (Username) => {
    const client = new MongoClient(url)
    var success = 0
    var profile = "No user found";
    async function run() {
        try {
            await client.connect()
            const database = client.db("userDB")
            const collection = database.collection("users")

            const cursor = collection.find({}, {})
            await cursor.forEach((doc) => {
                if (doc.Username == Username) {
                    success = 1;
                    profile = doc;
                }
            })

        }
        catch (e) {
            console.log(`Error: ${e}`);
            profile = e.message
        }
        finally {
            await client.close()
        }
    }
    await run().catch(console.dir)
    return { success: success, data: profile }
}

const getProfile = async (req, res) => {

    const Username = req.params.username
    console.log(`Getting profile of user: ${req.params.username}`);
    const result = await fetchProfileData(Username)
    if ((await result.success == 1)) {
        res.json(result)
    }
    else {
        res.status(409).json(result)
    }
}

const updateUser = async (req, res) => {
    const client = new MongoClient(url)
    const writer = req.body.writer

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


const deleteUser = async (req, res) => {
    const client = new MongoClient(url)
    const writer = req.body.writer

    async function run() {
        try {
            await client.connect()
            const database = client.db("intro")
            const collection = database.collection("quotes")

            const query = {};
            const result = await collection.deleteOne(query);
            if (result.deletedCount === 1) {
                res.end("Successfully deleted one document.");
            } else {
                res.end("Deleted 0 documents.");
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

module.exports = { addUser, getProfile, updateUser, deleteUser }