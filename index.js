import express from 'express';
import connection from './connection/connection.js';
import router from './router/router.js';
import cookieParser from 'cookie-parser';
import { SERVER_PORT } from './config/config.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router);

app.use((err, req, res, next) => {
  console.error('[index.js]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
  });
});


await connection.sync({force:false})

app.listen(SERVER_PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${SERVER_PORT}`);
});
