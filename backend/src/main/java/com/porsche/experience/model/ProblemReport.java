package com.porsche.experience.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "problem_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProblemReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Modelo é obrigatório")
    @Column(name = "porsche_model_id", nullable = false)
    private Long porscheModelId;

    @Column(name = "cadastro_id")
    private Long cadastroId;

    @Column(name = "ano_veiculo")
    private Integer anoVeiculo;

    @Column(length = 30)
    private String km;

    @NotBlank(message = "Categoria é obrigatória")
    @Column(nullable = false, length = 80)
    private String categoria;

    @NotBlank(message = "Título é obrigatório")
    @Column(nullable = false, length = 160)
    private String titulo;

    @NotBlank(message = "Descrição é obrigatória")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String solucao;

    @Column(length = 160)
    private String email;

    @Builder.Default
    @Column(nullable = false, length = 20)
    private String severidade = "Média";

    @Builder.Default
    @Column(nullable = false)
    private Boolean aprovado = true;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;
}
