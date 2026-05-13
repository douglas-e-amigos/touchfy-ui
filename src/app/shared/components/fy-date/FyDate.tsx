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
        <div className="flex gap-1">
            <img src="/icons/time.svg" className="w-[1.5rem]"/>
            <p className="text-[#27272a]">{data}</p>
        </div>
    )
}
