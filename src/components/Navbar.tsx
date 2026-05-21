// ============================================================
//  src/components/Navbar.tsx
//  Props: { paginaAtual: string, onNavegar: (p:string)=>void,
//           totalFavoritos: number }
// ============================================================

import * as React from 'react';

interface INavbarProps {
  paginaAtual: string;
  onNavegar: (pagina: string) => void;
  totalFavoritos: number;
  usuarioNome?: string;
  onLogout?: () => void;
}

window.Navbar = function Navbar({ paginaAtual, onNavegar, totalFavoritos, usuarioNome, onLogout }: INavbarProps) {
  const { useState } = React;
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'home',     label: 'Início' },
    { id: 'models',   label: 'Modelos' },
    { id: usuarioNome ? 'account' : 'register', label: usuarioNome ? 'Minha Conta' : 'Login' },
  ];

  return (
    React.createElement('header', null,
      React.createElement('nav', { className: 'pnav' },
        React.createElement('div', { className: 'container' },

          // Brand
          React.createElement('div', {
            className: 'pnav-brand',
            onClick: () => { onNavegar('home'); setMenuOpen(false); }
          },
            React.createElement('img', {
              src: 'imagens/logo.png',
              alt: 'Porsche',
              className: 'pnav-logo',
              onError: (e: any) => { (e.target as HTMLImageElement).style.display = 'none'; }
            }),
            React.createElement('span', { className: 'pnav-brand-text d-none d-sm-block' }, 'Porsche Experience')
          ),

          // Desktop Links
          React.createElement('ul', {
            className: `pnav-links ${menuOpen ? 'open' : ''}`,
          },
            links.map(link =>
              React.createElement('li', { key: link.id },
                React.createElement('button', {
                  className: `pnav-link ${paginaAtual === link.id ? 'active' : ''}`,
                  onClick: () => { onNavegar(link.id); setMenuOpen(false); }
                },
                  link.label,
                  link.id === 'models' && totalFavoritos > 0
                    ? React.createElement('span', { className: 'pnav-fav-badge' }, totalFavoritos)
                    : null
            )
          ),

          usuarioNome && React.createElement('button', {
            className: 'pnav-link',
            onClick: () => { onLogout?.(); setMenuOpen(false); }
          },
            React.createElement('i', { className: 'bi bi-box-arrow-right me-1' }),
            'Sair'
          )
            )
          ),

          // Mobile toggler
          React.createElement('button', {
            className: 'pnav-toggler',
            onClick: () => setMenuOpen(!menuOpen)
          }, React.createElement('i', { className: 'bi bi-list' }))
        )
      )
    )
  );
};

export default window.Navbar;
