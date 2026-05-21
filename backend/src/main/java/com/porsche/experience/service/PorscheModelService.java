package com.porsche.experience.service;

import com.porsche.experience.model.PorscheModel;
import com.porsche.experience.repository.PorscheModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class PorscheModelService {

    private final PorscheModelRepository porscheModelRepository;

    public List<PorscheModel> listarTodos() {
        return porscheModelRepository.findByAtivoTrue();
    }

    public Optional<PorscheModel> obterPorId(Long id) {
        return porscheModelRepository.findById(id)
                .filter(modelo -> modelo.getAtivo() != null && modelo.getAtivo());
    }

    public PorscheModel criar(PorscheModel porscheModel) {
        porscheModel.setAtivo(true);
        return porscheModelRepository.save(porscheModel);
    }

    public PorscheModel atualizar(Long id, PorscheModel porscheModelAtualizado) {
        return porscheModelRepository.findById(id)
                .map(modelo -> {
                    if (porscheModelAtualizado.getNome() != null) {
                        modelo.setNome(porscheModelAtualizado.getNome());
                    }
                    if (porscheModelAtualizado.getTagline() != null) {
                        modelo.setTagline(porscheModelAtualizado.getTagline());
                    }
                    if (porscheModelAtualizado.getDescricao() != null) {
                        modelo.setDescricao(porscheModelAtualizado.getDescricao());
                    }
                    if (porscheModelAtualizado.getBadge() != null) {
                        modelo.setBadge(porscheModelAtualizado.getBadge());
                    }
                    if (porscheModelAtualizado.getBadgeClass() != null) {
                        modelo.setBadgeClass(porscheModelAtualizado.getBadgeClass());
                    }
                    if (porscheModelAtualizado.getImagem() != null) {
                        modelo.setImagem(porscheModelAtualizado.getImagem());
                    }
                    if (porscheModelAtualizado.getPotenciaBase() != null) {
                        modelo.setPotenciaBase(porscheModelAtualizado.getPotenciaBase());
                    }
                    if (porscheModelAtualizado.getPotenciaTurbo() != null) {
                        modelo.setPotenciaTurbo(porscheModelAtualizado.getPotenciaTurbo());
                    }
                    if (porscheModelAtualizado.getVelocidadeMaxima() != null) {
                        modelo.setVelocidadeMaxima(porscheModelAtualizado.getVelocidadeMaxima());
                    }
                    if (porscheModelAtualizado.getAceleracaoZeroCem() != null) {
                        modelo.setAceleracaoZeroCem(porscheModelAtualizado.getAceleracaoZeroCem());
                    }
                    if (porscheModelAtualizado.getCambio() != null) {
                        modelo.setCambio(porscheModelAtualizado.getCambio());
                    }
                    if (porscheModelAtualizado.getAnoLancamento() != null) {
                        modelo.setAnoLancamento(porscheModelAtualizado.getAnoLancamento());
                    }
                    if (porscheModelAtualizado.getEspecificacoes() != null) {
                        modelo.setEspecificacoes(porscheModelAtualizado.getEspecificacoes());
                    }
                    if (porscheModelAtualizado.getProblemas() != null) {
                        modelo.setProblemas(porscheModelAtualizado.getProblemas());
                    }
                    if (porscheModelAtualizado.getFaq() != null) {
                        modelo.setFaq(porscheModelAtualizado.getFaq());
                    }
                    return porscheModelRepository.save(modelo);
                })
                .orElseThrow(() -> new RuntimeException("Modelo Porsche não encontrado com ID: " + id));
    }

    public void deletar(Long id) {
        PorscheModel modelo = porscheModelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Modelo Porsche não encontrado com ID: " + id));
        modelo.setAtivo(false);
        porscheModelRepository.save(modelo);
    }

    public void deletarPermanentemente(Long id) {
        if (!porscheModelRepository.existsById(id)) {
            throw new RuntimeException("Modelo Porsche não encontrado com ID: " + id);
        }
        porscheModelRepository.deleteById(id);
    }

    public List<PorscheModel> buscarPorNome(String nome) {
        return porscheModelRepository.findByNomeContainingIgnoreCaseAndAtivoTrue(nome);
    }
}
