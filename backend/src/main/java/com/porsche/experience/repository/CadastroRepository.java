package com.porsche.experience.repository;

import com.porsche.experience.model.Cadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CadastroRepository extends JpaRepository<Cadastro, Long> {
    boolean existsByEmailIgnoreCase(String email);

    Optional<Cadastro> findByEmailIgnoreCase(String email);
}
