import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Student from "./Pages/Student";
import Instructor from "./Pages/Instructor";
import ProtectedRoute from "./ProtectedRoute";
import { CourseProvider } from "./Contexts/CourseContext";
function App() {
  return (
    <CourseProvider>
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

        <Route element={<ProtectedRoute requiredRole="student" />}>
          <Route path="/student" element={<Student />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="instructor" />}>
          <Route path="/instructor" element={<Instructor />} />
        </Route>
      </Routes>
    </Router>
    </CourseProvider>
  );
}

export default App;
