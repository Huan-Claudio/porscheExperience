package com.porsche.experience.dto;

import jakarta.validation.constraints.NotNull;

public record FavoriteRequest(
        @NotNull Long porscheModelId
) {
}

