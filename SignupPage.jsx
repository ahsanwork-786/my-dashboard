import React, { useState } from "react";
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from "../services/appwrite"; // ✅ corrected
import { ID } from "appwrite";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create user account
      const user = await account.create(
        ID.unique(), // unique user ID
        email,
        password,
        name
      );
      console.log("User created:", user);

      // 2️⃣ Save user info in 'users' collection
      const userProfile = await databases.createDocument(
        DATABASE_ID,           // Database ID
        USERS_COLLECTION_ID,   // ✅ fixed collection ID
        ID.unique(),           // Unique document ID
        {
          name: name,
          email: email,
          role: "user"         // optional default role
        }
      );
      console.log("User profile saved:", userProfile);

      alert("Signup successful! Please login.");
      window.location.href = "/login"; // redirect to login page
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
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
        <button className="bg-blue-500 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
