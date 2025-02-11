import Logo from "../Components/Generals/Logo";
import "../CSS/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../ApiService/LoginService"; // from LoginService.js

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    try {
      const response = await loginUser(email, password, rememberMe);

      if (response) {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (token) {
          if (response.user.status === "Admin") {
            navigate("/Admin");
          } else if (response.user.status === "Instructor") {
            navigate("/Instructor");
          } else {
            navigate("/Student");
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
                  type="text"  //change to text was email
                  id="identifier"
                  className="user-input"
                  placeholder="Enter your email or student ID"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
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
                <p id="forget-pass">Forgot Password?</p>
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
