import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";
import { Heart } from "lucide-react";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/api/auth/register/", form);
      await login(form.email, form.password);
      navigate("/appointments");
    } catch (err: any) {
      const msg = err?.response?.data;
      setError(typeof msg === "object" ? Object.values(msg).flat().join(" ") : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="card w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-teal-100 p-3 rounded-2xl">
            <Heart size={28} className="text-teal-600" fill="currentColor" />
          </div>
          <h1 className="font-display text-2xl text-slate-800">Create your account</h1>
          <p className="text-sm text-slate-500">Free, secure, and community-focused</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">First name</label>
              <input name="first_name" className="input" value={form.first_name} onChange={handleChange} required placeholder="Jane" />
            </div>
            <div>
              <label className="label">Last name</label>
              <input name="last_name" className="input" value={form.last_name} onChange={handleChange} required placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="label">Email address</label>
            <input name="email" type="email" className="input" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div>
            <label className="label">Username</label>
            <input name="username" className="input" value={form.username} onChange={handleChange} required placeholder="janedoe" />
          </div>
          <div>
            <label className="label">Phone (optional)</label>
            <input name="phone" type="tel" className="input" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className="label">Password</label>
            <input name="password" type="password" className="input" value={form.password} onChange={handleChange} required placeholder="Min. 8 characters" minLength={8} />
          </div>
          <button type="submit" className="btn-primary mt-2" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
