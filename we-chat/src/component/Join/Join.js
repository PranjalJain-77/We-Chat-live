import React,{ useState } from 'react'
import "./Join.css";
import logo from "../Image/logo.jpg"
import { Link } from "react-router-dom";

let user;
const sendUser=() =>{
  user = document.getElementById("JoinInput").value;
}

const Join = () => {

  const [name, setname] = useState("");
  
  

  return (
    <div className="JoinPage">
        <div className='JoinContainer'>
            <img src={logo} alt='Logo' ></img>
            <h1>WE CHAT</h1>
            <input onChange={(e) => setname(e.target.value)} type="text" id="JoinInput" placeholder="Enter Your Name"></input>
            <Link onClick={(event)=> !name ?event.preventDefault():null} to="/chat">
              <button className="JoinBtn" onClick={sendUser}>Login</button>
            </Link>
        </div>

    </div>
  )
}

export default Join
export {user}