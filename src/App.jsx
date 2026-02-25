import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, deleteField } from 'firebase/firestore';
import { db } from './firebase.js';
import { useAuth } from './contexts/AuthContext.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import SignupPage from './components/auth/SignupPage.jsx';
import Onboarding from './components/Onboarding.jsx';
import CardStack from './components/CardStack.jsx';
import MyMatches from './components/MyMatches.jsx';
import Profile from './components/Profile.jsx';
import BottomNav from './components/BottomNav.jsx';
import BreedGuide from './components/BreedGuide.jsx';
import MatchModal from './components/MatchModal.jsx';
import OwnerOnboarding from './components/OwnerOnboarding.jsx';
import Community from './components/Community.jsx';
import animalsData from './data/animalsData.js';
import { sortAnimalsByScore, computeMatchScore } from './utils/matchingAlgorithm.js';

// ── Local cache helpers (scoped per user) ────────────────────────────────────
function cacheLoad(uid, key, fallback) {
  try {
    const v = localStorage.getItem(`pawmatch_${uid}_${key}`);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function cacheSave(uid, key, value) {
  try {
    localStorage.setItem(`pawmatch_${uid}_${key}`, JSON.stringify(value));
  } catch { /* storage full — silently ignore */ }
}

function cacheClear(uid) {
  ['profile', 'liked', 'passed'].forEach(k =>
    localStorage.removeItem(`pawmatch_${uid}_${k}`)
  );
}

// ── Firestore helpers ────────────────────────────────────────────────────────
async function loadUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return { profile: null, likedAnimals: [], passedIds: [], onboardingProgress: { completedTasks: [] }, joinedCommunities: [] };
  const data = snap.data();
  return {
    profile:             data.profile             ?? null,
    likedAnimals:        data.likedAnimals        ?? [],
    passedIds:           data.passedIds           ?? [],
    onboardingProgress:  data.onboardingProgress  ?? { completedTasks: [] },
    joinedCommunities:   data.joinedCommunities   ?? [],
  };
}

async function saveProfile(uid, profile) {
  await setDoc(doc(db, 'users', uid), { profile }, { merge: true });
}

async function saveLiked(uid, likedAnimals) {
  await setDoc(doc(db, 'users', uid), { likedAnimals }, { merge: true });
}

async function savePassed(uid, passedIds) {
  await setDoc(doc(db, 'users', uid), { passedIds }, { merge: true });
}

async function clearUserData(uid) {
  await setDoc(
    doc(db, 'users', uid),
    { profile: deleteField(), likedAnimals: [], passedIds: [] },
    { merge: true }
  );
}

// ── Species filter config ────────────────────────────────────────────────────
const SPECIES_FILTERS = [
  { value: 'all', label: 'All',  emoji: '🐾' },
  { value: 'dog', label: 'Dogs', emoji: '🐶' },
  { value: 'cat', label: 'Cats', emoji: '🐱' },
];

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { currentUser, authLoading } = useAuth();

  const [authView,      setAuthView]      = useState('login'); // 'login' | 'signup'
  const [userProfile,   setUserProfile]   = useState(null);
  const [likedAnimals,  setLikedAnimals]  = useState([]);
  const [passedIds,     setPassedIds]     = useState([]);
  const [activeTab,          setActiveTab]          = useState('discover');
  const [matchModal,         setMatchModal]         = useState(null);
  const [speciesFilter,      setSpeciesFilter]      = useState('all');
  const [dataLoading,        setDataLoading]        = useState(false);
  const [showOnboarding,     setShowOnboarding]     = useState(false);
  const [onboardingProgress, setOnboardingProgress] = useState({ completedTasks: [] });
  const [joinedCommunities,  setJoinedCommunities]  = useState([]);

  // ── Load user data from Firestore on login ───────────────────────────────
  useEffect(() => {
    if (!currentUser) {
      setUserProfile(null);
      setLikedAnimals([]);
      setPassedIds([]);
      setActiveTab('discover');
      setSpeciesFilter('all');
      return;
    }

    const uid = currentUser.uid;

    // Seed from local cache for instant render
    setUserProfile(cacheLoad(uid, 'profile', null));
    setLikedAnimals(cacheLoad(uid, 'liked', []));
    setPassedIds(cacheLoad(uid, 'passed', []));

    setDataLoading(true);
    loadUserData(uid)
      .then(({ profile, likedAnimals, passedIds, onboardingProgress, joinedCommunities }) => {
        setUserProfile(profile);
        setLikedAnimals(likedAnimals);
        setPassedIds(passedIds);
        setOnboardingProgress(onboardingProgress);
        setJoinedCommunities(joinedCommunities);
        cacheSave(uid, 'profile', profile);
        cacheSave(uid, 'liked',   likedAnimals);
        cacheSave(uid, 'passed',  passedIds);
      })
      .catch(console.error)
      .finally(() => setDataLoading(false));
  }, [currentUser]);

  // ── Sync state → Firestore + cache (skip during initial load) ───────────
  useEffect(() => {
    if (!currentUser || dataLoading) return;
    const uid = currentUser.uid;
    saveProfile(uid, userProfile).catch(console.error);
    cacheSave(uid, 'profile', userProfile);
  }, [userProfile]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!currentUser || dataLoading) return;
    const uid = currentUser.uid;
    saveLiked(uid, likedAnimals).catch(console.error);
    cacheSave(uid, 'liked', likedAnimals);
  }, [likedAnimals]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!currentUser || dataLoading) return;
    const uid = currentUser.uid;
    savePassed(uid, passedIds).catch(console.error);
    cacheSave(uid, 'passed', passedIds);
  }, [passedIds]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!currentUser || dataLoading) return;
    setDoc(doc(db, 'users', currentUser.uid), { joinedCommunities }, { merge: true }).catch(console.error);
  }, [joinedCommunities]);  // eslint-disable-line react-hooks/exhaustive-deps

  // ── Filtered animals ─────────────────────────────────────────────────────
  const sortedAnimals    = userProfile ? sortAnimalsByScore(animalsData, userProfile) : animalsData;
  const swipedIds        = new Set([...likedAnimals.map(a => a.id), ...passedIds]);
  const availableAnimals = sortedAnimals.filter(a => !swipedIds.has(a.id));

  const hdbFiltered =
    userProfile?.livingSpace === 'hdb'
      ? availableAnimals.filter(a => a.hdbApproved)
      : availableAnimals;

  const filteredAnimals =
    speciesFilter === 'all'
      ? hdbFiltered
      : hdbFiltered.filter(a => a.species === speciesFilter);

  // ── Handlers ─────────────────────────────────────────────────────────────
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

  const handleRetakeQuiz = async () => {
    if (currentUser) {
      try {
        await clearUserData(currentUser.uid);
        cacheClear(currentUser.uid);
      } catch (err) {
        console.error('Failed to clear Firestore data:', err);
      }
    }
    setUserProfile(null);
    setLikedAnimals([]);
    setPassedIds([]);
    setMatchModal(null);
    setActiveTab('discover');
    setSpeciesFilter('all');
  };

  // ── Avatar letter ─────────────────────────────────────────────────────────
  const avatarLetter = currentUser?.displayName
    ? currentUser.displayName[0].toUpperCase()
    : currentUser?.email?.[0].toUpperCase() ?? '?';

  // ── Auth loading splash ───────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl animate-bounce inline-block">🐾</span>
          <p className="text-[#FF6B35] font-bold mt-3 font-display text-lg">PawMatch</p>
        </div>
      </div>
    );
  }

  // ── Auth gate ─────────────────────────────────────────────────────────────
  if (!currentUser) {
    return authView === 'login'
      ? <LoginPage  onSwitchToSignup={() => setAuthView('signup')} />
      : <SignupPage onSwitchToLogin={()  => setAuthView('login')}  />;
  }

  // ── Firestore data loading ────────────────────────────────────────────────
  if (dataLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl animate-bounce inline-block">🐾</span>
          <p className="text-[#FF6B35] font-bold mt-3 font-display text-lg">Loading your profile…</p>
        </div>
      </div>
    );
  }

  // ── Onboarding ────────────────────────────────────────────────────────────
  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // ── Main app ──────────────────────────────────────────────────────────────
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
            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-xs font-black shadow-sm flex-shrink-0">
              {avatarLetter}
            </div>
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
              <p className="text-xs text-gray-400 font-semibold">
                {currentUser.displayName || currentUser.email}
              </p>
            </div>
          )}
          {activeTab === 'guide' && (
            <div>
              <h2 className="font-display text-lg font-bold text-gray-900">Breed Guide</h2>
              <p className="text-xs text-gray-400 font-semibold">Singapore's dogs — HDB &amp; beyond</p>
            </div>
          )}
          {activeTab === 'community' && (
            <div>
              <h2 className="font-display text-lg font-bold text-gray-900">Community</h2>
              <p className="text-xs text-gray-400 font-semibold">Connect with Singapore dog owners</p>
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
              onOpenGuide={() => setShowOnboarding(true)}
              onboardingProgress={onboardingProgress}
            />
          )}
          {activeTab === 'guide' && <BreedGuide />}
          {activeTab === 'community' && (
            <Community
              userProfile={userProfile}
              joinedCommunities={joinedCommunities}
              onJoinedChange={setJoinedCommunities}
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

        {/* ── 30-Day Owner Onboarding overlay ── */}
        {showOnboarding && (
          <OwnerOnboarding onClose={() => setShowOnboarding(false)} />
        )}
      </div>
    </div>
  );
}
