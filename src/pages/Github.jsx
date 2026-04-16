import { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import './Github.css';

const DEFAULT_USERNAME = 'facebook';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  CSharp: '#178600',
};

function getLanguageColor(lang) {
  return languageColors[lang] || '#8b949e';
}

export function Github() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState(DEFAULT_USERNAME);

  const profileUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

  const { data: profile, loading: profileLoading, error: profileError } = useFetch(profileUrl);
  const { data: repos, loading: reposLoading, error: reposError } = useFetch(reposUrl);

  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    if (!searchQuery) return repos;
    const query = searchQuery.toLowerCase();
    return repos.filter(repo => 
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query))
    );
  }, [repos, searchQuery]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
      setSearchQuery('');
    }
  };

  return (
    <main className="github-page">
      <div className="container">
        <header className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">GitHub Activity</h1>
            <p className="page-subtitle">Track repositories and profiles</p>
          </div>
        </header>

        <form onSubmit={handleUsernameSubmit} className="search-bar">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter GitHub username"
              className="search-input"
            />
          </div>
          <button type="submit" className="search-btn">Search</button>
        </form>

        {profileLoading && (
          <div className="loading-section">
            <div className="skeleton" style={{ width: '120px', height: '120px', borderRadius: '50%' }} />
            <div className="skeleton" style={{ width: '200px', height: '24px', marginTop: '1rem' }} />
          </div>
        )}
        
        {profileError && (
          <div className="error-section">
            <span className="error-icon">⚠</span>
            <p>{profileError}</p>
          </div>
        )}

        {profile && !profileLoading && (
          <div className="profile-card fade-in">
            <img src={profile.avatar_url} alt={profile.login} className="profile-avatar" />
            <div className="profile-info">
              <div className="profile-header">
                <h2 className="profile-name">{profile.name || profile.login}</h2>
                <span className="profile-username">@{profile.login}</span>
              </div>
              {profile.bio && <p className="profile-bio">{profile.bio}</p>}
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">{profile.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{profile.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{profile.public_repos}</span>
                  <span className="stat-label">Repos</span>
                </div>
              </div>
              {profile.html_url && (
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View Profile
                </a>
              )}
            </div>
          </div>
        )}

        {repos && !reposLoading && (
          <div className="repos-section fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="repos-header">
              <h2 className="section-title">Repositories</h2>
              <span className="repos-count">{filteredRepos.length} repos</span>
            </div>
            
            <div className="repos-filter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <input
                type="text"
                placeholder="Filter repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="repos-grid">
              {filteredRepos.map(repo => (
                <a 
                  key={repo.id} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="repo-card"
                >
                  <div className="repo-header">
                    <h3 className="repo-name">{repo.name}</h3>
                    {repo.private && <span className="repo-private">Private</span>}
                  </div>
                  {repo.description && <p className="repo-description">{repo.description}</p>}
                  <div className="repo-footer">
                    <div className="repo-stats">
                      {repo.language && (
                        <span className="repo-language">
                          <span className="language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="repo-stars">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {repo.stargazers_count}
                      </span>
                      <span className="repo-forks">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 2C4.9 2 4 2.9 4 4v10c0 1.1.9 2 2 2h4v2.59L7.71 20.29 6.29 18.88l2.3-2.3L5 13V6h4V4H6zm8 0v6.5L17.29 18.88l1.42 1.41L20 18.29V6h-6z"/>
                        </svg>
                        {repo.forks_count}
                      </span>
                    </div>
                    {repo.updated_at && (
                      <span className="repo-updated">
                        Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
            
            {filteredRepos.length === 0 && (
              <div className="empty-repos">
                <p>No repositories found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}