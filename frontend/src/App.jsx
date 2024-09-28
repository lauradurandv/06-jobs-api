import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import FrontPage from "./pages/frontpage";
import Layout from "./components/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            }
          >
            <Route path="/" element={<FrontPage />} />
            <Route
              path="/login"
              element={
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
