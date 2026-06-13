import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", formData);
      toast.success("Account created! Please login 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#2563EB",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 48px",
        }}
      >
        <div style={{ textAlign: "center", color: "white", maxWidth: "360px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              margin: "0 auto 24px",
            }}
          >
            ✅
          </div>
          <h1
            style={{ fontSize: "36px", fontWeight: 700, marginBottom: "16px" }}
          >
            TaskManager
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
            }}
          >
            Stay organised, hit your deadlines, and get more done every single
            day.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F8FAFC",
          padding: "60px 48px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ marginBottom: "36px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#1E293B",
                marginBottom: "8px",
              }}
            >
              Create account
            </h2>
            <p style={{ fontSize: "14px", color: "#94A3B8" }}>
              Start managing your tasks today — it's free
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  outline: "none",
                  color: "#1E293B",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  outline: "none",
                  color: "#1E293B",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                required
                minLength={6}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  outline: "none",
                  color: "#1E293B",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                backgroundColor: loading ? "#93C5FD" : "#2563EB",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: "24px",
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p
            style={{ textAlign: "center", fontSize: "14px", color: "#94A3B8" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2563EB",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
