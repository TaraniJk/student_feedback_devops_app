const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const feedbackList = [];

app.get('/', (req, res) => {
  res.send(`
    <h1>Student Feedback DevOps App</h1>
    <p>This application demonstrates a Jenkins DevOps pipeline with build, test, code quality, security, deploy, release, and monitoring stages.</p>

    <form method="POST" action="/feedback">
      <label>Name:</label><br>
      <input name="name" required><br><br>

      <label>Feedback:</label><br>
      <textarea name="message" required></textarea><br><br>

      <button type="submit">Submit Feedback</button>
    </form>

    <br>
    <a href="/feedback">View Feedback</a>
    <br>
    <a href="/health">Health Check</a>
  `);
});

app.post('/feedback', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  const feedback = {
    id: feedbackList.length + 1,
    name,
    message,
    createdAt: new Date().toISOString()
  };

  feedbackList.push(feedback);

  return res.status(201).json({
    message: 'Feedback submitted successfully.',
    feedback
  });
});

app.get('/feedback', (req, res) => {
  res.status(200).json(feedbackList);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Student Feedback DevOps App',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;