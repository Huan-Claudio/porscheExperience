// ============================================================
//  src/components/ModelCard.tsx
//  Props: { modelo: IPorscheModel, favoritado: boolean,
//           onFavoritar: (id)=>void, onVerDetalhes: (id)=>void }
// ============================================================

import * as React from 'react';

window.ModelCard = function ModelCard({ modelo, favoritado, onFavoritar, onVerDetalhes }) {
  return (
    React.createElement('article', { className: 'model-card' },

      // Image
      React.createElement('div', { className: 'model-card-img-wrap' },
        React.createElement('img', {
          src: modelo.imagem,
          alt: modelo.nome,
          className: 'model-card-img',
          onError: (e) => {
            e.target.src = 'imagens/hero.jpg';
          }
        }),
        React.createElement('span', { className: `model-card-badge ${modelo.badgeClass}` },
          modelo.badge
        )
      ),

      // Body
      React.createElement('div', { className: 'model-card-body' },
        React.createElement('h3', { className: 'model-card-title' }, modelo.nome),
        React.createElement('p', { className: 'model-card-desc' }, modelo.descricao.slice(0, 110) + '...')
      ),

      // Specs
      React.createElement('div', { className: 'model-card-specs' },
        modelo.specs.map((s, i) =>
          React.createElement('div', { key: i, className: 'model-spec' },
            React.createElement('div', { className: 'model-spec-value' }, s.valor),
            React.createElement('div', { className: 'model-spec-unit' }, s.label)
          )
        )
      ),

      // Footer actions
      React.createElement('div', { className: 'model-card-footer' },
        React.createElement('button', {
          className: 'btn-porsche flex-grow-1',
          style: { justifyContent: 'center' },
          onClick: () => onVerDetalhes(modelo.id)
        },
          'Ver Detalhes',
          React.createElement('i', { className: 'bi bi-arrow-right' })
        ),
        React.createElement('button', {
          className: `btn-fav ${favoritado ? 'active' : ''}`,
          onClick: () => onFavoritar(modelo.id),
          title: favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        },
          React.createElement('i', { className: favoritado ? 'bi bi-heart-fill' : 'bi bi-heart' })
        )
      )
    )
  );
};

export default window.ModelCard;
