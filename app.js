const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

app.use(cors());

app.use(express.json());

const profileRoutes = require('./routers/profileRoutes');
const userRoutes = require('./routers/userRoutes');
const personRoutes = require('./routers/personRoutes');

app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/person', personRoutes);

app.get('/', (req, res) => {
    res.send('TNB Home!');
});


db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
});

