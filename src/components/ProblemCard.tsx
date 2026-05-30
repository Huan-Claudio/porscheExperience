import * as React from 'react';
import type { PorscheProblema } from '../types/porsche';

interface IProblemCardProps {
  problema: PorscheProblema;
  onResponder?: (relatoId: number, resposta: { autor: string; mensagem: string }) => Promise<void>;
  onEditar?: (relatoId: number, relato: RelatoEditPayload) => Promise<void>;
  onExcluir?: (relatoId: number) => Promise<void>;
}

interface RelatoEditPayload {
  anoVeiculo?: number;
  km?: string;
  categoria: string;
  titulo: string;
  descricao: string;
  solucao?: string;
  email?: string;
}

window.ProblemCard = function ProblemCard({ problema, onResponder, onEditar, onExcluir }: IProblemCardProps) {
  const [aberto, setAberto] = React.useState(false);
  const [editando, setEditando] = React.useState(false);
  const [autor, setAutor] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');
  const [enviando, setEnviando] = React.useState(false);
  const [salvandoEdicao, setSalvandoEdicao] = React.useState(false);
  const [excluindo, setExcluindo] = React.useState(false);
  const [formEdicao, setFormEdicao] = React.useState({
    anoVeiculo: problema.anoVeiculo ? String(problema.anoVeiculo) : '',
    km: problema.km || '',
    categoria: problema.categoria || '',
    titulo: problema.titulo || '',
    descricao: problema.descricao || '',
    solucao: problema.solucao || '',
    email: problema.email || '',
  });

  React.useEffect(() => {
    setFormEdicao({
      anoVeiculo: problema.anoVeiculo ? String(problema.anoVeiculo) : '',
      km: problema.km || '',
      categoria: problema.categoria || '',
      titulo: problema.titulo || '',
      descricao: problema.descricao || '',
      solucao: problema.solucao || '',
      email: problema.email || '',
    });
  }, [problema]);

  const sevMap = {
    Alta: { iconClass: 'severity-alta', badgeClass: 'sev-alta', icon: 'bi-exclamation-triangle-fill' },
    Média: { iconClass: 'severity-media', badgeClass: 'sev-media', icon: 'bi-exclamation-circle-fill' },
    Baixa: { iconClass: 'severity-baixa', badgeClass: 'sev-baixa', icon: 'bi-info-circle-fill' },
  };

  const sev = sevMap[problema.severidade as keyof typeof sevMap] || sevMap.Baixa;
  const respostas = problema.respostas || [];
  const relatoId = typeof problema.id === 'number' ? problema.id : Number(problema.id);

  const handleResponder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onResponder || !Number.isFinite(relatoId) || !autor.trim() || !mensagem.trim()) return;

    try {
      setEnviando(true);
      await onResponder(relatoId, { autor: autor.trim(), mensagem: mensagem.trim() });
      setAutor('');
      setMensagem('');
      setAberto(false);
    } finally {
      setEnviando(false);
    }
  };

  const handleExcluir = async () => {
    if (!onExcluir || !Number.isFinite(relatoId)) return;

    const confirmado = window.confirm('Tem certeza que deseja excluir este relato e todas as respostas dele?');
    if (!confirmado) return;

    try {
      setExcluindo(true);
      await onExcluir(relatoId);
    } finally {
      setExcluindo(false);
    }
  };

  const handleEditar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onEditar || !Number.isFinite(relatoId)) return;

    if (!formEdicao.categoria.trim() || !formEdicao.titulo.trim() || !formEdicao.descricao.trim()) {
      alert('Preencha categoria, titulo e descricao.');
      return;
    }

    try {
      setSalvandoEdicao(true);
      await onEditar(relatoId, {
        anoVeiculo: formEdicao.anoVeiculo ? Number(formEdicao.anoVeiculo) : undefined,
        km: formEdicao.km.trim(),
        categoria: formEdicao.categoria.trim(),
        titulo: formEdicao.titulo.trim(),
        descricao: formEdicao.descricao.trim(),
        solucao: formEdicao.solucao.trim(),
        email: formEdicao.email.trim(),
      });
      setEditando(false);
    } finally {
      setSalvandoEdicao(false);
    }
  };

  return (
    React.createElement('div', { className: 'problem-card' },
      React.createElement('div', { className: `problem-icon ${sev.iconClass}` },
        React.createElement('i', { className: sev.icon })
      ),

      React.createElement('div', { className: 'flex-grow-1' },
        React.createElement('div', { className: 'd-flex justify-content-between align-items-start gap-2 mb-1' },
          React.createElement('h6', { className: 'problem-title' }, problema.titulo),
          React.createElement('span', { className: `severity-badge ${sev.badgeClass}` },
            'Severidade: ' + problema.severidade
          )
        ),
        React.createElement('p', { className: 'problem-desc mb-0' }, problema.descricao),
        problema.solucao && React.createElement('p', { className: 'problem-solution mb-0' },
          React.createElement('strong', null, 'Solução relatada: '),
          problema.solucao
        ),
        React.createElement('div', { className: 'problem-meta' },
          problema.categoria && React.createElement('span', null, problema.categoria),
          problema.anoVeiculo && React.createElement('span', null, String(problema.anoVeiculo)),
          problema.km && React.createElement('span', null, problema.km),
          React.createElement('span', null, `${respostas.length} resposta${respostas.length !== 1 ? 's' : ''}`)
        ),
        respostas.length > 0 && React.createElement('div', { className: 'reply-list' },
          respostas.map((resposta) =>
            React.createElement('div', { key: resposta.id || `${resposta.autor}-${resposta.dataCriacao}`, className: 'reply-item' },
              React.createElement('div', { className: 'reply-author' }, resposta.autor),
              React.createElement('p', null, resposta.mensagem)
            )
          )
        ),
        (onResponder || onEditar || onExcluir) && Number.isFinite(relatoId) && React.createElement('div', { className: 'reply-actions d-flex gap-2 flex-wrap' },
          onResponder && React.createElement('button', {
              type: 'button',
              className: 'btn-porsche-dark',
              onClick: () => setAberto(!aberto)
            },
              React.createElement('i', { className: aberto ? 'bi bi-x-lg' : 'bi bi-reply' }),
              aberto ? 'Cancelar' : 'Responder'
            ),
          onEditar && React.createElement('button', {
              type: 'button',
              className: 'btn-porsche-dark',
              onClick: () => {
                setEditando(!editando);
                if (!editando) setAberto(false);
              }
            },
              React.createElement('i', { className: editando ? 'bi bi-x-lg' : 'bi bi-pencil' }),
              editando ? 'Cancelar Edicao' : 'Editar'
            ),
          onExcluir && React.createElement('button', {
              type: 'button',
              className: 'btn-porsche problem-delete-button',
              disabled: excluindo,
              onClick: handleExcluir
            },
              React.createElement('i', { className: excluindo ? 'bi bi-hourglass-split' : 'bi bi-trash' }),
              excluindo ? 'Excluindo...' : 'Excluir'
            )
        ),
        editando && React.createElement('form', { className: 'reply-form', onSubmit: handleEditar },
          React.createElement('div', { className: 'row g-2' },
            React.createElement('div', { className: 'col-md-4' },
              React.createElement('label', { className: 'form-label' }, 'Ano do Veiculo'),
              React.createElement('input', {
                type: 'number',
                className: 'form-control',
                value: formEdicao.anoVeiculo,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormEdicao({ ...formEdicao, anoVeiculo: e.target.value })
              })
            ),
            React.createElement('div', { className: 'col-md-4' },
              React.createElement('label', { className: 'form-label' }, 'Quilometragem'),
              React.createElement('input', {
                className: 'form-control',
                value: formEdicao.km,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormEdicao({ ...formEdicao, km: e.target.value })
              })
            ),
            React.createElement('div', { className: 'col-md-4' },
              React.createElement('label', { className: 'form-label' }, 'Categoria'),
              React.createElement('select', {
                className: 'form-select',
                value: formEdicao.categoria,
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setFormEdicao({ ...formEdicao, categoria: e.target.value })
              },
                ['Motor', 'Transmissao', 'Suspensao', 'Freios', 'Eletrica / Eletronica', 'Carroceria', 'Interior', 'Outro'].map((categoria) =>
                  React.createElement('option', { key: categoria, value: categoria }, categoria)
                )
              )
            ),
            React.createElement('div', { className: 'col-12' },
              React.createElement('label', { className: 'form-label' }, 'Titulo'),
              React.createElement('input', {
                className: 'form-control',
                value: formEdicao.titulo,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormEdicao({ ...formEdicao, titulo: e.target.value })
              })
            ),
            React.createElement('div', { className: 'col-12' },
              React.createElement('label', { className: 'form-label' }, 'Descricao'),
              React.createElement('textarea', {
                className: 'form-control',
                rows: 3,
                value: formEdicao.descricao,
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setFormEdicao({ ...formEdicao, descricao: e.target.value })
              })
            ),
            React.createElement('div', { className: 'col-12' },
              React.createElement('label', { className: 'form-label' }, 'Solucao'),
              React.createElement('textarea', {
                className: 'form-control',
                rows: 2,
                value: formEdicao.solucao,
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setFormEdicao({ ...formEdicao, solucao: e.target.value })
              })
            ),
            React.createElement('div', { className: 'col-12' },
              React.createElement('label', { className: 'form-label' }, 'E-mail'),
              React.createElement('input', {
                type: 'email',
                className: 'form-control',
                value: formEdicao.email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormEdicao({ ...formEdicao, email: e.target.value })
              })
            )
          ),
          React.createElement('button', { type: 'submit', className: 'btn-porsche mt-2', disabled: salvandoEdicao },
            React.createElement('i', { className: salvandoEdicao ? 'bi bi-hourglass-split' : 'bi bi-check2' }),
            salvandoEdicao ? 'Salvando...' : 'Salvar Relato'
          )
        ),
        aberto && React.createElement('form', { className: 'reply-form', onSubmit: handleResponder },
          React.createElement('div', { className: 'row g-2' },
            React.createElement('div', { className: 'col-md-4' },
              React.createElement('input', {
                className: 'form-control',
                placeholder: 'Seu nome',
                value: autor,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAutor(e.target.value)
              })
            ),
            React.createElement('div', { className: 'col-md-8' },
              React.createElement('input', {
                className: 'form-control',
                placeholder: 'Compartilhe sua resposta ou solução',
                value: mensagem,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMensagem(e.target.value)
              })
            )
          ),
          React.createElement('button', { type: 'submit', className: 'btn-porsche mt-2', disabled: enviando },
            React.createElement('i', { className: enviando ? 'bi bi-hourglass-split' : 'bi bi-send' }),
            enviando ? 'Enviando...' : 'Enviar Resposta'
          )
        )
      )
    )
  );
};

export default window.ProblemCard;

