import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import AddPropery from './pages/AddPropery';
import MyPost from './pages/MyPost';
import PropertyList from './pages/PropertyList';
import Feedback from './pages/Feedback';
import ViewPost from './pages/ViewPost';
import { tokenAuthContext } from './contexts/AuthContext';

function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  return (
    <>
      <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={<Auth insideRegister={true} />} />
          <Route path='/addproperty' element={isAuthorised?<AddPropery />:<Navigate to={'/login'}/>} />
          <Route path='/mypost' element={<MyPost />} />
          <Route path='/viewpost/:id' element={<ViewPost />} />
          <Route path='/propertylist' element={isAuthorised?<PropertyList />:<Navigate to={'/login'}/> } />
          <Route path='/feedback' element={isAuthorised?<Feedback />:<Navigate to={'/login'}/>} />
          <Route path='/*' element={<Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
