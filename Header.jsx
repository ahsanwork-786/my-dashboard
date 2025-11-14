import React from "react";
import { account } from "../services/appwrite";
import DynamicButton from "./ui/DynamicButton"; // make sure the path is correct

const Header = () => {
  const handleLogout = async () => {
    try {
      // Delete the current session in Appwrite
      await account.deleteSession("current");

      // Remove JWT from localStorage
      localStorage.removeItem("jwt");

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div>
        {/* Using DynamicButton component for logout */}
        <DynamicButton initialText="Logout" onClick={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
