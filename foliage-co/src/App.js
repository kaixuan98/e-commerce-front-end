import './App.css';
import React from 'react';
import { Routes, Route} from "react-router-dom"
import Home from './routes/Home';
import Shop from './routes/Shop';
import Blog from './routes/Blog';
import Login from './routes/Login';
import Profile from './routes/Profile';
import AuthProvider from './hooks/AuthProvider';
import ProtectedRoute from './hooks/ProtectedRoute';


function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public Path */}
          <Route path="/" element={<Home/>} exact ></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/blog" element={<Blog/>}></Route>
          <Route path="/login" element={<Login/>}></Route> 
          {/* Protected Path  */}
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route> 
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
