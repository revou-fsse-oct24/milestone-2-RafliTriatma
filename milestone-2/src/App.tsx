import React from 'react'
// import LoginForm from './pages/Login'
// import HomePage from './pages/HomePage';
// import RegisterForm from './pages/Register';
// import Navbar from './components/Navbar';
// import CardProduct from './components/CardProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Cart from './pages/Cart';
import DetailProduct from './pages/DetailProduct';



const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/register' element={<RegisterForm />} />
          <Route path='/' element={<LoginForm />}/>
          <Route path='/homepage' element={<HomePage />}/> */}
          {/* <Route path='/' element={<Navbar />}/> */}
          {/* <Route path='/' element={<CardProduct />} /> */}
          <Route path='/' element={<DetailProduct/>}/>
          {/* <Route path='/cart' element={<Cart />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;