package com.porsche.experience.dto;

import com.porsche.experience.model.Cadastro;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CadastroResponse(
        Long id,
        String nome,
        String sobrenome,
        String email,
        String cidade,
        String estado,
        LocalDate dataNasc,
        String modeloFav,
        String obs,
        Boolean newsletter,
        LocalDateTime dataCriacao
) {
    public static CadastroResponse from(Cadastro cadastro) {
        return new CadastroResponse(
                cadastro.getId(),
                cadastro.getNome(),
                cadastro.getSobrenome(),
                cadastro.getEmail(),
                cadastro.getCidade(),
                cadastro.getEstado(),
                cadastro.getDataNasc(),
                cadastro.getModeloFav(),
                cadastro.getObs(),
                cadastro.getNewsletter(),
                cadastro.getDataCriacao()
        );
    }
}

