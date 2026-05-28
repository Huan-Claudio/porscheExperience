package com.porsche.experience.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CadastroRequest(
        @NotBlank String nome,
        String sobrenome,
        @NotBlank @Email(message = "Email inválido. Verifique o formato informado.") String email,
        @NotBlank @Size(min = 8) String senha,
        @NotBlank String cidade,
        String estado,
        LocalDate dataNasc,
        String modeloFav,
        String obs,
        Boolean newsletter
) {
}

