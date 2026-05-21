package com.porsche.experience.repository;

import com.porsche.experience.model.PorscheModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PorscheModelRepository extends JpaRepository<PorscheModel, Long> {
    
    List<PorscheModel> findByAtivoTrue();
    
    Optional<PorscheModel> findByNomeAndAtivoTrue(String nome);
    
    List<PorscheModel> findByNomeContainingIgnoreCaseAndAtivoTrue(String nome);
}
