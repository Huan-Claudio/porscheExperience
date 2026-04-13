# Porsche Experience

Aplicação web demonstrativa em **React + TypeScript + Vite** que apresenta uma experiência interativa sobre os modelos da Porsche.

O projeto inclui páginas de introdução, catálogo de modelos, detalhes de veículos, formulário de cadastro e navegação entre páginas, tudo a partir de dados locais.

## Recursos

- Página inicial com hero, destaques da marca, estatísticas e galeria de imagens
- Catálogo de modelos Porsche com cards e painel lateral de navegação
- Página de detalhes do modelo com especificações, guia de proprietário e problemas conhecidos
- Sistema de favoritos para marcar/desmarcar modelos
- Formulário de cadastro com validação básica de campos
- Layout responsivo e navegação interna em SPA

## Tecnologias

- React 19
- TypeScript
- Vite
- ESLint

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço exibido no terminal (normalmente `http://localhost:5173`)

## Scripts úteis

- `npm run dev` — inicia a aplicação em modo de desenvolvimento
- `npm run build` — cria a versão de produção
- `npm run preview` — roda uma versão de preview do build
- `npm run lint` — executa o ESLint no projeto

## Estrutura principal

- `src/main.tsx` — ponto de entrada da aplicação e registro global de componentes
- `src/App.tsx` — navegação entre páginas e estado principal (modelo selecionado, favoritos)
- `src/data/porscheData.tsx` — dados dos modelos Porsche usados na interface
- `src/pages/` — páginas principais do site
- `src/components/` — componentes reutilizáveis como `Navbar`, `Footer`, `ModelCard` e `Dashboard`
- `src/styles/main.css` — estilos principais da aplicação

## Observações

- Os dados são carregados localmente a partir de `src/data/porscheData.tsx` e não há backend conectado.
- O formulário de cadastro e envio de problema são protótipos que simulam comportamento no front-end.

## Licença

Este repositório é um protótipo de experiência de usuário e pode ser usado como base para estudos e demonstrações.

