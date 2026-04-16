# Codebase Analysis

### 1. What does your `useFetch` hook do, and why did you move the logic there instead of keeping it in the component?

**What it does:**
The `useFetch` hook (`src/hooks/useFetch.js`) encapsulates the standard pattern of making an HTTP GET request. It handles three key states:
- `data`: Stores the successfully returned JSON payload.
- `loading`: A boolean indicating if the request is currently in progress.
- `error`: Stores any error messages if the request fails.
It also implements an `AbortController` to cancel ongoing requests if the requested URL changes or if the component unmounts before the request finishes.

**Why it was moved to a custom hook:**
Moving this logic into a custom hook prevents major code duplication. In my application, components like `Github.jsx` need to fetch data from multiple endpoints (e.g., profile info and repositories). Re-writing the `useState`, `try...catch`, error handling, and cleanup logic for every single API call would make the components bloated, hard to read, and difficult to maintain. By abstracting it into `useFetch`, components stay focused purely on rendering UI rather than managing complex data-fetching lifecycles.


### 2. Where did you use `useEffect` and what would happen if you removed the dependency array?

I used `useEffect` in several places across the app:

**Usage in `Tasks.jsx`:**
```javascript
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);
```
Here, it syncs the current `tasks` state to browser `localStorage` whenever the `tasks` array changes.

**Usage in `useFetch.js`:**
```javascript
useEffect(() => {
  // fetching logic...
}, [url]);
```
Here, it initiates the fetch request whenever the `url` argument changes.

**What happens if the dependency array is removed?**
If i remove the dependency array entirely (i.e., changing `}, [tasks])` to `})`), the effect will run after **every single render** of that component.
- In `Tasks.jsx`, `localStorage.setItem` would run constantly whenever any state in the component (or its parent) causes a re-render. 
- In `useFetch.js`, the consequences would be severe: executing a fetch updates the state (`setData`, `setLoading`), which triggers a component re-render. A re-render without a dependency array would immediately trigger the effect again, resulting in an **infinite loop** of API requests that would likely crash the browser and get you rate-limited by the APIs.

---

### 3. Why is your task form a controlled component? What's the difference between controlled and uncontrolled?

**Why `TaskForm` is controlled:**
In `src/components/TaskForm.jsx`, i defined state variables (`title` and `description`) and tightly bound them to the inputs:
```javascript
<input value={title} onChange={(e) => setTitle(e.target.value)} />
```
It is a controlled component because React handles the state directly. This allows you to:
1. Prevent submission of empty strings or just whitespace (e.g., `if (!title.trim()) return;`).
2. Easily reset the input fields after successful submission (`setTitle(''); setDescription('');`).
3. Have a "Single Source of Truth", meaning my React state always accurately reflects what is on the screen at that exact moment.

**Controlled vs. Uncontrolled:**
- **Controlled Components:** Form data is handled by the React component. The form element's `value` is explicitly set and controlled by a React state variable. Every keystroke updates the state via an `onChange` event handler. 
- **Uncontrolled Components:** Form data is handled by the DOM itself. I do not write an `onChange` handler for every state update. Instead, i use a `ref` (`useRef`) to pull the current value from the DOM element only when i need it (usually during form submission). 
