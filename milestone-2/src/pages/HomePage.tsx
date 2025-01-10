import Navbar from '@/components/Navbar';
import CardProduct from '@/components/CardProduct'
import React from 'react';

const Homepage: React.FC = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div>
        <CardProduct />
      </div>

    </>
  )
}

export default Homepage