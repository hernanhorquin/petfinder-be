const { Sequelize } = require('sequelize');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const jwtKey = require('./configs/config');
const cors = require('cors');
const logger = require('morgan');

const app = express()

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options('*', cors());


const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* 404 not found */
app.use((req, res, next) => {
  const response = {
    error: true,
    code: 404,
    message: 'URL not found',
  };
  res.status(404).send(response);
});

//* Error handling */
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


/*
1_descargar nodejs
2_npm install
3_npx sequelize-cli db:migrate con este comando se corren las migraciones que crean las tablas en la bd, previamente hay que configurar el config.json con los datos de conexión de la BD

*/


//USER MIGRATION //npx sequelize-cli model:generate --name User --attributes firstName:string,lastname:string,cellphone:string,adrress:string,lastName:string,email:string,creationdate:date,citycode:integer