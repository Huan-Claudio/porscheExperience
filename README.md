# Porsche Experience

## Informacoes do Projeto

**Tema:** catalogo interativo de modelos Porsche, relatos de problemas e comunidade de usuarios.  
**Disciplina:** Desenvolvimento de Software Web.  
**Integrantes:** Huan Claudio Souza Viana e Gabriel de Oliveira Nascimento.  
**Data:** 05/2026.

## Descricao

O Porsche Experience e uma aplicacao web completa com front-end em React + TypeScript e back-end Java integrado ao PostgreSQL. O sistema lista modelos Porsche vindos do banco, permite CRUD de modelos, cadastro/login de usuarios, favoritos persistidos por conta, relatos de problemas por modelo e respostas da comunidade.

## Tecnologias Utilizadas

- React, Vite, TypeScript, Bootstrap e Axios.
- Java 17, Spring Boot, Spring MVC, Spring Data JPA e Hibernate.
- PostgreSQL.
- Maven, npm e Git/GitHub.

> Observacao para avaliacao: o back-end esta organizado em Java com controller, service, repository e model, usando Hibernate/JPA. O Spring MVC roda sobre servlet container embutido. Caso a avaliacao exija JSP/Servlet manual literalmente, alinhar essa decisao com o professor.

## Funcionalidades

- Listagem de modelos carregados do banco.
- Cadastro, edicao, exclusao e detalhe de modelos.
- Dashboard com contadores de modelos, favoritos e categorias.
- Cadastro e login de usuarios.
- Favoritos salvos por usuario.
- Relatos de problemas por modelo.
- Respostas aos relatos.
- Area "Minha Conta" com favoritos e relatos do usuario logado.
- Layout responsivo com Bootstrap.
- CORS configurado para integrar React e Java.

## Arquitetura

O front-end chama a API com Axios a partir da pasta `src/services`. O back-end recebe as requisicoes nos controllers, aplica regras nos services, acessa o banco pelos repositories JPA e retorna JSON para o React.

Fluxo resumido:

1. React chama `http://localhost:8081/api/modelos`.
2. Controller Java recebe a requisicao.
3. Service executa a regra de negocio.
4. Repository acessa o PostgreSQL via Hibernate/JPA.
5. A API devolve JSON.
6. O React atualiza a interface.

## Estrutura

```text
porscheExperience/
  backend/
    src/main/java/com/porsche/experience/
      config/
      controller/
      dto/
      model/
      repository/
      service/
    src/main/resources/
      application.properties
      data.sql
    pom.xml
  database/
    init.sql
  public/
  src/
    components/
    pages/
    services/
    styles/
    types/
  package.json
  README.md
```

## Banco de Dados

Banco recomendado: PostgreSQL.

Criar o banco:

```sql
CREATE DATABASE porsche_db ENCODING 'UTF8';
```

Executar o script:

```cmd
"C:\Program Files\PostgreSQL\18\bin\psql" -U postgres -d porsche_db -f database/init.sql
```

Tabelas principais:

- `porsche_models`: modelos Porsche.
- `cadastros`: usuarios cadastrados.
- `problem_reports`: relatos/perguntas de problemas.
- `problem_replies`: respostas aos relatos.
- `favorite_models`: favoritos por usuario.

O script `database/init.sql` contem chaves primarias, chaves estrangeiras, indices e dados iniciais.

## Configuracao do Back-end

O arquivo `backend/src/main/resources/application.properties` usa variaveis de ambiente para nao versionar senha real:

```properties
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:}
```

No PowerShell, antes de rodar:

```powershell
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="sua_senha_do_postgres"
```

Rodar back-end:

```cmd
cd backend
mvn clean spring-boot:run
```

API:

```text
http://localhost:8081/api
```

## Configuracao do Front-end

Arquivo `.env.example`:

```env
VITE_API_URL=http://localhost:8081/api
```

Rodar front-end:

```cmd
npm install
npm run dev
```

Aplicacao:

```text
http://localhost:5173
```

## Endpoints Principais

Modelos:

- `GET /api/modelos`
- `GET /api/modelos/{id}`
- `POST /api/modelos`
- `PUT /api/modelos/{id}`
- `DELETE /api/modelos/{id}`

Usuarios:

- `POST /api/cadastros`
- `POST /api/cadastros/login`
- `GET /api/cadastros/{id}/favoritos`
- `POST /api/cadastros/{id}/favoritos`
- `DELETE /api/cadastros/{id}/favoritos/{modeloId}`
- `GET /api/cadastros/{id}/relatos`

Relatos:

- `GET /api/modelos/{modeloId}/relatos`
- `POST /api/modelos/{modeloId}/relatos`
- `POST /api/relatos/{relatoId}/respostas`

## CRUD Obrigatorio

CRUD principal: `porsche_models`.

- Cadastrar: botao "Novo Modelo" na tela Modelos.
- Listar: tela Modelos.
- Carregar para edicao: botao "Editar" em cada card.
- Atualizar: formulario de edicao na tela Modelos.
- Excluir: botao "Excluir" em cada card.
- Atualizacao da interface: o estado do React e atualizado apos cada operacao.

## CORS

O CORS e necessario porque o front-end roda em `http://localhost:5173` e o back-end em `http://localhost:8081`, ou seja, origens diferentes. Browsers bloqueiam esse tipo de chamada se a API nao permitir explicitamente.

Configuracao em `backend/src/main/java/com/porsche/experience/config/CorsConfig.java`:

```java
registry.addMapping("/**")
    .allowedOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:4173")
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
    .allowedHeaders("*")
    .allowCredentials(true);
```

## Testes Rapidos

Listar modelos:

```cmd
curl http://localhost:8081/api/modelos
```

Verificar banco:

```cmd
"C:\Program Files\PostgreSQL\18\bin\psql" -U postgres -d porsche_db -c "SELECT id, nome, ativo FROM porsche_models ORDER BY id;"
```

Ver relatos:

```cmd
"C:\Program Files\PostgreSQL\18\bin\psql" -U postgres -d porsche_db -c "SELECT id, porsche_model_id, cadastro_id, titulo FROM problem_reports ORDER BY id DESC;"
```

## Prints da Aplicacao

Adicionar no README antes da entrega:

- Home.
- Listagem de modelos.
- Cadastro/Login.
- Minha Conta.
- Detalhe do modelo com relatos.
- CRUD de modelos.

## Video Explicativo

Link do video: **adicionar aqui antes da entrega**.

Sugestao de roteiro:

1. Tema da aplicacao.
2. Front-end React adaptado para consumir API.
3. Organizacao do back-end Java.
4. Criacao do banco PostgreSQL.
5. CRUD de modelos.
6. Login, favoritos, relatos e respostas.
7. Comunicacao React + Java via Axios.
8. Explicacao do CORS.

## Observacoes de Entrega

Nao versionar:

- `node_modules/`
- `dist/`
- `.env` com senha real
- `backend/target/`
- logs e arquivos temporarios

Versionar:

- codigo front-end
- codigo back-end
- `database/init.sql`
- `README.md`
- `.gitignore`

