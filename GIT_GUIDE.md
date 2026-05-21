# 🔗 Git & GitHub - Instruções de Entrega

## 📤 Preparar para Entrega

### Passo 1: Inicializar Git (Se ainda não feito)

```bash
cd porscheExperience

# Inicializar repositório
git init

# Adicionar remote (trocar por seu repositório)
git remote add origin https://github.com/seu-usuario/porscheExperience.git

# Branch principal
git branch -M main
```

### Passo 2: Fazer Commit Inicial

```bash
# Verificar o que vai ser commitado
git status

# Adicionar tudo (respeitando .gitignore)
git add .

# Commitar
git commit -m "feat: Implementação full-stack Porsche Experience

- Frontend React com TypeScript e Vite
- Backend Java com Spring Boot
- Banco PostgreSQL com CRUD completo
- Integração via API REST
- CORS configurado
- Documentação completa"
```

### Passo 3: Push para GitHub

```bash
# Push da branch main
git push -u origin main

# Verificar status
git log --oneline
git remote -v
```

---

## 📝 Histórico de Commits Recomendado

### Commit 1: Estrutura Base
```bash
git commit -m "chore: setup inicial do projeto

- Criar estrutura de pastas
- Configurar package.json
- Configurar TypeScript
- Configurar ESLint"
```

### Commit 2: Backend Maven
```bash
git commit -m "feat: criar projeto Maven do backend

- pom.xml com dependências Spring Boot
- Estrutura de pacotes Java
- Configuração do application.properties
- CORS Configuration"
```

### Commit 3: Entidades e BD
```bash
git commit -m "feat: implementar entidades e banco de dados

- Criar entidade PorscheModel com JPA
- Criar Repository com queries customizadas
- Script SQL init.sql com 6 modelos
- Índices para performance"
```

### Commit 4: API REST
```bash
git commit -m "feat: implementar API REST CRUD

- Controller com 7 endpoints
- Service com lógica de negócio
- Validação de dados
- Tratamento de erros"
```

### Commit 5: Frontend Integration
```bash
git commit -m "feat: integrar frontend com API

- Criar porscheModelService.ts
- Atualizar App.tsx com requisições
- Configurar Axios
- Adicionar bootstrap e axios ao package.json"
```

### Commit 6: Documentação
```bash
git commit -m "docs: adicionar documentação completa

- README.md com guia completo
- QUICKSTART.md com setup rápido
- EXTENDING.md com guia de extensão
- PROJECT_SUMMARY.md com resumo"
```

### Commit 7: Setup Scripts
```bash
git commit -m "chore: adicionar scripts de automação

- setup-db.bat para Windows
- setup-db.sh para Linux/Mac
- docker-compose.yml para Docker
- .env.example com configurações"
```

---

## ✅ Checklist Pré-Entrega

- [ ] Git inicializado e conectado ao GitHub
- [ ] Todos os arquivos commitados
- [ ] node_modules no .gitignore ✓
- [ ] Senhas reais não no .env ✓
- [ ] Build artifacts no .gitignore ✓
- [ ] README.md presente e completo ✓
- [ ] .gitignore bem configurado ✓
- [ ] Histórico de commits significativos
- [ ] Repositório públicoe acessível
- [ ] Link README.md apontando para YouTube (vídeo)

---

## 📋 GitHub Issues (Opcional)

Se quiser usar Issues para tracking:

### Issue 1: Frontend Integration
```
Title: Integrar frontend com API REST
Description: 
- Criar serviço de API
- Atualizar componentes para usar dados reais
- Testar comunicação com backend
Status: Closed ✓
```

### Issue 2: Backend CRUD
```
Title: Implementar operações CRUD
Description:
- Create: POST /api/modelos
- Read: GET /api/modelos
- Update: PUT /api/modelos/{id}
- Delete: DELETE /api/modelos/{id}
Status: Closed ✓
```

### Issue 3: Database Setup
```
Title: Configurar banco PostgreSQL
Description:
- Criar script SQL
- Popular com dados iniciais
- Criar índices para performance
Status: Closed ✓
```

---

## 🎬 GitHub Project Board (Opcional)

Organizar com Kanban:

```
To Do:
  - [ ] Documentação
  - [ ] Vídeo explicativo

In Progress:
  (nada - tudo pronto!)

Done:
  - [x] Backend Java
  - [x] Frontend React
  - [x] Banco de Dados
  - [x] Integração
  - [x] CORS
  - [x] Documentação
```

---

## 🏷️ Tags/Releases (Opcional)

```bash
# Criar tag de versão
git tag -a v1.0.0 -m "Release 1.0.0 - Full-stack implementation"

# Push tags
git push origin v1.0.0

# No GitHub: Ir em Releases → Create Release
```

---

## 🔒 Proteção da Branch

No GitHub (Settings → Branches):

1. Adicionar rule para branch `main`
2. Require status checks to pass
3. Require pull request reviews
4. Include administrators

---

## 🤝 Contribuidores

Adicionar ao README:

```markdown
## 👥 Integrantes

- [Nome Completo](https://github.com/usuario1) - Frontend/Backend
- [Nome Completo](https://github.com/usuario2) - Frontend/Database

## 📝 Licença

Este projeto é fornecido para fins educacionais.
```

---

## 📊 GitHub Statistics

Ver em: `https://github.com/seu-usuario/porscheExperience`

- Commits: Múltiplos com mensagens significativas
- Branches: Main (+ optional: develop, release/1.0.0)
- Releases: v1.0.0
- Topics: #react #java #postgresql #fullstack

---

## 🚀 Deploy Link

Adicionar ao README:

```markdown
## 🌐 Demo Online

**Frontend:** [https://porsche-experience.vercel.app](https://porsche-experience.vercel.app)  
**Backend API:** [https://porsche-api.herokuapp.com](https://porsche-api.herokuapp.com/api/modelos)  
**GitHub:** [https://github.com/seu-usuario/porscheExperience](https://github.com/seu-usuario/porscheExperience)  
**Vídeo:** [https://www.youtube.com/watch?v=...](https://www.youtube.com/watch?v=...)
```

---

## ⚠️ Importante: Antes de Fazer Push

```bash
# Verificar se tudo está OK
npm run lint        # Sem erros
npm run build       # Sem erros

# Backend
cd backend
mvn clean compile   # Sem erros

# Revisar últimos commits
git log --oneline -5

# Fazer push com confiança
git push origin main
```

---

## 📲 Final Checklist

- [ ] Repositório no GitHub (público)
- [ ] Link README acessível
- [ ] Código bem formatado (sem erros de lint)
- [ ] Build sem erros
- [ ] Histórico de commits significativos
- [ ] Todos os arquivos necessários inclusos
- [ ] README com instruções claras
- [ ] .gitignore bem configurado
- [ ] Sem senhas no código
- [ ] Vídeo explicativo linkado

---

**Pronto para entrega! 🎉**

Link do Repositório: `https://github.com/seu-usuario/porscheExperience`
