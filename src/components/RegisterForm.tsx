"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { LoginForm } from "@/components/LoginForm";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [regComplete, setRegComplete] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      setLoading(false);
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        setLoading(false);
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      setLoading(false);

      if (res.ok) {
        const form = e.target;
        form.reset();
        setRegComplete(true);
      } else {
        console.log("User registration failed.");
        setRegComplete(false);
      }
    } catch (error) {
      setLoading(false);
      setRegComplete(false);
      console.log("Error during registration: ", error);
    }
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";


  return (
    <div>
      {regComplete ? (
        <>
          <p className="text-center mb-6 bg-green-300 py-4">Registration complete. Sign in below</p>
          <LoginForm includeOauthOptions={false} />
        </>

      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
          )}
          <div className="mb-6">
            <input
              required
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className={`${input_style}`}
            />
          </div>
          <div className="mb-6">
            <input
              required
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className={`${input_style}`}
            />
          </div>
          <div className="mb-6">
            <input
              required
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`${input_style}`}
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
            className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            disabled={loading}
          >
            {loading ? "loading..." : "Register"}
          </button>

        </form>
      )}
    </div>
  );
}