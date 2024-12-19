import React from 'react'
import useAuth from '../hooks/useAuth';
import InfoPage from './InfoPage';
const Logout = () => {
    const {logout} = useAuth();
    logout();
  return (
    <InfoPage message={"logout successfully"} />
  )
}

export default Logout