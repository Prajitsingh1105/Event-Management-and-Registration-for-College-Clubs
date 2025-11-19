import React from 'react'
import { TypeAnimation } from "react-type-animation"
import DotGrid from '../DotGrid';
import image from "../assets/demoImg.png";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">

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

      <div className="absolute inset-0 -z-[5] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/30 via-transparent to-[#0B0C10]/30"></div>
        <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 bg-[#0B0C10]/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative w-full h-full flex flex-col pt-5 p-5">
        <div className="flex justify-start p-5">
          <div className="flex justify-center items-center w-24 h-24 rounded-full text-white font-bold text-xl bg-transparent">
            {/* Logo Placeholder */}
          </div>
        </div>

        <div className="flex w-full h-auto flex-row mt-20 gap-10 items-center justify-center">
          <div className="w-[50%] px-20 flex flex-col gap-7">
            <div className="text-6xl font-bold text-[#66FCF1] drop-shadow-[0_0_40px_rgba(82,39,255,0.4)]">
              Your Gateway to Every Campus Event
            </div>

            <div className="font-bold text-2xl">
              <TypeAnimation
                sequence={[
                  "Discover exciting college fests.", 2000,
                  "Register with a single click.", 2000,
                  "Experience the best of campus life.", 2000,
                ]}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </div>

            <div className="text-lg text-[#D1E7FF] leading-relaxed drop-shadow-[0_0_8px_rgba(209,231,255,0.3)]">
              Manage and join college and club events effortlessly — all in one place.
              From vibrant cultural fests and exciting hackathons to inspiring workshops and club meets,
              our platform brings every campus experience to your fingertips. Stay updated with real-time
              event notifications, register with a single click, and make sure you never miss the moments
              that matter most in your college journey.
            </div>

            <div className="flex gap-6 mt-6">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-2xl hover:bg-red-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Link to='/login'>
                  Login
                </Link>
              </button>
              <button className="px-6 py-3 bg-[#66FCF1] text-black font-semibold rounded-2xl hover:bg-red-400 transition-all">
                <Link to='/signup'>
                  Sign Up
                </Link>
              </button>
            </div>

            <div className="">
              <button className="px-[52px] py-3 bg-[#009dff] text-black font-semibold rounded-2xl hover:bg-red-400 transition-all shadow-lg flex justify-center items-center">
                <Link to='/admin/login'>
                  Login as Admin
                </Link>
              </button>
            </div>
          </div>

          <div className="w-[40%] flex justify-center items-center">
            <img src={image} alt="demoimg" className='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
