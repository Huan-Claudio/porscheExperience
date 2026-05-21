package com.porsche.experience.dto;

import jakarta.validation.constraints.NotBlank;

public record ProblemReplyRequest(
        @NotBlank String autor,
        @NotBlank String mensagem
) {
}

