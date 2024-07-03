// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/compacine-db'
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
  process.exit(1); // Encerrar o processo Node.js em caso de erro
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movie', movieRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});