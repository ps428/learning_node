const express = require('express')
const app = express()
//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017/mydb"



const addQuote = async (req, res) => {
    const client = new MongoClient(url)
    console.log(req.body)
    const quote = req.body.quote
    const writer = req.body.writer

    async function run() {
        try {
            await client.connect()
            const database = client.db("intro")
            const collection = database.collection("quotes")

            const result = await collection.insertOne(({ quote: quote, writer: writer }))

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

const getQuotes = async (req, res) => {
    const client = new MongoClient(url)
    async function run() {
        try {
            await client.connect()
            const database = client.db("intro")
            const collection = database.collection("quotes")

            const cursor = collection.find({}, {})

            let items = [];

            await cursor.forEach((doc) => {
                items.push(doc)
            })
            res.json(items)
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

const updateWriter = async (req, res) => {
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


const deleteQuote = async (req, res) => {
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

module.exports = { addQuote, getQuotes, updateWriter, deleteQuote }