import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import DynamicButton from "../components/ui/DynamicButton";
import GoBackButton from "../components/ui/GoBackButton";

import {
  listUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
  avatarUrl,
} from "../services/userService";

const EmptyAvatar = ({ className = "w-12 h-12" }) => (
  <div className={`bg-gray-200 rounded-full flex items-center justify-center ${className}`}>
    <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
      <path d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
    </svg>
  </div>
);

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", avatarFile: null, avatarPreview: null });
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const data = await listUsersService();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingUser(null);
    setForm({ name: "", email: "", avatarFile: null, avatarPreview: null });
    setModalOpen(true);
  }

  function openEditModal(user) {
    setEditingUser(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      avatarFile: null,
      avatarPreview: user.avatar ? avatarUrl(user.avatar) : null,
    });
    setModalOpen(true);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (file) {
      setForm((s) => ({ ...s, avatarFile: file, avatarPreview: URL.createObjectURL(file) }));
    } else {
      setForm((s) => ({ ...s, avatarFile: null, avatarPreview: null }));
    }
  }

  function closeModal() {
    if (form.avatarPreview && form.avatarFile) URL.revokeObjectURL(form.avatarPreview);
    setModalOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (editingUser) {
        await updateUserService(editingUser.$id, {
          name: form.name,
          email: form.email,
          avatarFile: form.avatarFile,
        });
      } else {
        await createUserService({
          name: form.name,
          email: form.email,
          avatarFile: form.avatarFile,
        });
      }
      await fetchUsers();
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save user.");
    }
  }

  async function handleDelete(userId) {
    if (!confirm("Delete this user? This action cannot be undone.")) return;
    try {
      await deleteUserService(userId);
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="p-6 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Users</h1>
            <div className="flex items-center gap-2">
              {/* Dynamic buttons */}
              <DynamicButton initialText="+ Add User" onClick={openAddModal} />
              <GoBackButton onClick={() => navigate("/dashboard")} />
              <DynamicButton initialText="Refresh" onClick={fetchUsers} />
            </div>
          </div>

          {/* Users table */}
          {loading ? (
            <div className="text-center py-10">Loading users...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center text-gray-600 py-10">No users found.</div>
          ) : (
            <div className="bg-white shadow rounded overflow-x-auto">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((u) => (
                    <tr key={u.$id}>
                      <td className="px-6 py-4 flex items-center gap-4">
                        {u.avatar ? (
                          <img
                            src={avatarUrl(u.avatar)}
                            alt={u.name || "avatar"}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <EmptyAvatar />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{u.name}</div>
                          <div className="text-sm text-gray-500">ID: {u.$id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{u.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{u.role || "user"}</td>
                      <td className="px-6 py-4 text-right text-sm">
                        <div className="inline-flex gap-2">
                          <DynamicButton initialText="Edit" onClick={() => openEditModal(u)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded" />
                          <DynamicButton initialText="Delete" onClick={() => handleDelete(u.$id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">{editingUser ? "Edit User" : "Add User"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Avatar (optional)</label>
                    <div className="flex items-center gap-4">
                      <div>
                        {form.avatarPreview ? (
                          <img src={form.avatarPreview} alt="preview" className="w-20 h-20 rounded-full object-cover" />
                        ) : editingUser?.avatar ? (
                          <img src={avatarUrl(editingUser.avatar)} alt="preview" className="w-20 h-20 rounded-full object-cover" />
                        ) : (
                          <EmptyAvatar className="w-20 h-20" />
                        )}
                      </div>
                      <div>
                        <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*" />
                        <div className="text-sm text-gray-500 mt-2">PNG/JPG, max 5MB</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <DynamicButton initialText="Cancel" onClick={closeModal} className="border px-4 py-2 rounded" />
                    <DynamicButton initialText={editingUser ? "Save changes" : "Create user"} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" />
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default UsersPage;
