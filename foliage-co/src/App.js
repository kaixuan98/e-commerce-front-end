import './App.css';
import { Routes, Route} from "react-router-dom"
import Home from './routes/Home';
import Shop from './routes/Shop';
import Blog from './routes/Blog';
import Login from './routes/Login'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} exact ></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/blog" element={<Blog/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
