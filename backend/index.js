const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>HELLO!</h1>')
})

app.get('/api/fetchAIOutput', (req, res) => {

})

const PORT = 3005;
app.listen(PORT);