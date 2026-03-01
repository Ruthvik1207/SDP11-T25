import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "../css/LogIn.css";

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isMfaStep, setIsMfaStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || null;

  const handleVoterIdChange = (e) => {
    setVoterId(e.target.value.toUpperCase());
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleMfaChange = (e) => {
    setMfaCode(e.target.value);
    setError("");
  };

  const getErrorMessage = (err, fallback) => {
    return err?.response?.data?.message || fallback;
  };

  async function handleCredentialSubmit(e) {
    e.preventDefault();

    if (isLoading) return; // ✅ Prevent spam click

    setError("");
    setMessage("");

    try {
      setIsLoading(true);

      await axios.post("http://localhost:5000/api/login-request", {
        voterId,
        password,
      });

      setIsMfaStep(true);
      setMessage("A verification code has been sent to your registered email.");

    } catch (err) {
      setError(getErrorMessage(err, "Invalid credentials. Please try again."));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMfaSubmit(e) {
    e.preventDefault();

    if (isLoading) return;

    setError("");
    setMessage("");

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/login-verify",
        { voterId, mfaCode }
      );

      login(response.data);

      const userRole = response.data.user.role;

      if (from) {
        navigate(from, { replace: true });
      } else if (userRole === "admin") {
        navigate("/onlinevoting");
      } else {
        navigate("/voting");
      }

    } catch (err) {
      setError(getErrorMessage(err, "Login failed. Invalid or expired code."));
    } finally {
      setIsLoading(false);
    }
  }

  const handleBackToLogin = () => {
    setIsMfaStep(false);
    setMfaCode("");     // ✅ Clear old code
    setError("");
    setMessage("");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">

        {!isMfaStep ? (
          <>
            <h1 className="login-title">Login</h1>

            <form onSubmit={handleCredentialSubmit}>
              {error && <p className="error-message">{error}</p>}

              <div className="form-group">
                <label htmlFor="voterId">Voter ID:</label>
                <input
                  type="text"
                  id="voterId"
                  value={voterId}
                  onChange={handleVoterIdChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="ac">
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>

            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="login-title">Enter Verification Code</h1>

            <form onSubmit={handleMfaSubmit}>
              {message && <p className="info-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}

              <div className="form-group">
                <label htmlFor="mfaCode">Authentication Code:</label>
                <input
                  type="text"
                  id="mfaCode"
                  value={mfaCode}
                  onChange={handleMfaChange}
                  placeholder="Check your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="ac">
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Log In"}
                </button>
              </div>
            </form>

            <p>
              <button
                type="button"
                className="secondary-button"
                onClick={handleBackToLogin}
                disabled={isLoading}
              >
                Back to login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LogIn;