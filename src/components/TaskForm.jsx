import { useState } from 'react';
import './TaskForm.css';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form-container">
      <h2 className="form-title">Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">Title</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-desc" className="form-label">Description</label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            className="form-textarea"
            rows="3"
          />
        </div>
        <button type="submit" className="submit-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Task
        </button>
      </form>
    </div>
  );
}