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
  const perfil = "A";
  
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
        db.query("INSERT INTO cad_usuario (usu_nome, usu_login, usu_senha, usu_email, usu_perfil) VALUES (?,?,?,?,?)",
        [nome, login, senha, email, perfil], (err, results) => {
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
  
  const codigo = req.body.codigoEmp
  const nomeFantasia  = req.body.nomeFantasia
  const razaoSocial = req.body.razaoSocial
  const cnpj = req.body.cnpj
  const email = req.body.email
  const telefone = req.body.telefone
  const cidade = req.body.cidade
  const complemento = req.body.complemento
  const numero = req.body.numero


  db.query(
    "SELECT COUNT(*) verificar from cad_empresa where emp_id = ?", 
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
        db.query( "UPDATE cad_empresa SET emp_nomefantasia = ?, emp_razaosocial = ?, emp_email = ?, emp_cnpj = ?, emp_telefone = ?, emp_numero = ?, emp_complemento = ?, emp_cidade = ? WHERE emp_id = ?",
        [nomeFantasia,razaoSocial,email,cnpj, telefone, numero, complemento, cidade, codigo],  (err, results) => {
          if(err) res.send({err: err});
          if(result.length > 0){
            res.send(results)
            console.log(results)
            }          
        })
      }else if(Id === 0){ 
        db.query( "INSERT INTO cad_empresa (emp_nomefantasia, emp_razaosocial, emp_email, emp_cnpj, emp_telefone, emp_numero, emp_complemento, emp_cidade) VALUES (?,?,?,?,?,?,?,?)",
        [nomeFantasia,razaoSocial,email,cnpj, telefone, numero, complemento, cidade],  (err, results) => {
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

db.query("SELECT * FROM cad_empresa WHERE emp_razaosocial = ?",
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
        res.send({message: "E-mail j?? cadastrado!"});
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

app.post('/api/updateUserAdm', (req, res) => {
  
  const login = req.body.login
  const id = req.body.id
  const nome  = req.body.nome
  const senha = req.body.senha
  const email = req.body.email
  const cpf = req.body.cpf
  const telefone = req.body.telefone

db.query("UPDATE cad_usuario SET usu_nome = ?,usu_login = ?,usu_senha = ?,usu_email = ?,usu_telefone = ?, usu_cpf = ? WHERE usu_id = ?",
[nome,login,senha,email,telefone,cpf,id], (err, result) => {
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
        res.send({message: "Codigo n??o encontrado no cadastro"});
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
        res.send({message: "Codigo n??o encontrado no cadastro"});
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
      }else res.send({message: "Codigo n??o cadastrado"})
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
