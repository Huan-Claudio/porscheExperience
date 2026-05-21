package com.porsche.experience.repository;

import com.porsche.experience.model.ProblemReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemReportRepository extends JpaRepository<ProblemReport, Long> {
    List<ProblemReport> findByPorscheModelIdAndAprovadoTrueOrderByDataCriacaoDesc(Long porscheModelId);

    List<ProblemReport> findByCadastroIdOrderByDataCriacaoDesc(Long cadastroId);
}
