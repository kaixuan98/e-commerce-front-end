import './App.css';
import React from 'react';
import { Routes, Route} from "react-router-dom"
import Home from './routes/Home';
import Shop from './routes/Shop';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';
import AuthProvider from './hooks/AuthProvider';
import ProtectedRoute from './hooks/ProtectedRoute';
import Admin from './routes/Admin';
import Product from './routes/Product';


function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public Path */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/login" element={<Login/>}></Route> 
          <Route path="/register" element={<Register/>}></Route> 
          <Route path="/shop/:id" element={<Product/>}></Route>
          {/* Protected Path  */}
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route> 
          <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}></Route> 
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
