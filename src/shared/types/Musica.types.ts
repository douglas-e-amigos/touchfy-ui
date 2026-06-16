export interface MusicaAtualType {
  id: number;
  imagemURL: string;
  nomeMusica: string;
  nomeArtista: string;
}

export interface MusicaType extends MusicaAtualType {
  album: string;
  duracao: string;
}

export interface MusicaAtualContextType {
  musicaAtual: MusicaAtualType | null;
  setMusicaAtual: (musica: MusicaAtualType | null) => void;
}
