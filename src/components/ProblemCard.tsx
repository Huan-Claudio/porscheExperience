// ============================================================
//  src/components/ProblemCard.tsx
//  Props: { problema: IProblema }
// ============================================================

import * as React from 'react';

interface IProblema {
  severidade: 'Alta' | 'Média' | 'Baixa';
  titulo: string;
  descricao: string;
}

interface IProblemCardProps {
  problema: IProblema;
}

window.ProblemCard = function ProblemCard({ problema }: IProblemCardProps) {
  const sevMap = {
    'Alta':  { iconClass: 'severity-alta',  badgeClass: 'sev-alta',  icon: 'bi-exclamation-triangle-fill' },
    'Média': { iconClass: 'severity-media', badgeClass: 'sev-media', icon: 'bi-exclamation-circle-fill' },
    'Baixa': { iconClass: 'severity-baixa', badgeClass: 'sev-baixa', icon: 'bi-info-circle-fill' },
  };

  const sev = sevMap[problema.severidade as keyof typeof sevMap] || sevMap['Baixa'];

  return (
    React.createElement('div', { className: 'problem-card' },

      // Icon
      React.createElement('div', { className: `problem-icon ${sev.iconClass}` },
        React.createElement('i', { className: sev.icon })
      ),

      // Content
      React.createElement('div', { className: 'flex-grow-1' },
        React.createElement('div', { className: 'd-flex justify-content-between align-items-start gap-2 mb-1' },
          React.createElement('h6', { className: 'problem-title' }, problema.titulo),
          React.createElement('span', { className: `severity-badge ${sev.badgeClass}` },
            'Severidade: ' + problema.severidade
          )
        ),
        React.createElement('p', { className: 'problem-desc mb-0' }, problema.descricao)
      )
    )
  );
};

export default window.ProblemCard;
