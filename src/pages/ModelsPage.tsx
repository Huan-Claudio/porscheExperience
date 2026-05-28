import * as React from 'react';
import type { PorscheModel } from '../types/porsche';

declare global {
  interface Window {
    Dashboard: unknown;
    ModelCard: unknown;
  }
}

interface IModelsPageProps {
  favoritos: string[];
  modelos: PorscheModel[];
  onFavoritar: (id: string | number) => void;
  onVerDetalhes: (id: string | number) => void;
  onCriar?: (modelo: PorscheModel) => Promise<void>;
  onAtualizar?: (id: number, modelo: PorscheModel) => Promise<void>;
}

const modeloVazio: PorscheModel = {
  id: 0,
  slug: '',
  manualId: '',
  nome: '',
  tagline: '',
  descricao: '',
  badge: '',
  badgeClass: 'badge-esportivo',
  imagem: 'imagens/hero.jpg',
  potenciaBase: 300,
  potenciaTurbo: 400,
  velocidadeMaxima: 250,
  aceleracaoZeroCem: 4,
  cambio: 'PDK',
  anoLancamento: new Date().getFullYear(),
  specs: [],
  specsDetalhe: [],
  problemas: [],
  faq: [],
  ativo: true,
};

window.ModelsPage = function ModelsPage({
  favoritos,
  modelos,
  onFavoritar,
  onVerDetalhes,
  onCriar,
  onAtualizar,
}: IModelsPageProps) {
  const [formAberto, setFormAberto] = React.useState(false);
  const [editandoId, setEditandoId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<PorscheModel>(modeloVazio);

  const abrirCriacao = () => {
    setEditandoId(null);
    setForm(modeloVazio);
    setFormAberto(true);
  };

  const abrirEdicao = (modelo: PorscheModel) => {
    const id = Number(modelo.id);
    if (!Number.isFinite(id)) return;
    setEditandoId(id);
    setForm(modelo);
    setFormAberto(true);
  };

  const salvarModelo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.tagline.trim() || !form.descricao.trim()) {
      alert('Preencha nome, categoria e descricao.');
      return;
    }

    const slug = form.slug || form.nome.toLowerCase().replace(/^porsche\s+/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const payload: PorscheModel = {
      ...form,
      slug,
      manualId: form.manualId || slug,
      badge: form.badge || form.tagline,
      specs: [
        { valor: form.potenciaBase, label: 'CV Base' },
        { valor: form.potenciaTurbo, label: 'CV Turbo' },
        { valor: form.velocidadeMaxima, label: 'km/h' },
      ],
    };

    if (editandoId && onAtualizar) {
      await onAtualizar(editandoId, payload);
    } else if (onCriar) {
      await onCriar(payload);
    }

    setFormAberto(false);
    setEditandoId(null);
    setForm(modeloVazio);
  };

  return (
    React.createElement('main', null,
      React.createElement('div', { className: 'page-header' },
        React.createElement('div', { className: 'container' },
          React.createElement('span', { className: 'section-label' }, 'Linha completa'),
          React.createElement('h1', { className: 'page-title' }, 'Todos os', React.createElement('br'), 'Modelos'),
          React.createElement('div', { className: 'divider-red' })
        )
      ),

      React.createElement('div', { className: 'container-fluid px-0' },
        React.createElement('div', { className: 'row g-0' },
          React.createElement('div', { className: 'col-lg-3' },
            React.createElement(window.Dashboard as React.ElementType, {
              favoritos,
              modelos,
              onVerDetalhes,
            })
          ),

          React.createElement('div', { className: 'col-lg-9' },
            React.createElement('section', { className: 'py-5 px-4 px-lg-5' },
              React.createElement('div', { className: 'mb-4 d-flex justify-content-between align-items-center gap-3 flex-wrap' },
                React.createElement('p', { style: { fontSize: '14px', color: '#888', margin: 0 } },
                  `${modelos.length} modelos disponiveis - ${favoritos.length} favoritado${favoritos.length !== 1 ? 's' : ''}`
                ),
                React.createElement('button', { className: 'btn-porsche', onClick: abrirCriacao },
                  React.createElement('i', { className: 'bi bi-plus-lg' }),
                  ' Novo Modelo'
                )
              ),

              formAberto && React.createElement('form', { className: 'management-form mb-4', onSubmit: salvarModelo },
                React.createElement('div', { className: 'row g-3' },
                  input('Nome', form.nome, (value) => setForm({ ...form, nome: value }), 'col-md-6'),
                  input('Categoria', form.tagline, (value) => setForm({ ...form, tagline: value, badge: value }), 'col-md-6'),
                  input('Imagem', form.imagem, (value) => setForm({ ...form, imagem: value }), 'col-md-6'),
                  input('Cambio', form.cambio, (value) => setForm({ ...form, cambio: value }), 'col-md-6'),
                  inputNumber('Potencia base', form.potenciaBase, (value) => setForm({ ...form, potenciaBase: value })),
                  inputNumber('Potencia turbo', form.potenciaTurbo, (value) => setForm({ ...form, potenciaTurbo: value })),
                  inputNumber('Velocidade maxima', form.velocidadeMaxima, (value) => setForm({ ...form, velocidadeMaxima: value })),
                  inputNumber('0-100 km/h', form.aceleracaoZeroCem, (value) => setForm({ ...form, aceleracaoZeroCem: value })),
                  inputNumber('Ano lancamento', form.anoLancamento, (value) => setForm({ ...form, anoLancamento: value }))
                ),
                React.createElement('div', { className: 'mt-3' },
                  React.createElement('label', { className: 'form-label' }, 'Descricao'),
                  React.createElement('textarea', {
                    className: 'form-control',
                    rows: 3,
                    value: form.descricao,
                    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, descricao: e.target.value }),
                  })
                ),
                React.createElement('div', { className: 'd-flex gap-2 mt-3 flex-wrap' },
                  React.createElement('button', { className: 'btn-porsche', type: 'submit' },
                    editandoId ? 'Atualizar Modelo' : 'Cadastrar Modelo'
                  ),
                  React.createElement('button', { className: 'btn-porsche-dark', type: 'button', onClick: () => setFormAberto(false) },
                    'Cancelar'
                  )
                )
              ),

              React.createElement('div', { className: 'row g-4' },
                modelos.map((modelo) =>
                  React.createElement('div', { key: modelo.id, className: 'col-md-6 col-xl-4' },
                    React.createElement(window.ModelCard as React.ElementType, {
                      modelo,
                      favoritado: favoritos.includes(String(modelo.id)),
                      onFavoritar,
                      onVerDetalhes,
                    }),
                    React.createElement('div', { className: 'd-flex gap-2 mt-2' },
                      React.createElement('button', { className: 'btn-porsche-dark flex-grow-1', onClick: () => abrirEdicao(modelo) },
                        React.createElement('i', { className: 'bi bi-pencil' }),
                        ' Editar'
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

const input = (
  label: string,
  value: string,
  onChange: (value: string) => void,
  className = 'col-md-4'
) => React.createElement('div', { className },
  React.createElement('label', { className: 'form-label' }, label),
  React.createElement('input', {
    className: 'form-control',
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  })
);

const inputNumber = (
  label: string,
  value: number,
  onChange: (value: number) => void
) => React.createElement('div', { className: 'col-md-4' },
  React.createElement('label', { className: 'form-label' }, label),
  React.createElement('input', {
    type: 'number',
    className: 'form-control',
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
  })
);

export default window.ModelsPage as React.ElementType;
