export default function FySaudacao({ hora }: { hora: number }) {
    const periodo = definePeriodo(hora);
    return (
        <p className="text-4xl md:text-6xl font-bold text-white mb-4">
            {periodo}
        </p>
    )
}

export enum Periodos {
    dia = "Bom dia",
    tarde = "Boa tarde",
    noite = "Boa noite",
    madrugada = "Boa madrugada",
}

function definePeriodo(hora: number): Periodos {
    if (hora < 0 || hora > 23) {
        throw new Error("Hora inválida. Use um valor entre 0 e 23.");
    }

    if (hora >= 18) return Periodos.noite;
    else if (hora >= 12) return Periodos.tarde;
    else if (hora <= 5) return Periodos.madrugada;
    return Periodos.dia;
}
