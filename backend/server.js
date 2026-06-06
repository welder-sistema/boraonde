const express = require('express');
const cors = require('cors');
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

// Rota de Listagem de Restaurantes
app.get('/api/restaurantes', (req, res) => {
  db.query('SELECT * FROM restaurantes', (err, result) => {
    if (err) {
      console.error('Erro ao consultar banco de dados:', err.message);
      return res.status(500).json({ error: "Erro interno ao consultar banco de dados." });
    }
    res.json(result.rows);
  });
});

// Rota de Cálculo do Melhor Match
app.post('/api/calcular', (req, res) => {
  try {
    const { fome, orcamento, disposicao } = req.body;

    // Validação básica de entrada
    if (fome === undefined || orcamento === undefined || disposicao === undefined) {
      return res.status(400).json({ error: "Parâmetros fome, orcamento e disposicao são obrigatórios." });
    }

    // Mapeia entrada do frontend para colunas do PostgreSQL
    const precoNivel = orcamento < 33 ? 1 : (orcamento < 66 ? 2 : 3);
    const maxDistancia = disposicao < 33 ? 1000 : (disposicao < 66 ? 1800 : 2500);

    const queryText = 'SELECT * FROM restaurantes WHERE isopen = true AND preco_nivel <= $1 AND distancia_metros <= $2';
    const queryParams = [precoNivel, maxDistancia];

    db.query(queryText, queryParams, (err, result) => {
      if (err) {
        console.error('Erro ao consultar banco de dados:', err.message);
        return res.status(500).json({ error: "Erro interno ao consultar banco de dados." });
      }

      const rows = result.rows;

      // Se nenhum restaurante atender aos critérios de filtro básicos
      if (!rows || rows.length === 0) {
        return res.json(null);
      }

      // Mapeia as colunas do PostgreSQL para as propriedades esperadas pelo fuzzyEngine
      const listaMapeada = rows.map(r => ({
        id: r.id,
        nome: r.nome,
        categoria: r.categoria,
        pesoFome: r.categoria === 'Hamburgueria' || r.categoria === 'Pizzaria' || r.categoria === 'Churrascaria' || r.categoria === 'Lanche Raiz' ? 90 : (r.categoria === 'Saudável' ? 30 : 60),
        custoBase: r.preco_nivel === 1 ? 20 : (r.preco_nivel === 2 ? 50 : 85),
        exigenciaDisposicao: Math.round(((r.distancia_metros - 400) / 2100) * 100),
        isOpen: r.isopen,
        mapsUrl: r.mapsurl || `https://maps.google.com/?q=${encodeURIComponent(r.nome)}`,
        distancia_metros: r.distancia_metros,
        nota_comida: r.nota_comida,
        nota_ambiente: r.nota_ambiente
      }));

      const estadoUsuario = {
        fome: Number(fome),
        orcamento: Number(orcamento),
        disposicao: Number(disposicao)
      };

      const resultado = calcularMelhorMatch(estadoUsuario, listaMapeada);

      if (resultado) {
        // Encontra o item original correspondente para manter exatamente a chave 'id' e os dados em minúsculo do banco
        const original = rows.find(r => r.id === resultado.id);
        const resultadoFinal = {
          ...original,
          matchPercentage: resultado.matchPercentage
        };
        res.json(resultadoFinal);
      } else {
        res.json(null);
      }
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
