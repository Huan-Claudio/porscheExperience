package com.porsche.experience.service;

import com.porsche.experience.dto.CadastroRequest;
import com.porsche.experience.dto.CadastroResponse;
import com.porsche.experience.dto.LoginRequest;
import com.porsche.experience.model.Cadastro;
import com.porsche.experience.repository.CadastroRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class CadastroService {

    private static final LocalDate DATA_NASCIMENTO_MINIMA = LocalDate.of(1900, 1, 1);
    private static final String DATA_NASCIMENTO_INVALIDA =
            "Data de nascimento inválida. Informe uma data entre 01/01/1900 e a data atual.";

    private final CadastroRepository cadastroRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public CadastroResponse criar(CadastroRequest request) {
        validarDataNascimento(request.dataNasc());

        if (cadastroRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        Cadastro cadastro = Cadastro.builder()
                .nome(request.nome())
                .sobrenome(request.sobrenome())
                .email(request.email().toLowerCase())
                .senhaHash(passwordEncoder.encode(request.senha()))
                .cidade(request.cidade())
                .estado(request.estado())
                .dataNasc(request.dataNasc())
                .modeloFav(request.modeloFav())
                .obs(request.obs())
                .newsletter(Boolean.TRUE.equals(request.newsletter()))
                .build();

        return CadastroResponse.from(cadastroRepository.save(cadastro));
    }

    private void validarDataNascimento(LocalDate dataNasc) {
        if (dataNasc == null) {
            return;
        }

        if (dataNasc.isBefore(DATA_NASCIMENTO_MINIMA) || dataNasc.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException(DATA_NASCIMENTO_INVALIDA);
        }
    }

    @Transactional(readOnly = true)
    public List<CadastroResponse> listar() {
        return cadastroRepository.findAll().stream()
                .map(CadastroResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CadastroResponse login(LoginRequest request) {
        Cadastro cadastro = cadastroRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new IllegalArgumentException("E-mail ou senha inválidos"));

        if (!passwordEncoder.matches(request.senha(), cadastro.getSenhaHash())) {
            throw new IllegalArgumentException("E-mail ou senha inválidos");
        }

        return CadastroResponse.from(cadastro);
    }
}
