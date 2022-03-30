const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());

app.use('/api/genres', genres);

// Get the environment PORT or use port 3000
const port = process.env.PORT || 3000;
// Start the express server and listen on the port
app.listen(port, () => console.log(`Server listening on port ${ port }...`));