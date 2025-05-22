const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const { getProjects, addSampleProjects } = require('./controller/projectController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/SportsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// API routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the homepage!');
});

app.get('/api/projects', getProjects);

app.post('/api/submitForm', (req, res) => {
  const { first_name, last_name, password, fruit } = req.body;
  
  // Check if all required fields are provided
  if (!first_name || !last_name || !password || !fruit) {
    return res.status(400).json({ error: 'Missing fields' });  // Changed to 400 for bad request
  }

  // Log the form data received
  console.log('Form data received:', { first_name, last_name, password, fruit });
  
  // Respond with a success message
  res.status(200).json({ message: 'Form submitted successfully' });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('addProject', async (projectData) => {
    try {
      const Project = require('./model/project');
      const newProject = new Project(projectData);
      await newProject.save();
      console.log('Project added via socket:', projectData.title);

      // Emit updated list of projects to all connected clients
      const projects = await Project.find();
      io.emit('projectsUpdated', projects);
    } catch (error) {
      console.error('Error adding project via socket:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;  // Export for testing
