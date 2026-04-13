// ============================================================
//  src/components/Dashboard.tsx
//  Props: { favoritos: string[], modelos: IPorscheModel[] }
//  Estado dinâmico: contadores atualizam ao favoritar/desfavoritar
// ============================================================

import * as React from 'react';

window.Dashboard = function Dashboard({ favoritos, modelos, onVerDetalhes }) {
  const totalModelos = modelos.length;
  const totalFavoritos = favoritos.length;
  const modelosFavoritados = modelos.filter(m => favoritos.includes(m.id));

  // Categorias distintas
  const categorias = [...new Set(modelos.map(m => m.badge))];
  const totalCategorias = categorias.length;

  return (
    React.createElement('aside', { className: 'dashboard' },

      React.createElement('span', { className: 'section-label' }, 'Painel do Usuário'),
      React.createElement('h2', { className: 'dashboard-title' }, 'Dashboard'),
      React.createElement('p', { className: 'dashboard-subtitle' },
        'Seus dados e preferências em tempo real.'
      ),

      // Contador: Total de Modelos
      React.createElement('div', { className: 'dash-counter' },
        React.createElement('div', { className: 'dash-counter-icon' },
          React.createElement('i', { className: 'bi bi-car-front' })
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'dash-counter-value' }, totalModelos),
          React.createElement('div', { className: 'dash-counter-label' }, 'Modelos Disponíveis')
        )
      ),

      // Contador: Favoritos (dinâmico)
      React.createElement('div', { className: 'dash-counter' },
        React.createElement('div', { className: 'dash-counter-icon' },
          React.createElement('i', { className: 'bi bi-heart-fill' })
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'dash-counter-value', style: { color: totalFavoritos > 0 ? '#d5001c' : 'white' } },
            totalFavoritos
          ),
          React.createElement('div', { className: 'dash-counter-label' }, 'Favoritos')
        )
      ),

      // Contador: Categorias
      React.createElement('div', { className: 'dash-counter' },
        React.createElement('div', { className: 'dash-counter-icon' },
          React.createElement('i', { className: 'bi bi-grid' })
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'dash-counter-value' }, totalCategorias),
          React.createElement('div', { className: 'dash-counter-label' }, 'Categorias')
        )
      ),

      // Lista de favoritos
      React.createElement('div', { className: 'dash-fav-list' },
        React.createElement('h6', {
          style: {
            color: 'white',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '14px'
          }
        }, 'Meus Favoritos'),

        totalFavoritos === 0
          ? React.createElement('p', { className: 'dash-empty' },
              'Nenhum modelo favoritado ainda. Explore os modelos e favorite seus preferidos!'
            )
          : modelosFavoritados.map(m =>
              React.createElement('div', {
                key: m.id,
                className: 'dash-fav-item',
                style: { cursor: 'pointer' },
                onClick: () => onVerDetalhes(m.id)
              },
                React.createElement('span', { className: 'dash-fav-dot' }),
                React.createElement('span', null, m.nome)
              )
            )
      )
    )
  );
};

export default window.Dashboard;
