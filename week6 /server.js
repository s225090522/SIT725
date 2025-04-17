
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const projectRoutes = require('./routes/projectRoutes');  
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', projectRoutes);  

const mongoURI = 'mongodb://127.0.0.1:27017/fruitDB';  
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

  console.log(`App listening on port: ${port}`);
  if (require.main === module) {
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  }
  
  module.exports = app;
