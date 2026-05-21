package com.porsche.experience.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProblemReportRequest(
        @NotNull Long porscheModelId,
        Long cadastroId,
        Integer anoVeiculo,
        String km,
        @NotBlank String categoria,
        @NotBlank String titulo,
        @NotBlank String descricao,
        String solucao,
        String email,
        String severidade
) {
}
