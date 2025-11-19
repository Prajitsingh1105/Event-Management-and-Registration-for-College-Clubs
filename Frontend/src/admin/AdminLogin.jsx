import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { adminLogin } from "../api"; 

const AdminLogin = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setAdminData({ ...adminData, [e.target.name]: e.target.value });

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!adminData.username || !adminData.password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const res = await adminLogin(adminData); 
            console.log(res);
            if (res.message === "Login successful") {
                navigate("/admin/dashboard");
            } else {
                setError(res.message || "Login failed");
            }

        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black p-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-xl text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
                <p className="text-gray-300 text-center mb-8">
                    Login using college-provided credentials
                </p>

                {error && <div className="bg-red-500 text-white py-2 px-4 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full px-4 py-3 rounded-xl bg-black/30 placeholder-gray-400 text-white focus:outline-none"
                            value={adminData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl bg-black/30 placeholder-gray-400 text-white focus:outline-none"
                            value={adminData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-4 top-3 text-2xl text-gray-400 hover:text-white"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-500 hover:bg-purple-600 transition-all rounded-xl font-bold"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center text-gray-400 text-sm mt-6">
                    Not an admin?{" "}
                    <Link className="text-purple-300 hover:underline" to="/login">
                        Go to Student Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
