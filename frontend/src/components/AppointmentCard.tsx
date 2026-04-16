import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";
import { Appointment } from "../utils/types";
import { useCancelAppointment } from "../hooks/useAppointments";
import { format } from "date-fns";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-slate-100 text-slate-600",
};

interface Props {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: Props) {
  const cancel = useCancelAppointment();

  const handleCancel = () => {
    if (window.confirm("Cancel this appointment?")) {
      cancel.mutate(appointment.id);
    }
  };

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg text-slate-800">{appointment.resource_name}</h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
            STATUS_STYLES[appointment.status]
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 text-sm text-slate-600">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="text-teal-500" />
          {format(new Date(appointment.date), "MMMM d, yyyy")}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-teal-500" />
          {appointment.time}
        </span>
        {appointment.reason && (
          <span className="flex items-center gap-1.5">
            <AlertCircle size={14} className="text-teal-500" />
            {appointment.reason}
          </span>
        )}
      </div>

      {appointment.status === "pending" || appointment.status === "confirmed" ? (
        <button
          onClick={handleCancel}
          disabled={cancel.isLoading}
          className="mt-auto text-sm text-red-500 hover:text-red-700 font-medium transition-colors self-start"
        >
          {cancel.isLoading ? "Cancelling..." : "Cancel appointment"}
        </button>
      ) : null}
    </div>
  );
}
