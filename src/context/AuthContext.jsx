import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";   // ✔ sax
import api from "../api/api";
import { ApiConstants } from "../api/ApiConstants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // LOGIN USING userCode INSTEAD OF EMAIL
  const login = async (userCode, password) => {
    try {
      const res = await api.post(`${ApiConstants.userEndpoint}/login`, {
        userCode,
        password,
      });

      const decoded = jwtDecode(res.data.token); // ✔ sax

      const userData = {
        userId: decoded.userId,
        fullname: decoded.fullname,
        phone: decoded.phone,
        userCode: decoded.userCode,
      };

      setToken(res.data.token);
      setUser(userData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      throw err;
    }
  };

  const register = async (fullname, phone, email, password) => {
    try {
      const res = await api.post(`${ApiConstants.userEndpoint}/signup`, {
        fullname,
        phone,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
