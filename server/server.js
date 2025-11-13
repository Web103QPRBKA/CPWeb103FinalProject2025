const express = require('express');
const app = express();

// Choose a port *different* from your Vite app (which usually runs on 5173)
const PORT = 3001; 

// A simple test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});