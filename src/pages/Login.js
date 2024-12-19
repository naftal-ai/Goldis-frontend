import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/Constants.js";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Error from "../components/utils/Error.js";
import InfoPage from "./InfoPage.js";
import Button from "../components/forms/Button.js";
import Loading from "../components/utils/Loading.js";

const Login = ({ url = "/" }) => {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(location)
  //get the data from signup if navigated from there
  useEffect(() => {
    if (location.state) {
      setEmail(location.state);
    }
  }, [location.state]);

  //get the path from where user redirect
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        localStorage.setItem("jwtToken", data.token);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <InfoPage message={"logged in successfully!"} url={redirect ? redirect : url} />
      ) : loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Login</h2>
          {error.length > 0 && <Error errMsg={error} setErrMsg={setError} />}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <Button type="submit" className="btn-submit">
            Sign Up
          </Button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "1.8em",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default Login;
