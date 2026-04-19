// ============================================================
//  src/components/Footer.tsx
//  Props: { onNavegar: (p:string)=>void }
// ============================================================

import * as React from 'react';

interface IFooterProps {
  onNavegar: (pagina: string) => void;
}

window.Footer = function Footer({ onNavegar }: IFooterProps) {
  return (
    React.createElement('footer', null,
      React.createElement('address', { style: { fontStyle: 'normal' } },
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'row align-items-center gy-4' },

            // Logo
            React.createElement('div', { className: 'col-md-4 text-center text-md-start' },
              React.createElement('img', {
                src: 'imagens/logo.png',
                alt: 'Porsche',
                onError: (e: any) => { (e.target as HTMLImageElement).style.display='none'; }
              })
            ),

            // Links
            React.createElement('div', { className: 'col-md-4 text-center' },
              React.createElement('div', { className: 'd-flex justify-content-center gap-4' },
                React.createElement('button', { className: 'footer-link', onClick: () => onNavegar('home') }, 'Início'),
                React.createElement('button', { className: 'footer-link', onClick: () => onNavegar('models') }, 'Modelos'),
                React.createElement('button', { className: 'footer-link', onClick: () => onNavegar('register') }, 'Cadastro')
              )
            ),

            // Credits
            React.createElement('div', { className: 'col-md-4 text-center text-md-end' },
              React.createElement('small', null, 'Projeto acadêmico', 
                React.createElement('br'), 
                'Huan Cláudio Souza Viana', 
                React.createElement('br'), 
                'Gabriel de Oliveira Nascimento',
                React.createElement('br'),
                '04/2026 - Desenvolvimento de Software Web')
            )
          ),

          React.createElement('hr', { style: { borderColor: '#1a1a1a', margin: '24px 0 16px' } }),

          React.createElement('p', {
            className: 'text-center mb-0',
            style: { fontSize: '12px', color: '#333' }
          }, '© 2026 Porsche Experience. Projeto acadêmico sem fins comerciais.')
        )
      )
    )
  );
};

export default window.Footer;
