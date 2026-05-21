import api from './api';
import porscheData from '../data/porscheData';
import type { PorscheFaq, PorscheModel, PorscheProblema, PorscheSpec } from '../types/porsche';

export interface ApiPorscheModel {
  id?: number;
  nome: string;
  tagline: string;
  descricao: string;
  badge?: string;
  badgeClass?: string;
  imagem?: string;
  potenciaBase: number;
  potenciaTurbo: number;
  velocidadeMaxima: number;
  aceleracaoZeroCem: number;
  cambio?: string;
  anoLancamento: number;
  especificacoes?: string;
  problemas?: string;
  faq?: string;
  ativo?: boolean;
}

export type IPorscheModel = PorscheModel;

const FALLBACK_BY_NAME = new Map(
  (porscheData as Array<Partial<PorscheModel> & { id: string; nome: string }>).map((modelo) => [
    modelo.nome.toLowerCase(),
    modelo,
  ])
);

const slugFromName = (nome: string): string =>
  nome
    .toLowerCase()
    .replace(/^porsche\s+/, '')
    .replace(/^718\s+cayman$/, 'cayman')
    .replace(/^718\s+spyder\s+rs$/, 'spyder')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const parseJsonArray = <T>(value: string | undefined, fallback: T[]): T[] => {
  if (!value) return fallback;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed as T[];
    if (Array.isArray(parsed?.specs)) return parsed.specs as T[];
  } catch {
    return fallback;
  }

  return fallback;
};

type FallbackPorscheModel = Partial<PorscheModel> & { id: string; nome: string };

const buildSpecs = (modelo: ApiPorscheModel, fallback: FallbackPorscheModel | undefined): PorscheSpec[] => {
  const parsedSpecs = parseJsonArray<PorscheSpec>(modelo.especificacoes, []);
  if (parsedSpecs.length > 0) return parsedSpecs;
  if (fallback?.specs?.length) return fallback.specs;

  return [
    { valor: modelo.potenciaBase, label: 'CV Base' },
    { valor: modelo.potenciaTurbo, label: 'CV Turbo' },
    { valor: modelo.velocidadeMaxima, label: 'km/h' },
  ];
};

const normalizarModelo = (modelo: ApiPorscheModel): PorscheModel => {
  const fallback = FALLBACK_BY_NAME.get(modelo.nome.toLowerCase());
  const slug = fallback?.slug || String(fallback?.id || slugFromName(modelo.nome));

  return {
    id: modelo.id ?? slug,
    slug,
    manualId: fallback?.manualId || slug,
    nome: modelo.nome,
    tagline: modelo.tagline,
    descricao: modelo.descricao,
    badge: modelo.badge || modelo.tagline,
    badgeClass: modelo.badgeClass || fallback?.badgeClass || 'badge-esportivo',
    imagem: modelo.imagem || fallback?.imagem || 'imagens/hero.jpg',
    potenciaBase: modelo.potenciaBase,
    potenciaTurbo: modelo.potenciaTurbo,
    velocidadeMaxima: modelo.velocidadeMaxima,
    aceleracaoZeroCem: modelo.aceleracaoZeroCem,
    cambio: modelo.cambio || fallback?.cambio || 'PDK',
    anoLancamento: modelo.anoLancamento,
    especificacoes: modelo.especificacoes,
    specs: buildSpecs(modelo, fallback),
    specsDetalhe: fallback?.specsDetalhe || [
      { icone: 'bi-speedometer2', valor: modelo.potenciaBase, label: 'CV Base' },
      { icone: 'bi-lightning-charge', valor: `${modelo.aceleracaoZeroCem}s`, label: '0-100 km/h' },
      { icone: 'bi-wind', valor: modelo.velocidadeMaxima, label: 'km/h Vel. Máx.' },
      { icone: 'bi-gear', valor: modelo.cambio || 'PDK', label: 'Câmbio' },
    ],
    problemas: parseJsonArray<PorscheProblema>(modelo.problemas, fallback?.problemas || []),
    faq: parseJsonArray<PorscheFaq>(modelo.faq, fallback?.faq || []),
    ativo: modelo.ativo ?? true,
  };
};

const paraApi = (modelo: PorscheModel): ApiPorscheModel => ({
  id: typeof modelo.id === 'number' ? modelo.id : undefined,
  nome: modelo.nome,
  tagline: modelo.tagline,
  descricao: modelo.descricao,
  badge: modelo.badge,
  badgeClass: modelo.badgeClass,
  imagem: modelo.imagem,
  potenciaBase: modelo.potenciaBase,
  potenciaTurbo: modelo.potenciaTurbo,
  velocidadeMaxima: modelo.velocidadeMaxima,
  aceleracaoZeroCem: modelo.aceleracaoZeroCem,
  cambio: modelo.cambio,
  anoLancamento: modelo.anoLancamento,
  especificacoes: modelo.especificacoes,
  problemas: JSON.stringify(modelo.problemas),
  faq: JSON.stringify(modelo.faq),
  ativo: modelo.ativo,
});

export const porscheModelService = {
  // Listar todos os modelos
  listarTodos: async (): Promise<IPorscheModel[]> => {
    try {
      const response = await api.get<ApiPorscheModel[]>('/modelos');
      return response.data.map(normalizarModelo);
    } catch (error) {
      console.error('Erro ao listar modelos:', error);
      throw error;
    }
  },

  // Obter um modelo por ID
  obterPorId: async (id: number): Promise<IPorscheModel> => {
    try {
      const response = await api.get<ApiPorscheModel>(`/modelos/${id}`);
      return normalizarModelo(response.data);
    } catch (error) {
      console.error(`Erro ao obter modelo ${id}:`, error);
      throw error;
    }
  },

  // Criar novo modelo
  criar: async (modelo: IPorscheModel): Promise<IPorscheModel> => {
    try {
      const response = await api.post<ApiPorscheModel>('/modelos', paraApi(modelo));
      return normalizarModelo(response.data);
    } catch (error) {
      console.error('Erro ao criar modelo:', error);
      throw error;
    }
  },

  // Atualizar modelo
  atualizar: async (id: number, modelo: IPorscheModel): Promise<IPorscheModel> => {
    try {
      const response = await api.put<ApiPorscheModel>(`/modelos/${id}`, paraApi(modelo));
      return normalizarModelo(response.data);
    } catch (error) {
      console.error(`Erro ao atualizar modelo ${id}:`, error);
      throw error;
    }
  },

  // Deletar modelo (soft delete)
  deletar: async (id: number): Promise<void> => {
    try {
      await api.delete(`/modelos/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar modelo ${id}:`, error);
      throw error;
    }
  },

  // Deletar permanentemente (hard delete)
  deletarPermanentemente: async (id: number): Promise<void> => {
    try {
      await api.delete(`/modelos/${id}/permanente`);
    } catch (error) {
      console.error(`Erro ao deletar permanentemente modelo ${id}:`, error);
      throw error;
    }
  },

  // Buscar por nome
  buscarPorNome: async (nome: string): Promise<IPorscheModel[]> => {
    try {
      const response = await api.get<ApiPorscheModel[]>('/modelos/buscar', {
        params: { nome },
      });
      return response.data.map(normalizarModelo);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
      throw error;
    }
  },
};

export default porscheModelService;
