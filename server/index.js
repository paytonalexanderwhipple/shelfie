require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive')
const controller = require('./controller.js');

// *** Middleware *** //
const app = express();

app.use(bodyParser.json())

app.use(express.static(`${__dirname}/../build`))

massive(process.env.CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance)
        app.listen(process.env.PORT, () => {
            console.log(`The server is running on port: ${process.env.PORT}`)
        })
    }).catch(error => {
        console.log(`(db_connection) There has been an ${error}`)
    })

// *** Endpoints *** //

app.get('/api/product/:id', controller.readById)

app.get('/api/inventory', controller.read)

app.post('/api/product', controller.create)

app.delete('/api/product/:product_id', controller.delete)

app.put('/api/product', controller.update)