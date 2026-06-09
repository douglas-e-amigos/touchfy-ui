type SecaoHomeProps = {
  readonly titulo: string;
  readonly children: React.ReactNode;
};

export default function SecaoHome({ titulo, children }: SecaoHomeProps) {
  return (
    <section>
      <div className="flex items-center justify-between gap-5 ml-5 mr-5 mt-2 mb-3">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {titulo}
        </h2>
        <button className="hidden text-sm font-bold text-[#ec268f] transition hover:text-white md:block">
          Ver tudo
        </button>
      </div>

      {children}
    </section>
  );
}