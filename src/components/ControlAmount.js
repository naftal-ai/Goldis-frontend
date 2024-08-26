import React from 'react'

const ControlAmount = ({handleDec, handleInc, amount}) => {
  
  return (
    <div className='control-amount'>
        <div className='btn btn-sea inc' onClick={handleInc}>+</div>
        <div className='amount'>{amount}</div>
        <div className='btn btn-red dec' onClick={handleDec}>-</div>
    </div>
  )
}

export default ControlAmount