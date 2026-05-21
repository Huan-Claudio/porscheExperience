import * as React from 'react';
import authService from '../services/authService';
import cadastroService from '../services/cadastroService';
import type { CadastroForm, UsuarioLogado } from '../types/porsche';

interface RegistroForm extends CadastroForm {
  senhaConf: string;
}

interface RegisterPageProps {
  onLogin?: (usuario: UsuarioLogado) => void;
  onNavegar?: (pagina: string) => void;
}

window.RegisterPage = function RegisterPage({ onLogin, onNavegar }: RegisterPageProps) {
  const [modo, setModo] = React.useState<'login' | 'cadastro'>('login');
  const [submitting, setSubmitting] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('');
  const [loginForm, setLoginForm] = React.useState({ email: '', senha: '' });
  const [form, setForm] = React.useState<RegistroForm>({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    senhaConf: '',
    cidade: '',
    estado: '',
    dataNasc: '',
    modeloFav: '',
    obs: '',
    newsletter: false,
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.senha) {
      alert('Informe e-mail e senha.');
      return;
    }

    try {
      setSubmitting(true);
      const usuario = await authService.login(loginForm.email, loginForm.senha);
      onLogin?.(usuario);
      onNavegar?.('account');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Nao foi possivel fazer login. Confira e-mail e senha.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.cidade.trim()) {
      alert('Preencha nome, e-mail e cidade.');
      return;
    }
    if (form.senha.length < 8) {
      alert('A senha precisa ter no minimo 8 caracteres.');
      return;
    }
    if (form.senha !== form.senhaConf) {
      alert('As senhas nao conferem.');
      return;
    }

    try {
      setSubmitting(true);
      const cadastro: CadastroForm = {
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        senha: form.senha,
        cidade: form.cidade,
        estado: form.estado,
        dataNasc: form.dataNasc,
        modeloFav: form.modeloFav,
        obs: form.obs,
        newsletter: form.newsletter,
      };
      const usuario = await cadastroService.criar(cadastro);
      authService.salvarSessao(usuario);
      onLogin?.(usuario);
      setSuccessMsg(`${usuario.nome}, cadastro criado e login realizado com sucesso.`);
      onNavegar?.('account');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Nao foi possivel concluir o cadastro.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    React.createElement('main', null,
      React.createElement('div', { className: 'page-header' },
        React.createElement('div', { className: 'container' },
          React.createElement('span', { className: 'section-label' }, modo === 'login' ? 'Entrar' : 'Registre-se'),
          React.createElement('h1', { className: 'page-title' },
            modo === 'login' ? 'Acesse sua' : 'Seu Porsche',
            React.createElement('br'),
            modo === 'login' ? 'conta.' : 'comeca aqui.'
          ),
          React.createElement('div', { className: 'divider-red' })
        )
      ),

      React.createElement('div', { className: 'container py-5 py-lg-6' },
        React.createElement('div', { className: 'row g-5' },
          React.createElement('section', { className: 'col-lg-7' },
            React.createElement('div', { className: 'report-form-wrap' },
              React.createElement('div', { className: 'auth-tabs mb-4' },
                React.createElement('button', {
                  type: 'button',
                  className: modo === 'login' ? 'active' : '',
                  onClick: () => setModo('login'),
                }, 'Login'),
                React.createElement('button', {
                  type: 'button',
                  className: modo === 'cadastro' ? 'active' : '',
                  onClick: () => setModo('cadastro'),
                }, 'Cadastro')
              ),

              successMsg && React.createElement('div', { className: 'success-msg show mb-4' },
                React.createElement('i', { className: 'bi bi-check-circle-fill text-danger me-2' }),
                successMsg
              ),

              modo === 'login'
                ? React.createElement('form', { onSubmit: handleLogin, noValidate: true },
                    React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 6 } }, 'Login'),
                    React.createElement('p', { className: 'text-secondary mb-4', style: { fontSize: 14 } },
                      'Entre para recuperar seus favoritos e acompanhar seus relatos.'
                    ),
                    React.createElement('div', { className: 'mb-3' },
                      React.createElement('label', { className: 'form-label' }, 'E-mail'),
                      React.createElement('input', {
                        type: 'email',
                        className: 'form-control',
                        placeholder: 'seu@email.com',
                        value: loginForm.email,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLoginForm({ ...loginForm, email: e.target.value }),
                      })
                    ),
                    React.createElement('div', { className: 'mb-4' },
                      React.createElement('label', { className: 'form-label' }, 'Senha'),
                      React.createElement('input', {
                        type: 'password',
                        className: 'form-control',
                        placeholder: 'Sua senha',
                        value: loginForm.senha,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLoginForm({ ...loginForm, senha: e.target.value }),
                      })
                    ),
                    React.createElement('button', { type: 'submit', className: 'btn-porsche', disabled: submitting },
                      React.createElement('i', { className: submitting ? 'bi bi-hourglass-split' : 'bi bi-box-arrow-in-right' }),
                      submitting ? ' Entrando...' : ' Entrar'
                    )
                  )
                : React.createElement('form', { onSubmit: handleCadastro, noValidate: true },
                    React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 6 } }, 'Formulario de Cadastro'),
                    React.createElement('p', { className: 'text-secondary mb-4', style: { fontSize: 14 } },
                      'Crie sua conta para salvar favoritos e acompanhar seus relatos.'
                    ),
                    React.createElement('div', { className: 'row g-3 mb-3' },
                      field('Nome *', form.nome, (value) => setForm({ ...form, nome: value }), 'Seu nome'),
                      field('Sobrenome', form.sobrenome, (value) => setForm({ ...form, sobrenome: value }), 'Seu sobrenome')
                    ),
                    fieldFull('E-mail *', form.email, (value) => setForm({ ...form, email: value }), 'seu@email.com', 'email'),
                    React.createElement('div', { className: 'row g-3 mb-3' },
                      field('Senha *', form.senha, (value) => setForm({ ...form, senha: value }), 'Minimo 8 caracteres', 'password'),
                      field('Confirmar Senha *', form.senhaConf, (value) => setForm({ ...form, senhaConf: value }), 'Repita a senha', 'password')
                    ),
                    React.createElement('div', { className: 'row g-3 mb-3' },
                      field('Cidade *', form.cidade, (value) => setForm({ ...form, cidade: value }), 'Sua cidade'),
                      React.createElement('div', { className: 'col-md-5' },
                        React.createElement('label', { className: 'form-label' }, 'Estado'),
                        React.createElement('select', {
                          className: 'form-select',
                          value: form.estado,
                          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, estado: e.target.value }),
                        },
                          React.createElement('option', { value: '' }, 'Selecione'),
                          ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'CE', 'DF', 'GO'].map((estado) =>
                            React.createElement('option', { key: estado, value: estado }, estado)
                          )
                        )
                      )
                    ),
                    fieldFull('Data de nascimento', form.dataNasc, (value) => setForm({ ...form, dataNasc: value }), '', 'date'),
                    React.createElement('div', { className: 'mb-3' },
                      React.createElement('label', { className: 'form-label' }, 'Modelo Porsche favorito'),
                      React.createElement('select', {
                        className: 'form-select',
                        value: form.modeloFav,
                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, modeloFav: e.target.value }),
                      },
                        React.createElement('option', { value: '' }, 'Selecione um modelo'),
                        ['Porsche 911', 'Porsche Taycan', '718 Cayman', 'Porsche Macan', 'Porsche Panamera', '718 Spyder RS'].map((modelo) =>
                          React.createElement('option', { key: modelo, value: modelo }, modelo)
                        )
                      )
                    ),
                    React.createElement('div', { className: 'mb-4' },
                      React.createElement('label', { className: 'form-label' }, 'Observacoes'),
                      React.createElement('textarea', {
                        className: 'form-control',
                        rows: 3,
                        value: form.obs,
                        placeholder: 'Conte-nos mais sobre seu interesse na Porsche...',
                        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, obs: e.target.value }),
                      })
                    ),
                    React.createElement('div', { className: 'mb-4 form-check' },
                      React.createElement('input', {
                        className: 'form-check-input',
                        type: 'checkbox',
                        id: 'newsletter',
                        checked: form.newsletter,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, newsletter: e.target.checked }),
                      }),
                      React.createElement('label', { className: 'form-check-label', htmlFor: 'newsletter', style: { fontSize: 14 } },
                        'Desejo receber novidades da Porsche por e-mail'
                      )
                    ),
                    React.createElement('button', { type: 'submit', className: 'btn-porsche', disabled: submitting },
                      React.createElement('i', { className: submitting ? 'bi bi-hourglass-split' : 'bi bi-check2-circle' }),
                      submitting ? ' Salvando...' : ' Criar Conta'
                    )
                  )
            )
          ),

          React.createElement('aside', { className: 'col-lg-5' },
            React.createElement('div', { className: 'register-sidebar' },
              React.createElement('span', { className: 'section-label' }, 'Sua garagem'),
              React.createElement('h3', { style: { color: 'white', fontSize: '1.8rem', letterSpacing: '-0.5px', marginBottom: 28 } },
                'Dados salvos na sua conta'
              ),
              [
                { icon: 'bi-heart-fill', titulo: 'Favoritos persistentes', desc: 'Os modelos favoritados ficam salvos no seu login.' },
                { icon: 'bi-chat-left-text', titulo: 'Meus relatos', desc: 'Acompanhe perguntas e veja respostas da comunidade.' },
                { icon: 'bi-person-check', titulo: 'Sessao simples', desc: 'Entre e continue de onde parou.' },
              ].map((item) =>
                React.createElement('div', { key: item.titulo, className: 'info-item-r' },
                  React.createElement('div', { className: 'info-icon-r' }, React.createElement('i', { className: item.icon })),
                  React.createElement('div', null,
                    React.createElement('h6', null, item.titulo),
                    React.createElement('p', null, item.desc)
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

const field = (
  label: string,
  value: string,
  onChange: (value: string) => void,
  placeholder = '',
  type = 'text'
) => React.createElement('div', { className: 'col-md-6' },
  React.createElement('label', { className: 'form-label' }, label),
  React.createElement('input', {
    type,
    className: 'form-control',
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  })
);

const fieldFull = (
  label: string,
  value: string,
  onChange: (value: string) => void,
  placeholder = '',
  type = 'text'
) => React.createElement('div', { className: 'mb-3' },
  React.createElement('label', { className: 'form-label' }, label),
  React.createElement('input', {
    type,
    className: 'form-control',
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  })
);

export default window.RegisterPage;

