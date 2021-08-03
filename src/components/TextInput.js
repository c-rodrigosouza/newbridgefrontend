import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputMask from 'react-input-mask'
import '../css/text-input.css'

export default function TextInput({ type, value = "", placeholder, id, icon, cnpj = false, validation = (x) => { return true } }) {

  /* 
  O componente TextInput recebe os seguintes parametros:
  type: O tipo do input;
  value: Valor inicial do input (por padrão vazio);
  placeholder: O placeholder do input;
  id: O id do input;
  icon: O icone que será utilizado no input (Deve ser importado do FontAwesome);
  cnpj: Recebe um booleano que, caso verdadeiro, coloca uma máscara para CNPJ (tem por padrão o valor 'false');
  validation: Recebe uma função que vai verificar o que foi digitado no input e retornar um booleano (tem por padrão uma função que sempre retorna verdadeiro).
  */

  return (
    <div className="text-input-container">
      {
        cnpj
          ?
          <InputMask
            className="text-input"
            mask="99.999.999/9999-99"
            placeholder={placeholder}
            onInput={event => validation(event.target.value)}
            value={value}
          />
          :
          <input value={value} className="text-input" type={type} id={id} placeholder={placeholder} onInput={event => validation(event.target.value)} />
      }
      <FontAwesomeIcon icon={icon} className="text-input-icon" />
    </div>
  )
}