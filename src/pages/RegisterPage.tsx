// ============================================================
//  src/pages/RegisterPage.tsx
//  Layout assimétrico: section (col-lg-7) + aside (col-lg-5)
//  Props: {}
// ============================================================

import * as React from 'react';

declare global {
  interface Window {
    PORSCHE_DATA: any[];
  }
}

interface IRegistroForm {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  senhaConf: string;
  cidade: string;
  estado: string;
  dataNasc: string;
  modeloFav: string;
  obs: string;
  newsletter: boolean;
}

interface IErrors {
  nome?: string;
  email?: string;
  cidade?: string;
  senha?: string;
  senhaConf?: string;
}

window.RegisterPage = function RegisterPage() {
  const { useState } = React;

  // IRegistroForm interface
  const [form, setForm] = useState<IRegistroForm>({
    nome: '', sobrenome: '', email: '',
    senha: '', senhaConf: '', cidade: '',
    estado: '', dataNasc: '', modeloFav: '',
    obs: '', newsletter: false
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState<IErrors>({});

  const validate = (): IErrors => {
    const e: IErrors = {};
    if (!form.nome.trim())      e.nome = 'Nome obrigatório';
    if (!form.email.trim())     e.email = 'E-mail obrigatório';
    if (!form.cidade.trim())    e.cidade = 'Cidade obrigatória';
    if (form.senha.length < 8)  e.senha = 'Mínimo 8 caracteres';
    if (form.senha !== form.senhaConf) e.senhaConf = 'Senhas não conferem';
    return e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const modelo = form.modeloFav || 'um modelo Porsche';
    setSuccessMsg(`${form.nome}, cadastro realizado com sucesso! Bem-vindo à comunidade Porsche. Seu interesse no ${modelo} foi registrado.`);
    console.log('Cadastro enviado:', form);
    setForm({ nome:'',sobrenome:'',email:'',senha:'',senhaConf:'',cidade:'',estado:'',dataNasc:'',modeloFav:'',obs:'',newsletter:false });
    setErrors({});
  };

  // @ts-ignore - Helper function for form field generation
  const _field = (id: keyof IRegistroForm, label: string, type: string = 'text', placeholder: string = '', required: boolean = false) => {
    return React.createElement('div', { className: 'mb-3' },
      React.createElement('label', { className: 'form-label' }, label + (required ? ' *' : '')),
      React.createElement('input', {
        type,
        className: `form-control ${errors[id as keyof IErrors] ? 'is-invalid' : ''}`,
        placeholder,
        value: form[id],
        onChange: (e: any) => { 
          setForm({...form, [id]: (e.target as HTMLInputElement).value}); 
          setErrors({...errors, [id as keyof IErrors]: ''}); 
        }
      }),
      errors[id as keyof IErrors] && React.createElement('div', { className: 'invalid-feedback' }, errors[id as keyof IErrors])
    );
  };

  return (
    React.createElement('main', null,

      // Page Header
      React.createElement('div', { className: 'page-header' },
        React.createElement('div', { className: 'container' },
          React.createElement('span', { className: 'section-label' }, 'Registre-se'),
          React.createElement('h1', { className: 'page-title' }, 'Seu Porsche', React.createElement('br'), 'começa aqui.'),
          React.createElement('div', { className: 'divider-red' })
        )
      ),

      // Content
      React.createElement('div', { className: 'container py-5 py-lg-6' },
        React.createElement('div', { className: 'row g-5' },

          // ── SECTION: Formulário (col-lg-7) ──
          React.createElement('section', { className: 'col-lg-7' },
            React.createElement('div', { className: 'report-form-wrap' },

              React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 6 } },
                'Formulário de Cadastro'
              ),
              React.createElement('p', { className: 'text-secondary mb-4', style: { fontSize: 14 } },
                'Preencha os dados abaixo para se cadastrar na plataforma.'
              ),

              // Success
              successMsg && React.createElement('div', { className: 'success-msg show' },
                React.createElement('i', { className: 'bi bi-check-circle-fill text-danger me-2' }),
                successMsg
              ),

              React.createElement('form', { onSubmit: handleSubmit, noValidate: true },

                // Nome / Sobrenome
                React.createElement('div', { className: 'row g-3 mb-3' },
                  React.createElement('div', { className: 'col-md-6' },
                    React.createElement('label', { className: 'form-label' }, 'Nome *'),
                    React.createElement('input', {
                      type: 'text', className: `form-control ${errors.nome ? 'is-invalid' : ''}`,
                      placeholder: 'Seu nome', value: form.nome,
                    onChange: (e: any) => { setForm({...form, nome: (e.target as HTMLInputElement).value}); setErrors({...errors, nome:''}); }
                    }),
                    errors.nome && React.createElement('div', { className: 'invalid-feedback' }, errors.nome)
                  ),
                  React.createElement('div', { className: 'col-md-6' },
                    React.createElement('label', { className: 'form-label' }, 'Sobrenome'),
                    React.createElement('input', {
                      type: 'text', className: 'form-control',
                      placeholder: 'Seu sobrenome', value: form.sobrenome,
                      onChange: (e: any) => setForm({...form, sobrenome: (e.target as HTMLInputElement).value})
                    })
                  )
                ),

                // Email
                React.createElement('div', { className: 'mb-3' },
                  React.createElement('label', { className: 'form-label' }, 'E-mail *'),
                  React.createElement('input', {
                    type: 'email', className: `form-control ${errors.email ? 'is-invalid' : ''}`,
                    placeholder: 'seu@email.com', value: form.email,
                    onChange: (e: any) => { setForm({...form, email: (e.target as HTMLInputElement).value}); setErrors({...errors, email:''}); }
                  }),
                  errors.email && React.createElement('div', { className: 'invalid-feedback' }, errors.email)
                ),

                // Senha
                React.createElement('div', { className: 'row g-3 mb-3' },
                  React.createElement('div', { className: 'col-md-6' },
                    React.createElement('label', { className: 'form-label' }, 'Senha *'),
                    React.createElement('input', {
                      type: 'password', className: `form-control ${errors.senha ? 'is-invalid' : ''}`,
                      placeholder: 'Mínimo 8 caracteres', value: form.senha,
                      onChange: (e: any) => { setForm({...form, senha: (e.target as HTMLInputElement).value}); setErrors({...errors, senha:''}); }
                    }),
                    errors.senha && React.createElement('div', { className: 'invalid-feedback' }, errors.senha)
                  ),
                  React.createElement('div', { className: 'col-md-6' },
                    React.createElement('label', { className: 'form-label' }, 'Confirmar Senha *'),
                    React.createElement('input', {
                      type: 'password', className: `form-control ${errors.senhaConf ? 'is-invalid' : ''}`,
                      placeholder: 'Repita a senha', value: form.senhaConf,
                      onChange: (e: any) => { setForm({...form, senhaConf: (e.target as HTMLInputElement).value}); setErrors({...errors, senhaConf:''}); }
                    }),
                    errors.senhaConf && React.createElement('div', { className: 'invalid-feedback' }, errors.senhaConf)
                  )
                ),

                // Cidade / Estado
                React.createElement('div', { className: 'row g-3 mb-3' },
                  React.createElement('div', { className: 'col-md-7' },
                    React.createElement('label', { className: 'form-label' }, 'Cidade *'),
                    React.createElement('input', {
                      type: 'text', className: `form-control ${errors.cidade ? 'is-invalid' : ''}`,
                      placeholder: 'Sua cidade', value: form.cidade,
                      onChange: (e: any) => { setForm({...form, cidade: (e.target as HTMLInputElement).value}); setErrors({...errors, cidade:''}); }
                    }),
                    errors.cidade && React.createElement('div', { className: 'invalid-feedback' }, errors.cidade)
                  ),
                  React.createElement('div', { className: 'col-md-5' },
                    React.createElement('label', { className: 'form-label' }, 'Estado'),
                    React.createElement('select', {
                      className: 'form-select', value: form.estado,
                      onChange: (e: any) => setForm({...form, estado: (e.target as HTMLSelectElement).value})
                    },
                      React.createElement('option', { value: '' }, 'Selecione'),
                      ['SP','RJ','MG','RS','PR','SC','BA','CE','DF','GO','Outro'].map(s =>
                        React.createElement('option', { key: s, value: s }, s)
                      )
                    )
                  )
                ),

                // Data de nascimento
                React.createElement('div', { className: 'mb-3' },
                  React.createElement('label', { className: 'form-label' }, 'Data de nascimento'),
                  React.createElement('input', {
                    type: 'date', className: 'form-control', value: form.dataNasc,
                    onChange: (e: any) => setForm({...form, dataNasc: (e.target as HTMLInputElement).value})
                  })
                ),

                // Modelo favorito
                React.createElement('div', { className: 'mb-3' },
                  React.createElement('label', { className: 'form-label' }, 'Modelo Porsche favorito'),
                  React.createElement('select', {
                    className: 'form-select', value: form.modeloFav,
                      onChange: (e: any) => setForm({...form, modeloFav: (e.target as HTMLSelectElement).value})
                  },
                    React.createElement('option', { value: '' }, 'Selecione um modelo'),
                    ['Porsche 911','Porsche Taycan','Porsche 718 Cayman','Porsche Macan','Porsche Panamera','718 Spyder RS'].map(m =>
                      React.createElement('option', { key: m, value: m }, m)
                    )
                  )
                ),

                // Observações
                React.createElement('div', { className: 'mb-4' },
                  React.createElement('label', { className: 'form-label' }, 'Observações'),
                  React.createElement('textarea', {
                    className: 'form-control', rows: 3,
                    placeholder: 'Conte-nos mais sobre seu interesse na Porsche...',
                    value: form.obs,
                    onChange: (e: any) => setForm({...form, obs: (e.target as HTMLTextAreaElement).value})
                  })
                ),

                // Newsletter checkbox
                React.createElement('div', { className: 'mb-4' },
                  React.createElement('div', { className: 'form-check' },
                    React.createElement('input', {
                      className: 'form-check-input', type: 'checkbox',
                      id: 'newsletter', checked: form.newsletter,
                      onChange: (e: any) => setForm({...form, newsletter: (e.target as HTMLInputElement).checked})
                    }),
                    React.createElement('label', { className: 'form-check-label', htmlFor: 'newsletter', style: { fontSize: 14 } },
                      'Desejo receber novidades e lançamentos da Porsche por e-mail'
                    )
                  )
                ),

                React.createElement('button', { type: 'submit', className: 'btn-porsche' },
                  React.createElement('i', { className: 'bi bi-check2-circle' }), ' Concluir Cadastro'
                )
              )
            )
          ),

          // ── ASIDE: Sidebar de benefícios (col-lg-5) ──
          React.createElement('aside', { className: 'col-lg-5' },
            React.createElement('div', { className: 'register-sidebar' },
              React.createElement('span', { className: 'section-label' }, 'Por que se cadastrar'),
              React.createElement('h3', { style: { color:'white', fontSize:'1.8rem', letterSpacing:'-0.5px', marginBottom:28 } },
                'Benefícios exclusivos'
              ),

              [
                { icon: 'bi-bell', titulo: 'Lançamentos em primeira mão', desc: 'Seja o primeiro a saber sobre novos modelos, edições limitadas e eventos exclusivos da Porsche.' },
                { icon: 'bi-calendar-event', titulo: 'Convites para eventos', desc: 'Test drives, track days, exposições e eventos especiais para entusiastas da marca.' },
                { icon: 'bi-file-text', titulo: 'Conteúdo exclusivo', desc: 'Artigos técnicos, histórias da marca, bastidores de corridas e análises aprofundadas.' },
                { icon: 'bi-person-check', titulo: 'Comunidade Porsche', desc: 'Conecte-se com outros entusiastas e proprietários da marca no Brasil.' },
              ].map((item, i) =>
                React.createElement('div', { key: i, className: 'info-item-r' },
                  React.createElement('div', { className: 'info-icon-r' },
                    React.createElement('i', { className: item.icon })
                  ),
                  React.createElement('div', null,
                    React.createElement('h6', null, item.titulo),
                    React.createElement('p', null, item.desc)
                  )
                )
              ),

              React.createElement('hr', { style: { borderColor: '#2a2a2a', margin: '28px 0' } }),

              React.createElement('h6', { style: { color:'white',fontSize:'11px',textTransform:'uppercase',letterSpacing:'1.5px',marginBottom:20 } },
                'Como funciona'
              ),
              [
                'Preencha o formulário com seus dados',
                'Confirme seu e-mail e ative sua conta',
                'Aproveite todos os benefícios exclusivos'
              ].map((txt, i) =>
                React.createElement('div', { key: i, className: 'd-flex align-items-start mb-3' },
                  React.createElement('span', { className: 'step-badge-r' }, i + 1),
                  React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 } }, txt)
                )
              )
            )
          )
        )
      )
    )
  );
};

export default window.RegisterPage;
