# 🏥 Community Health Appointment & Resource System

A full-stack healthcare management platform connecting patients with healthcare 
providers — featuring an AI-powered symptom checker built with the Claude API. 
Built as a senior capstone project at the University of Maryland Eastern Shore 
by a team of 4.

## 🌐 Live Demo
Coming soon

## 🤖 AI Feature — Symptom Checker
Patients describe their symptoms and receive instant AI-powered health insights 
including possible conditions, severity level, whether to see a doctor, and 
self-care tips — powered by Anthropic's Claude API.

## ✨ Features

### 🔐 Authentication & Role-Based Access
- Secure login and registration with form validation
- Three user roles: **Patient**, **Provider**, and **Admin**
- Protected routes — each role only accesses their own pages
- JWT token authentication with auto-logout on session expiry

### 🧑‍⚕️ Patient Portal
- Personalized patient dashboard
- **AI Symptom Checker** — Claude API analyzes symptoms in real time
- Search for healthcare providers by specialty
- Book appointments with available providers
- View full appointment history

### 👨‍⚕️ Provider Portal
- Provider dashboard with daily appointment overview
- Manage availability — set and update open time slots
- Manage bookings — accept or decline appointment requests
- Provider profile management with specialty information

### 🛠️ Admin Portal
- Admin dashboard with system overview
- Approve or reject new provider registrations
- Manage medical specialties available on the platform
- Monitor total providers, patients, and pending approvals

## 🛠️ Tech Stack

**Frontend**
- React 19
- React Router DOM
- Tailwind CSS
- React Hook Form
- Axios
- Vite

**Backend**
- Python
- Django
- Django REST Framework
- PostgreSQL
- Supabase

**AI**
- Claude API (Anthropic)
- Prompt Engineering

**Tools**
- JWT Authentication
- ESLint
- Git & GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yanetassefa1/Community-healthcare-frontend-

# Navigate into the project
cd Community-healthcare-frontend-

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_API_BASE_URL and Supabase credentials

# Start the development server
npm run dev
```

## 📁 Project Structure
```
src/
├── components/
│   └── common/           # Navbar, LoadingSpinner, ProtectedRoute
├── contexts/
│   └── AuthContext.jsx   # Global auth state management
├── pages/
│   ├── auth/             # Login, Register
│   ├── patient/          # Dashboard, SymptomChecker, Search, Book, History
│   ├── provider/         # Dashboard, Availability, Bookings, Profile
│   └── admin/            # Dashboard, ApproveProviders, Specialties
├── services/
│   ├── api.js            # Axios instance + interceptors
│   ├── authService.js    # Auth API calls
│   └── claudeService.js  # Claude AI API integration
└── App.jsx               # Route configuration
```

## 👥 Team
| Name | Role |
|------|------|
| **Yanet Assefa** | Project Manager & Frontend Developer |
| **Chyna** | Backend / Django Developer |
| **Israth** | Frontend Developer |
| **Paul** | QA & Testing |

## 📚 What I Learned
- Leading a 4-person team through weekly Agile/Scrum sprints
- Integrating the Claude AI API to build a real-time symptom checker
- Building role-based authentication with protected routes in React
- Integrating a Django REST API with a React frontend using Axios
- Managing JWT tokens with automatic refresh and logout handling
- Coordinating frontend and backend development across a distributed team

## 📫 Contact
- GitHub: [yanetassefa1](https://github.com/yanetassefa1)
- LinkedIn: https://www.linkedin.com/in/yanet-assefa-26abba331/?skipRedirect=true
