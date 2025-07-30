const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for feedback (for demo purposes)
let feedbacks = [];

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/feedback', (req, res) => {
    res.json(feedbacks);
});

app.post('/api/feedback', (req, res) => {
    const { name, email, feedback } = req.body;
    
    if (!name || !email || !feedback) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newFeedback = {
        id: Date.now(),
        name,
        email,
        feedback,
        date: new Date().toISOString()
    };
    
    feedbacks.unshift(newFeedback); // Add to beginning of array
    
    res.status(201).json(newFeedback);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});