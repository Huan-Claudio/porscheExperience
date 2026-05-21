package com.porsche.experience.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "cadastros")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cadastro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 100)
    private String sobrenome;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    @Column(nullable = false, unique = true, length = 160)
    private String email;

    @Column(name = "senha_hash", nullable = false, length = 120)
    private String senhaHash;

    @NotBlank(message = "Cidade é obrigatória")
    @Column(nullable = false, length = 100)
    private String cidade;

    @Column(length = 2)
    private String estado;

    @Column(name = "data_nascimento")
    private LocalDate dataNasc;

    @Column(name = "modelo_fav", length = 120)
    private String modeloFav;

    @Column(columnDefinition = "TEXT")
    private String obs;

    @Builder.Default
    @Column(nullable = false)
    private Boolean newsletter = false;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;
}

