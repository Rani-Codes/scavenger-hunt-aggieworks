'use client'
import { useState } from "react";

export default function Home() {
  // State to toggle between login and sign up
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submit for login or sign up
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (isSignUp) {
      console.log("Sign up:", { username, password });
      // Make your sign-up request here
    } else {
      console.log("Login:", { username, password });
      // Make your login request here
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <main>
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl">Welcome to Scavenger Hunt</h1>
          <h3 className="text-lg">A project for AggieWorks</h3>
          <div className="border p-6 rounded-lg shadow-md w-80 my-2">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <h5 className="text-lg">
                {isSignUp ? "Sign up for an account" : "Log in to your account"}
              </h5>
              <div>
                <label htmlFor="username" className="block text-sm">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 border rounded mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border rounded mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  {isSignUp ? "Log In" : "Sign Up"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
