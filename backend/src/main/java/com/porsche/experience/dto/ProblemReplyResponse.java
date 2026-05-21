package com.porsche.experience.dto;

import com.porsche.experience.model.ProblemReply;

import java.time.LocalDateTime;

public record ProblemReplyResponse(
        Long id,
        Long problemReportId,
        String autor,
        String mensagem,
        LocalDateTime dataCriacao
) {
    public static ProblemReplyResponse from(ProblemReply reply) {
        return new ProblemReplyResponse(
                reply.getId(),
                reply.getProblemReportId(),
                reply.getAutor(),
                reply.getMensagem(),
                reply.getDataCriacao()
        );
    }
}

