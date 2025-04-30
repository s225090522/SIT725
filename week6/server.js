const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Sample routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the homepage!');
});

app.get('/api/projects', (req, res) => {
  res.status(200).json([{ id: 1, name: 'Project Alpha' }]);
});

app.post('/api/submitForm', (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(500).json({ error: 'Missing fields' });
  }
  res.status(200).json({ message: 'Form submitted successfully' });
});

// Start server if not in test
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app; // Export for testing
