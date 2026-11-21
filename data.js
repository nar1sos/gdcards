const DEFAULT_RARITIES = [
  { id: 'common',    name: 'Common',    color: '#3b82f6', bg: '#131b2e', order: 1, weight: 450, effect: 'none' },
  { id: 'epic',      name: 'Epic',      color: '#a855f7', bg: '#211433', order: 2, weight: 250, effect: 'none' },
  { id: 'mythic',    name: 'Mythic',    color: '#e14b5a', bg: '#29151a', order: 3, weight: 140, effect: 'glow' },
  { id: 'legendary', name: 'Legendary', color: '#eab308', bg: '#2b2310', order: 4, weight: 85,  effect: 'glow' },
  { id: 'apex',      name: 'Apex',      color: '#ec4899', bg: '#1e192b', order: 5, weight: 45,  effect: 'rainbow' },
  { id: 'limit',     name: 'Limit',     color: '#00f5d4', bg: '#071c1a', order: 6, weight: 20,  effect: 'pulse' },
  { id: 'upcoming',  name: 'UPCOMING',  color: '#ff2a85', bg: '#14080e', order: 7, weight: 10,  effect: 'sparkle' }
];

const DEFAULT_CARDS = [
  // Common (синяя)
  { id: 'c1', top: 145, name: 'Cataclysm',        rarity: 'common',    price: 120,   img: 'https://i.ytimg.com/vi/88w0aW1E83M/mqdefault.jpg' },
  { id: 'c2', top: 132, name: 'Bloodbath',        rarity: 'common',    price: 180,   img: 'https://i.ytimg.com/vi/twTw4fjT0ik/mqdefault.jpg' },
  { id: 'c3', top: 118, name: 'Sonic Wave',       rarity: 'common',    price: 240,   img: 'https://i.ytimg.com/vi/2S4e8x-K0fQ/mqdefault.jpg' },
  { id: 'c4', top: 105, name: 'Yatagarasu',       rarity: 'common',    price: 310,   img: 'https://i.ytimg.com/vi/r5547a7-l4M/mqdefault.jpg' },

  // Epic (фиолетовая)
  { id: 'c5', top: 78,  name: 'Kuzureta',         rarity: 'epic',      price: 550,   img: 'https://i.ytimg.com/vi/97pB07W3V6s/mqdefault.jpg' },
  { id: 'c6', top: 64,  name: 'Tartarus',         rarity: 'epic',      price: 780,   img: 'https://i.ytimg.com/vi/22-4_r96B5s/mqdefault.jpg' },
  { id: 'c7', top: 52,  name: 'The Golden',       rarity: 'epic',      price: 950,   img: 'https://i.ytimg.com/vi/wG498rX2X00/mqdefault.jpg' },

  // Mythic (красная)
  { id: 'c8',  top: 24, name: 'Firework',         rarity: 'mythic',    price: 1800,  img: 'https://i.ytimg.com/vi/QBe5x2o9w2w/mqdefault.jpg' },
  { id: 'c9',  top: 15, name: 'Slaughterhouse',   rarity: 'mythic',    price: 2400,  img: 'https://i.ytimg.com/vi/k29v7iM8gI0/mqdefault.jpg' },
  { id: 'c10', top: 8,  name: 'Green Bullet',     rarity: 'mythic',    price: 3100,  img: 'https://i.ytimg.com/vi/6M1M8E8d8M0/mqdefault.jpg' },
  { id: 'c11', top: 5,  name: 'Amethyst',         rarity: 'mythic',    price: 3600,  img: 'https://i.ytimg.com/vi/S8r1u8E0jM4/mqdefault.jpg' },

  // Legendary (желтая)
  { id: 'c12', top: 4,  name: 'Acheron',          rarity: 'legendary', price: 6500,  img: 'https://i.ytimg.com/vi/sBKR6aUorzA/mqdefault.jpg' },
  { id: 'c13', top: 3,  name: 'Avernus',          rarity: 'legendary', price: 8200,  img: 'https://i.ytimg.com/vi/16613-77W6o/mqdefault.jpg' },

  // Apex (разноцветная)
  { id: 'c14', top: 2,  name: 'Nullscapes',       rarity: 'apex',      price: 15000, img: 'https://i.ytimg.com/vi/9f1l5E1p2k0/mqdefault.jpg' },
  { id: 'c15', top: 1,  name: 'Tidal Wave',       rarity: 'apex',      price: 22000, img: 'https://i.ytimg.com/vi/9fsZ014qB3s/mqdefault.jpg' },

  // Limit (черно-бирюзовая)
  { id: 'c16', top: 0,  name: 'Kocmoc Unleashed', rarity: 'limit',     price: 45000, img: 'https://i.ytimg.com/vi/3x4mB0sR_pA/mqdefault.jpg' },

  // UPCOMING (розово-черная)
  { id: 'c17', top: 0,  name: 'GRIEF',            rarity: 'upcoming',  price: 90000, img: 'https://i.ytimg.com/vi/8J0x8lK6t2I/mqdefault.jpg' },
  { id: 'c18', top: 0,  name: 'Vehemence',        rarity: 'upcoming',  price: 120000,img: 'https://i.ytimg.com/vi/m3rJ1g6M1f8/mqdefault.jpg' }
];

const DEFAULT_CASES = [
  {
    id: 'case_starter',
    name: 'Classic Demon Case',
    price: 300,
    img: 'https://i.ytimg.com/vi/twTw4fjT0ik/mqdefault.jpg',
    cardIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c8', 'c10']
  },
  {
    id: 'case_top10',
    name: 'Main List Elite',
    price: 2500,
    img: 'https://i.ytimg.com/vi/9fsZ014qB3s/mqdefault.jpg',
    cardIds: ['c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15']
  },
  {
    id: 'case_upcoming',
    name: 'Upcoming & Limit Box',
    price: 12000,
    img: 'https://i.ytimg.com/vi/8J0x8lK6t2I/mqdefault.jpg',
    cardIds: ['c11', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18']
  }
];
