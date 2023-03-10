import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './Pages/App';
import Blog from './Pages/Blog';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);