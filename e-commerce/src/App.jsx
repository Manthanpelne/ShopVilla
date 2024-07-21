import { useState } from 'react'
import './App.css'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Cart from './components/cart'

function App() {
 
  return (
    <>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
     </Routes>
    </>
  )
}

export default App
