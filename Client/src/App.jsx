import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

const App = () => {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
