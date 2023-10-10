import Hero from "./components/Hero"
import ListaNotes from "./components/ListaNotes"
import NavBar from "./components/Navbar"
import Input from "./components/Input";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Player } from '@lottiefiles/react-lottie-player';
import AddButton from "./assets/AddButton.json"
import Modifica from "./components/Modifica";
import Login from "./components/Login";
import Registrazione from "./components/Registrazione";


function App() {


  return (
    <Router>
      <div className="relative" >
        <NavBar />
        <Routes>
          <Route path="/users/register" element={<Registrazione />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/" element={
            <>
              <Hero />
              <ListaNotes />
            </>}
          />
          <Route path="/add" element={<Input />} />
          <Route path="/modifica/:id" element={<Modifica />} />
        </Routes>
        <Link to={`/add`} >
          <button
            className="fixed bottom-4 right-4 w-28 hover:scale-125 transition-all z-50 ">
            <Player
              hover
              src={AddButton}
            >
            </Player>
          </button>
        </Link>
      </div>
    </Router>
  )
}

export default App
