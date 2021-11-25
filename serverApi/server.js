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


//CADASTRO DE USUARIO (ADMIN)
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

//login (ADMIN)
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


//Cadastro dados da emprasa
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

const nome  = req.body.nomeEmpresa

db.query("SELECT * FROM cad_empresa WHERE cli_nome = ?",
[nome], (err, result) => {
  if(err) res.send({err: err});
  if(result.length > 0){
    res.send(result)
    console.log(result)
    }else res.send({message: "ocorreu um erro ao tentar buscar dados da empresa"})      
})
})


app.post('/api/cadFuncionario', (req, res) => {

  const codigo  = req.body.codigo
  const nome  = req.body.nome
  const email  = req.body.email
  const celular = req.body.celular
  const cpf  = req.body.cpf
  
  db.query(
    "SELECT COUNT(*) verificar from cad_funcionarios where fun_email = ?", 
    [email],
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
        res.send({message: "E-mail já cadastrado!"});
      }else if(Id === 0){ 
        db.query("INSERT INTO cad_funcionarios (fun_codigo, fun_nome, fun_email, fun_cpf, fun_whatsapp) VALUES (?,?,?,?,?)",
        [codigo,nome,email,cpf,celular],  (err, results) => {
          if(err) res.send({err: err});
          if(result.length > 0){
            res.send(results)
            console.log(results)
            }          
        })
      }
     }else res.send({message: "ops ocorreu algum problema"})
    }); 
})

app.get('/api/buscarFuncionanio', (req, res) => {
  db.query( 
    "SELECT * FROM cad_funcionarios LIMIT 5",
    (err, result) => {
     if(err) res.send({err: err});
     if(result){
       res.send(result)
       console.log(result)
      }
     else res.send({message: "Ops ocorreu um erro"})
    })

})  

app.post('/api/buscarUltimoIdFunc', (req, res) => {
  
  const ultimoId = req.body.ultimoId

  db.query( 
    "SELECT * FROM cad_funcionarios WHERE fun_id > ?",
    [ultimoId],(err, result) => {
      if(err) res.send({err: err});
      else res.send(result)
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
app.post('/api/baterponto', (req, res) => {

  const codigo = req.body.codigo
  const horas = req.body.horas
  const nome =  req.body.nome
  const data = req.body.data

 
  db.query(
    "SELECT COUNT(*) verificar from cad_funcionarios where  fun_codigo = ?", 
    [codigo],
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
        db.query("INSERT INTO banco_horas (banch_nome, banch_hora, banch_date) VALUES (?, ?, ?)",
        [nome, horas, data], (err, result) => {
          if(err) res.send({err: err});
          else res.send("TUDO OK")
        })      
      }else if(Id === 0){ 
        res.send({message: "Codigo não encontrado no cadastro"});
      }
     }else res.send({message: "Ocorreu algum erro, tente mais tarde"})
    }); 
})

// gravar ponto adm
app.post('/api/baterpontoadm', (req, res) => {

  const codigo = req.body.codigo
  const horas = req.body.horas
  const nome =  req.body.nome
  const data = req.body.data

 
  db.query(
    "SELECT COUNT(*) verificar from cad_usuario where  usu_id = ?", 
    [codigo],
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
        db.query("INSERT INTO banco_horas (banch_nome, banch_hora, banch_date) VALUES (?, ?, ?)",
        [nome, horas, data], (err, result) => {
          if(err) res.send({err: err});
          else res.send("TUDO OK")
        })      
      }else if(Id === 0){ 
        res.send({message: "Codigo não encontrado no cadastro"});
      }
     }else res.send({message: "Ocorreu algum erro, tente mais tarde"})
    }); 
})

app.post('/api/buscarCodigo', (req, res) => {
  const codigo = req.body.codigo
  
  db.query( 
    "SELECT * FROM cad_funcionarios WHERE fun_codigo = ?",
   [codigo],
    (err, result) => {
      if(err) res.send({err: err});
      if(result.length > 0) {
       res.send(result)
      }else res.send({message: "Codigo não cadastrado"})
    })

})


app.post('/api/buscarPontos', (req, res) => {

  const nome = req.body.nome

  db.query("SELECT * FROM banco_horas WHERE banch_nome = ?",
  [nome], (err, result) => {
    if(err) res.send({err: err});
    else res.send(result)
  })
})



app.listen(3001, ()=> {
  console.log('rodando')
})
