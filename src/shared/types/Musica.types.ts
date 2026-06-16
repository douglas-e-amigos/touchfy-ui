export interface MusicaAtual {
  id: number;
  imagemURL: string;
  nomeMusica: string;
  nomeArtista: string;
}

export interface Musica extends MusicaAtual {
  album: string;
  duracao: string;
}

export interface MusicaAtualContextType {
  musicaAtual: MusicaAtual | null;
  setMusicaAtual: (musica: MusicaAtual | null) => void;
}
