import { Routes, Route, Navigate } from "react-router-dom";
import Admindashboard from "./pages/Admindashboard";
import Auth from "./pages/Auth";
import Jobseekerdashboard from "./pages/Jobseekerdashboard";
import Customerdashboard from "./pages/Customerdashboard";
import Login from "./pages/Login";
import React from 'react'
import Review from "./pages/Review";


function App() {

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path={'/'} element={<Navigate to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Auth />} />
          <Route path="/jobseeker/*" element={<Jobseekerdashboard />} />
          <Route path="/admin/*" element={<Admindashboard />} />
          <Route path="/jobprovider/*" element={<Customerdashboard />} />
          <Route path='/review' element={<Review/>}/>
        </Routes>
      </main>
    </div>
  );
}
export default App;
