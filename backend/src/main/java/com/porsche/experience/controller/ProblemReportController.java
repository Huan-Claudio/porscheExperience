package com.porsche.experience.controller;

import com.porsche.experience.dto.ProblemReplyRequest;
import com.porsche.experience.dto.ProblemReplyResponse;
import com.porsche.experience.dto.ProblemReportRequest;
import com.porsche.experience.dto.ProblemReportResponse;
import com.porsche.experience.service.ProblemReportService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ProblemReportController {

    private final ProblemReportService problemReportService;

    @GetMapping("/modelos/{modeloId}/relatos")
    public ResponseEntity<List<ProblemReportResponse>> listarPorModelo(@PathVariable Long modeloId) {
        return ResponseEntity.ok(problemReportService.listarPorModelo(modeloId));
    }

    @PostMapping("/modelos/{modeloId}/relatos")
    public ResponseEntity<ProblemReportResponse> criar(
            @PathVariable Long modeloId,
            @Valid @RequestBody ProblemReportRequest request
    ) {
        ProblemReportRequest requestComModelo = new ProblemReportRequest(
                modeloId,
                request.cadastroId(),
                request.anoVeiculo(),
                request.km(),
                request.categoria(),
                request.titulo(),
                request.descricao(),
                request.solucao(),
                request.email(),
                request.severidade()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(problemReportService.criar(requestComModelo));
    }

    @PostMapping("/relatos/{reportId}/respostas")
    public ResponseEntity<ProblemReplyResponse> responder(
            @PathVariable Long reportId,
            @Valid @RequestBody ProblemReplyRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(problemReportService.responder(reportId, request));
    }

    @DeleteMapping("/relatos/{reportId}")
    public ResponseEntity<Void> excluir(@PathVariable Long reportId) {
        problemReportService.excluir(reportId);
        return ResponseEntity.noContent().build();
    }
}
