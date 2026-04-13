// ============================================================
//  src/pages/HomePage.tsx
//  Props: { onNavegar: (p:string)=>void, onVerDetalhes: (id)=>void }
// ============================================================

import * as React from 'react';

declare global {
  interface Window {
    PORSCHE_DATA: any[];
  }
}

interface IHomePageProps {
  onNavegar: (pagina: string) => void;
  onVerDetalhes: (id: string) => void;
}

window.HomePage = function HomePage({ onNavegar, onVerDetalhes }: IHomePageProps) {
  const modelos = window.PORSCHE_DATA;

  const destaques = [
    { icon: 'bi-speedometer2', titulo: 'Dinâmica Boxer', desc: 'Motor Boxer com cilindros horizontais opostos posiciona o peso baixo no chassi, criando precisão cirúrgica e equilíbrio perfeito.' },
    { icon: 'bi-calendar-check', titulo: 'Versatilidade Real', desc: 'Um 911 vai ao track day no sábado e ao supermercado na segunda. Confiabilidade alemã para uso diário sem abrir mão da performance.' },
    { icon: 'bi-clock-history', titulo: 'Evolução Atemporal', desc: 'A silhueta do 911 é praticamente a mesma há 60 anos, mas cada parafuso foi evoluído. Um ícone com os maiores valores de revenda do planeta.' },
    { icon: 'bi-trophy', titulo: 'Herança Vitoriosa', desc: 'Maior recordista das 24h de Le Mans. Tecnologias como PDK e PDCC foram refinadas sob o estresse extremo das pistas mais exigentes do mundo.' },
  ];

  const imgsGaleria = [
    { src: 'imagens/992gt3.jpg', alt: 'GT3', id: '911' },
    { src: 'imagens/macan.jpg', alt: 'Macan', id: 'macan' },
    { src: 'imagens/panamera.jpg', alt: 'Panamera', id: 'panamera' },
    { src: 'imagens/spyder.jpg', alt: 'Spyder', id: 'spyder' },
    { src: 'imagens/turbos.jpg', alt: 'Turbo S', id: '911' },
    { src: 'imagens/cross.jpg', alt: 'Cross Turismo', id: 'taycan' },
    { src: 'imagens/911.jpg', alt: '911', id: '911' },
    { src: 'imagens/taycan.jpeg', alt: 'Taycan', id: 'taycan' },
  ];

  return (
    React.createElement('main', null,

      // ── HERO ──
      React.createElement('section', { className: 'hero' },
        React.createElement('img', {
          src: 'imagens/hero.jpg',
          alt: 'Porsche Hero',
          className: 'hero-bg'
        }),
        React.createElement('div', { className: 'hero-overlay' },
          React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'hero-content animate-up' },
              React.createElement('span', { className: 'hero-badge' }, 'Porsche Experience'),
              React.createElement('h1', { className: 'hero-title' }, 'A Essência', React.createElement('br'), 'da Porsche'),
              React.createElement('p', { className: 'hero-subtitle' },
                'Engenharia de precisão, design atemporal e emoção pura. Desde 1931, a marca que define o esportivo perfeito.'
              ),
              React.createElement('div', { className: 'hero-actions' },
                React.createElement('button', { className: 'btn-porsche animate-up delay-2', onClick: () => onNavegar('models') },
                  'Ver Modelos', React.createElement('i', { className: 'bi bi-arrow-right' })
                ),
                React.createElement('button', { className: 'btn-porsche-outline animate-up delay-3', onClick: () => onNavegar('register') },
                  'Cadastre-se'
                )
              )
            )
          )
        )
      ),

      // ── STATS ──
      React.createElement('section', { className: 'stats-strip' },
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'row g-0' },
            [
              { valor: '93+', label: 'Anos de história' },
              { valor: '19x', label: 'Vitórias em Le Mans' },
              { valor: '640cv', label: 'Turbo S máximo' },
              { valor: '761cv', label: 'Taycan Turbo S' },
            ].map((s, i) =>
              React.createElement('div', { key: i, className: 'col-6 col-md-3' },
                React.createElement(window.StatBadge, { valor: s.valor, label: s.label })
              )
            )
          )
        )
      ),

      // ── DESTAQUES ──
      React.createElement('section', { className: 'py-5 py-lg-6', id: 'destaques' },
        React.createElement('div', { className: 'container py-4' },
          React.createElement('div', { className: 'text-center mb-5' },
            React.createElement('span', { className: 'section-label' }, 'Por que Porsche'),
            React.createElement('h2', { className: 'section-title' }, 'Destaques da Marca'),
            React.createElement('div', { className: 'divider-red mx-auto' })
          ),
          React.createElement('div', { className: 'row g-4' },
            destaques.map((d, i) =>
              React.createElement('div', { key: i, className: 'col-md-6 col-lg-3' },
                React.createElement('div', { className: 'highlight-card h-100' },
                  React.createElement('div', { className: 'highlight-icon' },
                    React.createElement('i', { className: d.icon })
                  ),
                  React.createElement('h5', { className: 'highlight-title' }, d.titulo),
                  React.createElement('p', { className: 'highlight-desc' }, d.desc)
                )
              )
            )
          )
        )
      ),

      // ── SOBRE ──
      React.createElement('section', { className: 'about-dark py-5 py-lg-6' },
        React.createElement('div', { className: 'container py-4' },
          React.createElement('div', { className: 'row align-items-center g-5' },
            React.createElement('div', { className: 'col-lg-6' },
              React.createElement('span', { className: 'section-label' }, 'Nossa história'),
              React.createElement('h2', { className: 'section-title' }, 'Precisão desde 1931'),
              React.createElement('div', { className: 'divider-red' }),
              React.createElement('p', null,
                'Fundada por Ferdinand Porsche, a marca tornou-se um símbolo de engenharia de precisão. Ao longo de décadas, aperfeiçoou a arte de construir esportivos capazes de unir desempenho, controle e elegância mecânica.'
              ),
              React.createElement('p', { className: 'mt-3' },
                'O Porsche 911, lançado em 1964, tornou-se um ícone da indústria automotiva. Com motor boxer traseiro e silhueta inconfundível, representa a continuidade de uma filosofia de design que atravessa gerações.'
              ),
              React.createElement('button', {
                className: 'btn-porsche mt-4',
                onClick: () => onNavegar('models')
              }, 'Explorar Modelos', React.createElement('i', { className: 'bi bi-arrow-right' }))
            ),
            React.createElement('div', { className: 'col-lg-6' },
              React.createElement('img', {
                src: 'imagens/992gt3.jpg',
                className: 'img-fluid',
                alt: 'Porsche GT3',
                style: { aspectRatio: '16/9', objectFit: 'cover' }
              })
            )
          )
        )
      ),

      // ── ENGENHARIA TILES ──
      React.createElement('section', { className: 'py-5 py-lg-6' },
        React.createElement('div', { className: 'container py-4' },
          React.createElement('div', { className: 'text-center mb-5' },
            React.createElement('span', { className: 'section-label' }, 'Tecnologia'),
            React.createElement('h2', { className: 'section-title' }, 'Engenharia Porsche'),
            React.createElement('div', { className: 'divider-red mx-auto' })
          ),
          React.createElement('div', { className: 'row g-3' },
            ['Motor Boxer', 'Aerodinâmica', 'Performance', 'Controle', 'Design', 'Inovação', 'Velocidade', 'Precisão', 'Tradição'].map((t, i) =>
              React.createElement('div', { key: i, className: 'col-4 col-md-4' },
                React.createElement('div', { className: 'info-tile' }, t)
              )
            )
          )
        )
      ),

      // ── GALERIA ──
      React.createElement('section', { className: 'py-5 py-lg-6', style: { background: 'white' } },
        React.createElement('div', { className: 'container py-4' },
          React.createElement('div', { className: 'text-center mb-5' },
            React.createElement('span', { className: 'section-label' }, 'Galeria'),
            React.createElement('h2', { className: 'section-title' }, 'Galeria Porsche'),
            React.createElement('div', { className: 'divider-red mx-auto' })
          ),
          React.createElement('div', { className: 'row g-3' },
            imgsGaleria.map((img, i) =>
              React.createElement('div', { key: i, className: 'col-12 col-md-6 col-lg-3' },
                React.createElement('div', { className: 'gallery-item', onClick: () => onVerDetalhes(img.id), style: { cursor: 'pointer' } },
                  React.createElement('img', { src: img.src, alt: img.alt })
                )
              )
            )
          )
        )
      )
    )
  );
};

export default window.HomePage;
