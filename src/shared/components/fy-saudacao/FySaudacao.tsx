export default function FySaudacao() {
    const hour = new Date().getHours();

    let periodo = "Bom dia";

    if (hour >= 18) {
        periodo = "Boa noite";
    } else if (hour >= 12) {
        periodo = "Boa tarde";
    } else if (hour < 5) {
        periodo = "Boa madrugada";
    }

    return (
        <p className="text-4xl md:text-6xl font-bold text-white mb-4">
            {periodo}
        </p>
    )
}
