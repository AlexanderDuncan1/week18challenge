require('dotenv').config();
console.log(process.env.DATABASE_URL);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  app.use('/api/users', require('./routes/user'));
  app.use('/api/thoughts', require('./routes/thought'));
  app.use('/api/friends', require('./routes/friend'));
  app.use('/api/reactions', require('./routes/reaction'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
