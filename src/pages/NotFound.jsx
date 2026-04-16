import { Link } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}