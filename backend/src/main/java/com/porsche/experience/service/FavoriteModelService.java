package com.porsche.experience.service;

import com.porsche.experience.model.FavoriteModel;
import com.porsche.experience.repository.CadastroRepository;
import com.porsche.experience.repository.FavoriteModelRepository;
import com.porsche.experience.repository.PorscheModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class FavoriteModelService {

    private final FavoriteModelRepository favoriteModelRepository;
    private final CadastroRepository cadastroRepository;
    private final PorscheModelRepository porscheModelRepository;

    @Transactional(readOnly = true)
    public List<Long> listar(Long cadastroId) {
        validarCadastro(cadastroId);
        return favoriteModelRepository.findByCadastroIdOrderByDataCriacaoDesc(cadastroId)
                .stream()
                .map(FavoriteModel::getPorscheModelId)
                .toList();
    }

    public List<Long> favoritar(Long cadastroId, Long modeloId) {
        validarCadastro(cadastroId);
        if (!porscheModelRepository.existsById(modeloId)) {
            throw new IllegalArgumentException("Modelo Porsche não encontrado");
        }

        favoriteModelRepository.findByCadastroIdAndPorscheModelId(cadastroId, modeloId)
                .orElseGet(() -> favoriteModelRepository.save(FavoriteModel.builder()
                        .cadastroId(cadastroId)
                        .porscheModelId(modeloId)
                        .build()));

        return listar(cadastroId);
    }

    public List<Long> remover(Long cadastroId, Long modeloId) {
        validarCadastro(cadastroId);
        favoriteModelRepository.deleteByCadastroIdAndPorscheModelId(cadastroId, modeloId);
        return listar(cadastroId);
    }

    private void validarCadastro(Long cadastroId) {
        if (!cadastroRepository.existsById(cadastroId)) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }
    }
}

