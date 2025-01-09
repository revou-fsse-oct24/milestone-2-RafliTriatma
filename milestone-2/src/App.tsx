import React from 'react'
// import LoginForm from './pages/Login'
// import HomePage from './pages/Homepage';
// import Navbar from './components/Navbar';
import CardProduct from './components/CardProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<LoginForm />}/>
          <Route path='/homepage' element={<HomePage />}/> */}
          {/* <Route path='/' element={<Navbar />}/> */}
          <Route path='/' element={<CardProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;