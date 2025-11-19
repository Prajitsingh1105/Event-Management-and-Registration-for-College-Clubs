import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const socials = [
    { name: "FACEBOOK", icon: <FaFacebook />, url: "https://www.facebook.com/" },
    { name: "INSTAGRAM", icon: <FaInstagram />, url: "https://www.instagram.com/" },
    { name: "LINKEDIN", icon: <FaLinkedin />, url: "https://www.linkedin.com/" },
    { name: "TWITTER", icon: <FaTwitter />, url: "https://twitter.com/" },
    { name: "YOUTUBE", icon: <FaYoutube />, url: "https://www.youtube.com/" },
  ];

  return (
    <div className="h-screen w-full snap-start flex flex-col justify-end">
      <motion.footer
        className="relative text-white w-full overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        
        <div className="absolute top-[-180px] inset-x-0 w-screen z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-screen h-[600px] rotate-180"
          >
            <path
              fill="#99FF00"
              fillOpacity="1"
              d="M0,192L60,186.7C120,181,240,171,360,154.7C480,139,600,117,720,122.7C840,128,960,160,1080,186.7C1200,213,1320,235,1380,245.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-start w-full max-w-7xl mx-auto px-6 pt-28 pb-12 top-[80px]">
          <div className="flex-1 flex flex-col items-center text-center space-y-1">
            <div className="flex gap-6">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-black hover:text-purple-400 transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="mailto:support@campusconnect.com"
              className="text-lg md:text-xl font-bold text-black hover:text-purple-400"
            >
              SUPPORT@CAMPUSCONNECT.COM
            </a>
            <div className="flex-1 flex text-black items-start space-x-6 font-bold">
              <a href="/contact" className="hover:text-purple-400">
                CONTACT
              </a>
              <a href="/faq" className="hover:text-purple-400">
                FAQ
              </a>
              <a href="/terms" className="hover:text-purple-400">
                TERMS & CONDITIONS
              </a>
              <a href="/disclaimer" className="hover:text-purple-400">
                DISCLAIMER
              </a>
            </div>
            <div>
              <p className="text-xs text-gray-600 mt-6">
                © 2025 COMPUSCONNECT. ALL RIGHTS RESERVED.
              </p>
              <p className="text-xs text-gray-600">
                EMPOWERING STUDENTS TO LEARN, CREATE, AND CONNECT
              </p>
            </div>
          </div>

         
        </div>

        <div className="bg-[#99FF00] flex justify-center items-center text-black text-[10vw] md:text-[12rem] font-bold h-[25vh]">
          CAMPUSCONNECT
        </div>
      </motion.footer>
    </div>
  );
};

export default Footer;
