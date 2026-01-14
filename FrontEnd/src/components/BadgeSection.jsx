import { useState } from "react";
import BadgeCard from "./BadgeCard";
import { badges } from "../data/badges";

const INITIAL_VISIBLE = 4;

const BadgeSection = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleBadges = showAll ? badges : badges.slice(0, INITIAL_VISIBLE);

  return (
    <section className="mt-24 pt-16 border-t border-base-300/50">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-base-content">Certifications</h2>
      </div>

      {/* Grid */}
      <div className="max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {visibleBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        
      </div>

      {/* Show more button */}
      {badges.length > INITIAL_VISIBLE && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="btn btn-sm btn-outline"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default BadgeSection;
