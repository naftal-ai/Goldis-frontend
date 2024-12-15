import React, { forwardRef, useEffect } from 'react'
import './styles/error.css'
const Error = forwardRef(({errMsg, setErrMsg }, ref) => {
 
  useEffect(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), [ref])
 
  const HandleClick = () => {
    setErrMsg("");
  }
  return (
    <div className="error-container" onClick={HandleClick} ref={ref}>
    <p className="error-message">{errMsg}</p>
  </div>
  )
}
)
export default Error