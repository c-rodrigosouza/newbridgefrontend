import { useState } from "react";
import ErrorBox from "../components/ErrorBox";
import Header from "../components/Header";
import RegistrationForm from "../components/RegistrationForm";
import '../css/request-access.css'

// Página de registro
export default function RequestAccess() {

  const [errorBox, setErrorBox] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])

  return (
    <>
      <ErrorBox errorMsg={errorMsg} errorBox={errorBox} setErrorBox={setErrorBox} setErrorMsg={setErrorMsg} />
      <div className="request-access-container" style={{ opacity: errorBox ? 0.5 : 1 }}>
        <Header headerHeigt="40%">
          <RegistrationForm setErrorMsg={setErrorMsg} setErrorBox={setErrorBox} />
        </Header>
      </div>
    </>
  )
}