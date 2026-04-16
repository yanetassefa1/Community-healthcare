import { useState } from "react";
import { Search } from "lucide-react";
import { useResources } from "../hooks/useResources";
import ResourceCard from "../components/ResourceCard";

const CATEGORIES = ["All", "clinic", "hospital", "pharmacy", "mental_health", "dental", "vision", "urgent_care", "community"];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { data: resources, isLoading, isError } = useResources(search);

  const filtered = resources?.filter(
    (r) => category === "All" || r.category === category
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-slate-800 mb-2">Find Health Resources</h1>
        <p className="text-slate-500">Browse clinics, hospitals, and community health services near you.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          className="input pl-10 text-base"
          placeholder="Search by name, city, or service type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
              category === cat
                ? "bg-teal-600 text-white border-teal-600"
                : "border-slate-200 text-slate-600 hover:border-teal-400"
            }`}
          >
            {cat === "All" ? "All" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Results */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="text-center py-20 text-red-500">
          Failed to load resources. Please try again.
        </div>
      )}

      {filtered && filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          No resources found. Try adjusting your search.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered?.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
