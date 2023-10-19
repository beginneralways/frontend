import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import WriteArticle from './components/WriteArticle';
import UpdateArticle from './components/UpdateArticle';
import DeleteArticle from './components/DeleteArticle.js';

function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path="/register" exact element ={<Register/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/admin" exact element={<Admin/>} />
          <Route path="/" exact element={<Home/>} />
          <Route path="/write" exact element={<WriteArticle/>} />
          <Route path="/update/:id" exact element={<UpdateArticle/>} />
          <Route path="/delete/:id" exact element={<DeleteArticle/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
