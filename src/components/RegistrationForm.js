import '../css/registration-form.css'
import TextInput from './TextInput'
import { Link } from 'react-router-dom'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faIdCard, faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

export default function RegistrationForm({ setErrorMsg, setErrorBox }) {

  const [corporateName, setCorporateName] = useState({ corporateName: "", valid: false, msg: 'O campo "Razão Social" está em branco.' })
  const [cnpj, setCnpj] = useState({ cnpj: "", valid: false, msg: 'O campo "CNPJ" está em branco.' })
  const [userName, setUserName] = useState({ userName: "", valid: false, msg: 'O campo "Seu nome" está em branco.' })
  const [email, setEmail] = useState({ email: "", valid: false, msg: 'O campo "E-mail do acesso" está em branco.' })

  // Função que verifica a razão social
  function validateCorporateName(e) {
    if (e.length === 0) {
      setCorporateName({ corporateName: e, valid: false, msg: 'O campo "Razão Social" está em branco.' })
      return
    } else {
      setCorporateName({ corporateName: e, valid: true, msg: '' })
    }
  }

  // Função que faz diversos tipos de verificação no CNPJ.
  function handleCnpj(e) {
    let temp = e.replace(/[^0-9]/g, '')

    if (temp === "") {
      setCnpj({ cnpj: temp, valid: false, msg: "O campo CNPJ está em branco." })
    }

    if (temp.length < 14) {
      setCnpj({ cnpj: temp, valid: false, msg: "Quantidade de números digitados no CNPJ é menor do que o esperado." })
      return
    }

    temp = temp.substring(0, 14)

    if (!validateCnpj(temp)) {
      setCnpj({ cnpj: temp, valid: false, msg: "O número digitado para o CNPJ é inválido. Verifique se algum número foi digitado incorretamente." })
      return
    }

    setCnpj({ cnpj: temp, valid: true, msg: "" })

  }

  // Função que verifica se o CNPJ é válido conforme o algoritimo real.
  function validateCnpj(value) {

    if (value === "00000000000000" ||
      value === "11111111111111" ||
      value === "22222222222222" ||
      value === "33333333333333" ||
      value === "44444444444444" ||
      value === "55555555555555" ||
      value === "66666666666666" ||
      value === "77777777777777" ||
      value === "88888888888888" ||
      value === "99999999999999") {
      return false;
    }

    let number = value.substring(0, 12)
    let digit = value.substring(12, 14)

    let array = number.split('')
    let mult1 = "543298765432".split('')
    let mult2 = "6543298765432".split('')

    let newArray1 = array.map((value, index) => {
      return Number(value) * Number(mult1[index])
    })

    let sum1 = 0
    newArray1.forEach(value => {
      sum1 += Number(value)
    })

    let digit1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11)

    array.push(digit1)

    let newArray2 = array.map((value, index) => {
      return Number(value) * Number(mult2[index])
    })

    let sum2 = 0
    newArray2.forEach(value => {
      sum2 += Number(value)
    })

    let digit2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11)

    if (digit === `${digit1}${digit2}`) {
      return true
    } else {
      return false
    }
  }

  // Função que valida se o nome da pessoa não está em branco
  function validateUserName(e) {
    if (e.length === 0) {
      setUserName({ userName: e, valid: false, msg: 'O campo "Seu nome" está em branco.' })
      return
    } else {
      setUserName({ userName: e, valid: true, msg: '' })
    }
  }

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

  /* 
  Função que verifica se todos os campos estão corretos. Caso sim, retorna um alerta com os dados registrados. 
  Caso não, retorna uma caixa de texto com os possíveis erros. */
  function register(e) {
    e.preventDefault()
    let errMsg = []
    if (!corporateName.valid) {
      errMsg.push(corporateName.msg)
    }

    if (!cnpj.valid) {
      errMsg.push(cnpj.msg)
    }

    if (!userName.valid) {
      errMsg.push(userName.msg)
    }

    if (!email.valid) {
      errMsg.push(email.msg)
    }

    if (errMsg.length > 0) {
      setErrorMsg(errMsg)
      setErrorBox(true)
      return
    }
    
    alert(`
    Campos validados com sucesso!
    Você tentou acessar com os seguintes dados:
    Razão Social: ${corporateName.corporateName}
    CNPJ: ${cnpj.cnpj}
    Nome: ${userName.userName}
    E-mail: ${email.email}
    `)

  }

  return (
    <div className="registration-form-container">
      <form method="post" id="registration-form" onSubmit={(e) => { register(e) }}>
        <h1>SOLICITAÇÃO DE ACESSO</h1>
        <TextInput icon={faStore} type="text" value={corporateName.corporateName} id="corporate-name" placeholder="Razão Social" validation={validateCorporateName} />
        <TextInput icon={faIdCard} type="text" value={cnpj.cnpj} id="cnpj" placeholder="CNPJ" cnpj={true} validation={handleCnpj} />
        <TextInput icon={faUser} type="text" value={userName.userName} id="user-name" placeholder="Seu nome" validation={validateUserName} />
        <TextInput icon={faEnvelope} type="email" value={email.email} id="email" placeholder="E-mail do Acesso" validation={validateEmail} />
        <input type="submit" value="Solicitar" className="registration-form-button-register" />
        <span className="registration-form-or-text">ou</span>
        <Link className="registration-form-button-back"
          to={{
            pathname: "/"
          }}
        >
          Voltar ao login
        </Link>
      </form>
    </div>
  )
}