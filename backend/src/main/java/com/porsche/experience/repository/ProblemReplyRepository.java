package com.porsche.experience.repository;

import com.porsche.experience.model.ProblemReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProblemReplyRepository extends JpaRepository<ProblemReply, Long> {
    List<ProblemReply> findByProblemReportIdOrderByDataCriacaoAsc(Long problemReportId);

    List<ProblemReply> findByProblemReportIdInOrderByDataCriacaoAsc(Collection<Long> problemReportIds);
}

