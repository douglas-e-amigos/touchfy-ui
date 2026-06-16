import Biblioteca from "@/src/features/biblioteca/Biblioteca";

export default function BibliotecaPage() {
  const usuario = {
    nome: "Anderson",
    id: "anderson-id",
  };
  return <Biblioteca usuario={usuario} />;
}
