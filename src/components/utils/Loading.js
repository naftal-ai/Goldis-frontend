import React from 'react'
import '../styles/loading.css'
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  )
}

export default Loading