import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResource } from "../hooks/useResources";
import { useCreateAppointment } from "../hooks/useAppointments";
import { useAuth } from "../hooks/useAuth";
import { MapPin, Phone, Globe, CheckCircle, ArrowLeft } from "lucide-react";

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data: resource, isLoading } = useResource(Number(id));
  const createAppt = useCreateAppointment();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    await createAppt.mutateAsync({ resource: Number(id), date, time, reason });
    setSuccess(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!resource) return <div className="p-8 text-center text-slate-500">Resource not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to resources
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Resource Info */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs font-medium bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full capitalize">
              {resource.category.replace("_", " ")}
            </span>
            <h1 className="font-display text-3xl text-slate-800 mt-3">{resource.name}</h1>
          </div>

          <p className="text-slate-500 leading-relaxed">{resource.description}</p>

          <div className="card flex flex-col gap-3">
            <div className="flex items-start gap-2 text-sm text-slate-600">
              <MapPin size={16} className="text-teal-500 mt-0.5 shrink-0" />
              <span>{resource.address}, {resource.city}, {resource.state} {resource.zip_code}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone size={16} className="text-teal-500 shrink-0" />
              {resource.phone}
            </div>
            {resource.website && (
              <a href={resource.website} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm text-teal-600 hover:underline">
                <Globe size={16} className="shrink-0" />
                {resource.website}
              </a>
            )}
          </div>

          <div className="flex gap-4 text-sm text-slate-600">
            {resource.accepts_insurance && (
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" /> Accepts insurance
              </span>
            )}
            {resource.sliding_scale && (
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" /> Sliding scale fees
              </span>
            )}
          </div>

          {resource.languages && (
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-700">Languages: </span>
              {resource.languages}
            </p>
          )}
        </div>

        {/* Booking Form */}
        <div className="card h-fit">
          <h2 className="font-display text-xl text-slate-800 mb-5">Book an Appointment</h2>

          {success ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle size={40} className="text-green-500" />
              <p className="font-medium text-slate-800">Appointment requested!</p>
              <p className="text-sm text-slate-500">You'll receive a confirmation shortly.</p>
              <button onClick={() => navigate("/appointments")} className="btn-primary mt-2">
                View My Appointments
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="flex flex-col gap-4">
              <div>
                <label className="label">Preferred Date</label>
                <input
                  type="date"
                  className="input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div>
                <label className="label">Preferred Time</label>
                <input
                  type="time"
                  className="input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label">Reason for Visit (optional)</label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe your health concern..."
                />
              </div>
              {!isAuthenticated && (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  You'll need to log in to confirm your booking.
                </p>
              )}
              <button
                type="submit"
                className="btn-primary"
                disabled={createAppt.isLoading}
              >
                {createAppt.isLoading ? "Booking..." : isAuthenticated ? "Request Appointment" : "Log In to Book"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
