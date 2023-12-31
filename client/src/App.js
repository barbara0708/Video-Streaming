import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import {Route, Routes, Link } from "react-router-dom";
import './App.css';
import authService from './services/auth.service';

import BoardAdmin from "./components/board-admin.component";
import HomeComponent from './components/home.component';
import BoardUser from './components/board-user.component';
import BoardModerator from './components/board-moderator.component';
import Profile from './components/profile.component';
import Login from './components/login.component';
import Register from './components/registration.component';

class App extends Component {
  constructor(props){
    super(props);
    this.logOut=this.logOut.bind(this);
    this.state={
      showAdminBoard:false,
      showModeratorBoard:false,
      currentUser:undefined
    }
  }

  componentDidMount(){
    const currentUser=authService.getCurrentUser()
    if(currentUser){
      this.setState({
        currentUser:currentUser,
        showAdminBoard:currentUser.roles.includes("ROLE_ADMIN"),
        showModeratorBoard:currentUser.roles.includes("ROLE_MODERATOR")
      });
    }
  }
  logOut(){
    authService.logout();
    this.setState({
      currentUser:undefined,
      showAdminBoard:false,
      showModeratorBoard:false
    })
  }
  render(){
    const {showModeratorBoard, showAdminBoard, currentUser}=this.state
  return (
<div>
        <nav className="navbar navbar-expand navbar-dark bg-dark p-4">
          <Link to={"/"} className="navbar-brand">
            VideoPlayer
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>);
    }
}

export default App;
