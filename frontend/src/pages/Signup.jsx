import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // 🔒 Strong password check 
  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!form.email)
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (!isStrongPassword(form.password))
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase & number";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      
      {/* Card */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Account ✨
        </h2>

        {/* Server Error */}
        {serverError && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              className={`mt-1 w-full rounded-lg px-3 py-2 bg-black/40 text-white border 
                focus:outline-none focus:ring-2 transition
                ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-600 focus:ring-[#E9D7AB]"
                }`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-400 mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className={`mt-1 w-full rounded-lg px-3 py-2 bg-black/40 text-white border 
                focus:outline-none focus:ring-2 transition
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-600 focus:ring-[#E9D7AB]"
                }`}
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className={`mt-1 w-full rounded-lg px-3 py-2 bg-black/40 text-white border 
                focus:outline-none focus:ring-2 transition
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-600 focus:ring-[#E9D7AB]"
                }`}
            />

            {/* Password hint */}
            <p className="text-xs mt-1 text-gray-400">
              Must contain 8+ characters, uppercase, lowercase & number
            </p>

            {errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              className={`mt-1 w-full rounded-lg px-3 py-2 bg-black/40 text-white border 
                focus:outline-none focus:ring-2 transition
                ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-600 focus:ring-[#E9D7AB]"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-400 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#debb69] text-gray-900 py-2 rounded-lg font-semibold
              hover:bg-[#daae47]
              hover:-translate-y-0.5
              hover:shadow-lg
              transition-all duration-200
              active:scale-95
              disabled:opacity-60
            "
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#E9D7AB] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


