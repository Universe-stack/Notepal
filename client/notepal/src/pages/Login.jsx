import {useContext, useState} from 'react';
import "./Login.css"
import {AuthContext} from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined
    })

    const {loading, err, dispatch} = useContext(AuthContext)

    const navigate =useNavigate();

    const handleChange =(e)=> {
      setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    }

    const handleClick =async(e)=>{
      e.preventDefault();
      dispatch({type:"LOGIN_START"})
      try{
        const res = await axios.post("/auth/login",credentials)
//        if(res.data.Admin)
        {
          dispatch({type:"LOGIN_SUCCESS", payload:res.data.details})
          navigate("/")
        }
        // else{
        //   dispatch({type:"LOGIN_FAILURE",payload:{message:"you're not allowed to access this resource"}})
        // }
      }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
      }
    }  

  return (
    <div>
      <div className='lContainer'>
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInut"/>
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInut"/>

        <button disabled={loading} onClick={handleClick} className='lButton'>Login</button>
        {err && <span>{err.message}</span>}
      </div>
    </div>
  )
}

export default Login