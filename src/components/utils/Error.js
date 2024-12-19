import React, { useRef, useEffect } from 'react'
import '../styles/error.css'

const Error = ({errMsg, setErrMsg }) => {

  const errRef = useRef();
  useEffect(() => errRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' }), [])
 
  const HandleClick = () => {
    setErrMsg("");
  }
  return (
    <div className="error-container" onClick={HandleClick} ref={errRef}>
    <p className="error-message">{errMsg}</p>
  </div>
  )
}

export default Error