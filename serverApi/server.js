const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const { json } = require("express");
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
  
  db.query(
    "SELECT COUNT(*) verificar from cad_usuario where usu_login = ?", 
    [login],
    (err, result) => {
      if(err) res.send({err: err});
      if(result){
       
      console.log(result)
      
      const verif = JSON.stringify(result);
      console.log("Verificar: " + verif);
      const json = JSON.parse(verif);
      console.log(json[0].verificar)
      const Id = json[0].verificar; 
      if(Id === 1){
        res.send({message: "ops deu pau"});
      }else if(Id === 0){ 
        db.query("INSERT INTO cad_usuario (usu_nome, usu_login, usu_senha, usu_email) VALUES (?,?,?,?)",
        [nome, login, senha, email], (err, results) => {
          if(err) res.send({err: err});
          if(result.length > 0){
            res.send(results)
            console.log(results)
            }          
        })
      }
     }else res.send({message: "ops deu"})
    }); 
   
})

//login
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



//Cadastro dados do usuario
app.post('/api/empresa', (req, res) => {
  
  const nomeEmpresa  = req.body.nomeEmpresa
  const razaoSocial = req.body.razaoSocial
  const CNPJ = req.body.CNPJ
  const IE = req.body.IE
  const email = req.body.email

  db.query(
    "SELECT COUNT(*) verificar from cad_empresa where cli_nome = ?", 
    [nomeEmpresa],
    (err, result) => {
      if(err) res.send({err: err});
      if(result){
       
      console.log(result)
      
      const verif = JSON.stringify(result);
      console.log("Verificar: " + verif);
      const json = JSON.parse(verif);
      console.log(json[0].verificar)
      const Id = json[0].verificar; 
      if(Id === 1){
        res.send({message: "Ja cadastrado!"});
      }else if(Id === 0){ 
        db.query( "INSERT INTO cad_empresa (cli_nome, cli_razaosocial, cli_email, cli_cnpj, cli_ie) VALUES (?,?,?,?,?)",
        [nomeEmpresa,razaoSocial,email,CNPJ,IE],  (err, results) => {
          if(err) res.send({err: err});
          if(result.length > 0){
            res.send(results)
            console.log(results)
            }          
        })
      }
     }else res.send({message: "ops deu"})
    }); 
})

// dados da empresa
app.post('/api/DadosEmpresa', (req, res) => {

const email  = req.body.email

db.query("SELECT * FROM cad_empresa WHERE cli_email = ?",
[email], (err, result) => {
  if(err) res.send({err: err});
  if(result.length > 0){
    res.send(result)
    console.log(result)
    }else res.send({message: "emperesass"})      
})
})


app.put('/api/EmpUpdate', (req, res) => {
  const id = req.body.id
  const nomeEmpresa  = req.body.nomeEmpresa
db.query("UPDATE cad_empresa SET cli_nome = ? WHERE cli_id = ?",
[nomeEmpresa, id], (err, result) => {
  if(err) res.send({err: err});
  if(result){
    res.send(result)
    console.log(result)
    }else res.send({message: "Algo deu errado"})      
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
