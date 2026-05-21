import api from './api';
import type { CadastroForm, UsuarioLogado } from '../types/porsche';

export type CadastroResponse = UsuarioLogado;

export const cadastroService = {
  criar: async (cadastro: CadastroForm): Promise<CadastroResponse> => {
    const payload = {
      ...cadastro,
      dataNasc: cadastro.dataNasc || null,
      estado: cadastro.estado || null,
      modeloFav: cadastro.modeloFav || null,
      obs: cadastro.obs || null,
    };

    const response = await api.post<CadastroResponse>('/cadastros', payload);
    return response.data;
  },

  listar: async (): Promise<CadastroResponse[]> => {
    const response = await api.get<CadastroResponse[]>('/cadastros');
    return response.data;
  },
};

export default cadastroService;
