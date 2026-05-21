package com.porsche.experience.controller;

import com.porsche.experience.dto.CadastroRequest;
import com.porsche.experience.dto.CadastroResponse;
import com.porsche.experience.dto.FavoriteRequest;
import com.porsche.experience.dto.LoginRequest;
import com.porsche.experience.dto.ProblemReportResponse;
import com.porsche.experience.service.CadastroService;
import com.porsche.experience.service.FavoriteModelService;
import com.porsche.experience.service.ProblemReportService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cadastros")
@AllArgsConstructor
public class CadastroController {

    private final CadastroService cadastroService;
    private final FavoriteModelService favoriteModelService;
    private final ProblemReportService problemReportService;

    @PostMapping
    public ResponseEntity<CadastroResponse> criar(@Valid @RequestBody CadastroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cadastroService.criar(request));
    }

    @GetMapping
    public ResponseEntity<List<CadastroResponse>> listar() {
        return ResponseEntity.ok(cadastroService.listar());
    }

    @PostMapping("/login")
    public ResponseEntity<CadastroResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(cadastroService.login(request));
    }

    @GetMapping("/{cadastroId}/favoritos")
    public ResponseEntity<List<Long>> listarFavoritos(@PathVariable Long cadastroId) {
        return ResponseEntity.ok(favoriteModelService.listar(cadastroId));
    }

    @PostMapping("/{cadastroId}/favoritos")
    public ResponseEntity<List<Long>> favoritar(
            @PathVariable Long cadastroId,
            @Valid @RequestBody FavoriteRequest request
    ) {
        return ResponseEntity.ok(favoriteModelService.favoritar(cadastroId, request.porscheModelId()));
    }

    @DeleteMapping("/{cadastroId}/favoritos/{modeloId}")
    public ResponseEntity<List<Long>> removerFavorito(@PathVariable Long cadastroId, @PathVariable Long modeloId) {
        return ResponseEntity.ok(favoriteModelService.remover(cadastroId, modeloId));
    }

    @GetMapping("/{cadastroId}/relatos")
    public ResponseEntity<List<ProblemReportResponse>> listarRelatos(@PathVariable Long cadastroId) {
        return ResponseEntity.ok(problemReportService.listarPorCadastro(cadastroId));
    }
}
