import React from "react";
import {Route,Routes, NavLink} from "react-router-dom";
import Home from "./components/Home";
import Contactus from "./components/Contactus"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import logo from "./logo.svg";
import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
function App() {
  return (
    <div>
      {/*<>
      <div className="content">
        <Header />
      </div>
      <div className="footer mt-3">
        <Footer />
      </div>
  </>*/}
     <div>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height:"200px"}}>
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">
      
    </NavLink>
    <button className="btn btn-outline-dark btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> 
    {/* <button type="button" class="btn btn-primary">Primary</button> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav nav-tabs p-4 me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <NavLink className="nav-link btn-sm" to="Home">
            Home
          </NavLink>
        </li>
        
        
      
        <li className="nav-item btn-sm">
          <NavLink className="nav-link" to="Login">Login
          
          </NavLink>
        </li>
        <li className="nav-item btn-sm">
          <NavLink className="nav-link" to="SignUp">SignUp
          
          </NavLink>
        </li>
        <li className="nav-item btn-sm">
          <NavLink className="nav-link" to="Books">ContactUs
          
          </NavLink>
          
        </li>
      </ul>
      
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search here" aria-label="Search"></input>
        {/* <button className="btn btn-outline-info" type="submit">Search..</button> */}
        <button type="button" className="btn btn-outline-dark">Search</button>
      </form>
      
      
    </div>
  </div>
  </nav>
  <Routes>
<Route path="Home" element={<Home />} />
<Route path="ContactUs" element={<Contactus />} />
<Route path="Login" element={<Login />} />
<Route path="SignUp" element={<SignUp />} />
</Routes>
  
  


</div>
 
</div>
  );
}

export default App;
