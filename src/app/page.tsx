"use client";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Login</h2>
        <form className="space-y-4 ">
          <div>
            <label className="block mb-1 text-gray-800" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500 text-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-800" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500 text-gray-700"
            />
          </div>
          <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Log In
          </button>
        </form>
        <div className="flex justify-center items-center bg-gray-100">
          <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md text-center">
            <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
