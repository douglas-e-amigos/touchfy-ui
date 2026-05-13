export default function FyDate() {
    const hoje = new Date();
    const data = hoje.toLocaleDateString(
        "pt-BR",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }

    )

    return (
        <div className="flex items-center gap-2 mb-2 text-gray-400">
            <img src="/icons/time.svg" className="w-[1.5rem]"/>
            <p className="text-lg text-gray-300">{data}</p>
        </div>
    )
}
