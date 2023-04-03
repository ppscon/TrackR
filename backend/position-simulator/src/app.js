const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Position Simulator running on port ${port}`);
});
