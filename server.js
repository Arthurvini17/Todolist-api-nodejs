const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//importando as rotas
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/TaskRoutes');
//usando as rotas
app.use('/users', userRoutes);
// app.use('/tasks', TaskRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
