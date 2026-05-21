# 📚 Guia de Extensão - Porsche Experience

Este documento orienta como expandir a aplicação com novos recursos.

---

## 🎯 Adicionar Nova Tabela/Entidade

### Exemplo: Adicionar "Reviews" (Avaliações de Modelos)

#### Passo 1: Criar Entidade JPA

Criar arquivo: `backend/src/main/java/com/porsche/experience/model/Review.java`

```java
package com.porsche.experience.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "porsche_model_id", nullable = false)
    private PorscheModel porscheModel;

    @Column(nullable = false, length = 100)
    private String autor;

    @Column(nullable = false)
    private Integer estrelas; // 1-5

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @CreationTimestamp
    private LocalDateTime dataCriacao;

    private Boolean aprovado = false;
}
```

#### Passo 2: Criar Repository

Criar arquivo: `backend/src/main/java/com/porsche/experience/repository/ReviewRepository.java`

```java
package com.porsche.experience.repository;

import com.porsche.experience.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPorscheModelIdAndAprovadoTrue(Long modeloId);
    List<Review> findByAprovadoFalse(); // Para moderação
}
```

#### Passo 3: Criar Service

Criar arquivo: `backend/src/main/java/com/porsche/experience/service/ReviewService.java`

```java
package com.porsche.experience.service;

import com.porsche.experience.model.Review;
import com.porsche.experience.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<Review> obterPorModelo(Long modeloId) {
        return reviewRepository.findByPorscheModelIdAndAprovadoTrue(modeloId);
    }

    public Review criar(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> obterPendentes() {
        return reviewRepository.findByAprovadoFalse();
    }

    public void aprovar(Long id) {
        reviewRepository.findById(id).ifPresent(r -> {
            r.setAprovado(true);
            reviewRepository.save(r);
        });
    }
}
```

#### Passo 4: Criar Controller

Criar arquivo: `backend/src/main/java/com/porsche/experience/controller/ReviewController.java`

```java
package com.porsche.experience.controller;

import com.porsche.experience.model.Review;
import com.porsche.experience.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/modelo/{modeloId}")
    public ResponseEntity<List<Review>> obterPorModelo(@PathVariable Long modeloId) {
        return ResponseEntity.ok(reviewService.obterPorModelo(modeloId));
    }

    @PostMapping
    public ResponseEntity<Review> criar(@RequestBody Review review) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(reviewService.criar(review));
    }

    @PutMapping("/{id}/aprovar")
    public ResponseEntity<Void> aprovar(@PathVariable Long id) {
        reviewService.aprovar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<Review>> obterPendentes() {
        return ResponseEntity.ok(reviewService.obterPendentes());
    }
}
```

#### Passo 5: Migração de Banco de Dados

Adicionar ao `database/init.sql`:

```sql
-- Adicionar relacionamento em porsche_models (se necessário)
ALTER TABLE porsche_models ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2);

-- Nova tabela
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    porsche_model_id INTEGER NOT NULL REFERENCES porsche_models(id),
    autor VARCHAR(100) NOT NULL,
    estrelas INTEGER CHECK (estrelas >= 1 AND estrelas <= 5),
    comentario TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    aprovado BOOLEAN DEFAULT false
);
```

#### Passo 6: Atualizar Frontend

Criar arquivo: `src/services/reviewService.ts`

```typescript
import api from './api';

export interface IReview {
  id?: number;
  porscheModelId: number;
  autor: string;
  estrelas: number;
  comentario: string;
}

export const reviewService = {
  obterPorModelo: async (modeloId: number): Promise<IReview[]> => {
    const response = await api.get(`/reviews/modelo/${modeloId}`);
    return response.data;
  },

  criar: async (review: IReview): Promise<IReview> => {
    const response = await api.post('/reviews', review);
    return response.data;
  },
};
```

#### Passo 7: Recompilar

```bash
cd backend
mvn clean compile spring-boot:run
```

---

## 🔄 Adicionar Validação

### Exemplo: Validar Nome Único em PorscheModel

```java
// Adicionar ao controller
@PostMapping
public ResponseEntity<?> criar(@Valid @RequestBody PorscheModel modelo) {
    // Verificar se já existe
    if (porscheModelService.existePorNome(modelo.getNome())) {
        return ResponseEntity.badRequest()
            .body(Map.of("erro", "Modelo com este nome já existe"));
    }
    
    PorscheModel novo = porscheModelService.criar(modelo);
    return ResponseEntity.status(HttpStatus.CREATED).body(novo);
}
```

---

## 📡 Adicionar Filtros/Busca Avançada

### Exemplo: Filtrar por Faixa de Preço

Adicionar método no Repository:

```java
@Repository
public interface PorscheModelRepository extends JpaRepository<PorscheModel, Long> {
    // ... outros métodos
    
    List<PorscheModel> findByPotenciaTurboBetween(Integer min, Integer max);
}
```

Adicionar no Service:

```java
public List<PorscheModel> filtrarPorPotencia(Integer minPotencia, Integer maxPotencia) {
    return porscheModelRepository.findByPotenciaTurboBetween(minPotencia, maxPotencia);
}
```

Adicionar no Controller:

```java
@GetMapping("/filtro/potencia")
public ResponseEntity<List<PorscheModel>> filtrarPotencia(
        @RequestParam Integer min,
        @RequestParam Integer max) {
    return ResponseEntity.ok(porscheModelService.filtrarPorPotencia(min, max));
}
```

---

## 🔐 Adicionar Autenticação

### Adicionar Spring Security

Adicionar ao `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jwt</artifactId>
</dependency>
```

Criar classe SecurityConfig:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Configuração de autenticação
}
```

---

## 📊 Adicionar Paginação

### Exemplo: Listar Modelos com Paginação

Atualizar Repository:

```java
Page<PorscheModel> findByAtivoTrue(Pageable pageable);
```

Atualizar Controller:

```java
@GetMapping("/paginado")
public ResponseEntity<Page<PorscheModel>> listarPaginado(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("nome").ascending());
    return ResponseEntity.ok(porscheModelRepository.findByAtivoTrue(pageable));
}
```

---

## 🧪 Adicionar Testes Unitários

Criar: `backend/src/test/java/com/porsche/experience/service/PorscheModelServiceTest.java`

```java
@SpringBootTest
class PorscheModelServiceTest {

    @MockBean
    private PorscheModelRepository repository;

    @InjectMocks
    private PorscheModelService service;

    @Test
    void testListarTodos() {
        // Given
        List<PorscheModel> modelos = List.of(
            new PorscheModel(1L, "911", "Ícone", ...)
        );
        when(repository.findByAtivoTrue()).thenReturn(modelos);

        // When
        List<PorscheModel> resultado = service.listarTodos();

        // Then
        assertEquals(1, resultado.size());
        assertEquals("911", resultado.get(0).getNome());
    }
}
```

---

## 🌐 Deploy em Produção

### Backend no Heroku

```bash
# Adicionar Procfile
echo "web: java -Dserver.port=\$PORT \$JAVA_OPTS -jar target/porsche-*.jar" > Procfile

# Deploy
git push heroku main
```

### Frontend na Vercel

```bash
npm run build
vercel --prod
```

---

## 📝 Checklist de Extensão

- [ ] Criar Entidade JPA
- [ ] Criar Repository
- [ ] Criar Service
- [ ] Criar Controller
- [ ] Adicionar Endpoints REST
- [ ] Criar Script SQL
- [ ] Criar Service TypeScript (frontend)
- [ ] Atualizar Componentes React
- [ ] Testar com cURL
- [ ] Testar com Frontend
- [ ] Fazer Commit

---

## 🔗 Referências Úteis

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [REST API Best Practices](https://restfulapi.net/)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/)

---

Sucesso ao expandir a aplicação! 🚀
