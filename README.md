# FuzzyFood - Motor de Decisão com IA (React Edition)

Este projeto foi migrado de um dashboard estático HTML para uma aplicação web moderna baseada em **React** e **Vite**.

## Tecnologias e Configurações
- **Framework**: React 19 + Vite 6
- **Estilização**: Tailwind CSS v4 (instalado nativamente através do `@tailwindcss/vite`)
- **Design System**: Paleta *Luminous Gastronomy* configurada no `@theme` do Tailwind v4 (`src/index.css`)
- **Estabilidade**: Sem dependências globais ou de CDNs no runtime para estilização.

## Estrutura do Projeto
- **[src/App.jsx](file:///c:/Users/grupomateus/Desktop/FuzzyFood%20AI%20Decision%20Engine/src/App.jsx)**: Componente principal em React que gerencia reativamente o estado dos sliders (`fome`, `orcamento`, `disposicao`) e aciona a rotina de logs ao clicar no botão de cálculo.
- **[src/index.css](file:///c:/Users/grupomateus/Desktop/FuzzyFood%20AI%20Decision%20Engine/src/index.css)**: Diretivas do Tailwind CSS v4, customizações da paleta e estilizações específicas de range inputs.
- **[design_system.md](file:///c:/Users/grupomateus/Desktop/FuzzyFood%20AI%20Decision%20Engine/design_system.md)**: Especificações de design, cores e tipografia.
- **[logo.svg](file:///c:/Users/grupomateus/Desktop/FuzzyFood%20AI%20Decision%20Engine/logo.svg)**: Logotipo em SVG.

## Como Executar Localmente
Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

Para gerar a build de produção:
```bash
npm run build
```
