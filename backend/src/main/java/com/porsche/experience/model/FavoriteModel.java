package com.porsche.experience.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "favorite_models",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_favorite_cadastro_model", columnNames = {"cadastro_id", "porsche_model_id"})
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "cadastro_id", nullable = false)
    private Long cadastroId;

    @NotNull
    @Column(name = "porsche_model_id", nullable = false)
    private Long porscheModelId;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;
}

