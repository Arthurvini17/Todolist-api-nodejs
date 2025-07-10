const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
//importando as rotas
const userRoutes = require('./routes/userRoutes');
//usando as rotas
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
