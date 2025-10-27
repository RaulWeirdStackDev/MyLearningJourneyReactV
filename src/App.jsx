import { Header, Footer } from "./components"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Statistics } from "./views/Statistics/Statistics"
import { Entry } from "./views/Entry/Entry"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App