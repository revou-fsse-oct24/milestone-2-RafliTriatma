import React from 'react'
// import LoginForm from './pages/Login'
// import HomePage from './pages/HomePage';
// import Navbar from './components/Navbar';
// import CardProduct from './components/CardProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailProduct from './pages/DetailProduct';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<LoginForm />}/>
          <Route path='/homepage' element={<HomePage />}/> */}
          {/* <Route path='/' element={<Navbar />}/> */}
          {/* <Route path='/' element={<CardProduct />} /> */}
          <Route path='/' element={<DetailProduct/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;