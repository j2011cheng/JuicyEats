require('dotenv').config();
const app = require('./app.js');
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
  console.log('API Testing UI: http://localhost:3500/v0/api-docs/');
});
