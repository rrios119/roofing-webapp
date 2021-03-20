const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
//const mysql = require('mysql');
//const fs = require('fs');


//init the express app
const app = express()
let corsOptions = {
    origin: "http://localhost:3001"
};

//init sequilize models
const db = require('./models');
db.sequelize.sync(/*{ force: true }).then(() => { console.log("Drop and re-sync db.");}*/);

//Connection to mysql db
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'roofing_db',
//     // ssl: {
//     //     ca   : fs.readFileSync('./ssl/server-ca.pem'), // should be enough for AWS
//     //     key  : fs.readFileSync('./ssl/client-key.pem'), // required for google mysql cloud db
//     //     cert : fs.readFileSync('./ssl/client-cert.pem'), // required for google mysql cloud db
//     // }
// });

// db.connect(function(err) {
//     if(err) throw err;
//     console.log('Connected to mysql!');
// })

//Middleware
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
 res.json({ message: "Welcome to Rios Roofing Web App Backend!"})
});
require("./routes/api/customers")(app);
require("./routes/api/employees")(app);

//Error handling middleware
// app.use(function(err, request, response, next) {
//     //console.log(err);
//     response.status(442).send({error: err.message});
// });

//Handle for production

//Litsen for port
const port = process.env.PORT || 3002;
app.listen(port,() => console.log(`Server started on port ${port}`));
