// ============================================================
//  src/components/StatBadge.tsx
//  Props: { valor: string, label: string }
// ============================================================

import * as React from 'react';

declare global {
  interface Window {
    StatBadge: any;
  }
}

interface IStatBadgeProps {
  valor: string;
  label: string;
}

window.StatBadge = function StatBadge({ valor, label }: IStatBadgeProps) {
  return (
    React.createElement('div', { className: 'stat-item' },
      React.createElement('div', { className: 'stat-value' }, valor),
      React.createElement('div', { className: 'stat-label' }, label)
    )
  );
};

export default window.StatBadge;
