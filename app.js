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

app.get('/test-db', async (req, res) => {
    try {
        console.log('Intentando conectar a la base de datos...');
        await db.sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');
        res.send('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
        res.status(500).send('Error de conexión a la base de datos.');
    }
});

app.use('/users', async (req, res, next) => {
    try {
        await userRoutes(req, res, next);
    } catch (error) {
        console.error('Error en /users:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.use('/profile', async (req, res, next) => {
    try {
        await profileRoutes(req, res, next);
    } catch (error) {
        console.error('Error en /profile:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.use('/person', async (req, res, next) => {
    try {
        await personRoutes(req, res, next);
    } catch (error) {
        console.error('Error en /person:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.use((req, res, next)=>{
    res.status(404).send("ruta no encontrada");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
});

db.sequelize.sync().then(() => {
    if (process.env.NODE_ENV !== 'production') {
        app.listen(3000, () => {
            console.log('Servidor corriendo en http://localhost:3000');
        });
    }
});

module.exports = app; 