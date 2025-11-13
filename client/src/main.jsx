import React from 'react'
import ReactDOM from 'react-dom/client'

// Your main App component
function App() {
  // Fetch data from your backend
  fetch('/api/test')
    .then(res => res.json())
    .then(data => console.log(data.message)) // "Hello from the backend!"
    .catch(err => console.error(err));

  return (
    <div>
      <h1>Hello from React!</h1>
      <p>Check the console for the server message.</p>
    </div>
  )
}

// Render the App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)