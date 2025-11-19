import React, { useState } from 'react';
import DotGrid from '../DotGrid';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from "../api.js";
import UserHomePage from "./UserHomePage.jsx";
import { notify, ToastWrapper } from "../Toast.jsx";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = { email, password };
    const res = await login(form);
    if (!res || res.error || res.msg === "User not found!" || res.msg === "Invalid credentials") {
      console.log(res.error || res.msg);
      notify.error("Login failed! Please check your email or password.");
      return;
    }else {
      console.log(res);
      navigate('/user/home', { state: { toastMsg: res.msg } });
    }
    setEmail("");
    setPassword("");
  }

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0B0C10]">
          <DotGrid
            dotSize={6}
            gap={20}
            baseColor="#271e37"
            activeColor="#5227ff"
            proximity={120}
            shockRadius={500}
            shockStrength={5}
            resistance={550}
            returnDuration={1.5}
          />
        </div>
      </div>
      <div className='w-full h-screen flex flex-row justify-between items-center  px-20'>
        <div className='w-[55%] flex flex-col gap-10 px-10'>
          <h1 className='text-5xl font-bold'>Welcome back! Continue your journey of discovering and joining amazing campus events.
          </h1>
          <div className='text-xl'>
            Sign in to stay updated on the latest college fests, tech summits, workshops, and club activities.
            Easily register for events, track your participation, and make sure you never miss the moments that make campus life unforgettable.
          </div>
        </div>
        <div>
          <form onSubmit={handleLogin} className="w-[80%] max-w-md bg-[#1F2833] p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#66FCF1]">Login</h2>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#0B0C10] text-white border border-gray-600 focus:outline-none focus:border-[#66FCF1]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#0B0C10] text-white border border-gray-600 focus:outline-none focus:border-[#66FCF1]"
            />

            <div className="text-right text-sm mb-4 text-gray-400 hover:text-[#66FCF1] cursor-pointer">
              Forgot password?
            </div>

            <button className="w-full py-3 bg-[#45A29E] hover:bg-[#66FCF1] text-[#0B0C10] font-semibold rounded-lg transition-all"
              type='submit'
            >
              Login
            </button>

            <p className="text-center text-gray-400 mt-6">
              Don’t have an account?{" "}
              <span className="text-[#66FCF1] hover:underline cursor-pointer">
                <Link to='/signup'>
                  Sign Up
                </Link>
              </span>
            </p>
          </form>
        <ToastWrapper />
        </div>
      </div>
    </div>
  )
}

export default Login
