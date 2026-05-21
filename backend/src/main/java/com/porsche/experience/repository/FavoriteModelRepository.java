package com.porsche.experience.repository;

import com.porsche.experience.model.FavoriteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteModelRepository extends JpaRepository<FavoriteModel, Long> {
    List<FavoriteModel> findByCadastroIdOrderByDataCriacaoDesc(Long cadastroId);

    Optional<FavoriteModel> findByCadastroIdAndPorscheModelId(Long cadastroId, Long porscheModelId);

    void deleteByCadastroIdAndPorscheModelId(Long cadastroId, Long porscheModelId);
}

