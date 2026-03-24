# JobLyne

A modern job board and skill matching platform built with Next.js and Django.

## Project Structure

- `frontend/`: Next.js application (App Router, Tailwind CSS, Server Actions)
- `backend/`: Django REST Framework API (JWT Auth, PostgreSQL/Neon)
- `database/`: Database schema and migration scripts
- `storage/`: Uploaded media and static assets
- `worker/`: Background tasks and processing scripts

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL (or a Neon.tech connection)

### Local Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/0502Satya/Skillsynk.git
   cd Skillsynk
   ```

2. **Backend Setup**
   ```bash
   cd backend
   # Create a virtual environment
   python -m venv venv
   # Activate it (Windows)
   .\venv\Scripts\activate
   # Install dependencies
   pip install -r requirements.txt
   # Setup environment variables
   copy .env.example .env
   # Fill in the values in .env (SECRET_KEY, DATABASE_URL)
   # Run migrations
   python manage.py migrate
   # Start the server
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   # Install dependencies
   npm install
   # Setup environment variables
   copy .env.example .env.local
   # Start the development server
   npm run dev
   ```

## Development Best Practices

- **Environment Defaults**: Always copy `.env.example` to `.env` (backend) or `.env.local` (frontend).
- **Git Hygiene**: Sensitive files are ignored via root `.gitignore`. Never commit `.env` files.
- **Backend Validation**: The backend will fail to start if mandatory environment variables are missing.
