require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const logger = require('./logger');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((req, res) => {
    logger.error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
