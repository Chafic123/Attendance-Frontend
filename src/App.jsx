import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

        {/* Protected Routes with Role-Based Access */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route >
          <Route path="/student" element={<Student />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="instructor" />}>
          <Route path="/instructor" element={<Instructor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
