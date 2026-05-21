package com.porsche.experience.controller;

import com.porsche.experience.model.PorscheModel;
import com.porsche.experience.service.PorscheModelService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/modelos")
@AllArgsConstructor
public class PorscheModelController {

    private final PorscheModelService porscheModelService;

    /**
     * GET /api/modelos
     * Lista todos os modelos Porsche ativos
     */
    @GetMapping
    public ResponseEntity<List<PorscheModel>> listarTodos() {
        List<PorscheModel> modelos = porscheModelService.listarTodos();
        return ResponseEntity.ok(modelos);
    }

    /**
     * GET /api/modelos/{id}
     * Obtém um modelo específico pelo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<PorscheModel> obterPorId(@PathVariable Long id) {
        return porscheModelService.obterPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * POST /api/modelos
     * Cria um novo modelo Porsche
     */
    @PostMapping
    public ResponseEntity<PorscheModel> criar(@Valid @RequestBody PorscheModel porscheModel) {
        try {
            PorscheModel novo = porscheModelService.criar(porscheModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(novo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * PUT /api/modelos/{id}
     * Atualiza um modelo existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<PorscheModel> atualizar(@PathVariable Long id, @Valid @RequestBody PorscheModel porscheModel) {
        try {
            PorscheModel atualizado = porscheModelService.atualizar(id, porscheModel);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * DELETE /api/modelos/{id}
     * Deleta (desativa) um modelo - soft delete
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            porscheModelService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DELETE /api/modelos/{id}/permanente
     * Deleta permanentemente um modelo - hard delete
     */
    @DeleteMapping("/{id}/permanente")
    public ResponseEntity<Void> deletarPermanentemente(@PathVariable Long id) {
        try {
            porscheModelService.deletarPermanentemente(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * GET /api/modelos/buscar?nome=termo
     * Busca modelos por nome
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<PorscheModel>> buscarPorNome(@RequestParam String nome) {
        List<PorscheModel> modelos = porscheModelService.buscarPorNome(nome);
        return ResponseEntity.ok(modelos);
    }
}
