import React from "react";
import UserTable from "../components/ui/UserTable"; // <-- IMPORT TABLE

const DashboardContent = () => {
  const cards = [
    { title: "Total Users", value: "1,245" },
    { title: "Active Sessions", value: "87" },
    { title: "Revenue", value: "$12,540" },
    { title: "Conversion Rate", value: "4.8%" },
  ];

  // Dummy users data (replace with Appwrite later)
  const users = [
    { id: 1, name: "John Doe", email: "john@gmail.com", role: "Admin" },
    { id: 2, name: "Sarah Khan", email: "sarah@gmail.com", role: "Editor" },
    { id: 3, name: "Ahsan", email: "ahsan@gmail.com", role: "User" },
  ];

  return (
    <div className="space-y-10">

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <h3 className="text-gray-500 text-sm mb-2">{card.title}</h3>
            <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* USERS TABLE SECTION */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <UserTable users={users} />
      </div>

    </div>
  );
};

export default DashboardContent;
