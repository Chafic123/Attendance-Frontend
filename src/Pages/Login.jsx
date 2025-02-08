import Logo from "../Components/Generals/Logo";
import "../CSS/Login.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Import JSON files as modules
import adminData from '../json/AdminLogin.json';
import studentData from '../json/StudentLogin.json';
import instructorData from '../json/InstructorLogin.json';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            return;
        }
        // Fetching Admin or Student login data based on email
        const userData = fetchData(email, password);

        if (userData) {
            if (userData.type === "admin") {
                navigate('/Admin');  // Navigate to Admin page
            }
            else if (userData.type === "instructor") {
                navigate("/Instructor")
            }
            else {
                navigate('/Student');  // Navigate to Student page
            }
        } else {
            setErrorMessage('Wrong email or password.');
        }
    };

    // Function to fetch the login data
    const fetchData = (email, password) => {
        // Check if email exists in Admin data and password is correct
        let adminUser = adminData.find(user => user.email === email);
        if (adminUser && adminUser.password === password) {
            return { type: 'admin' };
        }

        // Check if email exists in Student data and password is correct
        let studentUser = studentData.find(user => user.email === email);
        if (studentUser && studentUser.password === password) {
            return { type: 'student' };
        }

        let instructortUser = instructortUser.find(user => user.email === email);
        if (instructortUser && instructortUser.password === password) {
            return { type: 'instructor' };
        }

        return null; // If no match found
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
                                <label htmlFor="email" className="input-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="user-input"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="password" className="input-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="user-input"
                                    placeholder="*********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                            </div>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Display error message */}
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
