// ============================================================
//  src/pages/ModelsPage.tsx
//  Layout assimétrico: aside (col-lg-3) + main (col-lg-9)
//  Props: { favoritos, onFavoritar, onVerDetalhes }
// ============================================================

import * as React from 'react';

declare global {
  interface Window {
    PORSCHE_DATA: any[];
    Dashboard: any;
    ModelCard: any;
  }
}

interface IModelsPageProps {
  favoritos: string[];
  onFavoritar: (id: string) => void;
  onVerDetalhes: (id: string) => void;
}

window.ModelsPage = function ModelsPage({ favoritos, onFavoritar, onVerDetalhes }: IModelsPageProps) {
  const modelos = window.PORSCHE_DATA;

  return (
    React.createElement('main', null,

      // Page Header
      React.createElement('div', { className: 'page-header' },
        React.createElement('div', { className: 'container' },
          React.createElement('span', { className: 'section-label' }, 'Linha completa'),
          React.createElement('h1', { className: 'page-title' }, 'Todos os', React.createElement('br'), 'Modelos'),
          React.createElement('div', { className: 'divider-red' })
        )
      ),

      // Asymmetric Layout: aside 3 + section 9
      React.createElement('div', { className: 'container-fluid px-0' },
        React.createElement('div', { className: 'row g-0' },

          // ── ASIDE: Dashboard (col-lg-3) ──
          React.createElement('div', { className: 'col-lg-3' },
            React.createElement(window.Dashboard, {
              favoritos: favoritos,
              modelos: modelos,
              onVerDetalhes: onVerDetalhes
            })
          ),

          // ── SECTION: Model Grid (col-lg-9) ──
          React.createElement('div', { className: 'col-lg-9' },
            React.createElement('section', { className: 'py-5 px-4 px-lg-5' },
              React.createElement('div', { className: 'mb-4' },
                React.createElement('p', { style: { fontSize: '14px', color: '#888' } },
                  `${modelos.length} modelos disponíveis • ${favoritos.length} favoritado${favoritos.length !== 1 ? 's' : ''}`
                )
              ),
              React.createElement('div', { className: 'row g-4' },
                modelos.map((modelo: any) =>
                  React.createElement('div', { key: modelo.id, className: 'col-md-6 col-xl-4' },
                    React.createElement(window.ModelCard, {
                      modelo: modelo,
                      favoritado: favoritos.includes(modelo.id),
                      onFavoritar: onFavoritar,
                      onVerDetalhes: onVerDetalhes
                    })
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

export default window.ModelsPage;
