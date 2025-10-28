import { Header, Footer } from "./components"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Statistics } from "./views/Statistics/Statistics"
import { Entry } from "./views/Entry/Entry"
import { FAQs } from "./views/FAQS/FAQS"
import { Home } from "./views/Home/Home"
import { Register } from "./views/Register/Register"
import { Login } from "./views/Login/Login"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header/>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FAQs/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          
          {/* Protected Routes */}
          <Route 
            path="/entry" 
            element={
              <ProtectedRoute>
                <Entry />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/statistics" 
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App