import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard.jsx'
import { Github } from './pages/Github.jsx'
import { Tasks } from './pages/Tasks.jsx'
import { NotFound } from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/github" element={<Github />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App