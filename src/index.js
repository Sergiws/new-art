import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import './model/loadModels.js';
import publicRouter from './router/public.js';

const app = express();
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

// View engine
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

// Routes
app.use('/', publicRouter);

// Server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});