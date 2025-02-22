export const RatingBadge = ({ rating }: { rating: number }) => {
  if (rating <= 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div
        className="flex items-center justify-center w-20 h-20 rounded-full bg-black/70"
        style={{
          background: `conic-gradient(
            yellow ${rating}%,
            transparent ${rating}% 100%
          )`,
          boxShadow: "0 0 10px 5px rgba(255, 223, 0, 0.5)",
        }}
      >
        <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
          <span className="text-white font-semibold text-xl">{rating}%</span>
        </div>
      </div>
    </div>
  );
};
