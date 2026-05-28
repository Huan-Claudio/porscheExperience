package com.porsche.experience.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank @Email(message = "Email inválido. Verifique o formato informado.") String email,
        @NotBlank String senha
) {
}

