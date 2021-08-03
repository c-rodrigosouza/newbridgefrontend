import '../css/inputs-box.css'
import MusicalExpressImg from '../img/logo.png'

// Componente que exibe o logo padrão tem um quadrado em branco que pode receber outros componentes "filhos"
export default function Header({children, headerHeigt = "50%"}) {
  return (
    <div className="inputs-box-container">

      <header style={{height: headerHeigt}}>
        <p>Bem-vindo!</p>
        <img src={MusicalExpressImg} alt="Logo Musical Express"></img>
        <p>B2B</p>
      </header>

      <div className="inputs-box-input-area">
        {children}
      </div>

    </div>
  )
}