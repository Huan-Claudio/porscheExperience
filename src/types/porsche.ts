export interface PorscheSpec {
  valor: string | number;
  label: string;
}

export interface PorscheSpecDetalhe extends PorscheSpec {
  icone: string;
}

export interface PorscheProblema {
  id?: number | string;
  porscheModelId?: number | string;
  cadastroId?: number;
  anoVeiculo?: number;
  km?: string;
  categoria?: string;
  titulo: string;
  descricao: string;
  solucao?: string;
  severidade: 'Alta' | 'Média' | 'Baixa' | string;
  dataCriacao?: string;
  respostas?: PorscheResposta[];
}

export interface PorscheResposta {
  id?: number;
  problemReportId?: number;
  autor: string;
  mensagem: string;
  dataCriacao?: string;
}

export interface CadastroForm {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  cidade: string;
  estado: string;
  dataNasc: string;
  modeloFav: string;
  obs: string;
  newsletter: boolean;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  sobrenome?: string;
  email: string;
  cidade: string;
  estado?: string;
  dataNasc?: string;
  modeloFav?: string;
  obs?: string;
  newsletter: boolean;
  dataCriacao?: string;
}

export interface PorscheFaq {
  pergunta: string;
  resposta: string;
}

export interface PorscheModel {
  id: number | string;
  slug: string;
  manualId: string;
  nome: string;
  tagline: string;
  descricao: string;
  badge: string;
  badgeClass: string;
  imagem: string;
  potenciaBase: number;
  potenciaTurbo: number;
  velocidadeMaxima: number;
  aceleracaoZeroCem: number;
  cambio: string;
  anoLancamento: number;
  especificacoes?: string;
  specs: PorscheSpec[];
  specsDetalhe: PorscheSpecDetalhe[];
  problemas: PorscheProblema[];
  faq: PorscheFaq[];
  ativo: boolean;
}
