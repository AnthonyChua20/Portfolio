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

        <h3 className="text-sm font-semibold leading-tight">
          {badge.title}
        </h3>

        <p className="text-xs text-base-content/60">
          {badge.issuer}
        </p>

        <span className="badge badge-outline badge-xs mt-1">
          Verified
        </span>
      </div>
    </a>
  );
};

export default BadgeCard;