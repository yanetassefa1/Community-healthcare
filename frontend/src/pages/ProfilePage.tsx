import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";
import { useQueryClient } from "react-query";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch("/api/auth/me/", form);
      qc.invalidateQueries("me");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-teal-100 p-4 rounded-2xl">
          <User size={28} className="text-teal-600" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-slate-800">My Profile</h1>
          <p className="text-slate-500 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="card">
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-5">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">First name</label>
              <input name="first_name" className="input" value={form.first_name} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Last name</label>
              <input name="last_name" className="input" value={form.last_name} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="label">Phone</label>
            <input name="phone" type="tel" className="input" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Address</label>
            <textarea name="address" className="input resize-none" rows={2} value={form.address} onChange={handleChange} />
          </div>
          <div className="pt-2 flex items-center gap-3">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <span className="text-xs text-slate-400 capitalize">Role: {user?.role}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
