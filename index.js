// Massive is a PostgreSQL-specific data access tool. The goal of Massive is to make it easier for you to use PostgreSQL's amazing features. It helps you access and query your database as you want to.

//MassiveJS is an amazing library that lets you query your PostgreSQL database from Node in a very easy, straight-forward way. Instead of trying to map your database to objects, MassiveJS lets you work directly with your tables and db functions.

//You can create a directory in the root of your project called "db" and Massive will load the SQL files therein and make them executable based on file name.

const express = require('express')
, cors = require('cors')
, bodyParser = require('body-parser')
, massive = require('massive')
, controller = require('./products_controller')
// Dotenv loads environment variables from a .env file into process.env .
require('dotenv').config()



//express()
// Creates an Express application. 
const app = express();

//app.use()
// Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.

//Middleware is any number of functions that are invoked by the Express.js routing layer before your final request handler is, and thus sits in the middle between a raw request and the final intended route. It seits in between your axios request in your React and your Node endpoint.

//bodyParser.json() returns middleware that only parses json. A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(bodyParser.json());


// Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to let a user agent gain permission to access selected resources from a server on a different origin (domain) than the site currently in use. A user agent makes a cross-origin HTTP request when it requests a resource from a different domain, protocol, or port than the one from which the current document originated. cors() allows you to make those cross-origin HTTP requests.
app.use(cors());


//connect to the database. This will load the tables and functions, returning them to the db instance
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    // app.set(name, value)
    // Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. 'db' is the name. dbInstance is the value.
app.set('db', dbInstance);
});


//app.get(path, callback)
// Routes HTTP GET requests to the specified path with the specified callback function.
app.get('/api/products', controller.getAll)

//app.get(path, callback)
// Routes HTTP GET requests to the specified path with the specified callback function.
app.get('/api/product/:id', controller.getOne)

//app.put(path, callback)
// Routes HTTP PUT requests to the specified path with the specified callback function.
app.put('/api/product/:id', controller.update)

// app.post(path, callback)
// Routes HTTP POST requests to the specified path with the specified callback function.
app.post('/api/product/', controller.create)

// app.delete(path, callback)
// Routes HTTP DELETE requests to the specified path with the specified callback function. 
app.delete('/api/product/:id', controller.delete)




const port = process.env.PORT || 3000;

// app.listen()
// Listens for connections on the specified port. 
app.listen(port, () => console.log(`Listening on port ${port}`));






//Cross-origin requests are made using the standard HTTP request methods. Most servers will allow GET requests, meaning they will allow resources from external origins (say, a web page) to read their assets. HTTP requests methods like PATCH, PUT, or DELETE, however, may be denied to prevent malicious behavior. For many servers, this is intentional. For example, it is likely that server A does not want servers B, C, or D to edit or delete its assets.