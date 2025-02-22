export const TitleOverlay = ({ title }: { title?: string }) => (
  <h3 className="absolute inset-x-0 bottom-4 text-sm font-medium text-center text-white bg-black/70 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    {title || "Título não disponível"}
  </h3>
);
