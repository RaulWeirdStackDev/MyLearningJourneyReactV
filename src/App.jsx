import { Header, Footer } from "./components"
import { BrowserRouter } from "react-router-dom"
import { Entry } from "./views/Entry/Entry"


function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Entry/>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
