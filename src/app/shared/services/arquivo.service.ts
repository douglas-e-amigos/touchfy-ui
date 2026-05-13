import httpClient from "@/src/app/infrastructure/http/http-client";

export class ArquivoService {
  async buscar(caminho: string): Promise<Blob> {
    const response = await httpClient.get<Blob>("/arquivos", {
      params: { caminho },
      responseType: "blob",
    });

    return response.data;
  }
}

export const arquivoService = new ArquivoService();