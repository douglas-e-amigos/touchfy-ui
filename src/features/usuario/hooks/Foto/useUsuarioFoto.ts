"use client";

import { UsuarioResponse } from "@/src/features/usuario/models/dto.model";
import { arquivoService } from "@/src/shared/services/arquivo.service";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type UseUsuarioFotoParams = {
  fotoPerfil: UsuarioResponse["fotoPerfil"];
};

export function useUsuarioFoto({ fotoPerfil }: UseUsuarioFotoParams) {
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<{ fotoPerfil: string; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoPreviewUrlRef = useRef<string | null>(null);

  const fotoPerfilExibida =
    photoPreviewUrl || (fotoPerfil && photoUrl?.fotoPerfil === fotoPerfil ? photoUrl.url : null);

  const limparUploadDeFoto = () => {
    setSelectedPhotoFile(null);
    setPhotoPreviewUrl(null);

    if (photoPreviewUrlRef.current) {
      URL.revokeObjectURL(photoPreviewUrlRef.current);
      photoPreviewUrlRef.current = null;
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhotoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    limparUploadDeFoto();

    if (!file) {
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    photoPreviewUrlRef.current = nextPreviewUrl;
    setPhotoPreviewUrl(nextPreviewUrl);
    setSelectedPhotoFile(file);
  };

  useEffect(() => {
    return () => {
      if (photoPreviewUrlRef.current) {
        URL.revokeObjectURL(photoPreviewUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!fotoPerfil) {
      return;
    }

    let isMounted = true;
    let objectUrl: string | null = null;

    arquivoService
      .buscar(fotoPerfil)
      .then((arquivo) => {
        if (!isMounted) {
          return;
        }

        objectUrl = URL.createObjectURL(arquivo);
        setPhotoUrl({ fotoPerfil, url: objectUrl });
      })
      .catch((error) => {
        console.error(error);

        if (isMounted) {
          setPhotoUrl(null);
        }
      });

    return () => {
      isMounted = false;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fotoPerfil]);

  return {
    selectedPhotoFile,
    fotoPerfilExibida,
    fileInputRef,
    limparUploadDeFoto,
    handlePhotoFileChange,
  };
}
