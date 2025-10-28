import { Header, Footer } from "./components"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Statistics } from "./views/Statistics/Statistics"
import { Entry } from "./views/Entry/Entry"
import { FAQs } from "./views/FAQS/FAQS"
import { Home } from "./views/Home/Home"
import { Register } from "./views/Register/Register"
import { Login } from "./views/Login/Login"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element ={<FAQs/>} />
        <Route path="/register" element ={<Register/>} />
        <Route path="/login" element ={<Login/>} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App