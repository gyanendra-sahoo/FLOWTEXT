import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Home from "./pages/home/Home"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Docs from "./pages/docs/Docs";
import ProtectedRoute from "./components/protected/ProtectedRoute";

const App = () => {
  return (
    <>
    <Header />
    <Toaster position="bottom-left" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={
          <ProtectedRoute>
            <Docs />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
