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
@Table(name = "problem_replies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProblemReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Relato é obrigatório")
    @Column(name = "problem_report_id", nullable = false)
    private Long problemReportId;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false, length = 100)
    private String autor;

    @NotBlank(message = "Resposta é obrigatória")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String mensagem;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;
}

