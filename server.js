const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Student Feedback DevOps App running on port ${PORT}`);
});