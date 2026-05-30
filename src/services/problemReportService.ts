import api from './api';
import type { PorscheProblema, PorscheResposta } from '../types/porsche';

export interface ProblemReportPayload {
  porscheModelId: number;
  cadastroId?: number;
  anoVeiculo?: number;
  km?: string;
  categoria: string;
  titulo: string;
  descricao: string;
  solucao?: string;
  email?: string;
  severidade?: string;
}

export interface ProblemReplyPayload {
  autor: string;
  mensagem: string;
}

export const problemReportService = {
  listarPorModelo: async (modeloId: number): Promise<PorscheProblema[]> => {
    const response = await api.get<PorscheProblema[]>(`/modelos/${modeloId}/relatos`);
    return response.data;
  },

  criar: async (modeloId: number, relato: ProblemReportPayload): Promise<PorscheProblema> => {
    const response = await api.post<PorscheProblema>(`/modelos/${modeloId}/relatos`, relato);
    return response.data;
  },

  responder: async (relatoId: number, resposta: ProblemReplyPayload): Promise<PorscheResposta> => {
    const response = await api.post<PorscheResposta>(`/relatos/${relatoId}/respostas`, resposta);
    return response.data;
  },

  atualizar: async (relatoId: number, relato: ProblemReportPayload): Promise<PorscheProblema> => {
    const response = await api.put<PorscheProblema>(`/relatos/${relatoId}`, relato);
    return response.data;
  },

  excluir: async (relatoId: number): Promise<void> => {
    await api.delete(`/relatos/${relatoId}`);
  },
};

export default problemReportService;
