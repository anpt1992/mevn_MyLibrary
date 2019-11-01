// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express() // create your express app

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = 'mongodb+srv://anpt:123@cluster0-wrx9j.azure.mongodb.net/test?retryWrites=true&w=majority'
var client;

var mongoClient = new MongoClient(uri, { reconnectTries: Number.MAX_VALUE, autoReconnect: true, useNewUrlParser: true, useUnifiedTopology: true }) // allows for connection to the db

mongoClient.connect((err, db) => { // returns a connection to the mongodb
    if (err != null) {
        console.log(err)
        return
    }
    console.log('success')
    client = db
})

// make app use dependencies
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.post('/addBook', (req, res) => {
    const collection = client.db('my_library').collection('books')
    var title = req.body.book // parse the data from the request's body

    // var title = 'hai van dam duoi day bien'
    collection.insertOne({ title: title }, function (err, results) {
        if (err) {
            console.log(err)
            res.send('')
            return
        }
        res.send(results.ops[0]) // returns the new document
    })
})

app.post('/deleteBook', (req, res) => {
    const collection = client.db('my_library').collection('books')
    // remove document by its unique _id
    collection.removeOne({ '_id': mongo.ObjectID(req.body.bookID) }, function (err, results) {
        if (err) {
            console.log(err)
            res.send('')
            return
        }
        res.send() // return
    })
})

app.get('/Books', (req, res) => {
    const collection = client.db('my_library').collection('books')
    collection.find().toArray(function (err, results) {
        if (err) {
            console.error(err)
            res.send([])
            return
        }

        res.send(results)
    })
})

app.listen(process.env.PORT || 8081) // client is already running on 8080