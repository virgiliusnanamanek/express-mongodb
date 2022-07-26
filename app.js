const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models/');
db.mongoose.connect(db.url)
.then(() => {
  console.log('Connected to database');
})
.catch(err => {
  console.log('Error connecting to database', err);
  process.exit();
})

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  })
})

require('./app/routes/post.routes')(app);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});