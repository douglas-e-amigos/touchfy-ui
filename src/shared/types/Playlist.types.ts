import { Musica } from "./Musica.types";

export type PlaylistType = {
  titulo: string;
  descricao: string;
  autor: string;
  imagem: string;
  musicas: Musica[];
};
