# Porsche Experience - Aplicação Web

## 📋 Informações do Projeto

**Tema:** Catálogo de Modelos Porsche  
**Disciplina:** Desenvolvimento de Software Web  
**Integrantes:** Huan Cláudio Souza Viana e Gabriel de Oliveira Nascimento   

---

## 📝 Descrição da Aplicação

O **Porsche Experience** é uma aplicação web completa que apresenta um catálogo interativo de modelos Porsche com integração total entre front-end React e back-end Java.

### ✨ Funcionalidades

- ✅ Listagem dinâmica de modelos (dados do banco)
- ✅ Visualização de detalhes do modelo
- ✅ Sistema de favoritos
- ✅ Cadastro de novos modelos
- ✅ Edição de modelos existentes
- ✅ Exclusão de modelos
- ✅ Dashboard com estatísticas
- ✅ Layout 100% responsivo
- ✅ Integração real com API REST Java

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19.2.4
- TypeScript 5.9
- Vite 8.0
- Bootstrap 5.3
- Axios 1.6
- ESLint

### Backend
- Java 17
- Spring Boot 3.2
- Spring Data JPA / Hibernate
- PostgreSQL 15
- Maven

### DevOps
- PostgreSQL (banco relacional)
- Git / GitHub

---

## 🚀 Como Instalar e Rodar

### Pré-requisitos
- Node.js (v18+) e npm
- Java 17 JDK
- Maven 3.8+
- PostgreSQL 15+
- Git

### 1. Configurar Banco de Dados

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE porsche_db ENCODING 'UTF8';
\q

# Executar script SQL
psql -U postgres -d porsche_db -f database/init.sql
```

### 2. Rodar Backend (Java)

```bash
cd backend

# Configurar application.properties
# Editar: src/main/resources/application.properties
# spring.datasource.password=sua_senha_postgres

# Compilar e rodar
mvn clean spring-boot:run
```

Acesse: http://localhost:8080/api/modelos

### 3. Rodar Frontend (React)

```bash
# Voltar para raiz
cd ..

# Instalar dependências
npm install

# Configurar .env (opcional)
cp .env.example .env

# Rodar dev server
npm run dev
```

Acesse: http://localhost:5173

---

## 📂 Estrutura do Projeto

```
porscheExperience/
├── backend/                    # Backend Java
│   ├── src/main/java/com/porsche/experience/
│   │   ├── PorscheExperienceApplication.java
│   │   ├── model/PorscheModel.java
│   │   ├── repository/PorscheModelRepository.java
│   │   ├── service/PorscheModelService.java
│   │   ├── controller/PorscheModelController.java
│   │   └── config/CorsConfig.java
│   ├── src/main/resources/application.properties
│   ├── pom.xml
│   └── .gitignore
│
├── src/                       # Frontend React
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   ├── api.ts
│   │   └── porscheModelService.ts
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── database/
│   └── init.sql              # Script SQL
│
├── public/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔌 Integração Frontend + Backend

### Fluxo de Comunicação

1. **Frontend** faz requisição: `GET /api/modelos`
2. **Backend** processa no Controller → Service → Repository
3. **Banco de Dados** retorna dados
4. **Backend** serializa em JSON
5. **Frontend** atualiza UI com dados reais

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/modelos` | Lista todos |
| GET | `/api/modelos/{id}` | Detalhe |
| POST | `/api/modelos` | Criar |
| PUT | `/api/modelos/{id}` | Atualizar |
| DELETE | `/api/modelos/{id}` | Deletar |

---

## 🔐 CORS - Explicação

### Por que é necessário?

- Frontend: `http://localhost:5173` (Vite)
- Backend: `http://localhost:8080` (Java)
- **Origem diferente** → Browser bloqueia por padrão

### Como foi configurado?

Arquivo: `backend/src/main/java/com/porsche/experience/config/CorsConfig.java`

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### Resultado:
✅ Frontend consegue acessar a API  
✅ Headers CORS permitem comunicação  
✅ React ↔ Java funcionam juntos  

---

## 🛢️ Banco de Dados

### Tabela Principal: `porsche_models`

```sql
CREATE TABLE porsche_models (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    tagline VARCHAR(100),
    descricao TEXT,
    potencia_base INTEGER,
    potencia_turbo INTEGER,
    velocidade_maxima DECIMAL(5,2),
    aceleracao_zero_cem DECIMAL(5,2),
    cambio VARCHAR(50),
    ano_lancamento INTEGER,
    imagem VARCHAR(255),
    badge VARCHAR(100),
    badge_class VARCHAR(50),
    especificacoes TEXT,
    problemas TEXT,
    faq TEXT,
    data_criacao TIMESTAMP,
    data_atualizacao TIMESTAMP,
    ativo BOOLEAN DEFAULT true
);
```

### Dados Iniciais

6 modelos Porsche inseridos automaticamente:
- Porsche 911 (1964)
- Porsche Taycan (2019)
- Porsche Boxster (2016)
- Porsche Panamera (2009)
- Porsche Cayenne (2002)
- Porsche Macan (2014)

---

## 📊 Operações CRUD

### ✅ Create
- **Tela:** Página de Registro (/register)
- **Ação:** Preencher formulário e enviar
- **Endpoint:** `POST /api/modelos`

### ✅ Read
- **Tela:** Página de Modelos (/models)
- **Ação:** Listar modelos na grid
- **Endpoint:** `GET /api/modelos`

### ✅ Update
- **Tela:** Página de Detalhes (botão editar)
- **Ação:** Modificar informações
- **Endpoint:** `PUT /api/modelos/{id}`

### ✅ Delete
- **Tela:** Página de Modelos (botão deletar)
- **Ação:** Remover modelo
- **Endpoint:** `DELETE /api/modelos/{id}`

---

## 📸 Screenshots

[Adicione capturas de tela aqui]

- Homepage
- Listagem de Modelos
- Detalhes do Modelo
- Formulário de Cadastro
- Dashboard

---

## 🎬 Vídeo Explicativo

**Link:** [Adicione link do vídeo]

**Conteúdo:**
- Demonstração da aplicação
- Explicação do CORS
- Fluxo de dados frontend-backend
- Operações CRUD funcionando
- Arquitetura geral

---

## 🧪 Testes

### Backend com cURL

```bash
# Listar modelos
curl http://localhost:8080/api/modelos

# Obter modelo
curl http://localhost:8080/api/modelos/1

# Criar modelo
curl -X POST http://localhost:8080/api/modelos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Test","tagline":"Test","potenciaBase":300,"potenciaTurbo":500}'
```

### Frontend com DevTools

```javascript
// Console do navegador (F12)
fetch('http://localhost:8080/api/modelos')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 🐛 Troubleshooting

| Erro | Solução |
|------|---------|
| "Cannot GET /api/modelos" | Rodar backend: `mvn spring-boot:run` |
| CORS Error | Verificar se origin está em CorsConfig |
| "Connection refused:5432" | Iniciar PostgreSQL |
| "porsche_db não existe" | Executar: `psql -U postgres -d postgres -f database/init.sql` |

---

## 📦 Build Produção

### Backend
```bash
cd backend
mvn clean package
java -jar target/porsche-experience-api-1.0.0.jar
```

### Frontend
```bash
npm run build
# Arquivos em: dist/
```

---

## 📚 Referências

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [CORS MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## 📄 Licença

Projeto educacional.

---

**Status:** ✅ Pronto para execução e entrega

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

