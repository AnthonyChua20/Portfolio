const BadgeCard = ({ badge }) => {
  return (
    <a
      href={badge.credlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group card bg-base-100 ring-1 ring-base-300 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40"
    >
      <div className="card-body items-center text-center gap-2">
        <img
          src={badge.image}
          alt={badge.title}
          className="w-20 h-20 object-contain
            transition-transform duration-300
            group-hover:scale-110"
        />

        <h3 className="text-sm font-semibold leading-tight">{badge.title}</h3>

        <p className="text-xs text-base-content/60">{badge.issuer}</p>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-base-300/60 border border-base-content/10 backdrop-blur-md shadow-sm group-hover:border-base-content/20 transition-colors">
          {/* Adaptive monochrome checkmark */}
          <svg
            className="w-3 h-3 text-base-content/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>

          {/* High-contrast adaptive text */}
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-base-content/90">
            Verified
          </span>
        </div>
      </div>
    </a>
  );
};

export default BadgeCard;
