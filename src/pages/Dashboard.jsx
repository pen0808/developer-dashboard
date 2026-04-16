import { WeatherWidget } from '../components/WeatherWidget';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const quickActions = [
  { 
    path: '/github', 
    label: 'GitHub Profile', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.203-6.086 8.203-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ), 
    desc: 'Track your repositories' 
  },
  { 
    path: '/tasks', 
    label: 'Task Manager', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ), 
    desc: 'Organize your tasks' 
  },
];

const stats = [
  { 
    label: 'Active Routes', 
    value: '3', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ) 
  },
  { 
    label: 'API Integrations', 
    value: '2', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ) 
  },
  { 
    label: 'SPA Architecture', 
    value: 'Yes', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ) 
  },
];

export function Dashboard() {
  return (
    <main className="dashboard">
      <div className="container">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome back, Developer</h1>
            <p className="hero-subtitle">Your command center is ready. Monitor your projects, track tasks, and stay productive.</p>
          </div>
        </section>

        <section className="stats-row">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid-section">
          <div className="grid-item weather-section fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="section-header">
              <h2 className="section-title">Weather</h2>
              <span className="section-badge">Live</span>
            </div>
            <WeatherWidget city="New York" />
          </div>

          <div className="grid-item actions-section fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="section-header">
              <h2 className="section-title">Quick Actions</h2>
            </div>
            <div className="actions-grid">
              {quickActions.map((action) => (
                <Link key={action.path} to={action.path} className="action-card">
                  <div className="action-icon">{action.icon}</div>
                  <div className="action-content">
                    <span className="action-label">{action.label}</span>
                    <span className="action-desc">{action.desc}</span>
                  </div>
                  <span className="action-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-card">
            <div className="info-icon">ℹ</div>
            <div className="info-content">
              <h3>Getting Started</h3>
              <p>Navigate using the top bar to access different sections. Your tasks are automatically saved to local storage.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}