# React Hooks & Patterns Documentation

## 1. useFetch Hook

### What it does:
The `useFetch` hook handles data fetching from APIs with built-in state management for loading, error, and success states.

### Why extracted to a hook:
- **Reusability**: Used by both `WeatherWidget.jsx` and `Github.jsx` to fetch data
- **Separation of concerns**: Data fetching logic is separated from UI logic
- **Built-in cleanup**: Includes `AbortController` to cancel requests when component unmounts or URL changes, preventing memory leaks and state updates on unmounted components
- **Consistency**: Provides a uniform API (`{ data, loading, error }`) across all components

---

## 2. useEffect Usage

### Locations in codebase:

**1. `hooks/useFetch.js:8-37`** - Fetches data when URL changes
```javascript
useEffect(() => {
  const abortController = new AbortController();
  // ... fetch logic
  return () => abortController.abort();
}, [url]);
```

**2. `pages/Tasks.jsx:13-15`** - Persists tasks to localStorage
```javascript
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);
```

### What happens if dependency array is removed:

| Location | Without Dependency Array |
|----------|--------------------------|
| `useFetch.js` | Would run on **every render**, triggering infinite fetch loops and potential race conditions |
| `Tasks.jsx` | Would run on **every render**, causing unnecessary localStorage writes and potential performance issues |

---

## 3. TaskForm as a Controlled Component

### Why it's controlled:
The `TaskForm.jsx` is a **controlled component** because:
- Form values (`title`, `description`) are stored in React state via `useState`
- Input elements have their `value` prop bound to state: `value={title}`
- Changes are handled by `onChange` handlers: `onChange={(e) => setTitle(e.target.value)}`
- React owns and controls the form data

### Controlled vs Uncontrolled:

| Aspect | Controlled | Uncontrolled |
|--------|------------|--------------|
| Data storage | React state | DOM (refs) |
| Updates | Triggers re-render on every keystroke | Accessed via `ref.current.value` |
| Validation | Easy (can validate on every change) | Requires ref access |
| Default values | `value` prop | `defaultValue` prop |
| Example | `value={title} onChange={...}` | `ref={inputRef}` |

### Trade-offs:
- **Controlled**: More control, easier validation, but more code
- **Uncontrolled**: Less code, but harder to validate and integrate with other React features
