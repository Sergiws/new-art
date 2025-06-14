import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import './model/loadModels.js';
import publicRouter from './router/public.js';
import adminRouter from './router/admin.js';
import session from 'express-session';

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.authenticate()
  .then(() => { console.log('Conectado a la base de datos') })
  .catch((err) => { console.log(err) });

// Static routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.resolve('node_modules/bootstrap/dist')));
app.use('/bootstrap-icons', express.static(path.resolve('node_modules/bootstrap-icons/font')));

// View engine
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

// Routes
app.use('/', publicRouter);
app.use('/admin', adminRouter);

// Server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});