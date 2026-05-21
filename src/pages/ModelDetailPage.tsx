// ============================================================
//  src/pages/ModelDetailPage.tsx
//  Props: { modeloId: string, favoritos: string[],
//           onFavoritar: (id)=>void, onVoltar: ()=>void }
// ============================================================

import * as React from 'react';
import problemReportService from '../services/problemReportService';
import porscheModelService from '../services/porscheModelService';
import type { PorscheModel, PorscheProblema, UsuarioLogado } from '../types/porsche';

// Função de download
const baixarManual = (modelo: PorscheModel) => {
  const url = `/manuais/${modelo.manualId}.pdf`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  link.click();
};

declare global {
  interface Window {
    ProblemCard: any;
    FaqItem: any;
  }
}

interface IModelDetailPageProps {
  modeloId: string | null;
  favoritos: string[];
  modelos: PorscheModel[];
  onFavoritar: (id: string | number) => void;
  onVoltar: () => void;
  onAtualizar?: (id: number, modelo: PorscheModel) => void;
  onDeletar?: (id: number) => void;
  usuario?: UsuarioLogado | null;
  onRelatoCriado?: (relato: PorscheProblema) => void;
}

function ModelDetailPage({ modeloId, favoritos, modelos, onFavoritar, onVoltar, usuario, onRelatoCriado }: IModelDetailPageProps) {
  const [reportSuccess, setReportSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    anoVeiculo: '',
    km: '',
    categoria: '',
    titulo: '',
    descricao: '',
    solucao: '',
    email: ''
  });
  const [relatos, setRelatos] = React.useState<PorscheProblema[]>([]);
  const [carregandoRelatos, setCarregandoRelatos] = React.useState(false);
  const modelo = modelos && modelos.length > 0
    ? modelos.find((m) =>
        String(m.id) === String(modeloId) || m.slug === modeloId || m.nome === modeloId
      )
    : null;

  React.useEffect(() => {
    const modeloNumerico = Number(modelo?.id);
    if (!modelo || !Number.isFinite(modeloNumerico)) {
      setRelatos(modelo?.problemas || []);
      return;
    }

    const carregarRelatos = async () => {
      try {
        setCarregandoRelatos(true);
        const dados = await problemReportService.listarPorModelo(modeloNumerico);
        setRelatos(dados.length > 0 ? dados : modelo.problemas);
      } catch (error) {
        console.error('Erro ao carregar relatos:', error);
        setRelatos(modelo.problemas);
      } finally {
        setCarregandoRelatos(false);
      }
    };

    carregarRelatos();
  }, [modelo]);

  if (!modelo) {
    return React.createElement('div', { className: 'container py-5 text-center' },
      React.createElement('h2', null, 'Modelo não encontrado'),
      React.createElement('button', { className: 'btn-porsche mt-3', onClick: onVoltar }, 'Voltar')
    );
  }

  const favoritado = favoritos.includes(String(modelo.id));

  const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.anoVeiculo || !formData.categoria || !formData.titulo || !formData.descricao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const modeloNumerico = await resolverModeloIdBanco(modelo);
    if (!modeloNumerico) {
      alert('Não foi possível identificar este modelo no banco. Recarregue a página com o backend ligado e tente novamente.');
      return;
    }

    try {
      const novoRelato = await problemReportService.criar(modeloNumerico, {
        porscheModelId: modeloNumerico,
        cadastroId: usuario?.id,
        anoVeiculo: Number(formData.anoVeiculo),
        km: formData.km,
        categoria: formData.categoria,
        titulo: formData.titulo,
        descricao: formData.descricao,
        solucao: formData.solucao,
        email: formData.email,
        severidade: formData.categoria === 'Motor' || formData.categoria === 'Freios' ? 'Alta' : 'Média',
      });

      setRelatos(prev => [novoRelato, ...prev]);
      onRelatoCriado?.(novoRelato);
      setReportSuccess(true);
      setFormData({ anoVeiculo: '', km: '', categoria: '', titulo: '', descricao: '', solucao: '', email: '' });
      const formElement = document.getElementById('reportForm');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Não foi possível enviar o relato. Verifique o backend e tente novamente.');
    }
  };

  const resolverModeloIdBanco = async (modeloAtual: PorscheModel): Promise<number | null> => {
    if (typeof modeloAtual.id === 'number') return modeloAtual.id;

    try {
      const modelosBanco = await porscheModelService.listarTodos();
      const modeloBanco = modelosBanco.find((item) =>
        item.nome === modeloAtual.nome ||
        item.slug === modeloAtual.slug ||
        item.manualId === modeloAtual.manualId
      );

      if (typeof modeloBanco?.id === 'number') return modeloBanco.id;
    } catch (error) {
      console.error('Erro ao resolver modelo no banco:', error);
    }

    return null;
  };

  const handleResponderRelato = async (relatoId: number, resposta: { autor: string; mensagem: string }) => {
    const novaResposta = await problemReportService.responder(relatoId, resposta);
    setRelatos(prev => prev.map(relato =>
      Number(relato.id) === relatoId
        ? { ...relato, respostas: [...(relato.respostas || []), novaResposta] }
        : relato
    ));
  };

  const anos = [];
  for (let y = 2025; y >= 1963; y--) anos.push(y);

  return (
    React.createElement('main', null,

      // ── MODEL HERO ──
      React.createElement('section', { className: 'model-hero-dark' },
        React.createElement('div', { className: 'row g-0' },

          // Image col
          React.createElement('div', { className: 'col-lg-6' },
            React.createElement('img', {
              src: modelo.imagem,
              alt: modelo.nome,
              className: 'model-hero-img',
              onError: (e: any) => { (e.target as HTMLImageElement).src = 'imagens/hero.jpg'; }
            })
          ),

          // Content col
          React.createElement('div', { className: 'col-lg-6' },
            React.createElement('div', { className: 'model-hero-body' },

              // Back button
              React.createElement('button', {
                className: 'btn-porsche-outline mb-4',
                style: { fontSize: '11px', padding: '8px 16px' },
                onClick: onVoltar
              },
                React.createElement('i', { className: 'bi bi-arrow-left' }), 'Todos os Modelos'
              ),

              React.createElement('span', { className: 'section-label' }, modelo.tagline),
              React.createElement('h1', {
                style: {
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem,5vw,4rem)',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-1px',
                  marginBottom: '8px'
                }
              }, modelo.nome),

              React.createElement('div', { className: 'divider-red' }),

              React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '28px' } },
                modelo.descricao
              ),

              // Stats inline
              React.createElement('div', { className: 'd-flex gap-4 mb-32 flex-wrap', style: { marginBottom: '28px' } },
                modelo.specs.map((s: any, i: number) =>
                  React.createElement('div', { key: i },
                    React.createElement('div', {
                      style: { fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'white', lineHeight: 1 }
                    }, s.valor),
                    React.createElement('div', {
                      style: { fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.45)', marginTop: 4 }
                    }, s.label)
                  )
                )
              ),

              // Actions
              React.createElement('div', { className: 'd-flex gap-3 flex-wrap' },
                React.createElement('button', {
                  className: `btn-fav ${favoritado ? 'active' : ''}`,
                  style: { padding: '12px 70px' },
                  onClick: () => onFavoritar(modelo.id)
                },
                  React.createElement('i', { className: favoritado ? 'bi bi-heart-fill' : 'bi bi-heart' }),
                  React.createElement('span', { style: { fontSize: '12px', marginLeft: '8px', textTransform: 'uppercase', letterSpacing: '1px' } },
                    favoritado ? ' Favoritado' : ' Favoritar'
                  )
                )
              )
            )
          )
        )
      ),

      // ── ESPECIFICAÇÕES ──
      React.createElement('section', { className: 'model-detail-section', style: { background: 'white' } },
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'text-center mb-5' },
            React.createElement('span', { className: 'section-label' }, 'Especificações'),
            React.createElement('h2', { className: 'section-title' }, 'Números que impressionam'),
            React.createElement('div', { className: 'divider-red mx-auto' })
          ),
          React.createElement('div', { className: 'specs-grid' },
            modelo.specsDetalhe.map((s: any, i: number) =>
              React.createElement('div', { key: i, className: 'spec-box' },
                React.createElement('div', { className: 'spec-box-icon' },
                  React.createElement('i', { className: s.icone })
                ),
                React.createElement('div', { className: 'spec-box-value' }, s.valor),
                React.createElement('div', { className: 'spec-box-label' }, s.label)
              )
            )
          )
        )
      ),

      
      // ── MANUAL ──
      React.createElement('section', { className: 'manual-section py-5 py-lg-6' },
        React.createElement('div', { className: 'container py-4' },
          React.createElement('div', { className: 'row g-5 align-items-center' },
            React.createElement('div', { className: 'col-lg-5' },
              React.createElement('span', { className: 'section-label' }, 'Documentação'),
              React.createElement('h2', { className: 'section-title', style: { color: 'white' } }, 'Manual do', React.createElement('br'), 'Proprietário'),
              React.createElement('div', { className: 'divider-red' }),
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', lineHeight: 1.85 } },
                `Baixe o manual completo do seu ${modelo.nome}. Todas as informações sobre operação, manutenção preventiva, especificações técnicas e recursos do seu veículo em um documento oficial da Porsche.`
              ),
              React.createElement(
                'button',
                {
                  className: 'btn-porsche mt-4',
                  onClick: () => baixarManual(modelo)
                },
                React.createElement('i', { className: 'bi bi-download' }),
                ' Baixar Manual PDF'
              )
            ),
            React.createElement('div', { className: 'col-lg-7' },
              React.createElement('div', { className: 'row g-3' },
                [
                  { icon: 'bi-file-text', titulo: 'Manual Completo', desc: 'Instruções detalhadas de operação' },
                  { icon: 'bi-book', titulo: 'Guia Rápido', desc: 'Principais funções e comandos' },
                  { icon: 'bi-wrench', titulo: 'Manutenção', desc: 'Intervalos e procedimentos' },
                  { icon: 'bi-download', titulo: 'Download', desc: 'Formato PDF oficial' },
                ].map((d, i) =>
                  React.createElement('div', { key: i, className: 'col-6' },
                    React.createElement('div', { className: 'manual-doc-card' },
                      React.createElement('div', { className: 'manual-doc-icon' },
                        React.createElement('i', { className: d.icon })
                      ),
                      React.createElement('div', { className: 'manual-doc-title' }, d.titulo),
                      React.createElement('div', { className: 'manual-doc-desc' }, d.desc)
                    )
                  )
                )
              )
            )
          )
        )
      ),

      // ── PROBLEMAS CONHECIDOS ──
      React.createElement('section', { className: 'model-detail-section' },
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'text-center mb-5' },
            React.createElement('span', { className: 'section-label' }, 'Atenção'),
            React.createElement('h2', { className: 'section-title' }, 'Problemas Conhecidos'),
            React.createElement('div', { className: 'divider-red mx-auto' }),
            React.createElement('p', { className: 'text-muted mx-auto', style: { maxWidth: 600, fontSize: 14 } },
              'Informações sobre problemas crônicos reportados por proprietários e documentados pela comunidade. Conhecer esses pontos ajuda na manutenção preventiva.'
            )
          ),

          carregandoRelatos && React.createElement('p', { className: 'text-muted text-center' }, 'Carregando relatos do banco...'),

          relatos.map((p, i) =>
            React.createElement(window.ProblemCard, {
              key: p.id || i,
              problema: p,
              onResponder: handleResponderRelato
            })
          ),

          // Nota
          React.createElement('div', { className: 'problem-card mt-3', style: { borderLeft: '3px solid #ccc' } },
            React.createElement('div', { className: 'problem-icon', style: { background: 'rgba(0,0,0,0.06)', color: '#666' } },
              React.createElement('i', { className: 'bi bi-info-circle-fill' })
            ),
            React.createElement('div', null,
              React.createElement('h6', { className: 'problem-title' }, 'Nota Importante'),
              React.createElement('p', { className: 'problem-desc mb-0' },
                'Essas informações são baseadas em relatos de proprietários e fóruns especializados. Nem todos os veículos apresentam esses problemas. Recomendamos sempre realizar inspeções em concessionárias autorizadas Porsche para diagnósticos precisos.'
              )
            )
          )
        )
      ),

      // ── RELATAR PROBLEMA ──
      React.createElement('section', { id: 'reportForm', className: 'model-detail-section', style: { background: '#f7f5f2' } },
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'text-center mb-5' },
            React.createElement('span', { className: 'section-label' }, 'Compartilhe sua experiência'),
            React.createElement('h2', { className: 'section-title' }, 'Relatar um Problema'),
            React.createElement('div', { className: 'divider-red mx-auto' }),
            React.createElement('p', { className: 'text-muted', style: { fontSize: 14 } },
              `Teve algum problema com seu ${modelo.nome}? Compartilhe sua experiência para ajudar outros proprietários.`
            )
          ),

          React.createElement('div', { className: 'row justify-content-center' },
            React.createElement('div', { className: 'col-lg-8' },
              React.createElement('div', { className: 'report-form-wrap' },

                // Alert
                React.createElement('div', { className: 'form-alert' },
                  React.createElement('i', { className: 'bi bi-shield-check' }),
                  React.createElement('span', null,
                    'Seu relato é anônimo e será analisado pela nossa equipe antes de ser publicado. Informações pessoais não serão compartilhadas.'
                  )
                ),

                // Success
                reportSuccess && React.createElement('div', { className: 'success-msg show' },
                  React.createElement('i', { className: 'bi bi-check-circle-fill text-danger me-2' }),
                  `Relato enviado com sucesso! Obrigado por contribuir com a comunidade ${modelo.nome}.`
                ),

                // Form
                React.createElement('form', { onSubmit: handleReport },

                  React.createElement('div', { className: 'row g-3 mb-3' },
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('label', { className: 'form-label' }, 'Ano do Veículo *'),
                      React.createElement('select', {
                        className: 'form-select',
                        value: formData.anoVeiculo,
                        onChange: (e: any) => setFormData({...formData, anoVeiculo: (e.target as HTMLSelectElement).value})
                      },
                        React.createElement('option', { value: '' }, 'Selecione o ano'),
                        anos.map(a => React.createElement('option', { key: a, value: a }, a))
                      )
                    ),
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('label', { className: 'form-label' }, 'Quilometragem Aproximada'),
                      React.createElement('input', {
                        type: 'text',
                        className: 'form-control',
                        placeholder: 'Ex: 45.000 km',
                        value: formData.km,
                        onChange: e => setFormData({...formData, km: e.target.value})
                      })
                    )
                  ),

                  React.createElement('div', { className: 'mb-3' },
                    React.createElement('label', { className: 'form-label' }, 'Categoria do Problema *'),
                    React.createElement('select', {
                      className: 'form-select',
                      value: formData.categoria,
                      onChange: (e: any) => setFormData({...formData, categoria: (e.target as HTMLSelectElement).value})
                    },
                      React.createElement('option', { value: '' }, 'Selecione uma categoria'),
                      ['Motor', 'Transmissão', 'Suspensão', 'Freios', 'Elétrica / Eletrônica', 'Carroceria', 'Interior', 'Outro'].map(c =>
                        React.createElement('option', { key: c, value: c }, c)
                      )
                    )
                  ),

                  React.createElement('div', { className: 'mb-3' },
                    React.createElement('label', { className: 'form-label' }, 'Título do Problema *'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      placeholder: 'Descreva o problema em poucas palavras',
                      value: formData.titulo,
                      onChange: e => setFormData({...formData, titulo: e.target.value})
                    })
                  ),

                  React.createElement('div', { className: 'mb-3' },
                    React.createElement('label', { className: 'form-label' }, 'Descrição Detalhada *'),
                    React.createElement('textarea', {
                      className: 'form-control',
                      rows: 4,
                      placeholder: 'Descreva o problema com o máximo de detalhes possível: quando começou, em quais situações ocorre, se há algum padrão, etc.',
                      value: formData.descricao,
                      onChange: (e: any) => setFormData({...formData, descricao: (e.target as HTMLTextAreaElement).value})
                    })
                  ),

                  React.createElement('div', { className: 'mb-3' },
                    React.createElement('label', { className: 'form-label' }, 'Solução Encontrada (opcional)'),
                    React.createElement('textarea', {
                      className: 'form-control',
                      rows: 3,
                      placeholder: 'Se você já resolveu o problema, compartilhe como foi feito e qual foi o custo aproximado.',
                      value: formData.solucao,
                      onChange: (e: any) => setFormData({...formData, solucao: (e.target as HTMLTextAreaElement).value})
                    })
                  ),

                  React.createElement('div', { className: 'mb-4' },
                    React.createElement('label', { className: 'form-label' }, 'E-mail para Contato (opcional)'),
                    React.createElement('input', {
                      type: 'email',
                      className: 'form-control',
                      placeholder: 'Caso queira receber atualizações sobre seu relato',
                      value: formData.email,
                      onChange: (e: any) => setFormData({...formData, email: (e.target as HTMLInputElement).value})
                    })
                  ),

                  React.createElement('button', { type: 'submit', className: 'btn-porsche w-100', style: { justifyContent: 'center', padding: '16px' } },
                    React.createElement('i', { className: 'bi bi-send' }), ' Enviar Relato'
                  )
                )
              )
            )
          )
        )
      ),

      // ── FAQ ──
      React.createElement('section', { className: 'model-detail-section', style: { background: 'white' } },
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'text-center mb-5' },
            React.createElement('span', { className: 'section-label' }, 'Saiba mais'),
            React.createElement('h2', { className: 'section-title' }, 'Perguntas Frequentes'),
            React.createElement('div', { className: 'divider-red mx-auto' })
          ),
          React.createElement('div', { className: 'row justify-content-center' },
            React.createElement('div', { className: 'col-lg-8' },
              modelo.faq.map((f: any, i: number) =>
                React.createElement(window.FaqItem, { key: i, faq: f })
              )
            )
          )
        )
      )
    )
  );
}

// Make it available globally
window.ModelDetailPage = ModelDetailPage;

export default ModelDetailPage;
