import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Load profile
  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);

  // Update profile
  const handleProfileUpdate = async () => {
    try {
      setLoadingProfile(true);
      const res = await API.put("/api/users/profile", profile);

      toast.success("Profile updated successfully");
      localStorage.setItem("user", JSON.stringify(res.data));
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoadingProfile(false);
    }
  };

  // Change Password
const handleChangePassword = async () => {
  if (
    !passwords.currentPassword ||
    !passwords.newPassword ||
    !passwords.confirmPassword
  ) {
    toast.error("All password fields are required");
    return;
  }

  if (passwords.newPassword.length < 8) {
    toast.error("Password must be at least 8 characters");
    return;
  }

  if (passwords.newPassword !== passwords.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setLoadingPassword(true);

    await API.put("/api/users/change-password", {
      oldPassword: passwords.currentPassword, 
      newPassword: passwords.newPassword,
    });

    toast.success("Password updated successfully");

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (err) {
    toast.error(err.response?.data?.message || "Password change failed");
  } finally {
    setLoadingPassword(false);
  }
};


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* PROFILE CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Profile Information
              </h2>

              {!editMode && (
 <button
  onClick={() => setEditMode(true)}
  className="
    inline-flex sm:w-auto
    w-auto
    min-w-[110px] sm:min-w-[140px]
    items-center justify-center gap-2

    bg-[#E9D7AB] text-gray-900 font-semibold
    px-4 py-1.5 sm:px-5 sm:py-2
    rounded-xl

    shadow-sm
    hover:bg-[#dcc89a] hover:shadow-md
    hover:-translate-y-0.5
    transition-all duration-200
    active:scale-95

    focus:outline-none focus:ring-2 focus:ring-[#E9D7AB]/60
  "
>
  <span className="text-base">✏️</span>
  <span className="text-sm sm:text-base">Edit</span>
</button>


              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  disabled={!editMode}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  className={`w-full rounded-lg px-4 py-2 text-white placeholder-gray-400
                  ${
                    editMode
                      ? "bg-black/40 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                      : "bg-black/30 border border-gray-700 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled={!editMode}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className={`w-full rounded-lg px-4 py-2 text-white placeholder-gray-400
                  ${
                    editMode
                      ? "bg-black/40 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                      : "bg-black/30 border border-gray-700 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Buttons */}
            {editMode && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleProfileUpdate}
                  disabled={loadingProfile}
                  className="bg-[#debb69] text-gray-900 font-semibold px-6 py-2 rounded-lg 
hover:bg-[#daae47] transition disabled:opacity-60"
                >
                  {loadingProfile ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => {
                    setEditMode(false);
                    setProfile({
                      fullName: user.fullName,
                      email: user.email,
                    });
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700  text-gray-300 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* PASSWORD CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-5">
              Change Password
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Current password", "New password", "Confirm new password"].map(
                (placeholder, i) => (
                  <input
                    key={i}
                    type="password"
                    placeholder={placeholder}
                    value={Object.values(passwords)[i]}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        [Object.keys(passwords)[i]]: e.target.value,
                      })
                    }
                    className="bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
                  />
                )
              )}
            </div>

            <button
              onClick={handleChangePassword}
              disabled={loadingPassword}
              className="mt-5 bg-[#debb69]  text-gray-900 font-semibold px-6 py-2 rounded-lg 
hover:bg-[#daae47] transition disabled:opacity-60"
            >
              {loadingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
