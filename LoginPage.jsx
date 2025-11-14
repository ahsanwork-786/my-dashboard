import React, { useState } from "react";
import { account } from "../services/appwrite";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Correct login method for Appwrite v21+
      const session = await account.createEmailPasswordSession(email, password);

      // ✅ Generate JWT
      const jwt = await account.createJWT();
     

      // ✅ Store JWT in localStorage
      localStorage.setItem("jwt", jwt.jwt);

      // ✅ Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button className="bg-blue-500 text-white p-2 rounded">Login</button>

        <p className="text-sm mt-2 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Signup here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
