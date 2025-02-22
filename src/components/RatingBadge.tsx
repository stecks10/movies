export const RatingBadge = ({ rating }: { rating: number }) => {
  if (rating <= 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center justify-center w-20 h-20 border-4 border-yellow-500 rounded-full bg-black/70">
        <span className="text-white font-semibold text-xl">{rating}%</span>
      </div>
    </div>
  );
};
