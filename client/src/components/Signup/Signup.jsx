
import React, { useState } from 'react'
import Logo from '../../olx-logo.png';
import './Signup.css';
import axios from '../../axios'
// import axios from 'axios';
import { Link } from 'react-router-dom';


function Signup() {

const [name, setName] = useState('')
const [email, setEmail] = useState()
const [number, setNumber] = useState('')
const [password, setPassword] = useState('')
const [errMsg,setErrMsg] = useState(null)

const handleSubmit=(e)=>{
  console.log("handle suh*#*#*#*##*#*#**##");
  e.preventDefault();
  if(name.trim()&&email.trim()&&number.trim()&&password.trim()){

    axios.post('/userSignup',{name,email,number,password}).then((response)=>{
      console.log(response ,"res");
        if(response.data.err){
          setErrMsg(response.data.message)
        }
    })
  }else{
    setErrMsg('All fields are required')
  }
}


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />

          { errMsg &&
            <p style={{ color: "red" }}>{errMsg}</p>
          }
          <br />
          <button type='submit'>Signup</button>
        </form>
        <Link style={{ textDecoration:'none' }} to={'/login'}>
        <a>Login</a>
      </Link>
        
      </div>
    </div>
  )
}

export default Signup