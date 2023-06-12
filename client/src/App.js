import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Logout from "./Pages/Auth/Logout";
import Signup from "./Pages/Auth/Signup";
import Home from "./Pages/Home";
import MakeOffers from "./Pages/MakeOffers";
import Offers from "./Pages/Offers";
import PrivateRoute from "./Route/PrivateRoute";
import './App.css'
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import AdminOffer from "./Pages/AdminOffer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          exact={true} 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          exact={true} 
          path="/admin/home" 
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } 
        />
        <Route 
          exact={true} 
          path="/admin/offers" 
          element={
            <PrivateRoute>
              <AdminOffer />
            </PrivateRoute>
          } 
        />
        <Route 
          exact={true} 
          path="/offers" 
          element={
            <PrivateRoute>
              <Offers />
            </PrivateRoute>
          } 
        />
        <Route 
          exact={true} 
          path="/:courierId/makeoffers" 
          element={
            <PrivateRoute>
              <MakeOffers />
            </PrivateRoute>
          } 
        />
        <Route 
          exact={true} 
          path="/courier/profile/:courierId" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route exact={true} path="/login" element={<Login />} />
        <Route exact={true} path="/signup" element={<Signup />} />
        <Route exact={true} path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
