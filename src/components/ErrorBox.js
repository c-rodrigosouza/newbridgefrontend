import '../css/error-box.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'


// Componente que exibe a caixa com os possíveis erros no preenchimento dos formulários
export default function ErrorBox({ errorMsg, errorBox, setErrorBox, setErrorMsg }) {
  return (
    <div className="error-box-container" style={{ transform: errorBox ? "scale(1)" : "scale(0)" }}>
      <p className="error-box-title">Os seguintes erros foram encontrados ao enviar os dados:</p>
      <div className="error-box-area-msgs">
        {
          errorMsg.map((value, index) => {
            return <p className="error-box-msg" key={index.toString()}><FontAwesomeIcon className="error-box-icon" icon={faExclamationCircle} /> {value}</p>
          })
        }
        <button className="error-box-close-button" onClick={() => {
          setErrorBox(false)
          setErrorMsg([])
        }}>OK!</button>
      </div>
    </div>
  )
}