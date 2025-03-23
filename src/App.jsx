import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Student from "./Pages/Student";
import Instructor from "./Pages/Instructor";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { useState } from "react";
import { CourseProvider } from "./Contexts/CourseContext";
import { getUserDetails } from "./ApiService/ProfileService";
import { useCallback } from "react";
import { UserProvider } from "./Contexts/UserContext";
function App() {

  const [user, setStudent] = useState(null);
  const refreshProfile = async () => {
    try {
      const data = await getUserDetails();
      if (data) {
        setStudent(data);
        console.log("User: ", user)
      }
    } catch (error) {
      console.error("Error refreshing user profile:", error);
    }
  };
  useEffect(() => {
    refreshProfile();
  }, []);


  /*Profile Click and Go Back Section*/
  const [isIphone14ProMax, setIsIphone14ProMax] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 431px) and (max-height: 932px)");
    const isIphone = /iPhone/.test(navigator.userAgent) && !window.MSStream;

    const checkDevice = () => {
      setIsIphone14ProMax(isIphone && mediaQuery.matches);
    };

    checkDevice();
    mediaQuery.addEventListener("change", checkDevice);
    window.addEventListener("resize", checkDevice);

    return () => {
      mediaQuery.removeEventListener("change", checkDevice);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);


  const viewPanel = useCallback(() => {
    console.log("View Panel")

    document.querySelector(".profile-holder")?.style.setProperty("display", "none");
    document.querySelector(".panel-content")?.style.setProperty("display", "flex");
    document.querySelector(".go-back-icon")?.style.setProperty("display", "none");
  }, []);

  const viewProfile = useCallback(() => {
    console.log("View Profile")
    const profile = document.querySelector(".profile-holder");
    const panelContent = document.querySelector(".panel-content");
    const goBackIcon = document.querySelector(".go-back-icon");
    const panelContainer = document.querySelector(".panel-container");

    if (profile && panelContent && panelContainer) {

      if (isIphone14ProMax) {
        panelContainer.style.zIndex = "1000";
        panelContent.style.display = "none";
        profile.style.display = "flex";
        goBackIcon.style.display = "none";
      } else {
        panelContent.style.display = "none";
        profile.style.display = "flex";
        goBackIcon.style.display = "flex";
      }
    }
  }, [isIphone14ProMax]);

  const viewPanelIphone = useCallback(() => {
    if (isIphone14ProMax) {
      const panelContainer = document.querySelector(".panel-container");
      const panelContent = document.querySelector(".panel-content");

      if (panelContainer && panelContent) {
        panelContainer.style.zIndex = "1000";
        panelContent.style.display = "flex";
      } else {
        console.warn("Panel elements not found in the DOM");
      }
    }
  }, [isIphone14ProMax]);

  return (
    <UserProvider>
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
              <Route path="/student" element={<Student
                viewPanel={viewPanel}
                viewProfile={viewProfile}
                viewPanelIphone={viewPanelIphone}
                refreshProfile={refreshProfile}
                user={user} />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole="instructor" />}>
              <Route path="/instructor" element={<Instructor
                viewPanel={viewPanel}
                refreshProfile={refreshProfile}
                user={user}
                viewProfile={viewProfile}
              />}
              />
            </Route>
          </Routes>
        </Router>
      </CourseProvider>
    </UserProvider>
  );
}

export default App;
