import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/logout" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
