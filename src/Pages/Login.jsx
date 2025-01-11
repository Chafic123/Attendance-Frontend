import Logo from "../Components/Logo";
import "../CSS/Login.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/Admin');
    };

    return (
        <div
            className="login-container"
        >
            <Logo />
            <div id="body-container">
                <div id="container">
                    <div id="image-cont">
                        <img src="../public/Images/Login.png" alt="Login Illustration" />
                    </div>
                    <div id="form-div">
                        <form action="">
                            <div id="form-txt">
                                <p id="form-title">Log In</p>
                                <p id="form-des">
                                    Welcome back! Please log in to your account.
                                </p>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="ID" className="input-label">
                                    ID
                                </label>
                                <input
                                    type="text"
                                    id="ID"
                                    className="user-input"
                                    placeholder="Enter your ID"
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
                                />
                            </div>
                            <div id="post-input">
                                <div id="remember-cont">
                                    <input
                                        type="checkbox"
                                        name="Remember-Me"
                                        id="Remember-Me"
                                    />
                                    <label
                                        htmlFor="Remember-Me"
                                        id="remember-label"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <p id="forget-pass">Forgot Password?</p>
                            </div>
                            <button id="log-in-btn" onClick={handleLoginClick}>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
