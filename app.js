const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

const profileRoutes = require('./routers/profileRoutes');
const userRoutes = require('./routers/userRoutes');
const personRoutes = require('./routers/personRoutes');

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

