import { Link } from "react-router-dom";
import { Heart, Search, Calendar, Shield } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    title: "Find Resources",
    desc: "Search clinics, hospitals, mental health services, and more in your community.",
  },
  {
    icon: Calendar,
    title: "Book Appointments",
    desc: "Schedule appointments online in seconds — no phone calls needed.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your health data is protected with JWT authentication and encrypted storage.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 to-teal-500 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium">
            <Heart size={16} fill="white" /> Community-first healthcare
          </div>
          <h1 className="text-5xl font-display leading-tight">
            Healthcare resources,<br />
            <em className="not-italic text-teal-100">right in your community.</em>
          </h1>
          <p className="text-teal-50 text-lg max-w-xl">
            Find affordable health services near you and book appointments in minutes.
            No insurance? No problem — we include sliding-scale and free clinics.
          </p>
          <div className="flex gap-3 mt-2">
            <Link to="/resources" className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
              Find Resources
            </Link>
            <Link to="/register" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-display text-center text-slate-800 mb-12">
          Everything you need, in one place
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card flex flex-col items-start gap-3">
              <div className="bg-teal-100 text-teal-600 p-3 rounded-xl">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl text-slate-800">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-display text-teal-800 mb-4">
          Ready to take control of your health?
        </h2>
        <p className="text-slate-500 mb-8">
          Join thousands of community members who use CommunityHealth every day.
        </p>
        <Link to="/register" className="btn-primary text-base px-8 py-3">
          Get Started — It's Free
        </Link>
      </section>
    </div>
  );
}
