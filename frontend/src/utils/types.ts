export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: "patient" | "provider" | "admin";
  phone: string;
  date_of_birth: string | null;
  address: string;
  created_at: string;
}

export interface HealthResource {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  accepts_insurance: boolean;
  sliding_scale: boolean;
  languages: string;
  hours: Record<string, string>;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: number;
  patient: number;
  patient_name: string;
  resource: number;
  resource_name: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
