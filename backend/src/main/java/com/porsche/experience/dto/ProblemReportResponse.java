package com.porsche.experience.dto;

import com.porsche.experience.model.ProblemReport;

import java.time.LocalDateTime;
import java.util.List;

public record ProblemReportResponse(
        Long id,
        Long porscheModelId,
        Long cadastroId,
        Integer anoVeiculo,
        String km,
        String categoria,
        String titulo,
        String descricao,
        String solucao,
        String email,
        String severidade,
        LocalDateTime dataCriacao,
        List<ProblemReplyResponse> respostas
) {
    public static ProblemReportResponse from(ProblemReport report, List<ProblemReplyResponse> respostas) {
        return new ProblemReportResponse(
                report.getId(),
                report.getPorscheModelId(),
                report.getCadastroId(),
                report.getAnoVeiculo(),
                report.getKm(),
                report.getCategoria(),
                report.getTitulo(),
                report.getDescricao(),
                report.getSolucao(),
                report.getEmail(),
                report.getSeveridade(),
                report.getDataCriacao(),
                respostas
        );
    }
}
