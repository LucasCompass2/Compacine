const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = 'mongodb://localhost:27017/compacine-db'

app.use(cors());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movie', movieRoutes);
app.use('/sessions', sessionRoutes);
app.use('/tickets', ticketRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});