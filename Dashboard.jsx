import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardContent from "../components/DashboardContent";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardContent />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
