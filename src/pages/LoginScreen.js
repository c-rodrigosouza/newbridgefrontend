import Header from "../components/Header";
import ErrorBox from "../components/ErrorBox";
import Login from "../components/Login";
import '../css/login-screen.css'
import { useState } from "react";

// Página de Login
export default function LoginScreen() {

  const [errorBox, setErrorBox] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])

  return (
    <>

      <ErrorBox errorMsg={errorMsg} errorBox={errorBox} setErrorBox={setErrorBox} setErrorMsg={setErrorMsg} />

      <div className="login-screen-container" style={{ opacity: errorBox ? 0.5 : 1 }}>
        <Header>
          <Login setErrorMsg={setErrorMsg} setErrorBox={setErrorBox} />
        </Header>
      </div>
    </>
  )
}