// 30-Day New Owner Onboarding Data — Singapore-specific

export const WEEKS = [
  {
    week: 1,
    title: 'Week 1 — Settling In',
    subtitle: 'Admin, home setup & first routines',
    tasks: [
      {
        id: 'avs-licence',
        title: 'Register your dog\'s AVS licence',
        description: 'All dogs in Singapore must be licensed with the Animal & Veterinary Service.',
        detail: 'Dogs must be licensed within 30 days of ownership transfer. Sterilised dogs cost $15/year, unsterilised dogs cost $90/year. Renew annually — fines apply for unlicensed dogs.',
        link: 'https://www.nparks.gov.sg/avs/pets/owning-a-pet/getting-a-pet/dog-licence',
        linkLabel: 'Apply on AVS website',
        cost: '$15/year (sterilised) · $90/year (unsterilised)',
        legal: true,
      },
      {
        id: 'microchip',
        title: 'Verify microchip registration',
        description: 'Confirm the microchip is transferred to your name in the national registry.',
        detail: 'Your shelter should have handed over the microchip certificate. Confirm the chip is registered to you via the AVS online portal. If not yet transferred, contact your shelter to update the records.',
        link: 'https://www.nparks.gov.sg/avs/pets/owning-a-pet/getting-a-pet/microchipping-of-dogs',
        linkLabel: 'AVS microchip info',
        legal: true,
      },
      {
        id: 'buy-essentials',
        title: 'Buy the essentials',
        description: 'Leash, collar with ID tag, food & water bowls, crate or bed.',
        detail: 'Must-haves: 1.2–1.5m leash (retractable leads are discouraged in HDB areas), flat collar with metal ID tag engraved with your phone number, stainless steel or ceramic bowls, and a crate or bed for a "safe zone". Optional: pee pads, playpen, enzymatic cleaner for accidents.',
        cost: 'Est. $80–$150 for starter kit',
      },
      {
        id: 'hdb-intro',
        title: 'Introduce your dog to neighbours',
        description: 'A friendly introduction prevents complaints before they start.',
        detail: 'Knock on immediate neighbours\' doors with your dog on a short leash. Keep the visit brief (5 minutes). Share your contact number in case of concerns. This goodwill gesture significantly reduces the chance of HDB complaints.',
      },
      {
        id: 'home-base',
        title: 'Set up a dedicated home base area',
        description: 'A crate or pen gives your dog a safe, calm retreat.',
        detail: 'Place the crate or playpen in a quiet corner away from the front door. Line it with a blanket and include a worn T-shirt with your scent. Keep the door open initially so your dog can explore freely. Never use the crate as punishment.',
      },
      {
        id: 'toilet-spot',
        title: 'Establish a toilet training spot',
        description: 'Consistency is key — pick one indoor and one outdoor spot.',
        detail: 'Place pee pads in the same corner every time. Take your dog outside to the same grass patch after every meal, nap, and play session. Use the same command ("Go potty") and reward immediately after success. Accidents happen — clean with enzymatic cleaner to remove the scent.',
      },
      {
        id: 'dog-proof',
        title: 'Dog-proof your flat',
        description: 'Remove hazards before your dog discovers them.',
        detail: 'Common hazards: electrical cables (use cable organisers), toxic plants (pothos, lilies, rubber plants), cleaning chemicals under the sink, small items that can be swallowed, open balconies (install safety netting if needed). In Singapore, all balconies with pets must be secured — this is an HDB requirement.',
      },
      {
        id: 'feeding-schedule',
        title: 'Set a consistent feeding schedule',
        description: 'Regular meal times help with toilet training and anxiety.',
        detail: 'Adult dogs typically eat twice a day (morning and evening). Puppies may need 3–4 meals. Feed at the same times daily. Pick up the bowl after 20 minutes. Free-feeding (leaving food out all day) makes toilet training much harder and can cause weight issues.',
      },
    ],
  },
  {
    week: 2,
    title: 'Week 2 — Health & Hygiene',
    subtitle: 'Vet, vaccinations & preventive care',
    tasks: [
      {
        id: 'first-vet',
        title: 'Schedule and attend your first vet visit',
        description: 'Full health check within the first two weeks of adoption.',
        detail: 'Bring your adoption papers, vaccination records, and deworming history. The vet will do a full physical exam, check for parasites, and advise on any immediate health concerns. Singapore vets are used to shelter dogs — they\'ll guide you on what\'s needed next.',
        cost: 'Est. $50–$120 for a basic consult',
      },
      {
        id: 'vaccinations',
        title: 'Confirm and schedule vaccination plan',
        description: 'Core vaccines: C5 (dogs) or C3 — discuss timing with your vet.',
        detail: 'Core vaccines for Singapore dogs: DA2PP (Distemper, Adenovirus, Parvovirus, Parainfluenza) + Bordetella, often bundled as C5. Rabies vaccine is required if you plan to travel. Annual boosters are recommended. Shelters usually provide partial vaccination records — bring them to your vet.',
        legal: true,
      },
      {
        id: 'flea-tick',
        title: 'Start flea & tick prevention',
        description: 'Singapore\'s humidity makes year-round parasite prevention essential.',
        detail: 'Popular options: NexGard (monthly chewable), Bravecto (3-month chewable), Frontline Plus (monthly spot-on). Discuss with your vet which is best for your dog\'s size and lifestyle. Ticks are common in Singapore parks — prevention is far easier than treating a tick-borne illness.',
        cost: 'Est. $30–$80 per month depending on product and dog size',
      },
      {
        id: 'heartworm',
        title: 'Discuss heartworm prevention',
        description: 'Heartworm is transmitted by mosquitoes — Singapore is high-risk.',
        detail: 'Heartworm disease is life-threatening and treatment is expensive and difficult. Monthly prevention (Heartgard, Simparica Trio) is strongly recommended. Ask your vet to test for heartworm first before starting prevention if your dog\'s history is unknown.',
        cost: 'Est. $20–$40/month for prevention',
      },
      {
        id: 'deworming',
        title: 'Complete deworming protocol',
        description: 'Most shelter dogs need deworming upon adoption.',
        detail: 'Common intestinal parasites in Singapore: roundworm, hookworm, tapeworm, giardia. Shelters typically deworm before adoption but a vet may recommend a follow-up dose. Signs of worms: pot belly, weight loss, scooting, visible worms in stool.',
        cost: 'Est. $15–$40 per treatment',
      },
      {
        id: 'toilet-continue',
        title: 'Continue and reinforce toilet training',
        description: 'Week 2 is critical — maintain consistency to build the habit.',
        detail: 'By now your dog should be showing some understanding of the toilet spot. Continue rewarding immediately after success (within 2 seconds). If accidents are frequent, increase the number of outdoor toilet breaks to every 2 hours. Never punish accidents — just clean up calmly and reset.',
      },
      {
        id: 'bath-routine',
        title: 'Introduce bath and grooming routine',
        description: 'First bath should be calm and positive.',
        detail: 'Use lukewarm water and dog-specific shampoo. In Singapore\'s heat, once every 2–3 weeks is typical. Dry thoroughly — humid conditions make moisture-related skin infections common. Introduce the blow dryer on low heat if needed. Reward throughout to build a positive association.',
      },
    ],
  },
  {
    week: 3,
    title: 'Week 3 — Training & Socialisation',
    subtitle: 'Commands, leash manners & community',
    tasks: [
      {
        id: 'basic-obedience',
        title: 'Teach basic obedience: sit, stay, come, leave it',
        description: '5–10 minutes of training twice daily — short sessions work best.',
        detail: 'Start with "sit" (easiest) using a treat held above the nose. Progress to "stay" (increase duration gradually), "come" (recall — most important for safety), and "leave it" (critical around food and rubbish in Singapore parks). Use positive reinforcement only — no punishment.',
      },
      {
        id: 'leash-training',
        title: 'Practice leash manners in the corridor',
        description: 'Loose-leash walking practice before heading outside.',
        detail: 'Practice in your HDB corridor or void deck first — less distracting than outside. Stop walking the moment the leash tightens. Resume when the dog returns to your side. The goal: dog walks beside you with a J-shaped (loose) leash. This takes weeks — be patient.',
      },
      {
        id: 'first-walk',
        title: 'Take your first outdoor walk',
        description: 'Choose cool hours: 7–9am or after 7pm to avoid heat stress.',
        detail: 'In Singapore, pavement temperatures at midday can exceed 60°C — dangerous for paw pads. Choose shaded routes (park connectors, void decks). Bring water for your dog. Keep the first walk short (10–15 minutes). Watch for signs of overheating: excessive panting, drooling, or slowing down.',
      },
      {
        id: 'grooming-book',
        title: 'Book a professional grooming appointment',
        description: 'Most dog groomers in Singapore recommend 4–6 week intervals.',
        detail: 'For HDB breeds (shorter coats), grooming every 4–8 weeks is typical. Services usually include bath, blow-dry, ear cleaning, nail trim, and anal gland expression. Prices in Singapore range from $60–$150 depending on breed size. Book in advance — popular groomers have waitlists.',
        cost: 'Est. $60–$150 per session',
      },
      {
        id: 'community',
        title: 'Join a local dog owner community',
        description: 'Find support, recommendations, and dog-friendly meetups.',
        detail: 'Useful Singapore communities: "Dog Owners Singapore" Facebook group, r/singapore (pet threads), CarousellPets for secondhand supplies, HDB Paw Pals (Facebook). Local vet clinics often have notice boards. A community gives you access to trusted vet and groomer recommendations.',
      },
      {
        id: 'socialisation',
        title: 'Begin structured socialisation',
        description: 'Positive exposure to people, sounds, and environments.',
        detail: 'Expose your dog to: different people (hats, uniforms, children), sounds (traffic, MRT noise, lift beeps), surfaces (tiles, gravel, grass, metal gratings). Keep each new experience positive — treat generously and don\'t force interactions. The critical socialisation window is before 16 weeks for puppies, but adult dogs benefit too.',
      },
    ],
  },
  {
    week: 4,
    title: 'Week 4 — Into Routine',
    subtitle: 'Consistency, classes & long-term planning',
    tasks: [
      {
        id: 'walk-schedule',
        title: 'Establish a consistent daily walk schedule',
        description: 'Morning and evening walks become the backbone of your routine.',
        detail: 'Aim for at least 30–45 minutes of walking split across 2 sessions. Morning: 7–9am before the heat builds. Evening: after 7pm when temperatures drop. HDB dogs benefit greatly from consistent outdoor time — it reduces anxiety, excessive barking, and destructive behaviour.',
      },
      {
        id: 'advanced-social',
        title: 'Continue advanced socialisation',
        description: 'Dog parks, café meetups, and structured dog-to-dog interactions.',
        detail: 'Singapore dog-friendly venues: West Coast Park, Bishan-AMK Park, East Coast Park dog runs. Always keep your dog on a leash until you know how they interact. Introduce dog-to-dog meetings on neutral ground. Watch for stress signals: stiff body, whale eye, lip licking, tail tucked.',
      },
      {
        id: 'obedience-class',
        title: 'Book a group obedience class',
        description: 'Professional training accelerates progress and builds confidence.',
        detail: 'Recommended Singapore trainers: SDTC (Singapore Dog Training Club), K9 Club, Perfect Pets, and various positive-reinforcement trainers found on Facebook. Group classes are great for socialisation while learning. Avoid trainers using punishment-based methods (prong collars, e-collars).',
        cost: 'Est. $200–$500 for a 6–8 week group course',
      },
      {
        id: 'public-manners',
        title: 'Practice leash manners in public',
        description: 'Void decks, bus stops, and markets with distractions.',
        detail: 'Practice the skills from Week 3 in busier environments: hawker centres (sit-stay while you queue), bus stops (calm waiting), wet markets. Always use a short leash in public. Carry treats to reinforce good behaviour. This is also when you formalise the "heel" command.',
      },
      {
        id: 'hdb-walk',
        title: 'Master HDB common area etiquette',
        description: 'Lifts, corridors, void decks — the rules every HDB dog owner must know.',
        detail: 'In HDB lifts: shorten the leash, ask others if they\'re comfortable before entering, position your dog behind you. In corridors: keep to the left, let others pass. At void decks: don\'t allow jumping on strangers. Always pick up waste immediately — a $1,000 fine applies for failing to do so.',
        legal: true,
      },
      {
        id: 'toilet-review',
        title: 'Review and consolidate toilet training',
        description: 'By week 4, accidents should be rare — troubleshoot if not.',
        detail: 'If accidents are still frequent, rule out medical causes first (UTI, bladder issues). Revisit the basics: more frequent outdoor trips, tighter supervision indoors, enzymatic cleaner for all accident spots. Some dogs take 6–8 weeks to fully toilet train — this is normal.',
      },
      {
        id: 'next-vet',
        title: 'Schedule your next vet visit',
        description: 'Plan the next check-up and vaccination booster in advance.',
        detail: 'Book the next appointment before leaving the vet after your Week 2 visit, or call now to schedule. Annual wellness checks, dental assessments, and booster vaccines are the minimum. Consider pet insurance — Singapore options include Etiqa, NTUC Income, and AXA SmartPet.',
        cost: 'Pet insurance: est. $30–$120/month depending on coverage',
      },
    ],
  },
];

export const GUIDES = [
  {
    id: 'first-vet',
    title: 'First Vet Visit Guide',
    icon: '🏥',
    sections: [
      {
        heading: 'What to bring',
        items: [
          'Adoption papers / transfer documents',
          'Vaccination record (from shelter)',
          'Deworming history if available',
          'Any medications your dog is currently on',
          'Stool sample (optional but helpful for parasite check)',
        ],
      },
      {
        heading: 'What happens at the visit',
        items: [
          'Weight measurement and body condition score',
          'Full physical exam: eyes, ears, teeth, skin, abdomen',
          'Heart and lung auscultation',
          'Discussion of vaccination schedule',
          'Parasite prevention plan',
          'Any specific concerns you have',
        ],
      },
      {
        heading: 'Estimated costs (SGD)',
        items: [
          'Basic consult: $50–$80',
          'Full wellness exam: $80–$120',
          'Blood panel (optional first visit): $80–$150',
          'Flea/tick treatment: $30–$80',
          'Deworming: $15–$40',
        ],
      },
      {
        heading: 'Tip',
        items: [
          'Bring your dog slightly hungry — treats work much better for cooperation during the exam.',
          'Write down your questions beforehand. Vets in Singapore are thorough but busy.',
        ],
      },
    ],
  },
  {
    id: 'adore',
    title: 'Project ADORE Guide',
    icon: '🏠',
    intro: 'Project ADORE (Adoption and Rehoming of Dogs) is an AVS initiative allowing Singapore residents to rehome dogs of non-HDB approved breeds if they already live in HDB flats (existing ownership only). It does not allow new adoptions of non-approved breeds into HDB flats.',
    steps: [
      { step: 1, title: 'Check eligibility', detail: 'Only dogs already living in an HDB flat (pre-existing ownership) are eligible. Newly adopted dogs must be of AVS-approved breeds for HDB.' },
      { step: 2, title: 'Apply via AVS', detail: 'Submit an application at nparks.gov.sg/avs. Provide proof of ownership and current living arrangement.' },
      { step: 3, title: 'Home visit', detail: 'An AVS officer may conduct a home visit to assess suitability — flat size, dog temperament, and owner compliance history.' },
      { step: 4, title: 'Trial period', detail: 'If approved, a trial period is granted. The dog must remain quiet and well-behaved. Any complaints during the trial period may result in revocation.' },
      { step: 5, title: 'Final approval', detail: 'Successful trial leads to formal ADORE approval. The approval is tied to the specific flat and owner — it does not transfer if you move.' },
    ],
    note: 'Project ADORE does not apply to newly adopted dogs. For new adoptions into HDB flats, only AVS-approved breeds (35 small breeds) are permitted.',
  },
  {
    id: 'faq',
    title: 'Week 1 FAQ',
    icon: '❓',
    questions: [
      {
        q: 'My dog isn\'t eating — is that normal?',
        a: 'Yes. Most dogs take 2–5 days to eat normally in a new home. Stress suppresses appetite. Keep offering regular meals. If refusal continues past 5–7 days or the dog seems unwell, call your vet.',
      },
      {
        q: 'My dog is crying at night — what do I do?',
        a: 'This is very common in the first week. Try placing a worn T-shirt with your scent in the crate. A ticking clock wrapped in a towel can simulate a heartbeat. Avoid rushing in immediately — wait for a pause in crying before reassuring. Gradual improvement is expected by night 3–5.',
      },
      {
        q: 'How much should I let my dog explore the flat immediately?',
        a: 'Start small. Limit access to one or two rooms initially using baby gates or closed doors. Expand access gradually over the first week as toilet training establishes. Too much space too soon = accidents everywhere.',
      },
      {
        q: 'Can I bring my dog to a HDB void deck or corridor?',
        a: 'Yes, but always on a leash. Dogs must be leashed in all HDB common areas. Keep them away from food areas and pick up waste immediately. Be mindful of neighbours who may be uncomfortable around dogs.',
      },
      {
        q: 'My dog seems scared of everything — is something wrong?',
        a: 'Fearfulness in the first 1–2 weeks is normal — especially for shelter dogs who may not have been socialised. Give your dog time and space. Don\'t force interactions. Use high-value treats to create positive associations. If fear is severe (shaking, not eating, elimination from fear), contact your vet.',
      },
      {
        q: 'Do I need to wash my dog immediately after adoption?',
        a: 'Not necessarily. Wait until your dog is settled (Day 3–5 minimum). Shelters usually bathe dogs before adoption. A too-early bath in an unfamiliar home can increase stress. Prioritise bonding first, grooming second.',
      },
    ],
  },
  {
    id: 'hdb-etiquette',
    title: 'HDB Dog Etiquette',
    icon: '🏢',
    rules: [
      {
        rule: 'Always leash in common areas',
        detail: 'Leashing is legally required in all HDB common areas — corridors, void decks, car parks, and lifts. Use a short leash (not retractable) for better control.',
      },
      {
        rule: 'Lift etiquette',
        detail: 'Shorten the leash before entering. Ask other passengers if they\'re comfortable. Position your dog behind you or to the side. If a passenger seems uncomfortable, wait for the next lift.',
      },
      {
        rule: 'Pick up waste immediately',
        detail: 'This is legally required. Failure to clean up after your dog is a $1,000 fine under the Parks and Trees Act. Carry poo bags at all times — attach a roll to your leash.',
      },
      {
        rule: 'No barking after 10pm',
        detail: 'Excessive barking is grounds for an HDB complaint. Manage barking through training, enrichment (food puzzles), and adequate exercise. Separation anxiety is the leading cause — address early.',
      },
      {
        rule: 'Only approved breeds for HDB',
        detail: 'Only the 35 AVS-approved small dog breeds are permitted in HDB flats. The weight limit is 15kg at full growth. Mixed breeds are permitted if they do not physically resemble a prohibited breed.',
      },
      {
        rule: 'No feeding stray dogs near your block',
        detail: 'Feeding strays near your HDB block can attract nuisance complaints and is discouraged by town councils. If you want to help strays, contact a registered community cat/dog programme in your area.',
      },
    ],
  },
  {
    id: 'legal',
    title: 'Singapore Dog Laws',
    icon: '⚖️',
    requirements: [
      { item: 'Dog licence', detail: 'All dogs must be licensed with AVS. Penalty: up to $5,000 fine.' },
      { item: 'Microchipping', detail: 'All dogs must be microchipped and the chip registered to the current owner.' },
      { item: 'Leash in public', detail: 'Dogs must be leashed in all public areas. Penalty: up to $5,000 fine.' },
      { item: 'Waste pick-up', detail: 'You must clean up after your dog in public. Penalty: $1,000 fine.' },
      { item: 'Rabies vaccination', detail: 'Not required for Singapore-based dogs unless travelling internationally.' },
      { item: 'HDB breed rules', detail: 'Only 35 AVS-approved breeds allowed in HDB flats. Max weight: 15kg at maturity.' },
      { item: 'Dangerous dogs', detail: 'Certain breeds (Pit Bulls, Rottweilers, etc.) are prohibited in Singapore entirely. Penalty: seizure and destruction of dog.' },
    ],
    fineCallout: {
      headline: '⚖️ $200–$1,000 fine for not leashing your dog in public',
      detail: 'Leash law applies to ALL public areas — parks, void decks, corridors, lifts, and any shared public space. This is enforced by AVS officers and NParks rangers.',
    },
  },
];
