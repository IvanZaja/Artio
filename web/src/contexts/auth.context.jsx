/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, login, logout } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userLoged, setUser] = useState();
  const navigate = useNavigate();

  async function fetchProfile() {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile();
    else setUser(null);
  }, []);

  async function doLogin(data) {
    await login(data);
    fetchProfile();
  }

  function doLogout() {
    setUser(null);
    logout();
    navigate("/login");
  }

  const value = {
    userLoged,
    doLogin,
    doLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;