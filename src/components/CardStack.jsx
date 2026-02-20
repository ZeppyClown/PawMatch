import { useState, useRef } from 'react';
import SwipeCard from './SwipeCard.jsx';

export default function CardStack({ animals, onSwipeRight, onSwipeLeft }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const topCardRef = useRef(null);

  const visibleAnimals = animals.slice(currentIndex, currentIndex + 3);
  const hasCards = visibleAnimals.length > 0;

  const handleCardSwipe = (direction, animal) => {
    if (direction === 'right') {
      onSwipeRight(animal);
    } else {
      onSwipeLeft(animal);
    }
    setCurrentIndex(i => i + 1);
  };

  const triggerButtonSwipe = (direction) => {
    if (topCardRef.current && hasCards) {
      topCardRef.current.triggerSwipe(direction);
    }
  };

  // ── No more cards ──────────────────────────────────────────────────────────
  if (!hasCards) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-8 text-center">
        <div className="text-7xl mb-5">🐾</div>
        <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
          You've seen everyone!
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          You've reviewed all the animals in our shelter. Check your matches tab to revisit the ones you liked, or retake the quiz for a fresh start.
        </p>
        <div className="flex gap-2 mt-6 text-3xl">
          <span>🐕</span><span>🐈</span><span>🐕</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 pb-4">

      {/* ── Card stack area ── */}
      <div className="relative flex-1 mb-4">
        {/* Render back to front so top card is on top */}
        {[...visibleAnimals].reverse().map((animal, reversedIdx) => {
          const behindIndex = visibleAnimals.length - 1 - reversedIdx;
          const isTop       = behindIndex === 0;
          return (
            <SwipeCard
              key={animal.id}
              ref={isTop ? topCardRef : null}
              animal={animal}
              isTop={isTop}
              behindIndex={behindIndex}
              onSwipe={(dir) => handleCardSwipe(dir, animal)}
            />
          );
        })}
      </div>

      {/* ── Action buttons ── */}
      <div className="flex items-center justify-center gap-6 pt-1 pb-2">
        {/* Pass */}
        <button
          onClick={() => triggerButtonSwipe('left')}
          className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
          aria-label="Pass"
        >
          ✕
        </button>

        {/* Super-like / info (optional center button) */}
        <button
          onClick={() => triggerButtonSwipe('right')}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #ff8c5a)' }}
          aria-label="Like"
        >
          ❤️
        </button>

        {/* Skip forward (pass) — styled differently */}
        <button
          onClick={() => triggerButtonSwipe('left')}
          className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
          aria-label="Skip"
        >
          ⏭
        </button>
      </div>

      {/* ── Hint ── */}
      <p className="text-center text-[11px] text-gray-400 font-semibold pb-1">
        Swipe right to adopt · Swipe left to pass
      </p>
    </div>
  );
}
