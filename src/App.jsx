import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Student from "./Pages/Student";
import Instructor from "./Pages/Instructor";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/Instructor" element={<Instructor/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
