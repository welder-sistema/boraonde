/**
 * Calcula o melhor match de restaurante baseado no estado atual do usuário.
 * 
 * @param {Object} estadoUsuario - Objeto contendo { fome, orcamento, disposicao }
 * @param {Array} listaRestaurantes - Array de objetos de restaurantes vindo do banco de dados (SQLite ou PostgreSQL)
 * @returns {Object} O restaurante com maior porcentagem de match, incluindo a propriedade `matchPercentage`
 */
function calcularMelhorMatch(estadoUsuario, listaRestaurantes) {
  if (!listaRestaurantes || listaRestaurantes.length === 0) {
    return null;
  }

  const { fome, orcamento, disposicao } = estadoUsuario;
  let melhorRestaurante = null;
  let maiorMatch = -1;

  for (const restaurante of listaRestaurantes) {
    // Normalização das chaves para garantir compatibilidade com SQLite (camelCase) e PostgreSQL (lowercase)
    const pesoFome = restaurante.pesoFome !== undefined && restaurante.pesoFome !== null ? restaurante.pesoFome : restaurante.pesofome;
    const custoBase = restaurante.custoBase !== undefined && restaurante.custoBase !== null ? restaurante.custoBase : restaurante.custobase;
    const exigenciaDisposicao = restaurante.exigenciaDisposicao !== undefined && restaurante.exigenciaDisposicao !== null ? restaurante.exigenciaDisposicao : restaurante.exigenciadisposicao;

    // Calcula a diferença absoluta para cada atributo
    const diffFome = Math.abs(fome - pesoFome);
    const diffCusto = Math.abs(orcamento - custoBase);
    const diffDisposicao = Math.abs(disposicao - exigenciaDisposicao);

    // Soma das diferenças (máximo possível é 300)
    const somaDiferencas = diffFome + diffCusto + diffDisposicao;

    // Converte a diferença combinada para uma porcentagem de match de 0 a 100
    // Menor diferença = Maior match percentage
    const matchPercentage = Math.round(100 * (1 - (somaDiferencas / 300)));

    // Se este restaurante for melhor que o anterior
    if (matchPercentage > maiorMatch) {
      maiorMatch = matchPercentage;
      melhorRestaurante = {
        ...restaurante,
        matchPercentage: matchPercentage
      };
    }
  }

  return melhorRestaurante;
}

module.exports = {
  calcularMelhorMatch
};
