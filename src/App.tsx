import * as React from 'react';
import authService from './services/authService';
import { porscheModelService, type IPorscheModel } from './services/porscheModelService';
import userDataService from './services/userDataService';
import type { PorscheProblema, UsuarioLogado } from './types/porsche';

declare global {
  interface Window {
    HomePage: unknown;
    ModelsPage: unknown;
    ModelDetailPage: unknown;
    RegisterPage: unknown;
    Navbar: unknown;
    Footer: unknown;
    AccountPage: unknown;
    ModelCard: unknown;
    Dashboard: unknown;
    StatBadge: unknown;
    ProblemCard: unknown;
    FaqItem: unknown;
    PORSCHE_DATA: IPorscheModel[];
  }
}

function App() {
  // ── Estado Global da Aplicação (IAppState) ──
  const [paginaAtual, setPaginaAtual] = React.useState<string>('home');
  const [modeloSelecionado, setModeloSelecionado] = React.useState<string | null>(null);
  const [favoritos, setFavoritos] = React.useState<string[]>([]);
  const [modelos, setModelos] = React.useState<IPorscheModel[]>([]);
  const [usuario, setUsuario] = React.useState<UsuarioLogado | null>(() => authService.carregarSessao());
  const [meusRelatos, setMeusRelatos] = React.useState<PorscheProblema[]>([]);
  const [carregando, setCarregando] = React.useState<boolean>(true);
  const [erro, setErro] = React.useState<string | null>(null);

  // Carregar modelos da API ao montar o componente
  React.useEffect(() => {
    carregarModelos();
  }, []);

  React.useEffect(() => {
    if (!usuario) {
      setMeusRelatos([]);
      return;
    }

    carregarDadosUsuario(usuario.id);
  }, [usuario]);

  const carregarDadosUsuario = async (cadastroId: number) => {
    try {
      const [favoritosBanco, relatosBanco] = await Promise.all([
        userDataService.listarFavoritos(cadastroId),
        userDataService.listarRelatos(cadastroId),
      ]);
      setFavoritos(favoritosBanco);
      setMeusRelatos(relatosBanco);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const carregarModelos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await porscheModelService.listarTodos();
      setModelos(dados);
      // Atualizar dados globais para compatibilidade com componentes existentes
      window.PORSCHE_DATA = dados;
    } catch (error) {
      console.error('Erro ao carregar modelos:', error);
      // Fallback: usar dados locais se disponível
      if (window.PORSCHE_DATA && window.PORSCHE_DATA.length > 0) {
        setModelos(window.PORSCHE_DATA);
      } else {
        setErro('Erro ao carregar modelos do servidor. Verifique se o backend está rodando.');
      }
    } finally {
      setCarregando(false);
    }
  };

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
  const handleVerDetalhes = (modeloId: string | number) => {
    // Converte para string para armazenar, mas mantém o número se receber um número
    setModeloSelecionado(String(modeloId));
    setPaginaAtual('detail');
  };

  // Favoritar / desfavoritar modelo (atualiza Dashboard dinamicamente)
  const handleFavoritar = (modeloId: string | number) => {
    const id = String(modeloId);
    if (!usuario) {
      alert('Faça login para salvar favoritos na sua conta.');
      handleNavegar('register');
      return;
    }

    const modeloNumerico = Number(modeloId);
    if (!Number.isFinite(modeloNumerico)) return;

    const favoritado = favoritos.includes(id);
    const anterior = favoritos;
    setFavoritos(prev => favoritado ? prev.filter(fav => fav !== id) : [...prev, id]);

    const acao = favoritado
      ? userDataService.removerFavorito(usuario.id, modeloNumerico)
      : userDataService.favoritar(usuario.id, modeloNumerico);

    acao
      .then(setFavoritos)
      .catch((error) => {
        console.error('Erro ao sincronizar favorito:', error);
        setFavoritos(anterior);
        alert('Não foi possível salvar o favorito agora.');
      });
  };

  const handleLogin = (usuarioLogado: UsuarioLogado) => {
    setUsuario(usuarioLogado);
    authService.salvarSessao(usuarioLogado);
  };

  const handleLogout = () => {
    authService.logout();
    setUsuario(null);
    setFavoritos([]);
    setMeusRelatos([]);
    handleNavegar('home');
  };

  // Criar novo modelo
  const handleCriarModelo = async (novoModelo: IPorscheModel) => {
    try {
      const modeloCriado = await porscheModelService.criar(novoModelo);
      setModelos(prev => {
        const atualizados = [...prev, modeloCriado];
        window.PORSCHE_DATA = atualizados;
        return atualizados;
      });
      handleNavegar('models');
    } catch (error) {
      console.error('Erro ao criar modelo:', error);
      alert('Erro ao criar modelo. Tente novamente.');
    }
  };

  // Atualizar modelo
  const handleAtualizarModelo = async (id: number, modeloAtualizado: IPorscheModel) => {
    try {
      const modeloAtual = await porscheModelService.atualizar(id, modeloAtualizado);
      setModelos(prev => {
        const atualizados = prev.map(m => Number(m.id) === id ? modeloAtual : m);
        window.PORSCHE_DATA = atualizados;
        return atualizados;
      });
      handleNavegar('models');
    } catch (error) {
      console.error('Erro ao atualizar modelo:', error);
      alert('Erro ao atualizar modelo. Tente novamente.');
    }
  };

  // Deletar modelo
  const handleDeletarModelo = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este modelo?')) {
      try {
        await porscheModelService.deletar(id);
        setModelos(prev => {
          const atualizados = prev.filter(m => Number(m.id) !== id);
          window.PORSCHE_DATA = atualizados;
          return atualizados;
        });
        handleNavegar('models');
      } catch (error) {
        console.error('Erro ao deletar modelo:', error);
        alert('Erro ao deletar modelo. Tente novamente.');
      }
    }
  };

  // ── Render ──
  const renderPagina = () => {
    const HomePage = window.HomePage as React.ElementType;
    const ModelsPage = window.ModelsPage as React.ElementType;
    const ModelDetailPage = window.ModelDetailPage as React.ElementType;
    const RegisterPage = window.RegisterPage as React.ElementType;
    const AccountPage = window.AccountPage as React.ElementType;

    if (carregando) {
      return React.createElement('div', { className: 'container text-center py-5' },
        React.createElement('div', { className: 'spinner-border text-danger', role: 'status' },
          React.createElement('span', { className: 'visually-hidden' }, 'Carregando...')
        )
      );
    }

    if (erro) {
      return React.createElement('div', { className: 'container py-5' },
        React.createElement('div', { className: 'alert alert-warning' }, erro)
      );
    }

    switch (paginaAtual) {
      case 'home':
        return React.createElement(HomePage, {
          onNavegar: handleNavegar,
          onVerDetalhes: handleVerDetalhes,
          modelos
        });

      case 'models':
        return React.createElement(ModelsPage, {
          favoritos,
          onFavoritar: handleFavoritar,
          onVerDetalhes: handleVerDetalhes,
          modelos,
          onCriar: handleCriarModelo,
          onAtualizar: handleAtualizarModelo,
          onDeletar: handleDeletarModelo
        });

      case 'detail':
        return React.createElement(ModelDetailPage, {
          modeloId: modeloSelecionado,
          favoritos,
          onFavoritar: handleFavoritar,
          onVoltar: () => handleNavegar('models'),
          modelos,
          onAtualizar: handleAtualizarModelo,
          onDeletar: handleDeletarModelo,
          usuario,
          onRelatoCriado: (relato: PorscheProblema) => setMeusRelatos(prev => [relato, ...prev])
        });

      case 'register':
        return React.createElement(RegisterPage, {
          onCriar: handleCriarModelo,
          onNavegar: handleNavegar,
          onLogin: handleLogin
        });

      case 'account':
        return React.createElement(AccountPage, {
          usuario,
          modelos,
          favoritos,
          relatos: meusRelatos,
          onNavegar: handleNavegar,
          onVerDetalhes: handleVerDetalhes
        });

      default:
        return React.createElement(HomePage, {
          onNavegar: handleNavegar,
          onVerDetalhes: handleVerDetalhes,
          modelos
        });
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement(window.Navbar as React.ElementType, {
      paginaAtual,
      onNavegar: handleNavegar,
      totalFavoritos: favoritos.length
      ,
      usuarioNome: usuario?.nome,
      onLogout: handleLogout
    }),

    renderPagina(),

    React.createElement(window.Footer as React.ElementType, {
      onNavegar: handleNavegar
    })
  );
}

export default App;
