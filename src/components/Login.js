// 


import axios from 'axios';
import React, { useContext, useState } from 'react'
import {toast} from 'react-hot-toast'
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import TodoContext from '../context/Todo/TodoContext';


const Login = () => {
    // console.log(cookies)
    const todoContext = useContext(TodoContext);

    const {cookieState, setCookieState, setCookie, cookies} = todoContext;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();

            if( !email || !password){
                toast.error("All FEILDS are compulsory")
                return
            }

            if(password.length<8){
                toast.error("Password should be atleast of 8 characters")
                return
            }

            const res = await axios.post(`${process.env.REACT_APP_API}/v1/u/login`,{
                email,
                password
            })
            console.log(res)

            if(res.data.success){
                
                setCookie('token',res.data.token)
                navigate('/')
                toast.success("Logged In")
                
            }
            else{
                toast.error("please enter valid credentials")
            }
          

            // setCookieState(cookies)
            // if(res.data.token){
            // }

                


       
    }

  
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-full bg-[#191920] text-[#bbbabf]">
        <div className="w-[90%] sm:w-[450px] bg-[#24242c] rounded-2xl shadow-lg p-8">
            <h1 className="text-center text-[2.5rem] font-bold text-white mb-8">
                Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="flex flex-col gap-1">
                    <label className="text-[#59ccca] text-[16px] font-semibold" htmlFor="email">
                        Email:
                    </label>
                    <input 
                        className="w-full rounded-md bg-[#2c2a2b] text-white py-2 px-3 outline-none focus:ring-2 focus:ring-[#59ccca]" 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        id="email" 
                        name="email" 
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[#47ce8d] text-[16px] font-semibold" htmlFor="password">
                        Password:
                    </label>
                    <input 
                        className="w-full rounded-md bg-[#2c2a2b] text-white py-2 px-3 outline-none focus:ring-2 focus:ring-[#47ce8d]" 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        id="password" 
                        name="password" 
                    />
                </div>

                <button className="block w-full text-center text-white font-bold bg-gradient-to-r from-[#fd77a1] to-[#ff8c42] py-3 rounded-md hover:shadow-lg transition-shadow">
                    Submit
                </button>
            </form>

            <div className="flex justify-center items-center text-[16px] mt-6 text-[#bbbabf]">
                <h4 className="font-semibold">New User?</h4>
                <Link className="ml-2 text-[#fd77a1] hover:underline" to="/signup">Create New Account</Link>
            </div>
        </div>
    </div>

  )
}

export default Login