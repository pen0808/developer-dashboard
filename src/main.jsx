import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './style.css'
import { Navigation } from './components/Navigation.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app-layout">
        <Navigation />
        <main className="main-content">
          <App />
        </main>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)