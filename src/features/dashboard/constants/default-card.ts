type MediaCardItem = {
  id: number,
  title: string;
  artist: string;
  createBy: string;
  year: string;
  image: string;
};

const defaultCard: MediaCardItem = {
  id: 1,
  title: "Title Default",
  artist: "Artista Default",
  createBy: "CreateBy Default",
  year: "Year Default",
  image:
    "https://cdn.dribbble.com/userupload/42879218/file/original-01a3e9162fba7773ab2dc7909f1b3b23.png?resize=1024x768&vertical=center",
};

export const itensMediaCard: MediaCardItem[] = Array.from(
  { length: 6 },
  (_, index) => ({
    ...defaultCard,
    title: `${defaultCard.title} ${index + 1}`,
    id: index
  }),
);
