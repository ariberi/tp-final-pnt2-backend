import express from 'express';
import router from './router/router.js';
import connection from './connection/connection.js';
import { SERVER_PORT } from './config/config.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', router);
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    success: false,
    error: message
  });
});
await connection.sync({force:false})

app.listen(SERVER_PORT, () => {
  console.log(`🚀 ~ app.listen ~ ${SERVER_PORT}`);
});
