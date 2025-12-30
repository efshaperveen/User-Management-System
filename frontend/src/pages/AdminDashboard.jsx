import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [actionUser, setActionUser] = useState(null);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const USERS_PER_PAGE = 10;

  // Logged in admin
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/users");
      setUsers(res.data.users);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Confirm action
  const confirmAction = async () => {
    try {
      setActionLoading(true);
      await API.put(`/api/users/${actionUser._id}/status`, {
        status: actionType,
      });

      toast.success(
        `User ${
          actionType === "active" ? "activated" : "deactivated"
        } successfully`
      );

      setActionUser(null);
      fetchUsers();
    } catch {
      toast.error("Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  // Pagination
  const start = (page - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(start, start + USERS_PER_PAGE);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
   <>
  <Navbar />

  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-4 py-8">
    <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <h1
  className="
    text-2xl sm:text-3xl md:text-4xl
    font-bold text-white
    text-center
    mb-6 sm:mb-8
    tracking-wide
  "
>
  Admin Dashboard
</h1>


      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-32">
          <div className="animate-spin h-12 w-12 border-b-2 border-[#E9D7AB] rounded-full"></div>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto shadow-xl">
          <table className="min-w-full text-sm text-gray-200">
            
            <thead className="bg-white/10 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Full Name</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => {
                const isAdmin = user.role === "admin";
                const isSelf = user._id === currentUser?.id;

                return (
                  <tr
                    key={user._id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.fullName}</td>

                    {/* Role */}
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          isAdmin
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          user.status === "active"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}>
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      {isAdmin || isSelf ? (
                        <span className="text-xs text-gray-400 italic">
                          Protected
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setActionUser(user);
                            setActionType(
                              user.status === "active"
                                ? "inactive"
                                : "active"
                            );
                          }}
                          className={`px-4 py-1.5 rounded-lg text-sm font-medium
                            transition-all duration-200
                            ${
                              user.status === "active"
                                ? "bg-red-500/80 hover:bg-red-600 hover:shadow-red-500/30"
                                : "bg-green-500/80 hover:bg-green-600 hover:shadow-green-500/30"
                            }
                            text-white hover:-translate-y-0.5`}
                        >
                          {user.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium
              transition
              ${
                page === i + 1
                  ? "bg-[#E9D7AB] text-black"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Confirm Modal */}
  {actionUser && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1f2933] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-2">
          Confirm Action
        </h3>

        <p className="text-gray-300 mb-6">
          Are you sure you want to{" "}
          <span className="font-semibold text-[#E9D7AB]">
            {actionType}
          </span>{" "}
          this user?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setActionUser(null)}
            className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            onClick={confirmAction}
            disabled={actionLoading}
            className="px-4 py-2 rounded-lg bg-[#E9D7AB] text-black font-medium
            hover:brightness-110 disabled:opacity-60"
          >
            {actionLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  )}
</>

  );
}


