const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Testa a conexão ao inicializar
db.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.message);
  } else {
    console.log('Conectado ao banco de dados PostgreSQL.');
    release();
  }
});

module.exports = db;
