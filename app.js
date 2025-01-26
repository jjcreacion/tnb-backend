const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const personRoutes = require('./routes/personRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/person', personRoutes);

app.get('/', (req, res) => {
    res.send('!Hola, Mundo!');
});

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
});

