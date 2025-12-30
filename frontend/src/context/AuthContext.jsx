import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(false);

  //  LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      toast.success("Login successful");

      //  Role based redirect 
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  //  SIGNUP
  const signup = async (formData) => {
    try {
      setLoading(true);

      await API.post("/api/auth/signup", formData);

      toast.success("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  //  LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  //  CONTEXT VALUE
  const value = {
    user,
    setUser,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);
