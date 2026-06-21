import { PlaylistType } from "@/src/shared/types/musica.types";

const jazzCover =
  "https://cdn.dribbble.com/userupload/42879218/file/original-01a3e9162fba7773ab2dc7909f1b3b23.png?resize=1024x768&vertical=center";

const neonCover =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80";

export const defaultPlaylist: PlaylistType = {
  titulo: "Chill Nights",
  descricao: "Relaxe e aproveite a noite",
  autor: "Você",
  imagem: jazzCover,
  musicas: [
    {
      id: "1",
      nomeMusica: "Midnight Dreams",
      nomeArtista: "Luna Sky",
      album: "Neon Nights",
      duracao: "3:55",
      imagemURL: neonCover,
      caminhoDoArquivo: "/audios/midnight-dreams.mp3",
    },
    {
      id: "2",
      nomeMusica: "Heartbeat",
      nomeArtista: "Luna Sky",
      album: "Neon Nights",
      duracao: "3:32",
      imagemURL: neonCover,
      caminhoDoArquivo: "/audios/heartbeat.mp3",
    },
    {
      id: "3",
      nomeMusica: "Smooth Jazz",
      nomeArtista: "Marcus Blue",
      album: "Late Night Sessions",
      duracao: "5:24",
      imagemURL: jazzCover,
      caminhoDoArquivo: "/audios/smooth-jazz.mp3",
    },
    {
      id: "4",
      nomeMusica: "Memories",
      nomeArtista: "Marcus Blue",
      album: "Late Night Sessions",
      duracao: "4:49",
      imagemURL: jazzCover,
      caminhoDoArquivo: "/audios/memories.mp3",
    },
  ],
};
