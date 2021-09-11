const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());
  
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pluxdb",
});


//CADASTRO DE USUARIO
app.post('/api/cadastro', (req, res) => {
  const nome  = req.body.nome
  const senha = req.body.senha
  const email = req.body.email
  const login = req.body.login
  
  const sqlInsert = "INSERT INTO cad_usuario (usu_nome, usu_login, usu_senha, usu_email) VALUES (?,?,?,?)"
  db.query(sqlInsert, [nome, login, senha, email], (err, results) => {
    console.log(err);
  })
})


app.post('/api/login', (req, res) => {

  const senha = req.body.senha
  const login = req.body.login

  db.query( 
    "SELECT * FROM cad_usuario WHERE usu_login = ? AND usu_senha = ?",
   [login, senha],
    (err, result) => {
     if(err) res.send({err: err});
     if(result.length > 0) {
      res.send(result)
     }else res.send({message: "Login/senha nao confere"})
    })
})


app.get('/api/buscarUser', (req, res) => {

  const senha = req.body.senha
  const login = req.body.login
  
  db.query( 
    "SELECT * FROM cad_usuario WHERE usu_login = ? AND usu_senha = ?",
   [login, senha],
    (err, result) => {
     if(err) res.send({err: err});
     if(result){
       res.send(result)
       console.log(result)
      }
     else res.send({message: "Login/senha nao confere"})
    })

})


//gravar ponto
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
