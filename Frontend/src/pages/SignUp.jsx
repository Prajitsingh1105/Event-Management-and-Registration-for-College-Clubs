import React, { useState } from 'react';
import DotGrid from '../DotGrid';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signup } from "../api.js";
import { notify, ToastWrapper } from "../Toast.jsx";
import Login from "./Login.jsx"

function Signup() {
  const [cPass, setCPass] = useState('');
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isMatch = form.password && cPass && form.password === cPass;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMatch) {
      notify.error("Passwords do not match!");
      setCPass("");
      return;
    }
    const res = await signup(form);
    if (res.error) {
      console.log(res.error);
      notify.error("Signup failed!");
    }
    else {
      console.log(res);
      notify.success(res.msg);
      navigate('/login');
    }
    setForm({
      name: "",
      username: "",
      email: "",
      password: ""
    })
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

      {/* Page Content */}
      <div className='w-full h-screen flex flex-row justify-between items-center px-20'>

        {/* Left Intro Section */}
        <div className='w-[55%] flex flex-col gap-10 px-10'>
          <h1 className='text-5xl font-bold'>
            Join us and start discovering amazing college events, workshops, and club activities!
          </h1>
          <div className='text-xl'>
            Sign up to stay updated on the latest college fests, tech summits, workshops, and club activities.
            Easily register for events, track your participation, and make sure you never miss the moments that make campus life unforgettable.
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="w-[80%] max-w-md bg-[#1F2833] p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#66FCF1]">Sign Up</h2>

            <input
              type="text"
              placeholder="Full Name"
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#0B0C10] text-white border border-gray-600 focus:outline-none focus:border-[#66FCF1]"
            />

            <input
              type="text"
              placeholder="Username"
              name='username'
              value={form.username}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#0B0C10] text-white border border-gray-600 focus:outline-none focus:border-[#66FCF1]"
            />

            <input
              type="email"
              placeholder="Email"
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#0B0C10] text-white border border-gray-600 focus:outline-none focus:border-[#66FCF1]"
            />

            <input
              type="password"
              placeholder="Password"
              name='password'
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#0B0C10] text-white border border-gray-600 focus:outline-none focus:border-[#66FCF1]"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={cPass}
              onChange={(e) => setCPass(e.target.value)}
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#0B0C10] text-white border border-gray-600 focus:outline-none focus:border-[#66FCF1]"
            />

            <button className="w-full py-3 bg-[#45A29E] hover:bg-[#66FCF1] text-[#0B0C10] font-semibold rounded-lg transition-all">
              Sign Up
            </button>

            <p className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <span className="text-[#66FCF1] hover:underline cursor-pointer">
                <Link to='/login'>
                  Login
                </Link>
              </span>
            </p>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Signup;
