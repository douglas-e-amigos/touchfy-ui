export default function FyDate({ data }: Readonly<{ data: string }>) {
    return (
        <div className="flex items-center gap-2 mb-2 text-gray-400">
            <img src="/icons/time.svg" alt="" className="w-[1.5rem]"/>
            <p className="text-lg text-gray-300">{ data }</p>
        </div>
    )
}
