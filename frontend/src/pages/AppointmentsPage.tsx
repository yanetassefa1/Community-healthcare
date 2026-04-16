import { Link } from "react-router-dom";
import { useMyAppointments } from "../hooks/useAppointments";
import AppointmentCard from "../components/AppointmentCard";
import { Calendar } from "lucide-react";

export default function AppointmentsPage() {
  const { data: appointments, isLoading, isError } = useMyAppointments();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-4xl text-slate-800 mb-1">My Appointments</h1>
          <p className="text-slate-500">Track and manage your upcoming appointments.</p>
        </div>
        <Link to="/resources" className="btn-primary hidden sm:block">
          + Book New
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="text-center py-20 text-red-500">
          Failed to load appointments. Please try again.
        </div>
      )}

      {appointments && appointments.length === 0 && (
        <div className="card text-center py-16 flex flex-col items-center gap-4">
          <div className="bg-teal-100 p-4 rounded-2xl">
            <Calendar size={32} className="text-teal-600" />
          </div>
          <h2 className="font-display text-xl text-slate-700">No appointments yet</h2>
          <p className="text-slate-400 text-sm max-w-xs">
            Browse community health resources and book your first appointment today.
          </p>
          <Link to="/resources" className="btn-primary mt-2">
            Find Resources
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {appointments?.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))}
      </div>
    </div>
  );
}
