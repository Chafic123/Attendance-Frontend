import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Student from "./Pages/Student";
import Instructor from "./Pages/Instructor";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
          <Route path="/instructor" element={<Instructor />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
