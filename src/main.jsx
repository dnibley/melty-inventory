import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'

// Simple client-side router — no library needed
function Root() {
  const isDashboard = window.location.pathname === '/dashboard';

  if (isDashboard) {
    // Pull Supabase credentials from localStorage (set by the counting app)
    const supabaseUrl = localStorage.getItem('melty_supabase_url') || '';
    const anonKey     = localStorage.getItem('melty_anon_key')     || '';
    return <Dashboard supabaseUrl={supabaseUrl} anonKey={anonKey} />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
