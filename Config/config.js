export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const DB = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME
};
export const JWT_SECRET = process.env.JWT_SECRET;