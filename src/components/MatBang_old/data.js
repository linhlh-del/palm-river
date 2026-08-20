const imageModules = import.meta.glob(
  "../../assets/images/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
  },
);

const getImageSrc = (relativePath) => {
  const normalizedPath = relativePath.replace(/\\/g, "/");
  const fullPath = `../../assets/images/${normalizedPath}`;
  return imageModules[fullPath]?.default ?? "";
};

export const FILTERS = [{ key: "canhquan", label: "Cảnh Quan" }];

export const GALLERY_ITEMS = [
  // ==========================
  // CẢNH QUAN
  // ==========================
  {
    category: "canhquan",
    src: getImageSrc("matbang/matbang.jpg"),
    alt: "Phối cảnh Sông Lười Monrei Saigon từ trên cao",
    label: "Phối cảnh Sông Lười từ trên cao",
  },
];
