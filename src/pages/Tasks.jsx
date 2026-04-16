import { useState, useEffect } from 'react';
import { TaskForm } from '../components/TaskForm';
import './Tasks.css';

const STORAGE_KEY = 'devdashboard-tasks';

export function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prev => [task, ...prev]);
  };

  const toggleTask = (index) => {
    setTasks(prev => prev.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main className="tasks-page">
      <div className="container">
        <header className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Task Manager</h1>
            <p className="page-subtitle">Track and organize your development tasks</p>
          </div>
        </header>

        <div className="tasks-stats">
          <div className="stat-card">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card">
            <span className="stat-number stat-pending">{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number stat-completed">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="tasks-content">
          <div className="tasks-form-section">
            <TaskForm onAddTask={addTask} />
          </div>

          <div className="tasks-list-section">
            <div className="section-header">
              <h2 className="section-title">Your Tasks</h2>
              <span className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
            </div>
            
            <div className="tasks-list">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">☰</div>
                  <h3>No tasks yet</h3>
                  <p>Add a task above to get started</p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <div key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <label className="task-checkbox-wrapper">
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        onChange={() => toggleTask(index)}
                        className="task-checkbox"
                      />
                      <span className="checkbox-custom"></span>
                    </label>
                    <div className="task-content">
                      <div className="task-header">
                        <span className="task-title">{task.title}</span>
                        <button 
                          className="delete-btn"
                          onClick={() => deleteTask(index)}
                          aria-label="Delete task"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </div>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                      <span className="task-date">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}