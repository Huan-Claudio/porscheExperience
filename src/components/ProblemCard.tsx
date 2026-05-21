import * as React from 'react';
import type { PorscheProblema } from '../types/porsche';

interface IProblemCardProps {
  problema: PorscheProblema;
  onResponder?: (relatoId: number, resposta: { autor: string; mensagem: string }) => Promise<void>;
}

window.ProblemCard = function ProblemCard({ problema, onResponder }: IProblemCardProps) {
  const [aberto, setAberto] = React.useState(false);
  const [autor, setAutor] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');
  const [enviando, setEnviando] = React.useState(false);

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
        onResponder && Number.isFinite(relatoId) && React.createElement('div', { className: 'reply-actions' },
          React.createElement('button', {
            type: 'button',
            className: 'btn-porsche-dark',
            onClick: () => setAberto(!aberto)
          },
            React.createElement('i', { className: aberto ? 'bi bi-x-lg' : 'bi bi-reply' }),
            aberto ? 'Cancelar' : 'Responder'
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

