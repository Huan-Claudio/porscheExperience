import api from './api';
import type { UsuarioLogado } from '../types/porsche';

const STORAGE_KEY = 'porscheExperience.usuario';

export const authService = {
  login: async (email: string, senha: string): Promise<UsuarioLogado> => {
    const response = await api.post<UsuarioLogado>('/cadastros/login', { email, senha });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
    return response.data;
  },

  salvarSessao: (usuario: UsuarioLogado) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
  },

  carregarSessao: (): UsuarioLogado | null => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as UsuarioLogado;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default authService;

