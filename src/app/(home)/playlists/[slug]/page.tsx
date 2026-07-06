import Playlist from "@/src/features/playlist/Playlist";

interface PlaylistPageProps {
  readonly params: Promise<{ slug: string }>;
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const { slug } = await params;

  return <Playlist slug={slug} />;
}
