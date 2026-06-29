// ---- Backend ----

export interface Tag {
  id: string;
  nome: string;
}

export interface GeneroMusical {
  id: string;
  nome: string;
}

export interface MusicaBackend {
  id: string;
  nome: string;
  caminhoDoArquivo: string;
  letra: string;
  artistaId: string;
  tags: Tag[];
  generosMusicais: GeneroMusical[];
}

export interface CriarMusicaRequest {
  nome: string;
  letra: string;
  tagIds: string[];
  generoMusicalIds: string[];
  arquivo: File;
}

// ---- Frontend / Provider ----

export interface MusicaAtual {
  id: string;
  imagemURL: string;
  nomeMusica: string;
  nomeArtista: string;
  caminhoDoArquivo: string;
}

export interface MusicaType extends MusicaAtual {
  album: string;
  duracao: string;
}

// ---- Playlist ----

export type PlaylistType = {
  titulo: string;
  descricao: string;
  autor: string;
  imagem: string;
  musicas: MusicaType[];
};
