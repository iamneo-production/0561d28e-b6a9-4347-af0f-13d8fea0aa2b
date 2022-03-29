import React from "react";
import './Card.css';
export default function Card(props) {
  return (
    <div className="card shadow p-3 my-3 bg-white text-dark" style={{borderRadius: '20px'}}>
     
      {props.children}
    </div>
  );
}
