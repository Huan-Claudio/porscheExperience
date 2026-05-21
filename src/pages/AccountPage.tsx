import * as React from 'react';
import type { PorscheModel, PorscheProblema, UsuarioLogado } from '../types/porsche';

interface AccountPageProps {
  usuario: UsuarioLogado | null;
  modelos: PorscheModel[];
  favoritos: string[];
  relatos: PorscheProblema[];
  onNavegar: (pagina: string) => void;
  onVerDetalhes: (id: string | number) => void;
}

window.AccountPage = function AccountPage({
  usuario,
  modelos,
  favoritos,
  relatos,
  onNavegar,
  onVerDetalhes,
}: AccountPageProps) {
  if (!usuario) {
    return React.createElement('main', null,
      React.createElement('div', { className: 'container py-5 text-center' },
        React.createElement('h2', { className: 'section-title' }, 'Entre para ver sua conta'),
        React.createElement('button', { className: 'btn-porsche mt-4', onClick: () => onNavegar('register') },
          React.createElement('i', { className: 'bi bi-box-arrow-in-right' }),
          ' Login'
        )
      )
    );
  }

  const modelosFavoritos = modelos.filter((modelo) => favoritos.includes(String(modelo.id)));

  return React.createElement('main', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('div', { className: 'container' },
        React.createElement('span', { className: 'section-label' }, 'Minha Conta'),
        React.createElement('h1', { className: 'page-title' }, usuario.nome, React.createElement('br'), 'Porsche Experience'),
        React.createElement('div', { className: 'divider-red' })
      )
    ),

    React.createElement('div', { className: 'container py-5 py-lg-6' },
      React.createElement('div', { className: 'row g-4' },
        React.createElement('div', { className: 'col-lg-4' },
          React.createElement('div', { className: 'account-panel' },
            React.createElement('span', { className: 'section-label' }, 'Perfil'),
            React.createElement('h3', null, usuario.nome),
            React.createElement('p', null, usuario.email),
            React.createElement('p', null, `${usuario.cidade}${usuario.estado ? `, ${usuario.estado}` : ''}`),
            usuario.modeloFav && React.createElement('p', null, `Interesse inicial: ${usuario.modeloFav}`)
          )
        ),

        React.createElement('div', { className: 'col-lg-8' },
          React.createElement('section', { className: 'mb-5' },
            React.createElement('div', { className: 'd-flex align-items-center justify-content-between mb-3' },
              React.createElement('h3', { className: 'account-section-title' }, 'Carros Favoritados'),
              React.createElement('span', { className: 'severity-badge sev-baixa' }, `${modelosFavoritos.length} salvos`)
            ),
            modelosFavoritos.length === 0
              ? React.createElement('div', { className: 'account-empty' }, 'Voce ainda nao favoritou nenhum modelo.')
              : modelosFavoritos.map((modelo) =>
                  React.createElement('button', {
                    key: modelo.id,
                    className: 'account-list-item',
                    onClick: () => onVerDetalhes(modelo.id),
                  },
                    React.createElement('span', null, modelo.nome),
                    React.createElement('i', { className: 'bi bi-arrow-right' })
                  )
                )
          ),

          React.createElement('section', null,
            React.createElement('div', { className: 'd-flex align-items-center justify-content-between mb-3' },
              React.createElement('h3', { className: 'account-section-title' }, 'Meus Relatos'),
              React.createElement('span', { className: 'severity-badge sev-media' }, `${relatos.length} enviados`)
            ),
            relatos.length === 0
              ? React.createElement('div', { className: 'account-empty' }, 'Seus relatos enviados aparecerao aqui.')
              : relatos.map((relato) =>
                  React.createElement('div', { key: relato.id, className: 'account-report' },
                    React.createElement('div', { className: 'd-flex justify-content-between gap-3' },
                      React.createElement('h6', null, relato.titulo),
                      React.createElement('span', { className: 'severity-badge sev-baixa' },
                        `${relato.respostas?.length || 0} resposta${(relato.respostas?.length || 0) !== 1 ? 's' : ''}`
                      )
                    ),
                    React.createElement('p', null, relato.descricao),
                    (relato.respostas || []).map((resposta) =>
                      React.createElement('div', { key: resposta.id, className: 'reply-item' },
                        React.createElement('div', { className: 'reply-author' }, resposta.autor),
                        React.createElement('p', null, resposta.mensagem)
                      )
                    )
                  )
                )
          )
        )
      )
    )
  );
};

export default window.AccountPage;

