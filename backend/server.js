const express = require('express');
const cors = require('cors');
// Importa a conexão do banco de dados para garantir que ele seja inicializado/semeado no boot
const db = require('./database');
const { calcularMelhorMatch } = require('./fuzzyEngine');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Status
app.get('/api/status', (req, res) => {
  res.json({ status: "BoraOnde API rodando perfeitamente" });
});

// Rota de Cálculo do Melhor Match
app.post('/api/calcular', (req, res) => {
  try {
    const { fome, orcamento, disposicao } = req.body;

    // Validação básica de entrada
    if (fome === undefined || orcamento === undefined || disposicao === undefined) {
      return res.status(400).json({ error: "Parâmetros fome, orcamento e disposicao são obrigatórios." });
    }

    db.all('SELECT * FROM restaurantes', [], (err, rows) => {
      if (err) {
        console.error('Erro ao consultar banco de dados:', err.message);
        return res.status(500).json({ error: "Erro interno ao consultar banco de dados." });
      }

      const estadoUsuario = {
        fome: Number(fome),
        orcamento: Number(orcamento),
        disposicao: Number(disposicao)
      };

      const resultado = calcularMelhorMatch(estadoUsuario, rows);
      
      // Converte isOpen de 1/0 para boolean para compatibilidade com o React frontend
      const resultadoFormatado = resultado ? {
        ...resultado,
        isOpen: resultado.isOpen === 1 || resultado.isOpen === true
      } : null;

      res.json(resultadoFormatado);
    });
  } catch (error) {
    console.error('Erro na rota /api/calcular:', error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// Inicia o Servidor
app.listen(PORT, () => {
  console.log(`BoraOnde API rodando na porta ${PORT}`);
});
