import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const login = useContext(AuthContext);
  
  return login;
};

export default useAuth;
