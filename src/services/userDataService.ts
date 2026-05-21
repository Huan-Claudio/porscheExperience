import api from './api';
import type { PorscheProblema } from '../types/porsche';

export const userDataService = {
  listarFavoritos: async (cadastroId: number): Promise<string[]> => {
    const response = await api.get<number[]>(`/cadastros/${cadastroId}/favoritos`);
    return response.data.map(String);
  },

  favoritar: async (cadastroId: number, modeloId: number): Promise<string[]> => {
    const response = await api.post<number[]>(`/cadastros/${cadastroId}/favoritos`, {
      porscheModelId: modeloId,
    });
    return response.data.map(String);
  },

  removerFavorito: async (cadastroId: number, modeloId: number): Promise<string[]> => {
    const response = await api.delete<number[]>(`/cadastros/${cadastroId}/favoritos/${modeloId}`);
    return response.data.map(String);
  },

  listarRelatos: async (cadastroId: number): Promise<PorscheProblema[]> => {
    const response = await api.get<PorscheProblema[]>(`/cadastros/${cadastroId}/relatos`);
    return response.data;
  },
};

export default userDataService;

