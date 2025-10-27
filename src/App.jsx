import { Header, Footer } from "./components"
import { BrowserRouter } from "react-router-dom"
import { Statistics } from "./views/Statistics/Statistics"
// import { Entry } from "./views/Entry/Entry"


function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    {/* <Entry/> */}
    <Statistics/>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
