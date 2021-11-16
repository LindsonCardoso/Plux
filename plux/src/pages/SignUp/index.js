
import { useState,useContext } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'


import Logo from '../../assets/logo.jpg'

function SignUp() {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);
  let history = useHistory();
  //API CADASTRO
  const Cadastro = (e) => {
    e.preventDefault();
    if(nome !== '' && login !== '' && email !== '' && senha !== '') {
      signUp(nome, login, email, senha)
    }  


    setTimeout(() => {history.push("/")},3100);
  

  }



  
  return (
    <div className="container-center">
      <div className="login">
      <div className="login-area">
            <img src={Logo}  alt=""/>
          </div>

        <form onSubmit={Cadastro}>
          <h1>Cadastrar uma conta</h1>
          <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => {setNome(e.target.value)}} />
          <input type="text" placeholder="login" value={login} onChange={ (e) => {setLogin(e.target.value)}}/>
          <input type="email" placeholder="email@email.com" value={email} onChange={ (e) => {setEmail(e.target.value)}}/>
          <input type="password" placeholder="*******" value={senha}  onChange={ (e) => {setSenha(e.target.value)}}/>
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>  

        <Link to="/">Já tem uma conta? Entre</Link>
      </div>
    </div>
  );
}

export default SignUp;
