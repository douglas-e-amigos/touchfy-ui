enum Variantes {
    CIRCULAR = "rounded-[100%]",
    QUADRADO_MD = "rounded-md w-[17rem] h-[23rem]",
    QUADRADO_SM = "rounded-sm w-[11rem] h-[4rem]",
}

interface ImagemCardProps {
    capaURL: string,
    nomeCard: string,
    tituloCard: string,
    descritor: string,
    ano?: string,
    variante: Variantes,
    abrirPlaylist: () => void;
}


export default function ImageCard({
    capaURL,
    nomeCard,
    tituloCard,
    descritor,
    ano,
    variante,
    abrirPlaylist
}: ImagemCardProps) {
    let tamanhoImagem;

    if(variante === Variantes.QUADRADO_MD)
        tamanhoImagem = "w-[15rem]"
    else
        tamanhoImagem = "w-[9rem]"

    return (
        <div onClick={abrirPlaylist} className={`${variante} hover:bg-[oklch(37%_0.013_285.805)] bg-transparent`}>
            <img className={`${tamanhoImagem}`} src={capaURL} alt={`Capa de ${nomeCard}`} />
            <p>{tituloCard}</p>
            <p>{descritor}</p>
            {ano ? <p>{ano}</p> : null }
        </div>
    )
}