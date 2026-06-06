import { useState, useEffect } from 'react'
import { Compass, Eye, Heart, Star, Clock, MapPin } from 'lucide-react'

const URL_BASE = 'https://boraonde.onrender.com'

function App() {
  const [fome, setFome] = useState(50)
  const [orcamento, setOrcamento] = useState(50)
  const [disposicao, setDisposicao] = useState(50)
  const [isLoading, setIsLoading] = useState(false)
  const [resultadoFinal, setResultadoFinal] = useState(null)
  const [currentView, setCurrentView] = useState('home')
  const [hasCalculated, setHasCalculated] = useState(false)

  const getFomeLabel = (val) => {
    if (val < 33) return "Pouca"
    if (val < 66) return "Média"
    return "Muita"
  }

  const getOrcamentoLabel = (val) => {
    if (val < 33) return "Curto"
    if (val < 66) return "Justo"
    return "Farto"
  }

  const getDisposicaoLabel = (val) => {
    if (val < 33) return "Perto"
    if (val < 66) return "Médio"
    return "Delivery"
  }

  const handleCalcular = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${URL_BASE}/api/calcular`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fome, orcamento, disposicao })
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`)
      }

      const match = await response.json()
      if (match) {
        // Normalização robusta para tratar campos nulo/indefinido, minúsculos (PostgreSQL/Neon) ou camelCase (SQLite)
        const normalized = {
          id: match.id !== undefined && match.id !== null ? match.id : 0,
          nome: match.nome || match.Nome || 'Restaurante Sem Nome',
          categoria: match.categoria || match.Categoria || 'Geral',
          pesoFome: match.pesoFome !== undefined && match.pesoFome !== null ? Number(match.pesoFome) : (match.pesofome !== undefined && match.pesofome !== null ? Number(match.pesofome) : 50),
          custoBase: match.custoBase !== undefined && match.custoBase !== null ? Number(match.custoBase) : (match.custobase !== undefined && match.custobase !== null ? Number(match.custobase) : 50),
          exigenciaDisposicao: match.exigenciaDisposicao !== undefined && match.exigenciaDisposicao !== null ? Number(match.exigenciaDisposicao) : (match.exigenciadisposicao !== undefined && match.exigenciadisposicao !== null ? Number(match.exigenciadisposicao) : 50),
          isOpen: match.isOpen === true || match.isOpen === 1 || match.isopen === true || match.isopen === 1 || false,
          mapsUrl: match.mapsUrl || match.mapsurl || match.maps_url || 'https://maps.google.com',
          matchPercentage: match.matchPercentage !== undefined && match.matchPercentage !== null ? Number(match.matchPercentage) : (match.matchpercentage !== undefined && match.matchpercentage !== null ? Number(match.matchpercentage) : 0),
          distancia_metros: match.distancia_metros !== undefined && match.distancia_metros !== null ? Number(match.distancia_metros) : (match.distanciametros !== undefined && match.distanciametros !== null ? Number(match.distanciametros) : null),
          nota_comida: match.nota_comida !== undefined && match.nota_comida !== null ? Number(match.nota_comida) : (match.notacomida !== undefined && match.notacomida !== null ? Number(match.notacomida) : null),
          nota_ambiente: match.nota_ambiente !== undefined && match.nota_ambiente !== null ? Number(match.nota_ambiente) : (match.notaambiente !== undefined && match.notaambiente !== null ? Number(match.notaambiente) : null)
        }
        setResultadoFinal(normalized)
      } else {
        setResultadoFinal(null)
      }
      setHasCalculated(true)
    } catch (error) {
      console.error('Erro ao calcular a combinação ideal:', error)
      setResultadoFinal(null)
      setHasCalculated(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">


      <nav className="docked full-width top-0 sticky z-50 border-b border-outline-variant/30 shadow-sm bg-surface/60 backdrop-blur-md hidden md:flex justify-between items-center w-full px-margin-desktop max-w-7xl mx-auto h-20">
        <button onClick={() => setCurrentView('home')} className="flex items-center gap-xs text-left cursor-pointer hover:opacity-90 bg-transparent border-none">
          <img alt="BoraOnde Logo" className="h-10 w-10 rounded-full object-cover" src="/logo.svg" />
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-primary tracking-tighter leading-none">BoraOnde?</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">A Inteligência Artificial que decide seu rolê.</span>
          </div>
        </button>
        <div className="flex items-center gap-md">
          <div className="flex gap-md items-center">
            <button
              onClick={() => setCurrentView('explorar')}
              className={`font-medium hover:text-primary transition-all duration-200 cursor-pointer bg-transparent border-none pb-1 ${currentView === 'explorar' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'
                }`}
            >
              <span className="font-title-md text-title-md">Explorar</span>
            </button>
            <button
              onClick={() => setCurrentView('favoritos')}
              className={`font-medium hover:text-primary transition-all duration-200 cursor-pointer bg-transparent border-none pb-1 ${currentView === 'favoritos' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'
                }`}
            >
              <span className="font-title-md text-title-md">Favoritos</span>
            </button>
            <button
              onClick={() => setCurrentView('historico')}
              className={`font-medium hover:text-primary transition-all duration-200 cursor-pointer bg-transparent border-none pb-1 ${currentView === 'historico' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'
                }`}
            >
              <span className="font-title-md text-title-md">Histórico</span>
            </button>
          </div>
          <div className="flex items-center gap-sm ml-md">
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center overflow-hidden ml-xs">
              <span className="material-symbols-outlined text-on-surface-variant" data-icon="person">person</span>
            </div>
          </div>
        </div>
      </nav>

      <nav className="md:hidden sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex justify-between items-center px-margin-mobile">
        <button onClick={() => setCurrentView('home')} className="flex items-center gap-xs text-left cursor-pointer bg-transparent border-none">
          <img alt="BoraOnde Logo" className="h-8 w-8 rounded-full object-cover" src="/logo.svg" />
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">BoraOnde</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="person">person</span>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-6 p-4 md:p-8">
        {currentView === 'home' ? (
          <>
            <section className="w-full md:w-5/12 flex flex-col gap-md">
              <div className="bg-surface-container-high rounded-2xl p-md border border-outline-variant/50 shadow-lg glow-indigo relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-container to-primary-container"></div>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-background mb-lg">Qual o seu estado atual?</h2>
                <div className="flex flex-col gap-lg">

                  <div className="flex flex-col gap-xs">
                    <div className="flex justify-between items-end mb-xs">
                      <label className="font-title-md text-title-md text-on-surface">Nível de Fome</label>
                      <span className="font-label-caps text-label-caps text-primary px-2 py-1 bg-primary-container/10 rounded-full border border-primary/20">{getFomeLabel(fome)}</span>
                    </div>
                    <input className="w-full cursor-pointer" max="100" min="0" type="range" value={fome} onChange={(e) => setFome(Number(e.target.value))} />
                    <div className="flex justify-between mt-xs font-body-sm text-body-sm text-on-surface-variant">
                      <span>Só beliscar</span>
                      <span>Broca violenta!</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <div className="flex justify-between items-end mb-xs">
                      <label className="font-title-md text-title-md text-on-surface">Orçamento</label>
                      <span className="font-label-caps text-label-caps text-primary px-2 py-1 bg-primary-container/10 rounded-full border border-primary/20">{getOrcamentoLabel(orcamento)}</span>
                    </div>
                    <input className="w-full cursor-pointer" max="100" min="0" type="range" value={orcamento} onChange={(e) => setOrcamento(Number(e.target.value))} />
                    <div className="flex justify-between mt-xs font-body-sm text-body-sm text-on-surface-variant">
                      <span>Fim de mês</span>
                      <span>Ostentação</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <div className="flex justify-between items-end mb-xs">
                      <label className="font-title-md text-title-md text-on-surface">Disposição / Preguiça</label>
                      <span className="font-label-caps text-label-caps text-primary px-2 py-1 bg-primary-container/10 rounded-full border border-primary/20">{getDisposicaoLabel(disposicao)}</span>
                    </div>
                    <input className="w-full cursor-pointer" max="100" min="0" type="range" value={disposicao} onChange={(e) => setDisposicao(Number(e.target.value))} />
                    <div className="flex justify-between mt-xs font-body-sm text-body-sm text-on-surface-variant">
                      <span>Só na esquina</span>
                      <span>Do outro lado / Delivery</span>
                    </div>
                  </div>
                </div>
                <button onClick={handleCalcular} className="mt-xl w-full bg-secondary-container hover:bg-secondary-container/90 text-on-background font-title-md text-title-md py-sm rounded-xl transition-all duration-300 pulse-emerald flex items-center justify-center gap-xs border border-primary/30 relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-container/0 via-primary-container/20 to-primary-container/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                  Calcular Combinação Perfeita
                </button>
              </div>
            </section>

            <section className="w-full md:w-7/12 flex flex-col gap-md">
              {isLoading ? (
                <div className="bg-surface-container-high rounded-2xl p-md border border-outline-variant/50 shadow-lg glow-indigo relative overflow-hidden flex flex-col h-full min-h-[400px] animate-pulse">
                  <div className="flex justify-between items-start mb-md">
                    <div className="flex-1 pr-4">
                      <div className="h-6 w-32 bg-surface-container-highest rounded-full mb-sm"></div>
                      <div className="h-10 w-48 bg-surface-container-highest rounded mb-sm"></div>
                      <div className="h-4 w-36 bg-surface-container-highest rounded mt-2"></div>
                    </div>
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-surface-container-highest rounded-full flex-shrink-0"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-xs mb-lg">
                    <div className="bg-surface-container-low h-20 rounded-xl border border-outline-variant/30"></div>
                    <div className="bg-surface-container-low h-20 rounded-xl border border-outline-variant/30"></div>
                    <div className="bg-surface-container-low h-20 rounded-xl border border-outline-variant/30"></div>
                    <div className="bg-surface-container-low h-20 rounded-xl border border-outline-variant/30"></div>
                  </div>
                  <div className="mt-auto flex gap-sm">
                    <div className="h-12 flex-1 bg-surface-container-highest rounded-xl"></div>
                    <div className="h-12 flex-1 bg-surface-container-highest rounded-xl"></div>
                  </div>
                </div>
              ) : resultadoFinal ? (
                <div className="bg-surface-container rounded-2xl p-md md:p-lg border border-outline-variant shadow-xl glow-emerald relative overflow-hidden flex flex-col h-full">
                  <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary-container/10 rounded-full blur-[60px] pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-md z-10">
                    <div>
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-highest border border-outline-variant rounded-full mb-sm">
                        <span className="material-symbols-outlined text-primary text-sm" data-icon="restaurant">restaurant</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">{resultadoFinal.categoria}</span>
                      </div>
                      <h3 className="font-display-lg text-display-lg text-on-background leading-tight">{resultadoFinal.nome}</h3>
                      <div className="flex items-center gap-xs mt-2">
                        <span className={`w-2 h-2 rounded-full ${resultadoFinal.isOpen ? 'bg-primary pulse-emerald' : 'bg-error'}`}></span>
                        <span className={`font-body-sm text-body-sm ${resultadoFinal.isOpen ? 'text-primary' : 'text-error'}`}>
                          {resultadoFinal.isOpen ? 'Aberto Agora' : 'Fechado'}
                        </span>
                        <span className="text-on-surface-variant mx-1">•</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {resultadoFinal.distancia_metros !== null && resultadoFinal.distancia_metros !== undefined
                            ? `${resultadoFinal.distancia_metros}m de você`
                            : (resultadoFinal.exigenciaDisposicao < 33 ? 'Perto de você' : resultadoFinal.exigenciaDisposicao < 66 ? 'Distância Média' : 'Longe / Exige Deslocamento')}
                        </span>
                      </div>
                    </div>

                    <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0">
                      <svg className="circular-chart text-primary drop-shadow-md" viewBox="0 0 36 36">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <path className="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" strokeDasharray={`${resultadoFinal.matchPercentage}, 100`}></path>
                        <text className="percentage" x="18" y="20.35">{resultadoFinal.matchPercentage}%</text>
                      </svg>
                      <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-full text-center">
                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[8px] bg-surface-container px-2">Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-xs mb-lg z-10">
                    <div className="bg-surface-container-low p-sm rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-tertiary mb-1" data-icon="payments">payments</span>
                      <span className="font-body-sm text-body-sm text-on-surface">{resultadoFinal.custoBase < 33 ? '$' : resultadoFinal.custoBase < 66 ? '$$' : '$$$'}</span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Preço</span>
                    </div>
                    <div className="bg-surface-container-low p-sm rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-tertiary mb-1" data-icon="directions_walk">directions_walk</span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        {resultadoFinal.distancia_metros !== null && resultadoFinal.distancia_metros !== undefined
                          ? `${Math.round(resultadoFinal.distancia_metros / 80)} min`
                          : (resultadoFinal.exigenciaDisposicao < 33 ? '10 min' : resultadoFinal.exigenciaDisposicao < 66 ? '25 min' : '50 min')}
                      </span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Tempo</span>
                    </div>
                    <div className="bg-surface-container-low p-sm rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-tertiary mb-1" data-icon="star">star</span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        {resultadoFinal.nota_comida !== null && resultadoFinal.nota_comida !== undefined
                          ? ((Number(resultadoFinal.nota_comida) + Number(resultadoFinal.nota_ambiente || resultadoFinal.nota_comida)) / 2).toFixed(1)
                          : (4.2 + (resultadoFinal.id % 8) * 0.1).toFixed(1)}
                      </span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Avaliação</span>
                    </div>
                    <div className="bg-surface-container-low p-sm rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-tertiary mb-1" data-icon="two_wheeler">two_wheeler</span>
                      <span className="font-body-sm text-body-sm text-on-surface">{resultadoFinal.exigenciaDisposicao > 50 || resultadoFinal.id % 2 === 0 ? 'Sim' : 'Não'}</span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Delivery</span>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col md:flex-row gap-sm z-10">
                    <button onClick={() => window.open(resultadoFinal.mapsUrl, '_blank')} className="flex-1 bg-surface-container-highest border border-outline-variant hover:border-primary/50 text-primary font-title-md text-title-md py-sm rounded-xl transition-colors duration-200 flex items-center justify-center gap-xs cursor-pointer">
                      <span className="material-symbols-outlined" data-icon="map">map</span>
                      Abrir no Google Maps
                    </button>
                    <button className="flex-1 bg-surface-container-highest border border-outline-variant hover:border-tertiary/50 text-on-surface font-title-md text-title-md py-sm rounded-xl transition-colors duration-200 flex items-center justify-center gap-xs cursor-pointer">
                      <span className="material-symbols-outlined" data-icon="share">share</span>
                      Compartilhar Resultado
                    </button>
                  </div>
                </div>
              ) : hasCalculated ? (
                <div className="mt-md bg-surface-container-low border border-outline-variant/30 border-dashed rounded-2xl p-lg flex flex-col items-center justify-center text-center opacity-80 w-full min-h-[300px]">
                  <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-sm">
                    <span className="material-symbols-outlined text-error text-3xl" data-icon="search_off">search_off</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-[384px]">Nenhum rolê encontrado para essa combinação. Que tal ajustar os filtros?</p>
                </div>
              ) : (
                <div className="mt-md bg-surface-container-low border border-outline-variant/30 border-dashed rounded-2xl p-lg flex flex-col items-center justify-center text-center opacity-60 w-full">
                  <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-sm">
                    <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="psychology">psychology</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-[384px]">Ajuste os controles ao lado e deixe o BoraOnde decidir seu destino.</p>
                </div>
              )}
            </section>
          </>
        ) : currentView === 'explorar' ? (
          <div className="w-full">
            <ExplorarView />
          </div>
        ) : currentView === 'favoritos' ? (
          <div className="w-full">
            <FavoritosView />
          </div>
        ) : (
          <div className="w-full">
            <HistoricoView />
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 lg:hidden rounded-t-xl border-t border-outline-variant/30 shadow-lg shadow-primary/10 bg-surface/80 backdrop-blur-xl flex justify-around items-center h-16 px-4 pb-safe">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors cursor-pointer bg-transparent border-none ${currentView === 'home' ? 'text-primary' : 'text-on-surface-variant'
            }`}
        >
          <span className="material-symbols-outlined" data-icon="home">home</span>
          <span className="font-label-caps text-label-caps-mobile mt-1">Home</span>
        </button>
        <button
          onClick={() => setCurrentView('explorar')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors cursor-pointer bg-transparent border-none ${currentView === 'explorar' ? 'text-primary' : 'text-on-surface-variant'
            }`}
        >
          <span className="material-symbols-outlined" data-icon="explore">explore</span>
          <span className="font-label-caps text-label-caps-mobile mt-1">Explorar</span>
        </button>
        <button
          onClick={() => setCurrentView('favoritos')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors cursor-pointer bg-transparent border-none ${currentView === 'favoritos' ? 'text-primary' : 'text-on-surface-variant'
            }`}
        >
          <span className="material-symbols-outlined" data-icon="favorite">favorite</span>
          <span className="font-label-caps text-label-caps-mobile mt-1">Favoritos</span>
        </button>
        <button
          onClick={() => setCurrentView('historico')}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full active:scale-110 duration-150 transition-all cursor-pointer ${currentView === 'historico' ? 'text-primary bg-primary-container/20 border border-primary/20' : 'text-on-surface-variant bg-surface-container-highest/30 border-none'
            }`}
        >
          <span className="material-symbols-outlined" data-icon="history">history</span>
          <span className="font-label-caps text-label-caps-mobile mt-1">Histórico</span>
        </button>
      </nav>

    </div>
  )
}

function ExplorarView() {
  const [restaurantes, setRestaurantes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch(`${URL_BASE}/api/restaurantes`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar restaurantes')
        return res.json()
      })
      .then((data) => {
        if (active) {
          setRestaurantes(data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar restaurantes da API:', err)
        if (active) {
          // Fallback para mockups caso a API esteja inacessível
          setRestaurantes([
            { id: 1, nome: "Burger Monster", categoria: "Hamburgueria", custoBase: 50, mapsUrl: "https://maps.google.com/?q=Burger+Monster" },
            { id: 2, nome: "Bella Italia", categoria: "Pizzaria", custoBase: 70, mapsUrl: "https://maps.google.com/?q=Bella+Italia" },
            { id: 3, nome: "Cantinho da Panelada", categoria: "Lanche Raiz", custoBase: 15, mapsUrl: "https://maps.google.com/?q=Cantinho+da+Panelada" }
          ])
          setIsLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-md">
        <div className="text-primary font-title-md animate-pulse">Carregando locais recomendados...</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h2 className="font-headline-lg text-headline-lg text-on-background mb-lg">Descubra Novos Locais</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantes.map((card) => (
          <div key={card.id} className="bg-surface-container/60 backdrop-blur-md rounded-2xl border border-outline-variant shadow-xl glow-indigo flex flex-col overflow-hidden">
            {/* Top image placeholder */}
            <div className="bg-slate-800 h-32 rounded-t-lg relative flex items-center justify-center">
              <Compass className="text-on-surface-variant opacity-25 w-12 h-12 animate-pulse" />
            </div>

            <div className="p-md flex flex-col flex-grow justify-between gap-md">
              <div>
                <span className="font-label-caps text-label-caps text-primary uppercase">{card.categoria}</span>
                <h3 className="font-title-md text-title-md text-on-background mt-xs">{card.nome}</h3>
                <div className="flex items-center gap-xs mt-xs text-on-surface-variant text-body-sm font-body-sm">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>{(4.2 + (card.id % 8) * 0.1).toFixed(1)}</span>
                  <span className="mx-xs">•</span>
                  <span>{card.custoBase !== undefined ? (card.custoBase < 33 ? '$' : card.custoBase < 66 ? '$$' : '$$$') : '$$'}</span>
                </div>
              </div>

              <button onClick={() => card.mapsUrl && window.open(card.mapsUrl, '_blank')} className="w-full bg-surface-container-highest border border-outline-variant hover:border-primary/50 text-primary font-title-md text-title-md py-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-xs cursor-pointer">
                <Eye className="w-4 h-4" />
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function FavoritosView() {
  const favoritosMock = [
    { id: 1, nome: "Podrão da Beira Rio", categoria: "Lanche Raiz", nota: 5 },
    { id: 2, nome: "Le Bistrô Gourmet", categoria: "Premium", nota: 4 },
    { id: 3, nome: "Sushi Express", categoria: "Delivery Rápido", nota: 5 }
  ];

  return (
    <div className="w-full">
      <h2 className="font-headline-lg text-headline-lg text-on-background mb-lg">Seus Locais Salvos</h2>
      <div className="flex flex-col gap-4 max-w-2xl">
        {favoritosMock.map((item) => (
          <div key={item.id} className="bg-surface-container/60 backdrop-blur-md rounded-2xl border border-outline-variant shadow-lg p-md flex items-center justify-between gap-md">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">{item.categoria}</span>
              <h3 className="font-title-md text-title-md text-on-background mt-0.5">{item.nome}</h3>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < item.nota ? 'fill-primary text-primary' : 'text-slate-600'}`} />
                ))}
              </div>
            </div>

            <button className="h-10 w-10 bg-primary-container/10 border border-primary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-container/20 transition-colors">
              <Heart className="w-5 h-5 fill-primary text-primary" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function HistoricoView() {
  const historyMock = [
    { id: 1, time: "Ontem, 20:30", local: "Panelada do João", match: 95 },
    { id: 2, time: "Sexta, 13:15", local: "Podrão da Beira Rio", match: 88 },
    { id: 3, time: "Quinta, 21:45", local: "Pizza Napoli Tradicional", match: 79 }
  ];

  return (
    <div className="w-full max-w-2xl">
      <h2 className="font-headline-lg text-headline-lg text-on-background mb-lg">Suas Últimas Brocadas</h2>
      <div className="relative border-l border-outline-variant/40 ml-4 flex flex-col gap-8 py-4">
        {historyMock.map((item) => (
          <div key={item.id} className="relative pl-8">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-lg"></div>

            {/* Card wrapper */}
            <div className="bg-surface-container/60 backdrop-blur-md rounded-2xl p-md border border-outline-variant shadow-md flex items-center justify-between gap-md">
              <div className="flex items-start gap-md">
                <div className="mt-1 p-sm bg-surface-container-highest rounded-xl text-on-surface-variant">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">{item.time}</span>
                  <h3 className="font-title-md text-title-md text-on-background mt-0.5">{item.local}</h3>
                </div>
              </div>

              <div className="flex flex-col items-end flex-shrink-0">
                <span className="font-headline-lg text-headline-lg text-primary">{item.match}%</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[8px] uppercase tracking-widest">Match</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
