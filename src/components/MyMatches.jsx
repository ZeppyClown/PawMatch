export default function MyMatches({ likedAnimals, onViewDiscover }) {
  if (likedAnimals.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-8 text-center">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">No matches yet</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
          Start swiping to find animals you connect with. Your liked profiles will appear here.
        </p>
        <button
          onClick={onViewDiscover}
          className="bg-[#FF6B35] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:bg-orange-600 active:scale-95 transition-all duration-200"
        >
          🐾 Start Discovering
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 pt-2 pb-3">
        <p className="text-gray-400 text-sm font-semibold">
          {likedAnimals.length} {likedAnimals.length === 1 ? 'animal' : 'animals'} you loved ❤️
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {likedAnimals.map((animal, idx) => (
          <MatchCard key={animal.id} animal={animal} index={idx} />
        ))}
      </div>
    </div>
  );
}

function MatchCard({ animal, index }) {
  const scoreColor =
    animal.score >= 80 ? '#4CAF78' :
    animal.score >= 60 ? '#FF6B35' :
    '#94a3b8';

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex animate-slide-up-fade"
      style={{ animationDelay: `${index * 0.06}s`, opacity: 0 }}
    >
      {/* Photo */}
      <div className="relative flex-shrink-0 w-24">
        <img
          src={animal.photo}
          alt={animal.name}
          className="w-24 h-full object-cover"
          style={{ minHeight: 90 }}
        />
        <div className="absolute top-2 left-2 text-sm">
          {animal.species === 'dog' ? '🐕' : '🐈'}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-bold text-gray-900 text-base leading-tight truncate">
                {animal.name}
              </h3>
              <p className="text-gray-400 text-xs truncate">{animal.breed} · {animal.age}yr</p>
            </div>
            {/* Match badge */}
            <div
              className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border-2 shadow-sm"
              style={{ borderColor: scoreColor, backgroundColor: `${scoreColor}18` }}
            >
              <span className="font-bold text-xs" style={{ color: scoreColor }}>
                {animal.score}%
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{animal.personalityTag}</p>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
            ⏰ {animal.daysInShelter}d waiting
          </span>
          <button
            onClick={() => alert(`Contacting shelter about ${animal.name}... (placeholder)`)}
            className="bg-[#4CAF78] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow hover:bg-green-600 active:scale-95 transition-all duration-200"
          >
            Contact Shelter
          </button>
        </div>
      </div>
    </div>
  );
}
