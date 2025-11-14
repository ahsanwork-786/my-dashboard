import React from "react";

const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
          </tr>
        </thead>

        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id || index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-3 px-4 text-center text-gray-500" colSpan="4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
