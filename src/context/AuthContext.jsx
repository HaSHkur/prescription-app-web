import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/prescriptions");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (username, password, role) => {
    try {
      const data = await registerUser(username, password, role);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/prescriptions");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
