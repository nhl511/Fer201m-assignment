import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Login from './component/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import Product from './component/Product';
import { useEffect, useState } from 'react';
import CreatePost from './component/CreatePost';
import YourPost from './component/YourPost';

function App() {
  const[user,setUser] = useState(null)
  useEffect(()=>{
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success",{
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      }).then(response=>{
        if(response.status===200) return response.json();
        throw new Error("authentication has been failed!")
      }).then(resObject=>{
        setUser(resObject.user)
      }).catch(err=>{
        console.log(err)
      })
    };
    getUser();
  },[])
  console.log(user)
  return (
    <div className="App">
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Product/>}></Route>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}></Route>
        <Route path="/yourpost" element={user ? <YourPost user={user}/> : <Login/>}></Route>
        <Route path="/createpost" element={user ? <CreatePost user={user}/> : <Login/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
