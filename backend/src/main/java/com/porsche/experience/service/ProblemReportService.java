package com.porsche.experience.service;

import com.porsche.experience.dto.ProblemReplyRequest;
import com.porsche.experience.dto.ProblemReplyResponse;
import com.porsche.experience.dto.ProblemReportRequest;
import com.porsche.experience.dto.ProblemReportResponse;
import com.porsche.experience.model.ProblemReply;
import com.porsche.experience.model.ProblemReport;
import com.porsche.experience.repository.PorscheModelRepository;
import com.porsche.experience.repository.ProblemReplyRepository;
import com.porsche.experience.repository.ProblemReportRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class ProblemReportService {

    private static final int QUILOMETRAGEM_MAXIMA = 2_000_000;
    private static final String QUILOMETRAGEM_INVALIDA =
            "Quilometragem inválida. Informe um valor entre 0 e 2.000.000, sem casas decimais.";

    private final ProblemReportRepository problemReportRepository;
    private final ProblemReplyRepository problemReplyRepository;
    private final PorscheModelRepository porscheModelRepository;

    @Transactional(readOnly = true)
    public List<ProblemReportResponse> listarPorModelo(Long modeloId) {
        List<ProblemReport> reports = problemReportRepository.findByPorscheModelIdAndAprovadoTrueOrderByDataCriacaoDesc(modeloId);
        List<Long> ids = reports.stream().map(ProblemReport::getId).toList();
        Map<Long, List<ProblemReplyResponse>> respostasPorRelato = problemReplyRepository
                .findByProblemReportIdInOrderByDataCriacaoAsc(ids)
                .stream()
                .map(ProblemReplyResponse::from)
                .collect(Collectors.groupingBy(ProblemReplyResponse::problemReportId));

        return reports.stream()
                .map(report -> ProblemReportResponse.from(report, respostasPorRelato.getOrDefault(report.getId(), List.of())))
                .toList();
    }

    public ProblemReportResponse criar(ProblemReportRequest request) {
        validarQuilometragem(request.km());

        if (!porscheModelRepository.existsById(request.porscheModelId())) {
            throw new IllegalArgumentException("Modelo Porsche não encontrado");
        }

        ProblemReport report = ProblemReport.builder()
                .porscheModelId(request.porscheModelId())
                .cadastroId(request.cadastroId())
                .anoVeiculo(request.anoVeiculo())
                .km(request.km())
                .categoria(request.categoria())
                .titulo(request.titulo())
                .descricao(request.descricao())
                .solucao(request.solucao())
                .email(request.email())
                .severidade(normalizarSeveridade(request.severidade()))
                .aprovado(true)
                .build();

        return ProblemReportResponse.from(problemReportRepository.save(report), List.of());
    }

    private void validarQuilometragem(String km) {
        if (km == null || km.isBlank()) {
            return;
        }

        String valor = km.trim().replaceFirst("\\s*[kK][mM]$", "");
        if (!valor.matches("\\d+")) {
            throw new IllegalArgumentException(QUILOMETRAGEM_INVALIDA);
        }

        if (valor.length() > String.valueOf(QUILOMETRAGEM_MAXIMA).length()
                || Integer.parseInt(valor) > QUILOMETRAGEM_MAXIMA) {
            throw new IllegalArgumentException(QUILOMETRAGEM_INVALIDA);
        }
    }

    @Transactional(readOnly = true)
    public List<ProblemReportResponse> listarPorCadastro(Long cadastroId) {
        List<ProblemReport> reports = problemReportRepository.findByCadastroIdOrderByDataCriacaoDesc(cadastroId);
        List<Long> ids = reports.stream().map(ProblemReport::getId).toList();
        Map<Long, List<ProblemReplyResponse>> respostasPorRelato = problemReplyRepository
                .findByProblemReportIdInOrderByDataCriacaoAsc(ids)
                .stream()
                .map(ProblemReplyResponse::from)
                .collect(Collectors.groupingBy(ProblemReplyResponse::problemReportId));

        return reports.stream()
                .map(report -> ProblemReportResponse.from(report, respostasPorRelato.getOrDefault(report.getId(), List.of())))
                .toList();
    }

    public ProblemReplyResponse responder(Long reportId, ProblemReplyRequest request) {
        if (!problemReportRepository.existsById(reportId)) {
            throw new IllegalArgumentException("Relato de problema não encontrado");
        }

        ProblemReply reply = ProblemReply.builder()
                .problemReportId(reportId)
                .autor(request.autor())
                .mensagem(request.mensagem())
                .build();

        return ProblemReplyResponse.from(problemReplyRepository.save(reply));
    }

    private String normalizarSeveridade(String severidade) {
        if (severidade == null || severidade.isBlank()) return "Média";

        return switch (severidade.trim().toLowerCase()) {
            case "alta" -> "Alta";
            case "baixa" -> "Baixa";
            default -> "Média";
        };
    }
}
