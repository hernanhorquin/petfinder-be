const { Sequelize } = require('sequelize');
const express = require('express');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//npx sequelize-cli db:migrate con este comando se corren las migraciones que crean las tablas en la bd, previamente hay que configurar el config.json con los datos de conexión de la BD

//USER MIGRATION //npx sequelize-cli model:generate --name User --attributes firstName:string,lastname:string,cellphone:string,adrress:string,lastName:string,email:string,creationdate:date,citycode:integer