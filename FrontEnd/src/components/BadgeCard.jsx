const BadgeCard = ({ badge }) => {
  
  return (
    
    //style={{ animationDelay: `${badge.index * 80}ms`className="animate-fade-in-up ..." }}
    <a 
      href={badge.credlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group card bg-base-100 ring-1 ring-base-300 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40"
    >
      <div className="card-body items-center text-center">
        <img
          src={badge.image}
          alt={badge.title}
          className="w-20 h-20 object-contain
            transition-transform duration-300
            group-hover:scale-110"
        />

        <h3 className="text-sm font-semibold mt-3">{badge.title}</h3>

        <p className="text-xs text-base-content/60">{badge.issuer}</p>

        <span className="badge badge-outline badge-xs mt-2">Verified</span>
      </div>
    </a>
  );
};

export default BadgeCard;
