import Hero from "./components/Hero"
import ListaNotes from "./components/ListaNotes"
import NavBar from "./components/Navbar"
import Input from "./components/Input";

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import { Player } from '@lottiefiles/react-lottie-player';
import AddButton from "./assets/AddButton.json"
import Modifica from "./components/Modifica";
import Login from "./components/Login";
import Registrazione from "./components/Registrazione";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
}
function App() {
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
    if (isAuthenticated) {
      <Navigate to="/" />
      return children;
    }

    return <Navigate to="/users/register" />;
  };

  const isAuthenticated = !!localStorage.getItem("user");

  return (
    <Router>
      <div className="relative">
        <NavBar />
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route path="/users/register" element={<Registrazione />} />
          <Route path="/users/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <>
                  <Hero />
                  <ListaNotes />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/add" element={<Input />} />
          <Route path="/modifica/:id" element={<Modifica />} />
        </Routes>
        <Link to={`/add`}>
          <button
            className="fixed bottom-4 right-4 w-28 hover:scale-125 transition-all z-50 "
          >
            <Player hover src={AddButton}></Player>
          </button>
        </Link>
      </div>
    </Router>
  );
}

export default App
