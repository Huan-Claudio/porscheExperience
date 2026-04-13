import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

declare global {
  interface Window {
    HomePage: any;
    ModelsPage: any;
    ModelDetailPage: any;
    RegisterPage: any;
    Navbar: any;
    Footer: any;
    PORSCHE_DATA: any[];
  }
}

function App() {
  // ── Estado Global da Aplicação (IAppState) ──
  const [paginaAtual, setPaginaAtual] = React.useState<string>('home');
  const [modeloSelecionado, setModeloSelecionado] = React.useState<string | null>(null);
  const [favoritos, setFavoritos] = React.useState<string[]>([]);

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paginaAtual, modeloSelecionado]);

  // ── Handlers ──

  // Navegação entre páginas
  const handleNavegar = (pagina: string) => {
    setPaginaAtual(pagina);
    if (pagina !== 'detail') setModeloSelecionado(null);
  };

  // Ver detalhes de um modelo
  const handleVerDetalhes = (modeloId: string) => {
    setModeloSelecionado(modeloId);
    setPaginaAtual('detail');
  };

  // Favoritar / desfavoritar modelo (atualiza Dashboard dinamicamente)
  const handleFavoritar = (modeloId: string) => {
    setFavoritos(prev =>
      prev.includes(modeloId)
        ? prev.filter(id => id !== modeloId)
        : [...prev, modeloId]
    );
  };

  // ── Render ──
  const renderPagina = () => {
    switch (paginaAtual) {
      case 'home':
        return React.createElement(window.HomePage, {
          onNavegar: handleNavegar,
          onVerDetalhes: handleVerDetalhes
        });

      case 'models':
        return React.createElement(window.ModelsPage, {
          favoritos,
          onFavoritar: handleFavoritar,
          onVerDetalhes: handleVerDetalhes
        });

      case 'detail':
        return React.createElement(window.ModelDetailPage, {
          modeloId: modeloSelecionado,
          favoritos,
          onFavoritar: handleFavoritar,
          onVoltar: () => handleNavegar('models')
        });

      case 'register':
        return React.createElement(window.RegisterPage, {});

      default:
        return React.createElement(window.HomePage, {
          onNavegar: handleNavegar,
          onVerDetalhes: handleVerDetalhes
        });
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement(window.Navbar, {
      paginaAtual,
      onNavegar: handleNavegar,
      totalFavoritos: favoritos.length
    }),

    renderPagina(),

    React.createElement(window.Footer, {
      onNavegar: handleNavegar
    })
  );
}

export default App;
