import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../src/app/globals.css";
const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If the session exists, redirect to the dashboard
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Success");
      signIn("credentials", { email, password, redirect: false }).then(() => {
        router.push("/dashboard");
      });
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.error || "Login failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
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
              value={email}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500 text-gray-700"
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Log In
          </button>
          <div className="text-center">
            <div className="text-blue-500">
              {"Don't have an account?"}{" "}
              <Link legacyBehavior href="/register">
                <a className="text-blue-500 hover:underline">Register</a>
              </Link>
            </div>
          </div>
        </form>
        <div className="flex justify-center items-center bg-gray-100">
          <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md text-center">
            <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center">
              <img src="/images/google-logo.svg" alt="Google" className=" h-6 w-6 mr-2" />
              Log in with Google
            </button>
            <button onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center">
              <img src="/images/facebook-logo.svg" alt="Facebook" className=" h-6 w-6 mr-2" />
              Log in with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
