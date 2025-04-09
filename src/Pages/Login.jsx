import Logo from "../Components/Generals/Logo";
import "../CSS/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../ApiService/LoginService";
import { resetPassword } from "../ApiService/LoginService";
export default function Login() {

  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();


  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");



  const handleLoginClick = async () => {
    if (!identifier || !password) {
      setErrorMessage("Please fill in both ID and password.");
      return;
    }

    try {
      const response = await loginUser(identifier, password, rememberMe);

      if (response) {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (token) {
          console.log("statusss: ",response.user.status)
          if (response.user.status === "Admin") {
            console.log("Loggin in as admin")
            navigate("/admin");
          } else if (response.user.status === "Instructor") {
            navigate("/instructor");
            window.location.reload();

          } else {
            navigate("/student");
          }
        } else {
          setErrorMessage("Authentication failed. Please log in again.");
          
        }
      }
    } catch (error) {
      setErrorMessage(error.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <Logo />

      {showForgotPassword && (
        <div className="forgot-password-overlay">
          <div className="forgot-password-modal">
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your personal email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            {forgotError && <p className="forgot-error">{forgotError}</p>}
            <div className="forgot-buttons">
              <button
                onClick={async () => {
                  if (!forgotEmail) {
                    setForgotError("Email is required.");
                    return;
                  }

                  try {
                    await resetPassword(forgotEmail);
                    alert("Password reset instructions sent to your email.");
                    setShowForgotPassword(false);
                    setForgotEmail("");
                    setForgotError("");
                  } catch (error) {
                    setForgotError(error.message || "Failed to send reset link.");
                  }
                }}

              >
                Submit
              </button>
              <button onClick={() => setShowForgotPassword(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div id="body-container">
        <div id="body-login">
          <div id="image-cont">
            <img src="../public/Images/Login.png" alt="Login Illustration" />
          </div>
          <div id="form-div">
            <form onSubmit={(e) => e.preventDefault()}>
              <div id="form-txt">
                <p id="form-title">Log In</p>
              </div>
              <div className="form-inputs">
                <label htmlFor="identifier" className="input-label">
                  Enter your credentials
                </label>
                <input
                  type="text"
                  id="identifier"
                  className="user-input"
                  placeholder="Enter your Email or ID"
                  value={identifier}
                  onChange={(e) => setidentifier(e.target.value)}
                />
              </div>

              <div className="form-inputs">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="user-input"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div id="post-input">
                <div id="remember-cont">
                  <input
                    type="checkbox"
                    name="Remember-Me"
                    id="Remember-Me"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="Remember-Me" id="remember-label">
                    Remember me
                  </label>
                </div>
                <p id="forget-pass" onClick={() => setShowForgotPassword(true)} style={{ cursor: "pointer", color: "#5A5AFF" }}>
                  Forgot Password?
                </p>
              </div>
              <button id="log-in-btn" onClick={handleLoginClick}>
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
