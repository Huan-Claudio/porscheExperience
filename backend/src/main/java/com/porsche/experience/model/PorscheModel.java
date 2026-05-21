package com.porsche.experience.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "porsche_models")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PorscheModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false, unique = true, length = 100)
    private String nome;

    @NotBlank(message = "Tagline é obrigatória")
    @Column(nullable = false, length = 100)
    private String tagline;

    @NotBlank(message = "Descrição é obrigatória")
    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(length = 100)
    private String badge;

    @Column(name = "badge_class", length = 50)
    private String badgeClass;

    @Column(length = 255)
    private String imagem;

    @Column(name = "potencia_base", nullable = false)
    private Integer potenciaBase;

    @Column(name = "potencia_turbo", nullable = false)
    private Integer potenciaTurbo;

    @Column(name = "velocidade_maxima", nullable = false)
    private Double velocidadeMaxima;

    @Column(name = "aceleracao_zero_cem", nullable = false)
    private Double aceleracaoZeroCem;

    @Column(length = 50)
    private String cambio;

    @Column(name = "ano_lancamento", nullable = false)
    private Integer anoLancamento;

    @Column(columnDefinition = "TEXT")
    private String especificacoes;

    @Column(columnDefinition = "TEXT")
    private String problemas;

    @Column(columnDefinition = "TEXT")
    private String faq;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    @Column(name = "data_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao;

    @Builder.Default
    @Column(columnDefinition = "boolean default true")
    private Boolean ativo = true;
}
