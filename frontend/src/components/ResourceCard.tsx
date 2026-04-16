import { Link } from "react-router-dom";
import { MapPin, Phone, Globe, CheckCircle } from "lucide-react";
import { HealthResource } from "../utils/types";

const CATEGORY_COLORS: Record<string, string> = {
  clinic: "bg-blue-100 text-blue-700",
  hospital: "bg-red-100 text-red-700",
  pharmacy: "bg-green-100 text-green-700",
  mental_health: "bg-purple-100 text-purple-700",
  dental: "bg-yellow-100 text-yellow-700",
  vision: "bg-indigo-100 text-indigo-700",
  urgent_care: "bg-orange-100 text-orange-700",
  community: "bg-teal-100 text-teal-700",
};

interface Props {
  resource: HealthResource;
}

export default function ResourceCard({ resource }: Props) {
  return (
    <div className="card hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg text-slate-800 leading-snug">{resource.name}</h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
            CATEGORY_COLORS[resource.category] || "bg-slate-100 text-slate-600"
          }`}
        >
          {resource.category.replace("_", " ")}
        </span>
      </div>

      <p className="text-sm text-slate-500 line-clamp-2">{resource.description}</p>

      <div className="flex flex-col gap-1.5 text-sm text-slate-600">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-teal-500 shrink-0" />
          {resource.address}, {resource.city}, {resource.state}
        </span>
        <span className="flex items-center gap-1.5">
          <Phone size={14} className="text-teal-500 shrink-0" />
          {resource.phone}
        </span>
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-teal-600 hover:underline"
          >
            <Globe size={14} className="shrink-0" />
            Visit website
          </a>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
        {resource.accepts_insurance && (
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-green-500" /> Accepts insurance
          </span>
        )}
        {resource.sliding_scale && (
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-green-500" /> Sliding scale
          </span>
        )}
      </div>

      <div className="mt-auto pt-2">
        <Link to={`/resources/${resource.id}`} className="btn-primary text-sm w-full text-center block">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
