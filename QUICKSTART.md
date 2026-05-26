# 🚀 Início Rápido - Porsche Experience

Siga esses passos para rodar a aplicação em 5 minutos.

## ⚡ Quickstart (Passo a Passo)

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/porscheExperience.git
cd porscheExperience
```

### Passo 2: Setup do Banco de Dados

#### Opção A: PostgreSQL Local
```bash
# 1. Iniciar PostgreSQL
# Windows: net start postgresql-x64-15
# Mac: brew services start postgresql@15
# Linux: sudo systemctl start postgresql

# 2. Criar banco
psql -U postgres -c "CREATE DATABASE porsche_db ENCODING 'UTF8';"

# 3. Executar script SQL
psql -U postgres -d porsche_db -f database/init.sql

# Verificar: psql -U postgres -d porsche_db -c "SELECT COUNT(*) FROM porsche_models;"
```

#### Opção B: Docker
```bash
# 1. Instalar Docker e Docker Compose
# 2. Rodar:
docker-compose up -d postgres

# Aguardar alguns segundos...

# 3. Executar script:
docker exec -i porsche_db psql -U postgres -d porsche_db < database/init.sql
```

### Passo 3: Rodar o Backend (Java)

```bash
cd backend

# Verificar Java
java -version  # Deve ser Java 17+

# Rodar
mvn clean spring-boot:run

# Esperado:
# Started PorscheExperienceApplication in 5 seconds
# http://localhost:8081
```

**Testar:** http://localhost:8081/api/modelos (deve retornar JSON)

### Passo 4: Rodar o Frontend (React)

Em outro terminal:

```bash
# Voltar para raiz
cd ..

# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Esperado:
# ➜ Local: http://localhost:5173/
```

**Abrir no navegador:** http://localhost:5173

---

## ✅ Verificação Final

- [ ] PostgreSQL rodando na porta 5432
- [ ] Backend rodando em http://localhost:8081/api
- [ ] Frontend rodando em http://localhost:5173
- [ ] Dados aparecem na página
- [ ] Pode cadastrar novo modelo
- [ ] Pode editar modelo
- [ ] Pode deletar modelo
- [ ] Favoritos funcionam

---

## 🐛 Se não funcionar...

### Backend não inicia
```bash
# Verificar se PostgreSQL está rodando
# Verificar application.properties (senha, porta)
# Limpar: mvn clean
```

### Frontend não carrega dados
```bash
# Abrir DevTools (F12)
# Ver console para erros
# Verificar se backend está rodando
# Verificar .env file
```

### Erro de conexão ao BD
```bash
# Verificar PostgreSQL: psql -U postgres
# Verificar banco: \l
# Recriar: psql -U postgres -f database/init.sql
```

---


## 🎯 Endpoints para Testar

```bash
# Listar
curl http://localhost:8081/api/modelos

# Criar
curl -X POST http://localhost:8081/api/modelos \
  -H "Content-Type: application/json" \
  -d '{
    "nome":"Test Model",
    "tagline":"Test",
    "potenciaBase":300,
    "potenciaTurbo":500,
    "velocidadeMaxima":280.0,
    "aceleracaoZeroCem":4.0,
    "anoLancamento":2024
  }'

# Atualizar
curl -X PUT http://localhost:8081/api/modelos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Updated Name"}'

# Deletar
curl -X DELETE http://localhost:8081/api/modelos/1
```

---

Pronto! 🎉 Aplicação rodando com sucesso!
