const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'boraonde.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite BoraOnde.');
    inicializarBanco();
  }
});

function inicializarBanco() {
  db.serialize(() => {
    // 1. Criar a tabela restaurantes caso não exista
    db.run(`
      CREATE TABLE IF NOT EXISTS restaurantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        categoria TEXT,
        pesoFome INTEGER,
        custoBase INTEGER,
        exigenciaDisposicao INTEGER,
        isOpen BOOLEAN,
        mapsUrl TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela restaurantes:', err.message);
        return;
      }
      
      // 2. Verificar se a tabela está vazia
      db.get('SELECT COUNT(*) as count FROM restaurantes', (err, row) => {
        if (err) {
          console.error('Erro ao verificar se a tabela está vazia:', err.message);
          return;
        }

        if (row.count === 0) {
          console.log('Tabela restaurantes está vazia. Inserindo dados iniciais...');
          const insertStmt = db.prepare(`
            INSERT INTO restaurantes (nome, categoria, pesoFome, custoBase, exigenciaDisposicao, isOpen, mapsUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `);

          const restaurantesMock = [
            {
              nome: "Podrão da Beira Rio",
              categoria: "Lanche Raiz",
              pesoFome: 95,
              custoBase: 15,
              exigenciaDisposicao: 10,
              isOpen: 1, // true representado como 1 no SQLite
              mapsUrl: "https://maps.google.com/?q=Podrao+Beira+Rio"
            },
            {
              nome: "Le Bistrô Gourmet",
              categoria: "Premium",
              pesoFome: 65,
              custoBase: 90,
              exigenciaDisposicao: 85,
              isOpen: 1,
              mapsUrl: "https://maps.google.com/?q=Le+Bistro+Gourmet"
            },
            {
              nome: "Pizzaria Napoli Tradicional",
              categoria: "Tradicional",
              pesoFome: 85,
              custoBase: 50,
              exigenciaDisposicao: 35,
              isOpen: 1,
              mapsUrl: "https://maps.google.com/?q=Pizzaria+Napoli"
            },
            {
              nome: "Burger Craft Artesanal",
              categoria: "Premium",
              pesoFome: 90,
              custoBase: 60,
              exigenciaDisposicao: 20,
              isOpen: 0, // false representado como 0 no SQLite
              mapsUrl: "https://maps.google.com/?q=Burger+Craft"
            },
            {
              nome: "Sushi Express",
              categoria: "Delivery Rápido",
              pesoFome: 55,
              custoBase: 70,
              exigenciaDisposicao: 5,
              isOpen: 1,
              mapsUrl: "https://maps.google.com/?q=Sushi+Express"
            },
            {
              nome: "Pastelaria da Feira",
              categoria: "Lanche Raiz",
              pesoFome: 45,
              custoBase: 10,
              exigenciaDisposicao: 40,
              isOpen: 0,
              mapsUrl: "https://maps.google.com/?q=Pastelaria+da+Feira"
            },
            {
              nome: "Churrascaria Pampa",
              categoria: "Premium",
              pesoFome: 100,
              custoBase: 85,
              exigenciaDisposicao: 75,
              isOpen: 1,
              mapsUrl: "https://maps.google.com/?q=Churrascaria+Pampa"
            },
            {
              nome: "Salada & Cia Light",
              categoria: "Saudável",
              pesoFome: 30,
              custoBase: 45,
              exigenciaDisposicao: 15,
              isOpen: 1,
              mapsUrl: "https://maps.google.com/?q=Salada+Cia"
            }
          ];

          restaurantesMock.forEach((r) => {
            insertStmt.run(r.nome, r.categoria, r.pesoFome, r.custoBase, r.exigenciaDisposicao, r.isOpen, r.mapsUrl);
          });

          insertStmt.finalize((err) => {
            if (err) {
              console.error('Erro ao finalizar inserções:', err.message);
            } else {
              console.log('Semeadura da tabela restaurantes realizada com sucesso.');
            }
          });
        } else {
          console.log(`Tabela restaurantes já contém ${row.count} registros.`);
        }
      });
    });
  });
}

module.exports = db;
