import { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding.jsx';
import CardStack from './components/CardStack.jsx';
import MyMatches from './components/MyMatches.jsx';
import Profile from './components/Profile.jsx';
import BottomNav from './components/BottomNav.jsx';
import MatchModal from './components/MatchModal.jsx';
import animalsData from './data/animalsData.js';
import { sortAnimalsByScore, computeMatchScore } from './utils/matchingAlgorithm.js';

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

const SPECIES_FILTERS = [
  { value: 'all', label: 'All',  emoji: '🐾' },
  { value: 'dog', label: 'Dogs', emoji: '🐶' },
  { value: 'cat', label: 'Cats', emoji: '🐱' },
];

export default function App() {
  const [userProfile,  setUserProfile]  = useState(() => load('pawmatch_profile', null));
  const [likedAnimals, setLikedAnimals] = useState(() => load('pawmatch_liked',   []));
  const [passedIds,    setPassedIds]    = useState(() => load('pawmatch_passed',   []));
  const [activeTab,    setActiveTab]    = useState('discover');
  const [matchModal,   setMatchModal]   = useState(null);
  const [speciesFilter, setSpeciesFilter] = useState('all');

  useEffect(() => {
    if (userProfile) localStorage.setItem('pawmatch_profile', JSON.stringify(userProfile));
    else localStorage.removeItem('pawmatch_profile');
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('pawmatch_liked',  JSON.stringify(likedAnimals));
  }, [likedAnimals]);

  useEffect(() => {
    localStorage.setItem('pawmatch_passed', JSON.stringify(passedIds));
  }, [passedIds]);

  // Sort animals by compatibility, strip already-swiped ones
  const sortedAnimals    = userProfile ? sortAnimalsByScore(animalsData, userProfile) : animalsData;
  const swipedIds        = new Set([...likedAnimals.map(a => a.id), ...passedIds]);
  const availableAnimals = sortedAnimals.filter(a => !swipedIds.has(a.id));

  // Apply HDB filter (HDB residents can only keep HDB-approved breeds)
  const hdbFiltered =
    userProfile?.livingSpace === 'hdb'
      ? availableAnimals.filter(a => a.hdbApproved)
      : availableAnimals;

  // Apply species filter
  const filteredAnimals =
    speciesFilter === 'all'
      ? hdbFiltered
      : hdbFiltered.filter(a => a.species === speciesFilter);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    setLikedAnimals([]);
    setPassedIds([]);
  };

  const handleSwipeRight = (animal) => {
    const score = computeMatchScore(userProfile, animal);
    setLikedAnimals(prev => [...prev, { ...animal, score }]);
    setMatchModal({ animal, score });
  };

  const handleSwipeLeft = (animal) => {
    setPassedIds(prev => [...prev, animal.id]);
  };

  const handleRetakeQuiz = () => {
    setUserProfile(null);
    setLikedAnimals([]);
    setPassedIds([]);
    setMatchModal(null);
    setActiveTab('discover');
    setSpeciesFilter('all');
  };

  // ── Onboarding ─────────────────────────────────────────────────────────────
  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // ── Main app ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen flex flex-col bg-[#FFF8F0] relative">

        {/* ── Header ── */}
        <header className="flex-shrink-0 bg-white/80 backdrop-blur border-b border-gray-100 px-5 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <h1 className="font-display text-xl font-bold text-[#FF6B35]">PawMatch</h1>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'discover' && filteredAnimals.length > 0 && (
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                {filteredAnimals.length} waiting
              </span>
            )}
            {activeTab === 'matches' && likedAnimals.length > 0 && (
              <span className="text-xs font-bold text-white bg-[#FF6B35] px-2.5 py-1 rounded-full">
                {likedAnimals.length} ❤️
              </span>
            )}
          </div>
        </header>

        {/* ── Tab title + species filter ── */}
        <div className="flex-shrink-0 px-5 pt-3 pb-2">
          {activeTab === 'discover' && (
            <div>
              <h2 className="font-display text-lg font-bold text-gray-900">Find Your Match</h2>
              <p className="text-xs text-gray-400 font-semibold mb-3">
                Sorted by compatibility · {userProfile.mbti} type
              </p>
              {/* Species filter tabs */}
              <div className="flex gap-1.5 bg-gray-100 p-1 rounded-2xl">
                {SPECIES_FILTERS.map(f => (
                  <button
                    key={f.value}
                    onClick={() => setSpeciesFilter(f.value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                      speciesFilter === f.value
                        ? 'bg-white text-[#FF6B35] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>{f.emoji}</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'matches' && (
            <div>
              <h2 className="font-display text-lg font-bold text-gray-900">My Matches</h2>
              <p className="text-xs text-gray-400 font-semibold">Animals you've connected with</p>
            </div>
          )}
          {activeTab === 'profile' && (
            <div>
              <h2 className="font-display text-lg font-bold text-gray-900">My Profile</h2>
              <p className="text-xs text-gray-400 font-semibold">Your personality & lifestyle</p>
            </div>
          )}
        </div>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'discover' && (
            <CardStack
              key={speciesFilter}
              animals={filteredAnimals}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
            />
          )}
          {activeTab === 'matches' && (
            <MyMatches
              likedAnimals={likedAnimals}
              onViewDiscover={() => setActiveTab('discover')}
            />
          )}
          {activeTab === 'profile' && (
            <Profile
              userProfile={userProfile}
              onRetakeQuiz={handleRetakeQuiz}
            />
          )}
        </main>

        {/* ── Bottom nav ── */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ── Match modal ── */}
        {matchModal && (
          <MatchModal
            animal={matchModal.animal}
            score={matchModal.score}
            userProfile={userProfile}
            onKeepSwiping={() => setMatchModal(null)}
            onViewMatches={() => {
              setMatchModal(null);
              setActiveTab('matches');
            }}
          />
        )}
      </div>
    </div>
  );
}
