const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "teste",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.post('/api/register', (req, res) => {

  const horas = req.body.horas
  const user = 'lindson'

  const sqlInsert = "INSERT INTO banco_horas (bh_usu, bh_horas) VALUES (?, ?)"
  db.query(sqlInsert, [user, horas], (err, results) => {
    console.log(err);
  })
})

app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM cad_acesso";
    db.query(sqlGet,(err, results) => {
      res.send(results)
    })
})


app.listen(3001, ()=> {
  console.log('rodando')
})
