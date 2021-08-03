import '../css/login.css'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import TextInput from './TextInput'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login({setErrorMsg, setErrorBox}) {
  const [email, setEmail] = useState({ email: "", valid: false, msg: 'O campo "E-mail do Usuário" está em branco.' })
  const [password, setPassword] = useState({password: "", valid: false, msg: 'O campo "Senha" está em branco.'})
  const [remeber, setRemember] = useState(false)

  // Função que valida se o e-mail foi digitado corretamente.
  function validateEmail(txt) {

    if (txt.length === 0) {
      setEmail({ email: txt, valid: false, msg: 'O campo "E-mail do acesso" está em branco.' })
      return
    }

    if (txt.indexOf('@') >= 1 && txt.length >= 3 && txt.length > txt.indexOf('@') + 1) {
      setEmail({ email: txt, valid: true, msg: "" })
    } else {
      setEmail({ email: txt, valid: false, msg: 'O formato digitado para o campo "E-mail do Acesso" é inválido (exemplo@exemplo.com).' })
      return
    }
  }

  // Função que valida se a senha não está em branco.
  function validatePassword(e) {
    if (e.length === 0) {
      setPassword({ password: e, valid: false, msg: 'O campo "Senha" está em branco.' })
      return
    } else {
      setPassword({ password: e, valid: true, msg: '' })
    }
  }

  function login(e) {
    e.preventDefault()
    let errMsg = []
  
    if (!email.valid) {
      errMsg.push(email.msg)
    }

    if (!password.password) {
      errMsg.push(password.msg)
    }

    if (errMsg.length > 0) {
      setErrorMsg(errMsg)
      setErrorBox(true)
      return
    }

    alert(`
    Campos validados com sucesso!
    Você tentou acessar com os seguintes dados:
    E-mail: ${email.email}
    Senha: ${password.password}
    Lembrar dados: ${remeber ? "Sim" : "Não"}
    `)
  }

  return (
    <div className="login-container">
      <form method="post" onSubmit={e => login(e)}>
        <h1>LOGIN USUÁRIO</h1>
        <TextInput icon={faUser} value={email.email} id="email" type="email" placeholder="E-mail do Usuário" validation={validateEmail} />
        <TextInput icon={faLock} value={password.password} id="password" type="password" placeholder="Senha" validation={validatePassword} />
        <div className="login-form-options">
          <div className="login-chebox-area">
            <input className="login-checkbox" defaultChecked={remeber} onChange={e => { setRemember(e.target.checked) }} id="remember" type="checkbox" />
            <label htmlFor="remember">
              Lembrar
            </label>
          </div>
          <button className="login-button-forgot-password">
            Esqueci a senha
          </button>
        </div>
        <input type="submit" value="entrar" className="login-button-login" />
        <span className="login-or-text">ou</span>
        <Link className="login-button-request-access"
          to={{
            pathname: "/request-access"
          }}
        >
          Solicitar acesso
        </Link>
      </form>
    </div>
  )
}