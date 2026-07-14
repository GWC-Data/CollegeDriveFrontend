// Central API base URL — reads from VITE_API_BASE_URL env variable.
// In development this defaults to http://localhost:5000 (set in .env).
// In production, set VITE_API_BASE_URL in .env.production or your hosting platform.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default API_BASE;
