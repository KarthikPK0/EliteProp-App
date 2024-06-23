import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import AddPropery from './pages/AddPropery'
import MyPost from './pages/MyPost'
import PropertyList from './pages/PropertyList'
import EditPost from './pages/EditPost'
import Feedback from './pages/Feedback'



function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth insideRegister={true} />} />
      <Route path='/*' element={<Navigate to={'/'}/>} />
      <Route path='/addproperty' element={<AddPropery/>} />
      <Route path='/mypost' element={<MyPost/>} />
      <Route path='/editpost' element={<EditPost/>} />
      <Route path='/propertylist' element={<PropertyList/>} />
      <Route path='/feedback' element={<Feedback/>} />


    </Routes>
    
    </BrowserRouter>

  
    </>
  )
}

export default App

// '/id/mypost'
// '/id/editpost' 