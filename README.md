# Community Health Appointment & Resource System

A full-stack web application that helps community members find healthcare resources, book appointments, and manage their health records. Built with React, TypeScript, Django REST Framework, and PostgreSQL/Supabase.

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS  
**Backend:** Python, Django, Django REST Framework  
**Database:** PostgreSQL (Supabase)  
**Auth:** JWT (SimpleJWT)  
**Deployment:** (Vercel for frontend, Railway/Render for backend)

---

## Project Structure

```
community-health-app/
├── frontend/          # React + TypeScript app
├── backend/           # Django REST API
└── docs/              # Architecture diagrams, API docs
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- PostgreSQL or Supabase project

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Fill in your DB credentials and secret key

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:8000

npm run dev
```

---

## Features

- 🏥 Browse and search community health resources
- 📅 Book, reschedule, and cancel appointments
- 🔐 Secure user authentication (JWT)
- 👤 Patient profile management
- 📊 Admin dashboard for resource providers
- 📱 Fully responsive design

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login, returns JWT |
| GET | `/api/resources/` | List health resources |
| POST | `/api/appointments/` | Book appointment |
| GET | `/api/appointments/me/` | User's appointments |
| PATCH | `/api/appointments/:id/` | Update appointment |
| DELETE | `/api/appointments/:id/` | Cancel appointment |

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT
