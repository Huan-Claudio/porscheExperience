// ============================================================
//  src/components/FaqItem.tsx
//  Props: { faq: IFaq }
// ============================================================

import React from 'react';

interface IFaq {
  pergunta: string;
  resposta: string;
}

(window as any).FaqItem = function FaqItem({ faq }: { faq: IFaq }) {
  const { useState } = React;
  const [open, setOpen] = useState(false);

  return (
    React.createElement('div', { className: 'faq-item' },
      React.createElement('button', {
        className: `faq-question ${open ? 'open' : ''}`,
        onClick: () => setOpen(!open)
      },
        React.createElement('span', null, faq.pergunta),
        React.createElement('i', { className: open ? 'bi bi-chevron-up' : 'bi bi-chevron-down' })
      ),
      React.createElement('div', { className: `faq-answer ${open ? 'open' : ''}` },
        faq.resposta
      )
    )
  );
};

export default window.FaqItem;
