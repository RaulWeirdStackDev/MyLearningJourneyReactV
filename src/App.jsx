import { Header, Footer } from "./components"
import { BrowserRouter } from "react-router-dom"


function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
