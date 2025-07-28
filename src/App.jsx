import { Route, Routes } from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';

import Home from './pages/Home'
import ByCredits from './pages/ByCredits'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useContext } from 'react'
import { AppContext } from './context/AppContex'


function App() {
  
  const {showLogin} = useContext(AppContext)
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<ByCredits />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer/>


    </div>
  )
}

export default App
