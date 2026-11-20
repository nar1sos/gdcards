// === НАСТРОЙКИ ОБЩЕГО ПУЛА КАРТ, КЕЙСОВ, ЛИДЕРБОРДА И ЛАЙВ-ДРОПОВ (JSONBin.io) ===
const JSONBIN_BIN_ID = '6afc4b60ffd5d16053c85caa';
const JSONBIN_MASTER_KEY = '$2a$10$eiZem/A1JhfYhF6bHWXE7uzoJ6D8QjuKpyPe5Hrg9i2osHoYhRrVK';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Стартовый пул (используется только если облако ещё не настроено или в облаке вообще нет массива pool)
const DEFAULT_POOL = [
  {
    id: 'lvl_1',
    rank: 1,
    name: 'GRIEF',
    verifier: 'icedcave',
    publisher: 'icedcave',
    rarity: 'limit',
    price: 10000,
    image: 'https://i.ytimg.com/vi/9fsZ014qB3s/maxresdefault.jpg'
  },
  {
    id: 'lvl_2',
    rank: 2,
    name: 'Artemis 13',
    verifier: 'Zoink',
    publisher: 'Artemis',
    rarity: 'apex',
    price: 9500,
    image: 'https://i.ytimg.com/vi/sBKR6aUorzA/maxresdefault.jpg'
  },
  {
    id: 'lvl_3',
    rank: 3,
    name: 'Society',
    verifier: 'Zoink',
    publisher: 'Society',
    rarity: 'apex',
    price: 9000,
    image: 'https://i.ytimg.com/vi/16Zh8hW264w/maxresdefault.jpg'
  },
  {
    id: 'lvl_4',
    rank: 4,
    name: 'Thinking Space II',
    verifier: 'Zoink',
    publisher: 'CairoX',
    rarity: 'apex',
    price: 8500,
    image: 'https://i.ytimg.com/vi/5M6h8f6bY5g/maxresdefault.jpg'
  },
  {
    id: 'lvl_9',
    rank: 9,
    name: 'ORBIT',
    verifier: 'Zoink',
    publisher: 'MindCap',
    rarity: 'legendary',
    price: 6000,
    image: 'https://placehold.co/400x225/1a1025/ffffff?text=ORBIT'
  },
  {
    id: 'lvl_21',
    rank: 21,
    name: 'Silent Clubstep',
    verifier: 'Paqoe',
    publisher: 'TheRealSailent',
    rarity: 'mythic',
    price: 5500,
    image: 'https://i.ytimg.com/vi/GR4Sn_dc83w/maxresdefault.jpg'
  },
  {
    id: 'lvl_41',
    rank: 41,
    name: 'Thinking Space II',
    verifier: 'Zoink',
    publisher: 'CairoX',
    rarity: 'epic',
    price: 2000,
    image: 'https://i.ytimg.com/vi/kpcF1-6989M/maxresdefault.jpg'
  },
  {
    id: 'lvl_51',
    rank: 51,
    name: 'ace',
    verifier: 'Player',
    publisher: 'Creator',
    rarity: 'common',
    price: 100,
    image: 'https://i.ytimg.com/vi/0rG15S9Z4zY/maxresdefault.jpg'
  }
];

const DEFAULT_CASES = [
  {
    id: 'case_starter',
    name: 'Starter Demon Case',
    price: 350,
    image: 'https://placehold.co/480x270/171a2b/ffffff?text=STARTER+CASE',
    itemIds: []
  },
  {
    id: 'case_top_list',
    name: 'Main List Overload Case',
    price: 1400,
    image: 'https://placehold.co/480x270/2a1226/ffffff?text=MAIN+LIST+CASE',
    itemIds: []
  }
];

const DEFAULT_EFFECTS = [
  {
    id: 'none',
    name: 'Без эффекта',
    styleMode: 'none',
    intensity: 1,
    accentColor: ''
  },
  {
    id: 'pulse_glow',
    name: 'Пульсирующее свечение',
    styleMode: 'pulse_glow',
    intensity: 1.2,
    accentColor: ''
  },
  {
    id: 'shimmer_sweep',
    name: 'Переливающийся блик',
    styleMode: 'shimmer_sweep',
    intensity: 1.1,
    accentColor: ''
  },
  {
    id: 'neon_border',
    name: 'Неоновый контур',
    styleMode: 'neon_border',
    intensity: 1.3,
    accentColor: ''
  },
  {
    id: 'float_aura',
    name: 'Плавная аура',
    styleMode: 'float_aura',
    intensity: 1.25,
    accentColor: ''
  }
];

const DEFAULT_RARITIES = [
  { key: 'common', label: 'Common', color: '#3b82f6', effectId: 'none', packChance: 67.499, caseChance: 60.899, order: 1 },
  { key: 'epic', label: 'Epic', color: '#a855f7', effectId: 'none', packChance: 31.5, caseChance: 30.0, order: 2 },
  { key: 'mythic', label: 'Mythic', color: '#ef4444', effectId: 'pulse_glow', packChance: 0.4, caseChance: 5.0, order: 3 },
  { key: 'legendary', label: 'Legendary', color: '#eab308', effectId: 'shimmer_sweep', packChance: 0.3, caseChance: 3.0, order: 4 },
  { key: 'apex', label: 'Apex', color: '#f43f5e', effectId: 'neon_border', packChance: 0.2, caseChance: 1.0, order: 5 },
  { key: 'limit', label: 'Limit', color: '#10b981', effectId: 'float_aura', packChance: 0.1, caseChance: 0.1, order: 6 },
  { key: 'future', label: 'FUTURE', color: '#06b6d4', effectId: 'shimmer_sweep', packChance: 0.001, caseChance: 0.001, order: 7 }
];

const DEFAULT_AVATAR = 'https://placehold.co/160x160/1e293b/ffffff?text=GD';

const RARE_ANIM_TIERS = ['legendary', 'apex', 'limit', 'future'];
const HOLO_CHANCE = 0.12;
const HOLO_MULTIPLIER = 3.5;
const PACK_PRICE = 500;
const CRAFT_REQUIRED_COUNT = 10;

const REEL_SLOT_WIDTH = 212;
const REEL_SLOT_GAP = 12;

let state = {
  playerId: '',
  playerName: 'nar1',
  playerAvatar: DEFAULT_AVATAR,
  isRegistered: false,
  balance: 500,
  packs: 0,
  packsOpened: 0,
  pool: [],
  cases: [],
  rarities: [],
  effects: [],
  inventory: [],
  droppedTemp: [],
  recentDrops: [],
  playersRegistry: [],
  tradeOffers: []
};

let openedCaseId = null;
let pendingCaseDropCard = null;

// Состояние PvP трейда через лидерборд и входящих предложений
let activeTradePartnerId = null;
let viewingProfilePlayerId = null;
let myTradeUids = [];
let theirTradeUids = [];
let activeTradesSubTab = 'incoming';

let selectedCraftRarityKey = null;
let selectedCraftCardUids = [];
let lastCraftedCard = null;

let selectedUpgradeSourceId = null;
let selectedUpgradeTargetKey = null;
let isSpinning = false;
let isOpeningPack = false;
let isOpeningCase = false;
let uploadedAdminImageDataUrl = '';
let uploadedCaseImageDataUrl = '';
let editingCardImageDataUrl = '';
let editingCaseImageDataUrl = '';
let uploadedRegAvatarDataUrl = '';
let uploadedProfileAvatarDataUrl = '';
let draggedAdminPoolCardId = null;
let isSavingCloud = false;
let cloudSyncQueue = Promise.resolve();
let lastRegistryWriteTs = 0;

function isCloudConfigured() {
  return Boolean(
    JSONBIN_BIN_ID &&
    !JSONBIN_BIN_ID.includes('ВСТАВЬ_СЮДА') &&
    JSONBIN_MASTER_KEY &&
    !JSONBIN_MASTER_KEY.includes('ВСТАВЬ_СЮДА')
  );
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSafeAvatarSrc(src, fallbackName = 'Player') {
  const clean = String(src || '').trim();
  if (clean) return clean;
  return `https://placehold.co/160x160/1e293b/ffffff?text=${encodeURIComponent(String(fallbackName || 'GD').slice(0, 8))}`;
}

function normalizeRarityKey(raw) {
  return String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeEffectId(raw) {
  const clean = String(raw || '').trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '_');
  return clean || 'none';
}

function normalizeEffectsList(list) {
  const source = Array.isArray(list) && list.length > 0 ? list : DEFAULT_EFFECTS;
  const map = new Map();

  source.forEach(item => {
    if (!item) return;
    const id = normalizeEffectId(item.id);
    if (!id) return;
    const intensityNum = Number(item.intensity);
    map.set(id, {
      id,
      name: String(item.name || id).trim() || id,
      styleMode: ['none', 'pulse_glow', 'shimmer_sweep', 'neon_border', 'float_aura'].includes(item.styleMode)
        ? item.styleMode
        : 'pulse_glow',
      intensity: Number.isFinite(intensityNum) ? Math.max(0.3, Math.min(2.5, intensityNum)) : 1,
      accentColor: /^#[0-9a-fA-F]{6}$/.test(item.accentColor || '') ? item.accentColor : ''
    });
  });

  if (!map.has('none')) {
    map.set('none', { ...DEFAULT_EFFECTS[0] });
  }

  return Array.from(map.values());
}

function getEffectObj(effectId) {
  const normId = normalizeEffectId(effectId);
  return state.effects.find(e => e.id === normId) || DEFAULT_EFFECTS[0];
}

function normalizeRaritiesList(list) {
  const source = Array.isArray(list) && list.length > 0 ? list : DEFAULT_RARITIES;
  const map = new Map();

  source.forEach((item, idx) => {
    if (!item) return;
    const key = normalizeRarityKey(item.key || item.label);
    if (!key) return;
    const effId = normalizeEffectId(item.effectId);
    map.set(key, {
      key,
      label: String(item.label || key).trim() || key,
      color: /^#[0-9a-fA-F]{6}$/.test(item.color || '') ? item.color : '#8b5cf6',
      effectId: effId,
      packChance: Math.max(0, Number(item.packChance) || 0),
      caseChance: Math.max(0, Number(item.caseChance) || 0),
      order: Number.isFinite(Number(item.order)) ? Number(item.order) : idx + 1
    });
  });

  if (map.size === 0) {
    DEFAULT_RARITIES.forEach(def => map.set(def.key, { ...def }));
  }

  return Array.from(map.values()).sort((a, b) => (a.order || 999) - (b.order || 999));
}

function getRarityObj(rarityKey) {
  const normKey = normalizeRarityKey(rarityKey) || 'common';
  return (
    state.rarities.find(r => r.key === normKey) ||
    DEFAULT_RARITIES.find(r => r.key === normKey) || {
      key: normKey,
      label: rarityKey || normKey,
      color: '#8b5cf6',
      effectId: 'none',
      packChance: 0,
      caseChance: 0,
      order: 99
    }
  );
}

function getRarityLabel(rarityKey) {
  return getRarityObj(rarityKey).label;
}

function getRarityRankOrder(rarityKey) {
  const obj = getRarityObj(rarityKey);
  return obj.order || 1;
}

function getOrderedRarities() {
  return [...state.rarities].sort((a, b) => (a.order || 999) - (b.order || 999));
}

function getNextRarityObj(rarityKey) {
  const ordered = getOrderedRarities();
  const normKey = normalizeRarityKey(rarityKey);
  const idx = ordered.findIndex(r => r.key === normKey);
  if (idx === -1 || idx >= ordered.length - 1) return null;
  return ordered[idx + 1];
}

function getPackRarityWeights() {
  return state.rarities.map(r => ({
    key: r.key,
    weight: Math.max(0, Number(r.packChance) || 0)
  }));
}

function getCaseRarityWeights() {
  return state.rarities.map(r => ({
    key: r.key,
    weight: Math.max(0, Number(r.caseChance) || 0)
  }));
}

function parseRankValue(rank) {
  if (typeof rank === 'number' && Number.isFinite(rank)) return rank;
  const cleaned = String(rank ?? '').trim().replace(/^#/, '');
  if (!cleaned) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function compareRanks(aRank, bRank) {
  const aNum = parseRankValue(aRank);
  const bNum = parseRankValue(bRank);
  if (aNum !== null && bNum !== null) {
    if (aNum !== bNum) return aNum - bNum;
    return String(aRank).localeCompare(String(bRank), 'ru');
  }
  if (aNum !== null) return -1;
  if (bNum !== null) return 1;
  return String(aRank || '').localeCompare(String(bRank || ''), 'ru');
}

function hexToRgba(hex, alpha) {
  const clean = /^#[0-9a-fA-F]{6}$/.test(hex || '') ? hex : '#8b5cf6';
  const r = parseInt(clean.slice(1, 3), 16);
  const g = parseInt(clean.slice(3, 5), 16);
  const b = parseInt(clean.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
}

function syncDynamicRarityStyles() {
  let styleEl = document.getElementById('gd-dynamic-rarity-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'gd-dynamic-rarity-style';
    document.head.appendChild(styleEl);
  }

  const rarityRules = state.rarities.map(r => {
    const k = r.key;
    const c = r.color || '#8b5cf6';
    return `
      .gd-card.rarity-${k},
      .cs-reel-card.rarity-${k} {
        border-color: ${c};
        box-shadow: 0 0 16px ${hexToRgba(c, 0.25)};
      }
      .gd-card.rarity-${k} .rarity-badge,
      .live-rarity-badge.rarity-${k} {
        background: ${hexToRgba(c, 0.22)};
        color: ${c};
        border: 1px solid ${hexToRgba(c, 0.55)};
      }
    `;
  });

  const effectRules = state.effects.map(eff => {
    const eid = eff.id;
    const mode = eff.styleMode || 'none';
    const mult = Number(eff.intensity) || 1;
    const customColor = /^#[0-9a-fA-F]{6}$/.test(eff.accentColor || '') ? eff.accentColor : '';

    if (mode === 'none' || eid === 'none') {
      return `
        .gd-card.fx-${eid},
        .cs-reel-card.fx-${eid},
        .cb-live-item.fx-${eid} {
          animation: none;
        }
      `;
    }

    if (mode === 'pulse_glow') {
      const glowAlpha = Math.min(0.85, 0.42 * mult);
      const blurPx = Math.round(18 * mult);
      return `
        @keyframes fxPulse_${eid} {
          0%, 100% {
            box-shadow: 0 0 ${Math.round(blurPx * 0.6)}px ${customColor ? hexToRgba(customColor, glowAlpha * 0.7) : 'currentColor'};
          }
          50% {
            box-shadow: 0 0 ${blurPx}px ${customColor ? hexToRgba(customColor, glowAlpha) : 'currentColor'};
          }
        }
        .gd-card.fx-${eid},
        .cs-reel-card.fx-${eid},
        .cb-live-item.fx-${eid} {
          ${customColor ? `border-color: ${customColor};` : ''}
          animation: fxPulse_${eid} 2.2s ease-in-out infinite;
        }
      `;
    }

    if (mode === 'shimmer_sweep') {
      const sweepAlpha = Math.min(0.45, 0.18 * mult);
      return `
        @keyframes fxShimmer_${eid} {
          0% { transform: translateX(-140%) skewX(-20deg); }
          60%, 100% { transform: translateX(240%) skewX(-20deg); }
        }
        .gd-card.fx-${eid},
        .cs-reel-card.fx-${eid} {
          position: relative;
          overflow: hidden;
          ${customColor ? `border-color: ${customColor};` : ''}
        }
        .gd-card.fx-${eid}::after,
        .cs-reel-card.fx-${eid}::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 45%;
          background: linear-gradient(90deg, transparent, ${customColor ? hexToRgba(customColor, sweepAlpha) : `rgba(255, 255, 255, ${sweepAlpha})`}, transparent);
          pointer-events: none;
          z-index: 3;
          animation: fxShimmer_${eid} 2.8s ease-in-out infinite;
        }
      `;
    }

    if (mode === 'neon_border') {
      const spread = Math.round(3 * mult);
      const blur = Math.round(22 * mult);
      return `
        @keyframes fxNeon_${eid} {
          0%, 100% {
            filter: brightness(1);
            box-shadow: 0 0 ${Math.round(blur * 0.65)}px ${customColor || 'currentColor'}, inset 0 0 ${Math.max(4, spread * 3)}px ${customColor ? hexToRgba(customColor, 0.25) : 'rgba(255,255,255,0.12)'};
          }
          50% {
            filter: brightness(1.14);
            box-shadow: 0 0 ${blur}px ${customColor || 'currentColor'}, inset 0 0 ${Math.max(6, spread * 4)}px ${customColor ? hexToRgba(customColor, 0.35) : 'rgba(255,255,255,0.2)'};
          }
        }
        .gd-card.fx-${eid},
        .cs-reel-card.fx-${eid},
        .cb-live-item.fx-${eid} {
          ${customColor ? `border-color: ${customColor};` : ''}
          animation: fxNeon_${eid} 1.8s ease-in-out infinite;
        }
      `;
    }

    const liftPx = Math.round(4 * mult);
    const auraBlur = Math.round(24 * mult);
    return `
      @keyframes fxAura_${eid} {
        0%, 100% {
          transform: translateY(0px);
          box-shadow: 0 4px ${Math.round(auraBlur * 0.7)}px ${customColor ? hexToRgba(customColor, 0.45) : 'currentColor'};
        }
        50% {
          transform: translateY(-${liftPx}px);
          box-shadow: 0 10px ${auraBlur}px ${customColor ? hexToRgba(customColor, 0.72) : 'currentColor'};
        }
      }
      .gd-card.fx-${eid},
      .cs-reel-card.fx-${eid} {
        ${customColor ? `border-color: ${customColor};` : ''}
        animation: fxAura_${eid} 2.6s ease-in-out infinite;
      }
    `;
  });

  styleEl.textContent = [...rarityRules, ...effectRules].join('
');
}

function getCardEffectClass(rarityKey) {
  const rarityObj = getRarityObj(rarityKey);
  const effObj = getEffectObj(rarityObj.effectId);
  return `fx-${effObj.id}`;
}

function injectCustomUIStyles() {
  if (!document.getElementById('gd-case-spinner-style')) {
    const style = document.createElement('style');
    style.id = 'gd-case-spinner-style';
    style.textContent = `
      .live-rarity-badge {
        display: inline-block;
        margin-top: 3px;
        padding: 1px 7px;
        border-radius: 999px;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      #case-detail-view {
        width: 100%;
        box-sizing: border-box;
      }

      .cs-spinner-shell {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(13, 15, 26, 0.92);
        padding: 18px 0;
        margin: 18px 0 22px;
      }

      .cs-spinner-pointer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 3px;
        transform: translateX(-50%);
        background: #facc15;
        box-shadow: 0 0 14px rgba(250, 204, 21, 0.9);
        z-index: 6;
        pointer-events: none;
      }

      .cs-spinner-track {
        display: flex;
        gap: 12px;
        padding-left: 0;
        will-change: transform;
      }

      .cs-reel-card {
        width: 212px;
        flex-shrink: 0;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(20, 23, 38, 0.96);
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
      }

      .cs-reel-card img {
        width: 100%;
        height: 106px;
        object-fit: cover;
        border-radius: 8px;
        display: block;
        margin-bottom: 8px;
      }

      .cs-reel-title {
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cs-reel-sub {
        font-size: 10px;
        opacity: 0.9;
        margin-top: 3px;
        text-transform: uppercase;
      }

      .case-drop-spotlight {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 18px 20px;
        margin: 0 0 22px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        background: rgba(18, 21, 36, 0.95);
      }

      .case-drop-spotlight-card {
        width: 240px;
        max-width: 100%;
      }

      .case-drop-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 210px;
      }

      .gd-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(5, 7, 14, 0.78);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        z-index: 9999;
      }

      .gd-modal-backdrop.hidden {
        display: none;
      }

      .gd-modal-card {
        width: 100%;
        max-width: 680px;
        max-height: 90vh;
        overflow: auto;
        background: #141827;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 14px;
        padding: 20px;
        box-sizing: border-box;
      }

      .rarity-chance-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        margin-top: 10px;
      }

      .rarity-chance-table th,
      .rarity-chance-table td {
        padding: 8px 6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        text-align: left;
      }

      .rarity-chance-table input[type="number"],
      .rarity-chance-table input[type="text"],
      .rarity-chance-table select {
        padding: 5px 7px;
      }

      .rarity-chance-table input[type="number"] {
        width: 82px;
      }

      .effect-customizer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 12px;
        margin-top: 12px;
      }

      .effect-customizer-card {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 10px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.03);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      #admin-pool-grid .gd-card {
        cursor: grab;
        user-select: none;
      }

      #admin-pool-grid .gd-card:active {
        cursor: grabbing;
      }

      #admin-pool-grid .gd-card.admin-drag-source {
        opacity: 0.45;
      }

      #admin-pool-grid .gd-card.admin-drag-over {
        outline: 2px dashed #38bdf8;
        outline-offset: 2px;
      }

      .craft-top-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 16px 18px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(18, 22, 38, 0.9);
        margin-bottom: 18px;
      }

      .craft-summary-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 18px;
        font-size: 14px;
      }

      .craft-slots-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
        margin-bottom: 18px;
      }

      .craft-empty-slot {
        min-height: 155px;
        border-radius: 12px;
        border: 1px dashed rgba(255, 255, 255, 0.22);
        background: rgba(255, 255, 255, 0.02);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        opacity: 0.65;
        padding: 8px;
        text-align: center;
        box-sizing: border-box;
      }

      .craft-result-box {
        padding: 18px 20px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(20, 26, 44, 0.95);
        margin-bottom: 22px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 20px;
      }

      /* Профиль игрока в коллекции и шапке */
      .player-profile-banner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 18px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(18, 22, 38, 0.92);
        margin-bottom: 18px;
      }

      .player-profile-identity {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .player-avatar-img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(56, 189, 248, 0.65);
        background: #141827;
        flex-shrink: 0;
      }

      .player-avatar-sm {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.25);
        flex-shrink: 0;
      }

      .player-profile-editor {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 10px;
        margin-top: 14px;
        padding-top: 14px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;
      }

      /* Лидерборд и просмотр профиля игрока */
      .leaderboard-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 22px;
      }

      .leaderboard-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.13);
        background: rgba(18, 22, 38, 0.9);
      }

      .leaderboard-row.is-top-1 {
        border-color: rgba(250, 204, 21, 0.6);
        background: rgba(34, 29, 14, 0.78);
      }

      .leaderboard-row.is-me {
        border-color: rgba(56, 189, 248, 0.5);
      }

      .leaderboard-left {
        display: flex;
        align-items: center;
        gap: 14px;
        min-width: 220px;
      }

      .leaderboard-pos {
        font-weight: 800;
        font-size: 16px;
        min-width: 36px;
        text-align: center;
      }

      .leaderboard-stats {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 14px;
        font-size: 13px;
      }

      .leaderboard-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .visited-profile-card {
        padding: 18px 20px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        background: rgba(18, 22, 38, 0.94);
        margin-bottom: 18px;
      }

      /* Модалка условной регистрации */
      .reg-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(6, 9, 18, 0.86);
        backdrop-filter: blur(6px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        z-index: 10000;
      }

      .reg-modal-backdrop.hidden {
        display: none;
      }

      .reg-modal-card {
        width: 100%;
        max-width: 460px;
        background: #141827;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 16px;
        padding: 24px;
        box-sizing: border-box;
      }

      .reg-avatar-preview {
        width: 84px;
        height: 84px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #38bdf8;
        margin: 0 auto 12px;
        display: block;
      }

      .nav-btn {
        position: relative;
      }

      .trade-unread-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        margin-left: 6px;
        border-radius: 999px;
        background: #ef4444;
        color: #ffffff;
        font-size: 11px;
        font-weight: 800;
        line-height: 1;
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.75);
        box-sizing: border-box;
      }

      .trade-unread-badge.hidden {
        display: none;
      }

      .trade-subtabs {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .trade-subtab-btn.active {
        background: #38bdf8;
        color: #090d16;
        font-weight: 700;
      }

      .trade-offer-card {
        padding: 16px 18px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(18, 22, 38, 0.94);
        margin-bottom: 14px;
      }

      .trade-offer-card.is-incoming-pending {
        border-color: rgba(239, 68, 68, 0.55);
        box-shadow: 0 0 18px rgba(239, 68, 68, 0.12);
      }

      .trade-offer-sides {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 14px;
        margin: 12px 0;
      }

      .trade-side-box {
        padding: 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.09);
        background: rgba(255, 255, 255, 0.02);
      }
    `;
    document.head.appendChild(style);
  }
  syncDynamicRarityStyles();
}

function ensureRegistrationModalUI() {
  if (document.getElementById('quick-register-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'quick-register-modal';
  modal.className = 'reg-modal-backdrop hidden';
  modal.innerHTML = `
    <div class="reg-modal-card">
      <h2 style="margin:0 0 6px;">Вход / Регистрация игрока</h2>
      <p class="hint" style="margin:0 0 16px;">
        Укажи свой ник и выбери аватарку с компьютера или вставь ссылку (URL).
      </p>
      <img id="reg-avatar-preview" src="${escapeHtml(DEFAULT_AVATAR)}" alt="Превью аватара" class="reg-avatar-preview" />
      <form id="quick-register-form" style="display:grid; gap:12px;">
        <label style="display:flex; flex-direction:column; gap:5px; font-size:13px;">
          <span>Никнейм</span>
          <input type="text" id="reg-nickname-input" maxlength="24" placeholder="Например: nar1" required />
        </label>
        <label style="display:flex; flex-direction:column; gap:5px; font-size:13px;">
          <span>Аватарка с компьютера</span>
          <input type="file" id="reg-avatar-file" accept="image/*" />
        </label>
        <label style="display:flex; flex-direction:column; gap:5px; font-size:13px;">
          <span>Или ссылка (URL) на аватарку</span>
          <input type="url" id="reg-avatar-url" placeholder="https://..." />
        </label>
        <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:6px;">
          <button type="button" id="reg-guest-btn" class="btn-secondary">Продолжить с ником по умолчанию</button>
          <button type="submit" class="btn-primary">Сохранить и войти</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

function openRegistrationModal(prefill = true) {
  ensureRegistrationModalUI();
  uploadedRegAvatarDataUrl = '';
  const modal = document.getElementById('quick-register-modal');
  const nickInput = document.getElementById('reg-nickname-input');
  const fileInput = document.getElementById('reg-avatar-file');
  const urlInput = document.getElementById('reg-avatar-url');
  const previewImg = document.getElementById('reg-avatar-preview');

  if (nickInput) nickInput.value = prefill ? (state.playerName || 'nar1') : '';
  if (fileInput) fileInput.value = '';
  const currentAv = getSafeAvatarSrc(state.playerAvatar, state.playerName);
  if (urlInput) urlInput.value = currentAv.startsWith('data:') ? '' : currentAv;
  if (previewImg) previewImg.src = currentAv;

  if (modal) modal.classList.remove('hidden');
}

function closeRegistrationModal() {
  uploadedRegAvatarDataUrl = '';
  const modal = document.getElementById('quick-register-modal');
  if (modal) modal.classList.add('hidden');
}

function ensureHeaderProfileBadge() {
  const header = document.querySelector('header, .top-bar, .header');
  if (!header || document.getElementById('header-player-badge')) return;

  const badge = document.createElement('div');
  badge.id = 'header-player-badge';
  badge.style.cssText = 'display:inline-flex; align-items:center; gap:8px; cursor:pointer; padding:4px 10px; border-radius:999px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12);';
  badge.title = 'Открыть профиль в коллекции / сменить ник и аватар';
  badge.innerHTML = `
    <img id="header-player-avatar" src="${escapeHtml(getSafeAvatarSrc(state.playerAvatar, state.playerName))}" alt="Аватар" class="player-avatar-sm" />
    <span id="header-player-name" style="font-size:13px; font-weight:700;">${escapeHtml(state.playerName)}</span>
  `;

  badge.addEventListener('click', () => {
    const colBtn = document.querySelector('.nav-btn[data-tab="collection"]');
    if (colBtn) {
      colBtn.click();
    } else {
      openRegistrationModal(true);
    }
  });

  header.appendChild(badge);
}

function ensureCollectionProfileEditorUI() {
  const colTab = document.getElementById('tab-collection');
  if (!colTab || document.getElementById('collection-profile-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'collection-profile-banner';
  banner.className = 'player-profile-banner';
  banner.innerHTML = `
    <div class="player-profile-identity">
      <img id="col-profile-avatar" src="${escapeHtml(getSafeAvatarSrc(state.playerAvatar, state.playerName))}" alt="Аватар игрока" class="player-avatar-img" />
      <div>
        <div style="font-size:12px; opacity:0.75;">Твой профиль игрока</div>
        <div id="col-profile-name" style="font-size:20px; font-weight:800;">${escapeHtml(state.playerName)}</div>
        <div id="col-profile-sub" class="hint" style="margin-top:2px;"></div>
      </div>
    </div>

    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <button type="button" id="toggle-profile-edit-btn" class="btn-secondary">Изменить ник и аватар</button>
    </div>

    <form id="collection-profile-edit-form" class="player-profile-editor hidden">
      <label style="display:flex; flex-direction:column; gap:5px; font-size:12px;">
        <span>Новый никнейм</span>
        <input type="text" id="col-edit-name-input" maxlength="24" required />
      </label>
      <label style="display:flex; flex-direction:column; gap:5px; font-size:12px;">
        <span>Аватар с компьютера</span>
        <input type="file" id="col-edit-avatar-file" accept="image/*" />
      </label>
      <label style="display:flex; flex-direction:column; gap:5px; font-size:12px;">
        <span>Или ссылка (URL) на аватар</span>
        <input type="url" id="col-edit-avatar-url" placeholder="https://..." />
      </label>
      <div style="display:flex; align-items:end; gap:8px; flex-wrap:wrap;">
        <button type="submit" class="btn-primary">Сохранить</button>
        <button type="button" id="col-cancel-edit-btn" class="btn-secondary">Отмена</button>
      </div>
    </form>
  `;

  const statsEl = colTab.querySelector('.stats-grid, .collection-stats, .stats-bar');
  if (statsEl && statsEl.parentNode === colTab) {
    colTab.insertBefore(banner, statsEl);
  } else {
    colTab.prepend(banner);
  }
}

function renderCollectionProfileBanner() {
  ensureCollectionProfileEditorUI();
  const imgEl = document.getElementById('col-profile-avatar');
  const nameEl = document.getElementById('col-profile-name');
  const subEl = document.getElementById('col-profile-sub');
  const nameInp = document.getElementById('col-edit-name-input');
  const urlInp = document.getElementById('col-edit-avatar-url');

  const safeAv = getSafeAvatarSrc(state.playerAvatar, state.playerName);
  if (imgEl) imgEl.src = safeAv;
  if (nameEl) nameEl.textContent = state.playerName || 'nar1';
  if (subEl) {
    const invCost = state.inventory.reduce((s, c) => s + (Number(c.price) || 0), 0);
    subEl.textContent = `Карт в коллекции: ${state.inventory.length} · Стоимость инвентаря: ${invCost} ₽`;
  }
  if (nameInp && document.activeElement !== nameInp) {
    nameInp.value = state.playerName || 'nar1';
  }
  if (urlInp && document.activeElement !== urlInp) {
    urlInp.value = safeAv.startsWith('data:') ? '' : safeAv;
  }
}

async function applyPlayerProfileUpdate(newName, newAvatar, markRegistered = true) {
  const cleanName = String(newName || '').trim().slice(0, 24) || 'nar1';
  const cleanAvatar = getSafeAvatarSrc(newAvatar, cleanName);

  state.playerName = cleanName;
  state.playerAvatar = cleanAvatar;
  if (markRegistered) {
    state.isRegistered = true;
  }

  upsertSelfIntoRegistry(Date.now());
  saveState();
  updateHeader();
  renderCollectionProfileBanner();
  renderLeaderboardAndTradesPage();

  if (isCloudConfigured()) {
    await pushSharedData(
      state.pool,
      state.cases,
      state.recentDrops,
      state.rarities,
      state.effects,
      state.playersRegistry,
      state.tradeOffers
    );
  }
}

// === ЛИДЕРБОРД И ТРЕЙДЫ С ИГРОКАМИ ===
function getInventoryValue(cards) {
  if (!Array.isArray(cards)) return 0;
  return cards.reduce((sum, c) => sum + (Number(c && c.price) || 0), 0);
}

function sanitizeCardForRegistry(card) {
  if (!card || typeof card !== 'object') return null;
  const priceNum = Math.max(0, Number(card.price) || 0);
  return {
    uid: String(card.uid || `reg_c_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`),
    templateId: card.templateId || card.id || '',
    rank: card.rank ?? '',
    name: String(card.name || 'Level'),
    verifier: String(card.verifier || ''),
    publisher: String(card.publisher || ''),
    rarity: normalizeRarityKey(card.rarity) || 'common',
    image: String(card.image || ''),
    isHolo: Boolean(card.isHolo),
    price: priceNum,
    favorite: Boolean(card.favorite)
  };
}

function buildSelfRegistryEntry(explicitUpdatedAt = null) {
  const cleanInv = Array.isArray(state.inventory)
    ? state.inventory.map(sanitizeCardForRegistry).filter(Boolean)
    : [];
  const invValue = getInventoryValue(cleanInv);
  const ts = explicitUpdatedAt || lastRegistryWriteTs || Date.now();
  return {
    playerId: state.playerId,
    playerName: state.playerName || 'nar1',
    avatar: getSafeAvatarSrc(state.playerAvatar, state.playerName),
    balance: Math.max(0, Number(state.balance) || 0),
    inventoryValue: invValue,
    cardsCount: cleanInv.length,
    inventory: cleanInv,
    updatedAt: ts
  };
}

function upsertSelfIntoRegistry(explicitUpdatedAt = null) {
  if (!state.playerId) return;
  if (explicitUpdatedAt !== null) {
    lastRegistryWriteTs = Math.max(lastRegistryWriteTs, Number(explicitUpdatedAt) || Date.now());
  }
  const selfEntry = buildSelfRegistryEntry(explicitUpdatedAt);
  const others = Array.isArray(state.playersRegistry)
    ? state.playersRegistry.filter(p => p && p.playerId && p.playerId !== state.playerId)
    : [];
  state.playersRegistry = normalizePlayersRegistryList([selfEntry, ...others]);
}

function normalizePlayersRegistryList(list) {
  if (!Array.isArray(list)) return [];
  const map = new Map();
  list.forEach(item => {
    if (!item || !item.playerId) return;
    const pid = String(item.playerId).trim();
    if (!pid) return;
    const inv = Array.isArray(item.inventory)
      ? item.inventory.map(sanitizeCardForRegistry).filter(Boolean)
      : [];
    const invValue = getInventoryValue(inv);
    const candidate = {
      playerId: pid,
      playerName: String(item.playerName || 'Player').trim() || 'Player',
      avatar: getSafeAvatarSrc(item.avatar, item.playerName),
      balance: Math.max(0, Number(item.balance) || 0),
      inventoryValue: invValue,
      cardsCount: inv.length,
      inventory: inv,
      updatedAt: Number(item.updatedAt) || 0
    };
    const prev = map.get(pid);
    if (!prev || (candidate.updatedAt || 0) >= (prev.updatedAt || 0)) {
      map.set(pid, candidate);
    }
  });
  return Array.from(map.values());
}

function mergePlayersRegistryWithCloud(cloudRegistry) {
  const normalizedCloud = normalizePlayersRegistryList(cloudRegistry);
  const map = new Map(normalizedCloud.map(p => [p.playerId, p]));

  // Добавляем всех локально известных игроков, которых вдруг нет в облачном снимке
  normalizePlayersRegistryList(state.playersRegistry).forEach(localP => {
    if (!map.has(localP.playerId)) {
      map.set(localP.playerId, localP);
    }
  });

  // Для самого себя: если облачная запись свежее локального состояния (например, приняли трейд на другом устройстве), берём облако
  const cloudSelf = normalizedCloud.find(p => p.playerId === state.playerId);
  const localSelf = buildSelfRegistryEntry();
  if (cloudSelf && (cloudSelf.updatedAt || 0) > (localSelf.updatedAt || 0) && (cloudSelf.updatedAt || 0) > lastRegistryWriteTs) {
    state.inventory = Array.isArray(cloudSelf.inventory) ? cloudSelf.inventory : state.inventory;
    state.playerName = cloudSelf.playerName || state.playerName;
    state.playerAvatar = getSafeAvatarSrc(cloudSelf.avatar, state.playerName);
    state.balance = Math.max(0, Number(cloudSelf.balance) || state.balance);
    lastRegistryWriteTs = cloudSelf.updatedAt || Date.now();
    map.set(state.playerId, cloudSelf);
  } else if (state.playerId) {
    map.set(state.playerId, buildSelfRegistryEntry());
  }

  return Array.from(map.values());
}

function getSortedLeaderboardPlayers() {
  upsertSelfIntoRegistry();
  const players = normalizePlayersRegistryList(state.playersRegistry);
  return players.sort((a, b) => {
    const valDiff = (b.inventoryValue || 0) - (a.inventoryValue || 0);
    if (valDiff !== 0) return valDiff;
    const cntDiff = (b.cardsCount || 0) - (a.cardsCount || 0);
    if (cntDiff !== 0) return cntDiff;
    return String(a.playerName).localeCompare(String(b.playerName), 'ru');
  });
}

function normalizeTradeOfferCards(cards) {
  if (!Array.isArray(cards)) return [];
  return cards.map(sanitizeCardForRegistry).filter(Boolean);
}

function normalizeTradeOffersList(list) {
  if (!Array.isArray(list)) return [];
  const map = new Map();
  list.forEach(item => {
    if (!item || !item.id) return;
    const id = String(item.id).trim();
    if (!id) return;
    const status = ['pending', 'accepted', 'declined', 'cancelled'].includes(item.status)
      ? item.status
      : 'pending';
    const candidate = {
      id,
      fromPlayerId: String(item.fromPlayerId || ''),
      fromPlayerName: String(item.fromPlayerName || 'Player'),
      fromPlayerAvatar: getSafeAvatarSrc(item.fromPlayerAvatar, item.fromPlayerName),
      toPlayerId: String(item.toPlayerId || ''),
      toPlayerName: String(item.toPlayerName || 'Player'),
      toPlayerAvatar: getSafeAvatarSrc(item.toPlayerAvatar, item.toPlayerName),
      fromCards: normalizeTradeOfferCards(item.fromCards),
      toCards: normalizeTradeOfferCards(item.toCards),
      status,
      createdAt: Number(item.createdAt) || 0,
      updatedAt: Number(item.updatedAt) || Number(item.createdAt) || 0
    };
    const prev = map.get(id);
    if (!prev || (candidate.updatedAt || 0) >= (prev.updatedAt || 0)) {
      map.set(id, candidate);
    }
  });
  return Array.from(map.values()).sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0));
}

function mergeTradeOffersWithCloud(cloudOffers) {
  return normalizeTradeOffersList([
    ...(Array.isArray(cloudOffers) ? cloudOffers : []),
    ...(Array.isArray(state.tradeOffers) ? state.tradeOffers : [])
  ]);
}

function getIncomingPendingTradesCount() {
  const offers = normalizeTradeOffersList(state.tradeOffers);
  return offers.filter(o => o.status === 'pending' && o.toPlayerId === state.playerId).length;
}

function updateTradesNavBadge() {
  const tradeBtn = document.querySelector('.nav-btn[data-tab="trades"]');
  if (!tradeBtn) return;

  let badge = tradeBtn.querySelector('.trade-unread-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'trade-unread-badge hidden';
    tradeBtn.appendChild(badge);
  }

  const count = getIncomingPendingTradesCount();
  if (count > 0) {
    badge.textContent = String(count);
    badge.classList.remove('hidden');
  } else {
    badge.textContent = '0';
    badge.classList.add('hidden');
  }
}

function ensureLeaderboardAndTradesUI() {
  const nav = document.querySelector('nav, .nav-bar, .navbar, .tabs-nav');
  if (nav && !nav.querySelector('[data-tab="leaderboard"]')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-btn';
    btn.dataset.tab = 'leaderboard';
    btn.textContent = 'Лидерборд';
    const tradeBtn = nav.querySelector('[data-tab="trades"]');
    const adminBtn = nav.querySelector('[data-tab="admin"]');
    if (tradeBtn && tradeBtn.parentNode === nav) {
      nav.insertBefore(btn, tradeBtn);
    } else if (adminBtn && adminBtn.parentNode === nav) {
      nav.insertBefore(btn, adminBtn);
    } else {
      nav.appendChild(btn);
    }
  }

  if (nav && !nav.querySelector('[data-tab="trades"]')) {
    const tradeBtn = document.createElement('button');
    tradeBtn.type = 'button';
    tradeBtn.className = 'nav-btn';
    tradeBtn.dataset.tab = 'trades';
    tradeBtn.textContent = 'Трейды';
    const adminBtn = nav.querySelector('[data-tab="admin"]');
    if (adminBtn && adminBtn.parentNode === nav) {
      nav.insertBefore(tradeBtn, adminBtn);
    } else {
      nav.appendChild(tradeBtn);
    }
  }

  updateTradesNavBadge();

  if (!document.getElementById('tab-leaderboard')) {
    const tradesTab = document.getElementById('tab-trades');
    const main = (tradesTab && tradesTab.parentElement) || document.querySelector('main') || document.body;
    const section = document.createElement('section');
    section.id = 'tab-leaderboard';
    section.className = 'tab-section';
    section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Лидерборд игроков</h2>
        <p class="hint">Рейтинг игроков по общей стоимости карт в инвентаре. Нажми «Профиль», чтобы посмотреть карты игрока и отправить трейд.</p>
      </div>

      <div id="visited-player-profile" class="visited-profile-card hidden"></div>

      <div id="leaderboard-players-list" class="leaderboard-list"></div>
    `;

    if (tradesTab && tradesTab.parentNode === main) {
      main.insertBefore(section, tradesTab);
    } else {
      main.appendChild(section);
    }
  }

  const tradesSection = document.getElementById('tab-trades');
  if (tradesSection) {
    tradesSection.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Трейды</h2>
        <p class="hint">Входящие предложения от других игроков, отправка трейдов и история сделок.</p>
      </div>

      <div class="trade-subtabs">
        <button type="button" class="btn-secondary trade-subtab-btn ${activeTradesSubTab === 'incoming' ? 'active' : ''}" data-trade-subtab="incoming">
          Входящие <span id="trades-subtab-incoming-count"></span>
        </button>
        <button type="button" class="btn-secondary trade-subtab-btn ${activeTradesSubTab === 'create' ? 'active' : ''}" data-trade-subtab="create">
          Создать трейд
        </button>
        <button type="button" class="btn-secondary trade-subtab-btn ${activeTradesSubTab === 'history' ? 'active' : ''}" data-trade-subtab="history">
          Отправленные и история
        </button>
      </div>

      <div id="trades-subtab-incoming" class="${activeTradesSubTab === 'incoming' ? '' : 'hidden'}">
        <div id="incoming-trades-list"></div>
      </div>

      <div id="trades-subtab-create" class="${activeTradesSubTab === 'create' ? '' : 'hidden'}">
        <div style="margin-bottom:14px; display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
          <label style="display:flex; flex-direction:column; gap:5px; font-size:13px; min-width:220px;">
            <span>Выбери игрока для трейда</span>
            <select id="trade-partner-select"></select>
          </label>
          <button type="button" id="go-to-leaderboard-btn" class="btn-secondary" style="align-self:end;">Открыть лидерборд</button>
        </div>

        <div id="pvp-trade-placeholder" class="empty-box">
          <p style="margin:0;">Выбери другого игрока сверху или нажми «Трейд» в лидерборде, чтобы собрать предложение.</p>
        </div>

        <div id="pvp-trade-workspace" class="hidden">
          <div class="craft-top-bar">
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <img id="trade-partner-avatar" src="" alt="" class="player-avatar-img" style="width:46px; height:46px;" />
              <div>
                <div style="font-size:12px; opacity:0.75;">Предложение для игрока:</div>
                <div id="trade-partner-name" style="font-size:18px; font-weight:800;"></div>
              </div>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button type="button" id="pvp-confirm-trade-btn" class="btn-primary" disabled>Отправить трейд</button>
              <button type="button" id="pvp-cancel-trade-btn" class="btn-secondary">Очистить выбор</button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
            <div class="visited-profile-card" style="margin:0;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <strong>Ты отдаёшь (<span id="pvp-my-sum">0</span> ₽)</strong>
                <span class="hint"><span id="pvp-my-count">0</span> / 6 карт</span>
              </div>
              <div id="pvp-my-offer-slots" class="cards-grid"></div>
            </div>

            <div class="visited-profile-card" style="margin:0;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <strong>Ты хочешь получить у <span id="pvp-partner-short-name"></span> (<span id="pvp-their-sum">0</span> ₽)</strong>
                <span class="hint"><span id="pvp-their-count">0</span> / 6 карт</span>
              </div>
              <div id="pvp-their-offer-slots" class="cards-grid"></div>
            </div>
          </div>

          <h3 class="sub-title">Твой инвентарь (нажми на карту, чтобы добавить в трейд)</h3>
          <div id="pvp-my-inventory-grid" class="cards-grid" style="margin-bottom:22px;"></div>

          <h3 class="sub-title">Инвентарь игрока <span id="pvp-partner-inv-name"></span> (нажми на карту, чтобы выбрать)</h3>
          <div id="pvp-partner-inventory-grid" class="cards-grid"></div>
        </div>
      </div>

      <div id="trades-subtab-history" class="${activeTradesSubTab === 'history' ? '' : 'hidden'}">
        <div id="outgoing-and-history-trades-list"></div>
      </div>
    `;
  }
}

function setActiveTradesSubTab(subTab) {
  if (!['incoming', 'create', 'history'].includes(subTab)) return;
  activeTradesSubTab = subTab;
  renderLeaderboardAndTradesPage();
}

function openPlayerProfile(playerId) {
  viewingProfilePlayerId = playerId || null;
  renderLeaderboardAndTradesPage();
  const box = document.getElementById('visited-player-profile');
  if (box && !box.classList.contains('hidden')) {
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function startTradeWithPlayer(playerId) {
  if (!playerId || playerId === state.playerId) {
    showToast('Нельзя отправить трейд самому себе!');
    return;
  }
  const players = getSortedLeaderboardPlayers();
  const target = players.find(p => p.playerId === playerId);
  if (!target) {
    showToast('Игрок не найден в лидерборде');
    return;
  }

  activeTradePartnerId = playerId;
  activeTradesSubTab = 'create';
  myTradeUids = [];
  theirTradeUids = [];

  const tradeNavBtn = document.querySelector('.nav-btn[data-tab="trades"]');
  if (tradeNavBtn) {
    tradeNavBtn.click();
  } else {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('tab-trades');
    if (sec) sec.classList.add('active');
    renderLeaderboardAndTradesPage();
  }
}

async function syncCloudBeforeTradeAction() {
  if (!isCloudConfigured()) return;
  const fresh = await fetchSharedData();
  if (!fresh.ok) return;

  if (Array.isArray(fresh.playersRegistry)) {
    state.playersRegistry = mergePlayersRegistryWithCloud(fresh.playersRegistry);
  }
  if (Array.isArray(fresh.tradeOffers)) {
    state.tradeOffers = mergeTradeOffersWithCloud(fresh.tradeOffers);
  }
  if (Array.isArray(fresh.pool) && fresh.pool.length > 0) state.pool = fresh.pool;
  if (Array.isArray(fresh.cases) && fresh.cases.length > 0) state.cases = fresh.cases;
  if (Array.isArray(fresh.effects) && fresh.effects.length > 0) state.effects = normalizeEffectsList(fresh.effects);
  if (Array.isArray(fresh.rarities) && fresh.rarities.length > 0) state.rarities = normalizeRaritiesList(fresh.rarities);
  if (Array.isArray(fresh.recentDrops)) state.recentDrops = fresh.recentDrops;
}

async function sendTradeOffer() {
  if (!activeTradePartnerId || activeTradePartnerId === state.playerId) return;

  await syncCloudBeforeTradeAction();
  upsertSelfIntoRegistry(Date.now());

  const registryMap = new Map(normalizePlayersRegistryList(state.playersRegistry).map(p => [p.playerId, p]));
  const meEntry = registryMap.get(state.playerId) || buildSelfRegistryEntry();
  const partnerEntry = registryMap.get(activeTradePartnerId);

  if (!partnerEntry) {
    showToast('Игрок больше недоступен для трейда');
    activeTradePartnerId = null;
    renderLeaderboardAndTradesPage();
    return;
  }

  const myGivenCards = meEntry.inventory
    .filter(c => myTradeUids.includes(c.uid))
    .map(sanitizeCardForRegistry)
    .filter(Boolean);

  const theirWantedCards = partnerEntry.inventory
    .filter(c => theirTradeUids.includes(c.uid))
    .map(sanitizeCardForRegistry)
    .filter(Boolean);

  if (myGivenCards.length === 0 && theirWantedCards.length === 0) {
    showToast('Выбери хотя бы одну карту в предложении');
    return;
  }

  const nowTs = Date.now();
  const newOffer = {
    id: `offer_${nowTs}_${Math.random().toString(36).slice(2, 6)}`,
    fromPlayerId: meEntry.playerId,
    fromPlayerName: meEntry.playerName,
    fromPlayerAvatar: meEntry.avatar,
    toPlayerId: partnerEntry.playerId,
    toPlayerName: partnerEntry.playerName,
    toPlayerAvatar: partnerEntry.avatar,
    fromCards: myGivenCards,
    toCards: theirWantedCards,
    status: 'pending',
    createdAt: nowTs,
    updatedAt: nowTs
  };

  state.tradeOffers = normalizeTradeOffersList([newOffer, ...(state.tradeOffers || [])]);
  myTradeUids = [];
  theirTradeUids = [];
  activeTradesSubTab = 'history';

  saveState();
  updateHeader();
  renderLeaderboardAndTradesPage();

  if (isCloudConfigured()) {
    await pushSharedData(
      state.pool,
      state.cases,
      state.recentDrops,
      state.rarities,
      state.effects,
      state.playersRegistry,
      state.tradeOffers
    );
  }

  showToast(`Трейд отправлен игроку ${partnerEntry.playerName}!`);
}

async function respondToTradeOffer(offerId, decision) {
  if (!offerId || !['accepted', 'declined', 'cancelled'].includes(decision)) return;

  await syncCloudBeforeTradeAction();
  upsertSelfIntoRegistry(Date.now());

  const offers = normalizeTradeOffersList(state.tradeOffers);
  const idx = offers.findIndex(o => o.id === offerId);
  if (idx === -1) {
    showToast('Предложение трейда не найдено');
    renderLeaderboardAndTradesPage();
    return;
  }

  const offer = offers[idx];
  if (offer.status !== 'pending') {
    showToast('Этот трейд уже закрыт');
    renderLeaderboardAndTradesPage();
    return;
  }

  if (decision === 'cancelled') {
    if (offer.fromPlayerId !== state.playerId) return;
    offers[idx] = { ...offer, status: 'cancelled', updatedAt: Date.now() };
    state.tradeOffers = offers;
    saveState();
    renderLeaderboardAndTradesPage();
    if (isCloudConfigured()) {
      await pushSharedData(state.pool, state.cases, state.recentDrops, state.rarities, state.effects, state.playersRegistry, state.tradeOffers);
    }
    showToast('Трейд отменён');
    return;
  }

  if (offer.toPlayerId !== state.playerId) return;

  if (decision === 'declined') {
    offers[idx] = { ...offer, status: 'declined', updatedAt: Date.now() };
    state.tradeOffers = offers;
    saveState();
    renderLeaderboardAndTradesPage();
    if (isCloudConfigured()) {
      await pushSharedData(state.pool, state.cases, state.recentDrops, state.rarities, state.effects, state.playersRegistry, state.tradeOffers);
    }
    showToast(`Трейд от ${offer.fromPlayerName} отклонён`);
    return;
  }

  const registryMap = new Map(normalizePlayersRegistryList(state.playersRegistry).map(p => [p.playerId, p]));
  const meEntry = registryMap.get(state.playerId) || buildSelfRegistryEntry();
  const senderEntry = registryMap.get(offer.fromPlayerId);

  if (!senderEntry) {
    showToast('Отправитель не найден в реестре');
    return;
  }

  const myInvCopy = [...meEntry.inventory];
  const senderInvCopy = [...senderEntry.inventory];

  const resolvedSenderCards = [];
  for (const reqCard of offer.fromCards) {
    let foundIdx = senderInvCopy.findIndex(c => c.uid === reqCard.uid);
    if (foundIdx === -1) {
      foundIdx = senderInvCopy.findIndex(
        c => c.name === reqCard.name && normalizeRarityKey(c.rarity) === normalizeRarityKey(reqCard.rarity) && Boolean(c.isHolo) === Boolean(reqCard.isHolo)
      );
    }
    if (foundIdx === -1) {
      showToast(`У ${senderEntry.playerName} больше нет карты "${reqCard.name}" — трейд невозможен`);
      return;
    }
    resolvedSenderCards.push(senderInvCopy[foundIdx]);
    senderInvCopy.splice(foundIdx, 1);
  }

  const resolvedMyCards = [];
  for (const reqCard of offer.toCards) {
    let foundIdx = myInvCopy.findIndex(c => c.uid === reqCard.uid);
    if (foundIdx === -1) {
      foundIdx = myInvCopy.findIndex(
        c => c.name === reqCard.name && normalizeRarityKey(c.rarity) === normalizeRarityKey(reqCard.rarity) && Boolean(c.isHolo) === Boolean(reqCard.isHolo)
      );
    }
    if (foundIdx === -1) {
      showToast(`У тебя больше нет карты "${reqCard.name}" для обмена`);
      return;
    }
    resolvedMyCards.push(myInvCopy[foundIdx]);
    myInvCopy.splice(foundIdx, 1);
  }

  const tradeTs = Date.now();
  const nextMyInv = [
    ...myInvCopy,
    ...resolvedSenderCards.map(c => ({ ...c, uid: `trd_${tradeTs}_${Math.random().toString(36).slice(2, 6)}` }))
  ];

  const nextSenderInv = [
    ...senderInvCopy,
    ...resolvedMyCards.map(c => ({ ...c, uid: `trd_${tradeTs}_${Math.random().toString(36).slice(2, 6)}` }))
  ];

  state.inventory = nextMyInv;
  lastRegistryWriteTs = Math.max(lastRegistryWriteTs, tradeTs);

  registryMap.set(state.playerId, {
    ...meEntry,
    playerName: state.playerName,
    avatar: getSafeAvatarSrc(state.playerAvatar, state.playerName),
    balance: Math.max(0, Number(state.balance) || 0),
    inventory: nextMyInv,
    inventoryValue: getInventoryValue(nextMyInv),
    cardsCount: nextMyInv.length,
    updatedAt: tradeTs
  });

  registryMap.set(senderEntry.playerId, {
    ...senderEntry,
    inventory: nextSenderInv,
    inventoryValue: getInventoryValue(nextSenderInv),
    cardsCount: nextSenderInv.length,
    updatedAt: tradeTs
  });

  state.playersRegistry = Array.from(registryMap.values());
  offers[idx] = { ...offer, status: 'accepted', updatedAt: tradeTs };
  state.tradeOffers = offers;

  resolvedSenderCards.forEach(c => recordDropToFeed(c, `Трейд с ${senderEntry.playerName}`));

  saveState();
  updateHeader();
  renderCollection();
  renderLeaderboardAndTradesPage();

  if (isCloudConfigured()) {
    await pushSharedData(
      state.pool,
      state.cases,
      state.recentDrops,
      state.rarities,
      state.effects,
      state.playersRegistry,
      state.tradeOffers
    );
  }

  showToast(`Трейд с ${senderEntry.playerName} принят!`);
}

function createTradeOfferCardElement(offer, mode) {
  const wrap = document.createElement('div');
  const isIncomingPending = mode === 'incoming' && offer.status === 'pending';
  wrap.className = `trade-offer-card ${isIncomingPending ? 'is-incoming-pending' : ''}`;

  const statusLabels = {
    pending: 'Ожидает ответа',
    accepted: 'Принят',
    declined: 'Отклонён',
    cancelled: 'Отменён'
  };

  const partnerName = mode === 'incoming' ? offer.fromPlayerName : offer.toPlayerName;
  const partnerAvatar = mode === 'incoming' ? offer.fromPlayerAvatar : offer.toPlayerAvatar;
  const fromSum = offer.fromCards.reduce((s, c) => s + (Number(c.price) || 0), 0);
  const toSum = offer.toCards.reduce((s, c) => s + (Number(c.price) || 0), 0);

  const leftTitle = mode === 'incoming'
    ? `Отдаёт ${escapeHtml(offer.fromPlayerName)} (${fromSum} ₽)`
    : `Ты отдаёшь (${fromSum} ₽)`;

  const rightTitle = mode === 'incoming'
    ? `Просит у тебя (${toSum} ₽)`
    : `Ты хочешь у ${escapeHtml(offer.toPlayerName)} (${toSum} ₽)`;

  wrap.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${escapeHtml(partnerAvatar)}" alt="${escapeHtml(partnerName)}" class="player-avatar-sm" />
        <div>
          <div style="font-weight:800; font-size:15px;">
            ${mode === 'incoming' ? `Трейд от ${escapeHtml(partnerName)}` : `Трейд для ${escapeHtml(partnerName)}`}
          </div>
          <div class="hint" style="font-size:12px;">Статус: <strong>${escapeHtml(statusLabels[offer.status] || offer.status)}</strong></div>
        </div>
      </div>

      <div class="trade-offer-actions" style="display:flex; gap:8px; flex-wrap:wrap;"></div>
    </div>

    <div class="trade-offer-sides">
      <div class="trade-side-box">
        <div style="font-size:13px; font-weight:700; margin-bottom:8px;">${leftTitle}</div>
        <div class="cards-grid trade-from-grid"></div>
      </div>
      <div class="trade-side-box">
        <div style="font-size:13px; font-weight:700; margin-bottom:8px;">${rightTitle}</div>
        <div class="cards-grid trade-to-grid"></div>
      </div>
    </div>
  `;

  const actionsEl = wrap.querySelector('.trade-offer-actions');
  if (mode === 'incoming' && offer.status === 'pending') {
    const acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.className = 'btn-primary';
    acceptBtn.textContent = 'Принять';
    acceptBtn.addEventListener('click', () => respondToTradeOffer(offer.id, 'accepted'));

    const declineBtn = document.createElement('button');
    declineBtn.type = 'button';
    declineBtn.className = 'btn-danger';
    declineBtn.textContent = 'Отклонить';
    declineBtn.addEventListener('click', () => respondToTradeOffer(offer.id, 'declined'));

    actionsEl.appendChild(acceptBtn);
    actionsEl.appendChild(declineBtn);
  } else if (mode === 'outgoing' && offer.status === 'pending') {
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn-secondary';
    cancelBtn.textContent = 'Отменить предложение';
    cancelBtn.addEventListener('click', () => respondToTradeOffer(offer.id, 'cancelled'));
    actionsEl.appendChild(cancelBtn);
  }

  const fromGrid = wrap.querySelector('.trade-from-grid');
  if (offer.fromCards.length === 0) {
    fromGrid.innerHTML = '<div class="hint" style="grid-column:1/-1;">Без карт</div>';
  } else {
    offer.fromCards.forEach(c => fromGrid.appendChild(createCardElement(c)));
  }

  const toGrid = wrap.querySelector('.trade-to-grid');
  if (offer.toCards.length === 0) {
    toGrid.innerHTML = '<div class="hint" style="grid-column:1/-1;">Без карт</div>';
  } else {
    offer.toCards.forEach(c => toGrid.appendChild(createCardElement(c)));
  }

  return wrap;
}

function renderVisitedProfileBox(players) {
  const box = document.getElementById('visited-player-profile');
  if (!box) return;

  if (!viewingProfilePlayerId) {
    box.classList.add('hidden');
    box.innerHTML = '';
    return;
  }

  const target = players.find(p => p.playerId === viewingProfilePlayerId);
  if (!target) {
    viewingProfilePlayerId = null;
    box.classList.add('hidden');
    box.innerHTML = '';
    return;
  }

  const isSelf = target.playerId === state.playerId;
  const invValue = getInventoryValue(target.inventory);

  box.classList.remove('hidden');
  box.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:14px; margin-bottom:14px;">
      <div class="player-profile-identity">
        <img src="${escapeHtml(getSafeAvatarSrc(target.avatar, target.playerName))}" alt="${escapeHtml(target.playerName)}" class="player-avatar-img" />
        <div>
          <div style="font-size:18px; font-weight:800;">${escapeHtml(target.playerName)}${isSelf ? ' (Ты)' : ''}</div>
          <div class="hint">Карт: <strong>${target.inventory.length}</strong> · Стоимость инвентаря: <strong>${invValue} ₽</strong></div>
        </div>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        ${!isSelf ? `<button type="button" id="profile-start-trade-btn" class="btn-primary">Затрейдиться</button>` : ''}
        <button type="button" id="profile-close-btn" class="btn-secondary">Закрыть профиль</button>
      </div>
    </div>
    <div id="visited-player-cards-grid" class="cards-grid"></div>
  `;

  const closeBtn = document.getElementById('profile-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      viewingProfilePlayerId = null;
      renderVisitedProfileBox(players);
    });
  }

  const startTradeBtn = document.getElementById('profile-start-trade-btn');
  if (startTradeBtn) {
    startTradeBtn.addEventListener('click', () => startTradeWithPlayer(target.playerId));
  }

  const cardsGrid = document.getElementById('visited-player-cards-grid');
  if (cardsGrid) {
    if (target.inventory.length === 0) {
      cardsGrid.innerHTML = '<div class="empty-box" style="grid-column:1/-1;">У игрока пока нет карт в инвентаре.</div>';
    } else {
      const sortedCards = [...target.inventory].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
      sortedCards.forEach(card => {
        cardsGrid.appendChild(createCardElement(card));
      });
    }
  }
}

function renderLeaderboardAndTradesPage() {
  ensureLeaderboardAndTradesUI();
  updateTradesNavBadge();

  const players = getSortedLeaderboardPlayers();
  renderVisitedProfileBox(players);

  const listEl = document.getElementById('leaderboard-players-list');
  if (listEl) {
    listEl.innerHTML = '';
    if (players.length === 0) {
      listEl.innerHTML = '<div class="empty-box">Игроков пока нет.</div>';
    } else {
      players.forEach((p, idx) => {
        const isSelf = p.playerId === state.playerId;
        const invValue = getInventoryValue(p.inventory);
        const row = document.createElement('div');
        row.className = `leaderboard-row ${idx === 0 ? 'is-top-1' : ''} ${isSelf ? 'is-me' : ''}`;

        const medal = idx === 0 ? '👑 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`;
        row.innerHTML = `
          <div class="leaderboard-left">
            <div class="leaderboard-pos">${medal}</div>
            <img src="${escapeHtml(getSafeAvatarSrc(p.avatar, p.playerName))}" alt="${escapeHtml(p.playerName)}" class="player-avatar-img" style="width:46px; height:46px;" />
            <div>
              <div style="font-weight:800; font-size:15px;">${escapeHtml(p.playerName)}${isSelf ? ' (Ты)' : ''}</div>
              <div class="hint" style="font-size:12px;">Карт: ${p.inventory.length}</div>
            </div>
          </div>

          <div class="leaderboard-stats">
            <div>Стоимость инвентаря: <strong>${invValue} ₽</strong></div>
          </div>

          <div class="leaderboard-actions">
            <button type="button" class="btn-secondary lb-view-btn">Профиль</button>
            ${!isSelf ? '<button type="button" class="btn-primary lb-trade-btn">Трейд</button>' : ''}
          </div>
        `;

        const viewBtn = row.querySelector('.lb-view-btn');
        if (viewBtn) {
          viewBtn.addEventListener('click', () => openPlayerProfile(p.playerId));
        }
        const tradeBtn = row.querySelector('.lb-trade-btn');
        if (tradeBtn) {
          tradeBtn.addEventListener('click', () => startTradeWithPlayer(p.playerId));
        }

        listEl.appendChild(row);
      });
    }
  }

  const offers = normalizeTradeOffersList(state.tradeOffers);
  const incomingPending = offers.filter(o => o.status === 'pending' && o.toPlayerId === state.playerId);
  const incomingSubCountEl = document.getElementById('trades-subtab-incoming-count');
  if (incomingSubCountEl) {
    incomingSubCountEl.textContent = incomingPending.length > 0 ? `(${incomingPending.length})` : '';
  }

  const incomingListEl = document.getElementById('incoming-trades-list');
  if (incomingListEl) {
    incomingListEl.innerHTML = '';
    if (incomingPending.length === 0) {
      incomingListEl.innerHTML = '<div class="empty-box">Входящих предложений трейдов пока нет.</div>';
    } else {
      incomingPending.forEach(offer => {
        incomingListEl.appendChild(createTradeOfferCardElement(offer, 'incoming'));
      });
    }
  }

  const myOffers = offers.filter(o => o.fromPlayerId === state.playerId || o.toPlayerId === state.playerId);
  const historyListEl = document.getElementById('outgoing-and-history-trades-list');
  if (historyListEl) {
    historyListEl.innerHTML = '';
    const outgoingPending = myOffers.filter(o => o.fromPlayerId === state.playerId && o.status === 'pending');
    const pastOffers = myOffers.filter(o => o.status !== 'pending');

    if (outgoingPending.length === 0 && pastOffers.length === 0) {
      historyListEl.innerHTML = '<div class="empty-box">История трейдов пока пуста.</div>';
    } else {
      if (outgoingPending.length > 0) {
        const h3 = document.createElement('h3');
        h3.className = 'sub-title';
        h3.textContent = `Активные отправленные (${outgoingPending.length})`;
        historyListEl.appendChild(h3);
        outgoingPending.forEach(o => {
          historyListEl.appendChild(createTradeOfferCardElement(o, 'outgoing'));
        });
      }

      if (pastOffers.length > 0) {
        const h3Past = document.createElement('h3');
        h3Past.className = 'sub-title';
        h3Past.style.marginTop = '18px';
        h3Past.textContent = `Завершённые трейды (${pastOffers.length})`;
        historyListEl.appendChild(h3Past);
        pastOffers.forEach(o => {
          const mode = o.toPlayerId === state.playerId ? 'incoming' : 'outgoing';
          historyListEl.appendChild(createTradeOfferCardElement(o, mode));
        });
      }
    }
  }

  const otherPlayers = players.filter(p => p.playerId !== state.playerId);
  const partnerSelect = document.getElementById('trade-partner-select');
  if (partnerSelect) {
    partnerSelect.innerHTML = '';
    const defOpt = document.createElement('option');
    defOpt.value = '';
    defOpt.textContent = otherPlayers.length > 0 ? '— Выбери игрока —' : 'Нет других игроков';
    partnerSelect.appendChild(defOpt);

    otherPlayers.forEach(op => {
      const opt = document.createElement('option');
      opt.value = op.playerId;
      opt.textContent = `${op.playerName} (${getInventoryValue(op.inventory)} ₽)`;
      partnerSelect.appendChild(opt);
    });
    partnerSelect.value = activeTradePartnerId || '';
    partnerSelect.onchange = () => {
      activeTradePartnerId = partnerSelect.value || null;
      myTradeUids = [];
      theirTradeUids = [];
      renderLeaderboardAndTradesPage();
    };
  }

  const placeholder = document.getElementById('pvp-trade-placeholder');
  const workspace = document.getElementById('pvp-trade-workspace');
  if (!placeholder || !workspace) return;

  const partner = players.find(p => p.playerId === activeTradePartnerId && p.playerId !== state.playerId);
  if (!partner) {
    activeTradePartnerId = null;
    myTradeUids = [];
    theirTradeUids = [];
    placeholder.classList.remove('hidden');
    workspace.classList.add('hidden');
    return;
  }

  placeholder.classList.add('hidden');
  workspace.classList.remove('hidden');

  const partnerAvatarEl = document.getElementById('trade-partner-avatar');
  const partnerNameEl = document.getElementById('trade-partner-name');
  const partnerShortEl = document.getElementById('pvp-partner-short-name');
  const partnerInvNameEl = document.getElementById('pvp-partner-inv-name');

  if (partnerAvatarEl) partnerAvatarEl.src = getSafeAvatarSrc(partner.avatar, partner.playerName);
  if (partnerNameEl) partnerNameEl.textContent = partner.playerName;
  if (partnerShortEl) partnerShortEl.textContent = partner.playerName;
  if (partnerInvNameEl) partnerInvNameEl.textContent = partner.playerName;

  myTradeUids = myTradeUids.filter(uid => state.inventory.some(c => c.uid === uid));
  theirTradeUids = theirTradeUids.filter(uid => partner.inventory.some(c => c.uid === uid));

  const mySelectedCards = state.inventory.filter(c => myTradeUids.includes(c.uid));
  const theirSelectedCards = partner.inventory.filter(c => theirTradeUids.includes(c.uid));

  const mySum = mySelectedCards.reduce((s, c) => s + (Number(c.price) || 0), 0);
  const theirSum = theirSelectedCards.reduce((s, c) => s + (Number(c.price) || 0), 0);

  const mySumEl = document.getElementById('pvp-my-sum');
  const theirSumEl = document.getElementById('pvp-their-sum');
  const myCntEl = document.getElementById('pvp-my-count');
  const theirCntEl = document.getElementById('pvp-their-count');
  const confirmBtn = document.getElementById('pvp-confirm-trade-btn');

  if (mySumEl) mySumEl.textContent = mySum;
  if (theirSumEl) theirSumEl.textContent = theirSum;
  if (myCntEl) myCntEl.textContent = mySelectedCards.length;
  if (theirCntEl) theirCntEl.textContent = theirSelectedCards.length;
  if (confirmBtn) confirmBtn.disabled = mySelectedCards.length === 0 && theirSelectedCards.length === 0;

  const mySlotsEl = document.getElementById('pvp-my-offer-slots');
  const theirSlotsEl = document.getElementById('pvp-their-offer-slots');
  const myInvGrid = document.getElementById('pvp-my-inventory-grid');
  const partnerInvGrid = document.getElementById('pvp-partner-inventory-grid');

  if (mySlotsEl) {
    mySlotsEl.innerHTML = '';
    if (mySelectedCards.length === 0) {
      mySlotsEl.innerHTML = '<div class="craft-empty-slot" style="grid-column:1/-1;">Выбери свои карты снизу</div>';
    } else {
      mySelectedCards.forEach(c => {
        mySlotsEl.appendChild(createCardElement(c, {
          selected: true,
          onClick: () => {
            myTradeUids = myTradeUids.filter(id => id !== c.uid);
            renderLeaderboardAndTradesPage();
          }
        }));
      });
    }
  }

  if (theirSlotsEl) {
    theirSlotsEl.innerHTML = '';
    if (theirSelectedCards.length === 0) {
      theirSlotsEl.innerHTML = '<div class="craft-empty-slot" style="grid-column:1/-1;">Выбери карты игрока снизу</div>';
    } else {
      theirSelectedCards.forEach(c => {
        theirSlotsEl.appendChild(createCardElement(c, {
          selected: true,
          onClick: () => {
            theirTradeUids = theirTradeUids.filter(id => id !== c.uid);
            renderLeaderboardAndTradesPage();
          }
        }));
      });
    }
  }

  if (myInvGrid) {
    myInvGrid.innerHTML = '';
    if (state.inventory.length === 0) {
      myInvGrid.innerHTML = '<div class="empty-box" style="grid-column:1/-1;">Твой инвентарь пуст.</div>';
    } else {
      [...state.inventory]
        .sort((a, b) => compareRanks(a.rank, b.rank))
        .forEach(card => {
          const isPicked = myTradeUids.includes(card.uid);
          myInvGrid.appendChild(createCardElement(card, {
            selected: isPicked,
            onClick: () => {
              if (isPicked) {
                myTradeUids = myTradeUids.filter(id => id !== card.uid);
              } else {
                if (myTradeUids.length >= 6) {
                  showToast('Максимум 6 карт в предложении');
                  return;
                }
                myTradeUids.push(card.uid);
              }
              renderLeaderboardAndTradesPage();
            }
          }));
        });
    }
  }

  if (partnerInvGrid) {
    partnerInvGrid.innerHTML = '';
    if (partner.inventory.length === 0) {
      partnerInvGrid.innerHTML = '<div class="empty-box" style="grid-column:1/-1;">У этого игрока пока нет карт.</div>';
    } else {
      [...partner.inventory]
        .sort((a, b) => compareRanks(a.rank, b.rank))
        .forEach(card => {
          const isPicked = theirTradeUids.includes(card.uid);
          partnerInvGrid.appendChild(createCardElement(card, {
            selected: isPicked,
            onClick: () => {
              if (isPicked) {
                theirTradeUids = theirTradeUids.filter(id => id !== card.uid);
              } else {
                if (theirTradeUids.length >= 6) {
                  showToast('Максимум 6 карт в предложении');
                  return;
                }
                theirTradeUids.push(card.uid);
              }
              renderLeaderboardAndTradesPage();
            }
          }));
        });
    }
  }
}

function ensureCraftsPageUI() {
  const nav = document.querySelector('nav, .nav-bar, .navbar, .tabs-nav');
  if (nav && !nav.querySelector('[data-tab="crafts"]')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-btn';
    btn.dataset.tab = 'crafts';
    btn.textContent = 'Крафты';
    const adminBtn = nav.querySelector('[data-tab="admin"]');
    if (adminBtn && adminBtn.parentNode === nav) {
      nav.insertBefore(btn, adminBtn);
    } else {
      nav.appendChild(btn);
    }
  }

  if (!document.getElementById('tab-crafts')) {
    const adminTab = document.getElementById('tab-admin');
    const main = (adminTab && adminTab.parentElement) || document.querySelector('main') || document.body;
    const section = document.createElement('section');
    section.id = 'tab-crafts';
    section.className = 'tab-section';
    section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Крафты</h2>
        <p class="hint">Выбери 10 карт одной редкости, чтобы скрафтить 1 карту следующей редкости. Итоговый уровень зависит от суммарной цены 10 карт.</p>
      </div>

      <div class="craft-top-bar">
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
          <label style="display:flex; flex-direction:column; gap:5px; font-size:13px;">
            <span>Исходная редкость</span>
            <select id="craft-rarity-select"></select>
          </label>
          <button type="button" id="craft-autofill-btn" class="btn-secondary">Автоподбор 10 карт</button>
          <button type="button" id="craft-clear-btn" class="btn-secondary">Очистить</button>
          <button type="button" id="craft-execute-btn" class="btn-primary" disabled>Скрафтить (0 / 10)</button>
        </div>

        <div class="craft-summary-stats">
          <div>Выбрано: <strong id="craft-selected-count">0</strong> / 10</div>
          <div>Сумма 10 карт: <strong id="craft-total-price">0</strong> ₽</div>
          <div>Следующая редкость: <strong id="craft-next-rarity">—</strong></div>
        </div>
      </div>

      <div id="craft-result-box" class="craft-result-box hidden">
        <div style="flex:1; min-width:220px;">
          <div style="font-size:13px; opacity:0.8; margin-bottom:6px;">Скрафченная карта:</div>
          <div id="craft-result-title" style="font-size:18px; font-weight:700;"></div>
          <div id="craft-result-meta" class="hint" style="margin-top:4px;"></div>
        </div>
        <div id="craft-result-card-wrap" style="width:230px; max-width:100%;"></div>
      </div>

      <h3 class="sub-title">Выбранные карты (<span id="craft-slots-count">0</span> / 10)</h3>
      <div id="craft-selected-slots" class="craft-slots-grid"></div>

      <h3 class="sub-title">Доступные карты в коллекции</h3>
      <div id="craft-available-grid" class="cards-grid"></div>
    `;

    if (adminTab && adminTab.parentNode === main) {
      main.insertBefore(section, adminTab);
    } else {
      main.appendChild(section);
    }
  }
}

function getCardPowerScore(card) {
  const rScore = getRarityRankOrder(card.rarity);
  const holoBonus = card.isHolo ? 10 : 0;
  return rScore * 100 + holoBonus + (Number(card.price) || 0) / 10000;
}

function sortCardsBestFirst(cards) {
  return [...cards].sort((a, b) => getCardPowerScore(b) - getCardPowerScore(a));
}

function recordDropToFeed(card, sourceLabel = 'Пак') {
  if (!card) return;
  const entry = {
    uid: `drop_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    playerId: state.playerId,
    playerName: state.playerName,
    source: sourceLabel,
    name: card.name,
    rank: card.rank,
    rarity: card.rarity,
    price: card.price,
    image: card.image,
    isHolo: Boolean(card.isHolo),
    ts: Date.now()
  };

  state.recentDrops = [entry, ...state.recentDrops].slice(0, 35);
  renderLiveDropsFeed();

  if (isCloudConfigured()) {
    upsertSelfIntoRegistry();
    pushSharedData(
      state.pool,
      state.cases,
      state.recentDrops,
      state.rarities,
      state.effects,
      state.playersRegistry,
      state.tradeOffers
    );
  }
}

function findLiveDropsContainer() {
  return (
    document.getElementById('cb-live-feed') ||
    document.getElementById('live-drops-feed') ||
    document.getElementById('recent-drops') ||
    document.querySelector('.live-drops-list, .live-drops')
  );
}

function renderLiveDropsFeed() {
  const feedEl = findLiveDropsContainer();
  if (!feedEl) return;

  const sorted = [...state.recentDrops].sort((a, b) => {
    const aIsMine = a.playerId === state.playerId;
    const bIsMine = b.playerId === state.playerId;
    const aRare = a.isHolo || RARE_ANIM_TIERS.includes(a.rarity) || a.rarity === 'mythic';
    const bRare = b.isHolo || RARE_ANIM_TIERS.includes(b.rarity) || b.rarity === 'mythic';

    const timeDiff = (b.ts || 0) - (a.ts || 0);
    if (Math.abs(timeDiff) < 4000) {
      if (aRare !== bRare) return aRare ? -1 : 1;
      if (aIsMine !== bIsMine) return aIsMine ? -1 : 1;
    }
    return timeDiff;
  });

  feedEl.innerHTML = '';
  if (sorted.length === 0) {
    feedEl.innerHTML = '<div class="cb-live-item"><div class="cb-live-who">Пока пусто</div></div>';
    return;
  }

  sorted.slice(0, 22).forEach(item => {
    const rKey = normalizeRarityKey(item.rarity) || 'common';
    const fxClass = getCardEffectClass(rKey);
    const div = document.createElement('div');
    const isRare = item.isHolo || RARE_ANIM_TIERS.includes(rKey) || rKey === 'mythic';
    div.className = `cb-live-item rarity-${rKey} ${fxClass} ${isRare ? 'rare-glow' : ''}`;
    const whoText = item.playerId === state.playerId ? `Ты (${item.source})` : `${item.playerName}`;
    const fallbackImg = `https://placehold.co/160x90/171c2b/ffffff?text=${encodeURIComponent(item.name || 'GD')}`;
    const rarityLabel = getRarityLabel(rKey);

    div.innerHTML = `
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.src='${escapeHtml(fallbackImg)}'" />
      <div class="cb-live-name">${item.isHolo ? '✦ ' : ''}${escapeHtml(item.name)}</div>
      <span class="live-rarity-badge rarity-${rKey}">${escapeHtml(rarityLabel)}${item.isHolo ? ' · HOLO' : ''}</span>
      <div class="cb-live-price">${escapeHtml(item.price)} ₽</div>
      <div class="cb-live-who">${escapeHtml(whoText)}</div>
    `;
    feedEl.appendChild(div);
  });
}

async function fetchSharedData() {
  if (!isCloudConfigured()) {
    return {
      ok: false,
      pool: null,
      cases: null,
      recentDrops: null,
      rarities: null,
      effects: null,
      playersRegistry: null,
      tradeOffers: null
    };
  }
  try {
    const res = await fetch(`${JSONBIN_URL}/latest?nocache=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'X-Master-Key': JSONBIN_MASTER_KEY
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    const rec = data.record || {};
    return {
      ok: true,
      pool: Array.isArray(rec.pool) ? rec.pool : null,
      cases: Array.isArray(rec.cases) ? rec.cases : null,
      recentDrops: Array.isArray(rec.recentDrops) ? rec.recentDrops : null,
      rarities: Array.isArray(rec.rarities) ? rec.rarities : null,
      effects: Array.isArray(rec.effects) ? rec.effects : null,
      playersRegistry: Array.isArray(rec.playersRegistry) ? rec.playersRegistry : null,
      tradeOffers: Array.isArray(rec.tradeOffers) ? rec.tradeOffers : null
    };
  } catch (err) {
    console.error('Не удалось загрузить общие данные:', err);
    return {
      ok: false,
      pool: null,
      cases: null,
      recentDrops: null,
      rarities: null,
      effects: null,
      playersRegistry: null,
      tradeOffers: null
    };
  }
}

async function pushSharedData(
  nextPool = state.pool,
  nextCases = state.cases,
  nextDrops = state.recentDrops,
  nextRarities = state.rarities,
  nextEffects = state.effects,
  nextRegistry = null,
  nextTradeOffers = null
) {
  if (!isCloudConfigured()) {
    return false;
  }

  const runWrite = async () => {
    isSavingCloud = true;
    try {
      upsertSelfIntoRegistry();
      const latest = await fetchSharedData();

      const poolToSend = Array.isArray(nextPool) ? nextPool : state.pool;
      const casesToSend = Array.isArray(nextCases) ? nextCases : state.cases;
      const raritiesToSend = Array.isArray(nextRarities) ? nextRarities : state.rarities;
      const effectsToSend = Array.isArray(nextEffects) ? nextEffects : state.effects;

      const dropsMap = new Map();
      [
        ...(latest.ok && Array.isArray(latest.recentDrops) ? latest.recentDrops : []),
        ...(Array.isArray(nextDrops) ? nextDrops : state.recentDrops)
      ].forEach(d => {
        if (d && d.uid) dropsMap.set(d.uid, d);
      });
      const dropsToSend = Array.from(dropsMap.values())
        .sort((a, b) => (b.ts || 0) - (a.ts || 0))
        .slice(0, 35);

      const registryMap = new Map(
        normalizePlayersRegistryList(latest.ok && Array.isArray(latest.playersRegistry) ? latest.playersRegistry : []).map(p => [p.playerId, p])
      );
      const explicitRegistry = Array.isArray(nextRegistry) ? nextRegistry : state.playersRegistry;
      normalizePlayersRegistryList(explicitRegistry).forEach(item => {
        const prev = registryMap.get(item.playerId);
        if (!prev || (item.updatedAt || 0) >= (prev.updatedAt || 0) || item.playerId === state.playerId) {
          registryMap.set(item.playerId, item);
        }
      });
      if (state.playerId) {
        registryMap.set(state.playerId, buildSelfRegistryEntry());
      }
      const registryToSend = Array.from(registryMap.values());

      const explicitOffers = Array.isArray(nextTradeOffers) ? nextTradeOffers : state.tradeOffers;
      const offersToSend = normalizeTradeOffersList([
        ...(latest.ok && Array.isArray(latest.tradeOffers) ? latest.tradeOffers : []),
        ...explicitOffers
      ]);

      const res = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_MASTER_KEY
        },
        body: JSON.stringify({
          pool: poolToSend,
          cases: casesToSend,
          recentDrops: dropsToSend,
          rarities: raritiesToSend,
          effects: effectsToSend,
          playersRegistry: registryToSend,
          tradeOffers: offersToSend
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      state.playersRegistry = registryToSend;
      state.tradeOffers = offersToSend;
      state.recentDrops = dropsToSend;
      return true;
    } catch (err) {
      console.error('Ошибка отправки общих данных:', err);
      return false;
    } finally {
      isSavingCloud = false;
    }
  };

  cloudSyncQueue = cloudSyncQueue.then(runWrite, runWrite);
  return cloudSyncQueue;
}

function hideFreePackTimerUI() {
  const timerEl = document.getElementById('pack-timer');
  const progressEl = document.getElementById('pack-progress');
  if (timerEl) {
    const wrapper = timerEl.closest('.pack-timer-box, .timer-box, .pack-cooldown, [id*="timer"]');
    if (wrapper && wrapper !== timerEl) {
      wrapper.style.display = 'none';
    } else {
      timerEl.style.display = 'none';
    }
  }
  if (progressEl) {
    const progWrap = progressEl.parentElement;
    if (progWrap && progWrap.children.length === 1) {
      progWrap.style.display = 'none';
    } else {
      progressEl.style.display = 'none';
    }
  }
}

function ensureBuyPackButtonVisible() {
  const buyBtn = document.getElementById('buy-pack-btn');
  const openBtn = document.getElementById('open-pack-btn');
  if (buyBtn) return;

  const targetParent = (openBtn && openBtn.parentElement) || document.getElementById('tab-packs');
  if (!targetParent) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'buy-pack-btn';
  btn.className = 'btn-primary';
  btn.textContent = `Купить пак (${PACK_PRICE} ₽)`;
  targetParent.appendChild(btn);
}

function ensureOpenAllPacksButton() {
  const openBtn = document.getElementById('open-pack-btn');
  if (!openBtn || document.getElementById('open-all-packs-btn')) return;

  const actionsWrap = openBtn.parentElement;
  if (actionsWrap) {
    actionsWrap.style.flexWrap = 'wrap';
  }

  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.id = 'open-all-packs-btn';
  allBtn.className = 'btn-secondary';
  allBtn.textContent = 'Открыть все';
  allBtn.addEventListener('click', openAllPacks);

  openBtn.insertAdjacentElement('afterend', allBtn);
}

function ensureDroppedCardsAreaUI() {
  if (document.getElementById('pack-result-area')) return;
  const packsTab = document.getElementById('tab-packs');
  const main = document.querySelector('main') || packsTab || document.body;
  if (!main) return;

  const area = document.createElement('div');
  area.id = 'pack-result-area';
  area.className = 'hidden';
  area.style.cssText = 'margin-top:24px;';
  area.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px;">
      <div>
        <strong>Недавно выпавшие карты:</strong>
        <span class="hint" style="margin-left:8px;">Сумма: <strong id="dropped-total-price">0</strong> ₽</span>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button type="button" id="keep-all-dropped-btn" class="btn-primary">Забрать всё в коллекцию</button>
        <button type="button" id="sell-all-dropped-btn" class="btn-secondary">Продать всё</button>
      </div>
    </div>
    <div id="dropped-cards-grid" class="cards-grid"></div>
  `;
  main.appendChild(area);
}

function ensureCasesPageUI() {
  const nav = document.querySelector('nav, .nav-bar, .navbar, .tabs-nav');
  if (nav && !nav.querySelector('[data-tab="cases"]')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-btn';
    btn.dataset.tab = 'cases';
    btn.textContent = 'Кейсы';
    const adminBtn = nav.querySelector('[data-tab="admin"]');
    if (adminBtn && adminBtn.parentNode === nav) {
      nav.insertBefore(btn, adminBtn);
    } else {
      nav.appendChild(btn);
    }
  }

  if (!document.getElementById('tab-cases')) {
    const adminTab = document.getElementById('tab-admin');
    const main = (adminTab && adminTab.parentElement) || document.querySelector('main') || document.body;
    const section = document.createElement('section');
    section.id = 'tab-cases';
    section.className = 'tab-section';
    section.innerHTML = `
      <div id="cases-catalog-view">
        <div class="section-header">
          <h2 class="section-title">Кейсы</h2>
          <p class="hint">Нажми на кейс, чтобы открыть его страницу с рулеткой и содержимым.</p>
        </div>
        <div id="cases-list-grid" class="cards-grid"></div>
      </div>

      <div id="case-detail-view" class="hidden">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px;">
          <button type="button" id="back-to-cases-btn" class="btn-secondary">← Назад к кейсам</button>
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:10px;">
            <button type="button" id="open-selected-case-btn" class="btn-primary">Купить</button>
            <button type="button" id="fast-open-selected-case-btn" class="btn-secondary">Купить и открыть быстро</button>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:14px;">
          <img id="active-case-img" src="" alt="" style="width:140px; height:78px; object-fit:cover; border-radius:10px;" />
          <div>
            <h2 id="active-case-title" style="margin:0 0 4px;"></h2>
            <div id="active-case-price" class="hint"></div>
          </div>
        </div>

        <div id="cs-case-spinner-box" class="cs-spinner-shell">
          <div class="cs-spinner-pointer"></div>
          <div id="cs-case-spinner-track" class="cs-spinner-track"></div>
        </div>

        <div id="case-drop-spotlight" class="case-drop-spotlight hidden">
          <div>
            <div style="font-size:13px; opacity:0.8; margin-bottom:8px;">Выпавшая карта:</div>
            <div id="case-spotlight-card-wrap" class="case-drop-spotlight-card"></div>
          </div>
          <div class="case-drop-actions">
            <button type="button" id="case-spotlight-keep-btn" class="btn-primary">В коллекцию</button>
            <button type="button" id="case-spotlight-sell-btn" class="btn-secondary">Продать</button>
          </div>
        </div>

        <div style="margin-bottom:10px; font-weight:600;">Содержимое кейса:</div>
        <div id="active-case-items-grid" class="cards-grid"></div>
      </div>
    `;
    if (adminTab && adminTab.parentNode === main) {
      main.insertBefore(section, adminTab);
    } else {
      main.appendChild(section);
    }
  }
}

function renderCaseDropSpotlight(card) {
  const box = document.getElementById('case-drop-spotlight');
  const wrap = document.getElementById('case-spotlight-card-wrap');
  const keepBtn = document.getElementById('case-spotlight-keep-btn');
  const sellBtn = document.getElementById('case-spotlight-sell-btn');
  if (!box || !wrap || !keepBtn || !sellBtn) return;

  pendingCaseDropCard = card || null;
  if (!pendingCaseDropCard) {
    box.classList.add('hidden');
    wrap.innerHTML = '';
    return;
  }

  box.classList.remove('hidden');
  wrap.innerHTML = '';
  wrap.appendChild(createCardElement(pendingCaseDropCard, { animateDrop: true }));

  keepBtn.textContent = 'В коллекцию';
  sellBtn.textContent = `Продать (${pendingCaseDropCard.price} ₽)`;
}

function ensureEditCaseModalUI() {
  if (document.getElementById('edit-case-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'edit-case-modal';
  modal.className = 'gd-modal-backdrop hidden';
  modal.innerHTML = `
    <div class="gd-modal-card">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px;">
        <h3 style="margin:0;">Редактировать кейс</h3>
        <button type="button" id="close-edit-case-btn" class="btn-secondary" style="padding:4px 10px;">✕</button>
      </div>
      <form id="edit-case-form" style="display:grid; gap:12px;">
        <input type="hidden" id="edit-case-id" />
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
          <label style="display:flex; flex-direction:column; gap:6px;">
            <span>Название кейса</span>
            <input type="text" id="edit-case-name" required />
          </label>
          <label style="display:flex; flex-direction:column; gap:6px;">
            <span>Цена открытия (₽)</span>
            <input type="number" id="edit-case-price" min="1" step="1" required />
          </label>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
          <label style="display:flex; flex-direction:column; gap:6px;">
            <span>Новая картинка с ПК</span>
            <input type="file" id="edit-case-file" accept="image/*" />
          </label>
          <label style="display:flex; flex-direction:column; gap:6px;">
            <span>Или ссылка (URL)</span>
            <input type="text" id="edit-case-image" placeholder="https://..." />
          </label>
        </div>

        <div>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px;">
            <span>Уровни в кейсе (если ничего не отмечено — войдёт весь пул):</span>
            <button type="button" id="edit-case-select-all-btn" class="btn-secondary" style="padding:4px 10px; font-size:12px;">Выбрать все</button>
          </div>
          <div id="edit-case-pool-checkboxes" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:8px; max-height:220px; overflow:auto; padding:10px; border-radius:10px; border:1px solid rgba(255,255,255,0.12);"></div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:6px;">
          <button type="button" id="cancel-edit-case-btn" class="btn-secondary">Отмена</button>
          <button type="submit" class="btn-primary">Сохранить кейс</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
}

function syncRankInputsToFreeText() {
  const rankInputs = [
    document.getElementById('card-rank'),
    document.getElementById('edit-card-rank')
  ];
  rankInputs.forEach(inp => {
    if (!inp) return;
    inp.type = 'text';
    inp.removeAttribute('min');
    inp.removeAttribute('max');
    inp.removeAttribute('step');
    if (!inp.placeholder) {
      inp.placeholder = 'Топ (#1) или сложность (Extreme / Mythic)';
    }
  });
}

function syncRaritySelects() {
  const raritySelects = [
    document.getElementById('card-rarity'),
    document.getElementById('edit-card-rarity'),
    document.getElementById('filter-rarity'),
    document.getElementById('upg-rarity-filter'),
    document.getElementById('sell-rarity-select'),
    document.getElementById('craft-rarity-select')
  ];

  raritySelects.forEach(sel => {
    if (!sel) return;
    const prevVal = sel.value;
    const hasAll = Array.from(sel.options).some(o => o.value === 'all');
    sel.innerHTML = '';

    if (hasAll || sel.id === 'filter-rarity' || sel.id === 'upg-rarity-filter' || sel.id === 'sell-rarity-select') {
      const allOpt = document.createElement('option');
      allOpt.value = 'all';
      allOpt.textContent = 'Все редкости';
      sel.appendChild(allOpt);
    }

    const ordered = getOrderedRarities();
    const listToRender = sel.id === 'craft-rarity-select' ? ordered.slice(0, -1) : ordered;

    listToRender.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.key;
      opt.textContent = r.label;
      sel.appendChild(opt);
    });

    if (prevVal && Array.from(sel.options).some(o => o.value === prevVal)) {
      sel.value = prevVal;
    } else if (sel.id === 'craft-rarity-select') {
      if (selectedCraftRarityKey && Array.from(sel.options).some(o => o.value === selectedCraftRarityKey)) {
        sel.value = selectedCraftRarityKey;
      } else if (sel.options.length > 0) {
        selectedCraftRarityKey = sel.options[0].value;
        sel.value = selectedCraftRarityKey;
      }
    }
  });
}

function fillEffectSelect(selectEl, selectedId = 'none') {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  state.effects.forEach(eff => {
    const opt = document.createElement('option');
    opt.value = eff.id;
    opt.textContent = eff.name;
    selectEl.appendChild(opt);
  });
  const target = normalizeEffectId(selectedId);
  if (Array.from(selectEl.options).some(o => o.value === target)) {
    selectEl.value = target;
  } else {
    selectEl.value = 'none';
  }
}

function ensureAdminRaritiesManagerUI() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel || document.getElementById('admin-rarities-manager')) return;

  const box = document.createElement('div');
  box.id = 'admin-rarities-manager';
  box.style.cssText = 'margin-top:32px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.14);';
  box.innerHTML = `
    <h3 class="sub-title">Редкости, эффекты и шансы выпадения</h3>
    <p class="hint" style="margin-bottom:12px;">
      Редактируй название, цвет, эффект (или выбери <strong>Без эффекта</strong>), шансы в паке и кейсе, либо удаляй редкости. При сохранении шансы автоматически приводятся к 100%.
    </p>

    <div style="overflow-x:auto;">
      <table class="rarity-chance-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Ключ</th>
            <th>Цвет</th>
            <th>Эффект</th>
            <th>Пак (%)</th>
            <th>Кейс (%)</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody id="admin-rarities-tbody"></tbody>
      </table>
    </div>

    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:12px;">
      <button type="button" id="save-rarity-chances-btn" class="btn-primary">Сохранить все редкости и шансы</button>
      <button type="button" id="reset-rarity-chances-btn" class="btn-secondary">Сбросить по умолчанию</button>
    </div>

    <form id="add-rarity-form" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(145px, 1fr)); gap:10px; margin-top:20px; padding-top:16px; border-top:1px dashed rgba(255,255,255,0.12); align-items:end;">
      <label style="display:flex; flex-direction:column; gap:5px;">
        <span>Название редкости</span>
        <input type="text" id="new-rarity-label" placeholder="Например: Astral" required />
      </label>
      <label style="display:flex; flex-direction:column; gap:5px;">
        <span>Ключ (англ.)</span>
        <input type="text" id="new-rarity-key" placeholder="astral (авто)" />
      </label>
      <label style="display:flex; flex-direction:column; gap:5px;">
        <span>Цвет</span>
        <input type="color" id="new-rarity-color" value="#38bdf8" style="height:36px; width:100%; padding:2px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:5px;">
        <span>Эффект</span>
        <select id="new-rarity-effect"></select>
      </label>
      <label style="display:flex; flex-direction:column; gap:5px;">
        <span>Шанс в паке (%)</span>
        <input type="number" id="new-rarity-pack-chance" min="0" max="100" step="any" value="0.01" required />
      </label>
      <label style="display:flex; flex-direction:column; gap:5px;">
        <span>Шанс в кейсе (%)</span>
        <input type="number" id="new-rarity-case-chance" min="0" max="100" step="any" value="0.01" required />
      </label>
      <button type="submit" class="btn-primary">Добавить редкость</button>
    </form>

    <div id="admin-effects-customizer" style="margin-top:28px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.14);">
      <h4 style="margin:0 0 6px;">Кастомизатор эффектов</h4>
      <p class="hint" style="margin:0 0 12px;">
        Создавай, изменяй и удаляй визуальные эффекты, которые можно навешивать на любую редкость.
      </p>

      <form id="add-effect-form" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:10px; align-items:end;">
        <label style="display:flex; flex-direction:column; gap:5px;">
          <span>Название эффекта</span>
          <input type="text" id="new-effect-name" placeholder="Например: Гипер-свечение" required />
        </label>
        <label style="display:flex; flex-direction:column; gap:5px;">
          <span>Тип анимации</span>
          <select id="new-effect-mode">
            <option value="pulse_glow">Пульсирующее свечение</option>
            <option value="shimmer_sweep">Переливающийся блик</option>
            <option value="neon_border">Неоновый контур</option>
            <option value="float_aura">Плавная аура</option>
            <option value="none">Без эффекта</option>
          </select>
        </label>
        <label style="display:flex; flex-direction:column; gap:5px;">
          <span>Сила (0.3–2.5)</span>
          <input type="number" id="new-effect-intensity" min="0.3" max="2.5" step="0.1" value="1.2" required />
        </label>
        <label style="display:flex; flex-direction:column; gap:5px;">
          <span>Цвет (опционально)</span>
          <div style="display:flex; align-items:center; gap:6px;">
            <input type="color" id="new-effect-color" value="#22d3ee" style="height:34px; width:46px; padding:2px;" />
            <label style="display:flex; align-items:center; gap:4px; font-size:12px; cursor:pointer;">
              <input type="checkbox" id="new-effect-use-rarity-color" checked />
              <span>Цвет редкости</span>
            </label>
          </div>
        </label>
        <button type="submit" class="btn-primary">Создать эффект</button>
      </form>

      <div id="admin-effects-list" class="effect-customizer-grid"></div>
    </div>
  `;

  adminPanel.appendChild(box);
  fillEffectSelect(document.getElementById('new-rarity-effect'), 'none');
}

function renderAdminEffectsCustomizer() {
  ensureAdminRaritiesManagerUI();
  const listEl = document.getElementById('admin-effects-list');
  if (!listEl) return;

  listEl.innerHTML = '';
  state.effects.forEach(eff => {
    const card = document.createElement('div');
    card.className = 'effect-customizer-card';
    card.dataset.effectId = eff.id;

    const hasCustomColor = /^#[0-9a-fA-F]{6}$/.test(eff.accentColor || '');
    const pickerColor = hasCustomColor ? eff.accentColor : '#22d3ee';

    card.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
        <code style="font-size:11px; opacity:0.8;">${escapeHtml(eff.id)}</code>
        ${eff.id === 'none' ? '<span class="hint">базовый</span>' : ''}
      </div>
      <label style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
        <span>Название</span>
        <input type="text" class="fx-name-input" value="${escapeHtml(eff.name)}" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
        <span>Анимация</span>
        <select class="fx-mode-select">
          <option value="none" ${eff.styleMode === 'none' ? 'selected' : ''}>Без эффекта</option>
          <option value="pulse_glow" ${eff.styleMode === 'pulse_glow' ? 'selected' : ''}>Пульсирующее свечение</option>
          <option value="shimmer_sweep" ${eff.styleMode === 'shimmer_sweep' ? 'selected' : ''}>Переливающийся блик</option>
          <option value="neon_border" ${eff.styleMode === 'neon_border' ? 'selected' : ''}>Неоновый контур</option>
          <option value="float_aura" ${eff.styleMode === 'float_aura' ? 'selected' : ''}>Плавная аура</option>
        </select>
      </label>
      <label style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
        <span>Сила эффекта</span>
        <input type="number" class="fx-intensity-input" min="0.3" max="2.5" step="0.1" value="${Number(eff.intensity) || 1}" />
      </label>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:12px;">
        <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
          <input type="checkbox" class="fx-auto-color-cb" ${!hasCustomColor ? 'checked' : ''} />
          <span>Цвет редкости</span>
        </label>
        <input type="color" class="fx-color-input" value="${pickerColor}" style="width:42px; height:28px; padding:0; border:none; background:none;" />
      </div>
      <div style="display:flex; gap:8px; margin-top:4px;">
        <button type="button" class="btn-primary fx-save-btn" style="padding:5px 10px; font-size:12px;">Сохранить</button>
        ${eff.id !== 'none' ? '<button type="button" class="btn-danger fx-del-btn" style="padding:5px 10px; font-size:12px;">Удалить</button>' : ''}
      </div>
    `;

    const saveBtn = card.querySelector('.fx-save-btn');
    saveBtn.addEventListener('click', async () => {
      const nextName = card.querySelector('.fx-name-input').value.trim() || eff.name;
      const nextMode = card.querySelector('.fx-mode-select').value;
      const nextIntensity = Math.max(0.3, Math.min(2.5, Number(card.querySelector('.fx-intensity-input').value) || 1));
      const autoColor = card.querySelector('.fx-auto-color-cb').checked;
      const colorPicked = card.querySelector('.fx-color-input').value;
      const nextAccent = autoColor ? '' : colorPicked;

      const nextEffects = state.effects.map(item =>
        item.id === eff.id
          ? { ...item, name: nextName, styleMode: nextMode, intensity: nextIntensity, accentColor: nextAccent }
          : item
      );

      const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, state.rarities, nextEffects);
      if (ok) {
        state.effects = nextEffects;
        syncDynamicRarityStyles();
        saveState();
        renderAdminRaritiesManager();
        renderAdminEffectsCustomizer();
        renderCollection();
        renderCasesPage();
        renderCraftsPage();
        showToast(`Эффект "${nextName}" сохранён!`);
      }
    });

    const delBtn = card.querySelector('.fx-del-btn');
    if (delBtn) {
      delBtn.addEventListener('click', async () => {
        const nextEffects = state.effects.filter(item => item.id !== eff.id);
        const nextRarities = state.rarities.map(r =>
          normalizeEffectId(r.effectId) === eff.id ? { ...r, effectId: 'none' } : r
        );

        const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, nextRarities, nextEffects);
        if (ok) {
          state.effects = nextEffects;
          state.rarities = nextRarities;
          syncDynamicRarityStyles();
          saveState();
          renderAdminRaritiesManager();
          renderAdminEffectsCustomizer();
          renderCollection();
          renderCasesPage();
          renderCraftsPage();
          showToast(`Эффект "${eff.name}" удалён`);
        }
      });
    }

    listEl.appendChild(card);
  });
}

function renderAdminRaritiesManager() {
  ensureAdminRaritiesManagerUI();
  fillEffectSelect(document.getElementById('new-rarity-effect'), 'none');

  const tbody = document.getElementById('admin-rarities-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  state.rarities.forEach(r => {
    const tr = document.createElement('tr');
    tr.dataset.rarityKey = r.key;
    tr.innerHTML = `
      <td><input type="text" class="rarity-label-input" value="${escapeHtml(r.label)}" style="width:110px;" /></td>
      <td><code>${escapeHtml(r.key)}</code></td>
      <td><input type="color" class="rarity-color-input" value="${escapeHtml(r.color || '#8b5cf6')}" style="width:42px; height:28px; padding:0; border:none; background:none;" /></td>
      <td><select class="rarity-effect-select"></select></td>
      <td><input type="number" class="rarity-pack-input" min="0" max="100" step="any" value="${Number(r.packChance) || 0}" /></td>
      <td><input type="number" class="rarity-case-input" min="0" max="100" step="any" value="${Number(r.caseChance) || 0}" /></td>
      <td style="display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="btn-secondary rarity-row-save-btn" style="padding:4px 8px; font-size:12px;">Сохранить</button>
        ${state.rarities.length > 1 ? '<button type="button" class="btn-danger rarity-row-del-btn" style="padding:4px 8px; font-size:12px;">Удалить</button>' : ''}
      </td>
    `;

    fillEffectSelect(tr.querySelector('.rarity-effect-select'), r.effectId || 'none');

    tr.querySelector('.rarity-row-save-btn').addEventListener('click', async () => {
      const updatedLabel = tr.querySelector('.rarity-label-input').value.trim() || r.label;
      const updatedColor = tr.querySelector('.rarity-color-input').value || r.color;
      const updatedEffect = normalizeEffectId(tr.querySelector('.rarity-effect-select').value);
      const updatedPack = Math.max(0, Number(tr.querySelector('.rarity-pack-input').value) || 0);
      const updatedCase = Math.max(0, Number(tr.querySelector('.rarity-case-input').value) || 0);

      let nextRarities = state.rarities.map(item =>
        item.key === r.key
          ? {
              ...item,
              label: updatedLabel,
              color: updatedColor,
              effectId: updatedEffect,
              packChance: updatedPack,
              caseChance: updatedCase
            }
          : item
      );

      const normPack = normalizeWeightsTo100(nextRarities.map(x => x.packChance));
      const normCase = normalizeWeightsTo100(nextRarities.map(x => x.caseChance));
      nextRarities = nextRarities.map((x, idx) => ({
        ...x,
        packChance: Number(normPack[idx].toFixed(6)),
        caseChance: Number(normCase[idx].toFixed(6))
      }));

      const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, nextRarities, state.effects);
      if (ok) {
        state.rarities = nextRarities;
        syncDynamicRarityStyles();
        syncRaritySelects();
        saveState();
        renderAdminRaritiesManager();
        renderCollection();
        renderCasesPage();
        renderCraftsPage();
        renderLiveDropsFeed();
        showToast(`Редкость "${updatedLabel}" сохранена!`);
      }
    });

    const delBtn = tr.querySelector('.rarity-row-del-btn');
    if (delBtn) {
      delBtn.addEventListener('click', async () => {
        if (state.rarities.length <= 1) {
          showToast('Должна остаться хотя бы одна редкость!');
          return;
        }
        const remaining = state.rarities.filter(item => item.key !== r.key);
        const fallbackKey = remaining[0].key;
        const nextPool = state.pool.map(lvl =>
          normalizeRarityKey(lvl.rarity) === r.key ? { ...lvl, rarity: fallbackKey } : lvl
        );
        const normPack = normalizeWeightsTo100(remaining.map(x => x.packChance));
        const normCase = normalizeWeightsTo100(remaining.map(x => x.caseChance));
        const nextRarities = remaining.map((x, idx) => ({
          ...x,
          packChance: Number(normPack[idx].toFixed(6)),
          caseChance: Number(normCase[idx].toFixed(6))
        }));

        const ok = await pushSharedData(nextPool, state.cases, state.recentDrops, nextRarities, state.effects);
        if (ok) {
          state.pool = nextPool;
          state.rarities = nextRarities;
          syncDynamicRarityStyles();
          syncRaritySelects();
          saveState();
          renderAdminPool();
          renderAdminRaritiesManager();
          renderCollection();
          renderCasesPage();
          renderCraftsPage();
          showToast(`Редкость "${r.label}" удалена`);
        }
      });
    }

    tbody.appendChild(tr);
  });

  renderAdminEffectsCustomizer();
}

function normalizeWeightsTo100(entries) {
  const cleaned = entries.map(e => Math.max(0, Number(e) || 0));
  const sum = cleaned.reduce((a, b) => a + b, 0);
  if (sum <= 0) {
    const equal = 100 / Math.max(1, cleaned.length);
    return cleaned.map(() => equal);
  }
  return cleaned.map(v => (v / sum) * 100);
}

function ensureAdminCaseBuilderUI() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel || document.getElementById('add-case-form')) return;

  const container = document.createElement('div');
  container.id = 'admin-cases-builder';
  container.style.cssText = 'margin-top:32px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.14);';
  container.innerHTML = `
    <h3 class="sub-title">Создать новый кейс</h3>
    <form id="add-case-form" style="display:grid; gap:12px; max-width:680px;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
        <label style="display:flex; flex-direction:column; gap:6px;">
          <span>Название кейса</span>
          <input type="text" id="case-name-input" placeholder="Например: Extreme Demon Case" required />
        </label>
        <label style="display:flex; flex-direction:column; gap:6px;">
          <span>Цена открытия (₽)</span>
          <input type="number" id="case-price-input" min="10" step="10" value="500" required />
        </label>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
        <label style="display:flex; flex-direction:column; gap:6px;">
          <span>Картинка кейса с ПК (необязательно)</span>
          <input type="file" id="case-file-input" accept="image/*" />
        </label>
        <label style="display:flex; flex-direction:column; gap:6px;">
          <span>Или ссылка (URL) на картинку кейса (необязательно)</span>
          <input type="url" id="case-image-input" placeholder="https://... (если пусто — авто-превью)" />
        </label>
      </div>

      <div>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px;">
          <span>Содержимое кейса (выбери уровни из пула; если ничего не отмечено — войдёт весь пул):</span>
          <button type="button" id="case-select-all-btn" class="btn-secondary" style="padding:4px 10px; font-size:12px;">Выбрать все</button>
        </div>
        <div id="case-pool-checkboxes" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:8px; max-height:240px; overflow:auto; padding:10px; border-radius:10px; border:1px solid rgba(255,255,255,0.12);"></div>
      </div>

      <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
        <button type="submit" class="btn-primary">Добавить кейс</button>
        <div id="case-preview-box" style="display:flex; align-items:center; gap:10px;">
          <img id="case-preview-img" src="https://placehold.co/480x270/181825/fff?text=Case+Preview" alt="Превью кейса" style="width:128px; height:72px; object-fit:cover; border-radius:8px;" />
          <span id="case-preview-label" class="hint">Превью кейса</span>
        </div>
      </div>
    </form>

    <h3 class="sub-title" style="margin-top:24px;">Список кейсов (<span id="admin-cases-count">0</span>)</h3>
    <div id="admin-cases-list" class="cards-grid"></div>
  `;

  adminPanel.appendChild(container);
}

function ensureCollectionBulkSellControls() {
  const filtersBar = document.querySelector('#tab-collection .filters-bar');
  if (!filtersBar || document.getElementById('sell-bulk-btn')) return;

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-left:auto;';

  const select = document.createElement('select');
  select.id = 'sell-rarity-select';
  select.title = 'Выбери редкость для массовой продажи';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'sell-bulk-btn';
  btn.className = 'btn-danger';
  btn.textContent = 'Продать всё (0 ₽)';

  select.addEventListener('change', updateCollectionBulkSellButton);
  btn.addEventListener('click', sellCollectionByRarity);

  wrap.appendChild(select);
  wrap.appendChild(btn);
  filtersBar.appendChild(wrap);
  syncRaritySelects();
}

function getCollectionSellCandidates(rarity = 'all') {
  if (rarity === 'all') {
    return [...state.inventory];
  }
  return state.inventory.filter(c => normalizeRarityKey(c.rarity) === rarity);
}

function updateCollectionBulkSellButton() {
  const select = document.getElementById('sell-rarity-select');
  const btn = document.getElementById('sell-bulk-btn');
  if (!select || !btn) return;

  const rarity = select.value;
  const targets = getCollectionSellCandidates(rarity);
  const sum = targets.reduce((s, c) => s + (Number(c.price) || 0), 0);
  const label = rarity === 'all' ? 'Продать всё' : `Продать ${getRarityLabel(rarity)}`;
  btn.textContent = `${label} (${sum} ₽)`;
  btn.disabled = targets.length === 0;
}

function sellCollectionByRarity() {
  const select = document.getElementById('sell-rarity-select');
  const rarity = select ? select.value : 'all';
  const targets = getCollectionSellCandidates(rarity);
  if (targets.length === 0) return;

  const targetUidSet = new Set(targets.map(c => c.uid));
  const sum = targets.reduce((s, c) => s + (Number(c.price) || 0), 0);

  state.inventory = state.inventory.filter(c => !targetUidSet.has(c.uid));
  state.balance += sum;
  saveState();
  updateHeader();
  renderCollection();

  const desc = rarity === 'all'
    ? `Проданы все карты (${targets.length} шт.) за ${sum} ₽`
    : `Проданы карты редкости ${getRarityLabel(rarity)} (${targets.length} шт.) за ${sum} ₽`;
  showToast(desc);
}

function ensureAdminSyncButton() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel || document.getElementById('sync-pool-now-btn')) return;

  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex; flex-wrap:wrap; align-items:center; gap:12px; margin:16px 0 8px;';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'sync-pool-now-btn';
  btn.className = 'btn-secondary';
  btn.textContent = 'Залить пул, кейсы, редкости и эффекты в облако';
  btn.addEventListener('click', async () => {
    if (!state.pool || state.pool.length === 0) {
      showToast('Пул пуст — нечего отправлять');
      return;
    }
    const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, state.rarities, state.effects);
    if (ok) {
      showToast(`Сохранено в облако: ${state.pool.length} карт, ${state.cases.length} кейсов, ${state.rarities.length} редкостей`);
    }
  });

  const status = document.createElement('span');
  status.id = 'cloud-sync-status';
  status.className = 'hint';
  status.textContent = isCloudConfigured()
    ? 'Облако подключено: изменения пула, кейсов, редкостей, эффектов, рейтинга и дропов синхронизируются'
    : 'Облако НЕ настроено: заполни JSONBIN_BIN_ID и JSONBIN_MASTER_KEY в app.js';

  bar.appendChild(btn);
  bar.appendChild(status);

  const heading = adminPanel.querySelector('h3.sub-title');
  if (heading) {
    adminPanel.insertBefore(bar, heading);
  } else {
    adminPanel.prepend(bar);
  }
}

async function init() {
  state.playerId = localStorage.getItem('gd_player_id_v1') || `u_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  localStorage.setItem('gd_player_id_v1', state.playerId);

  const saved = localStorage.getItem('gd_case_save_v1');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.playerName = String(parsed.playerName || 'nar1').trim() || 'nar1';
      state.playerAvatar = getSafeAvatarSrc(parsed.playerAvatar, state.playerName);
      state.isRegistered = Boolean(parsed.isRegistered);
      state.balance = Math.max(0, Number(parsed.balance ?? 500) || 0);
      state.packs = Math.max(0, Number(parsed.packs ?? 0) || 0);
      state.packsOpened = Math.max(0, Number(parsed.packsOpened ?? 0) || 0);
      state.inventory = Array.isArray(parsed.inventory) ? parsed.inventory : [];
      state.droppedTemp = Array.isArray(parsed.droppedTemp) ? parsed.droppedTemp : [];
      lastRegistryWriteTs = Number(parsed.lastRegistryWriteTs) || 0;
      if (Array.isArray(parsed.pool) && parsed.pool.length > 0) {
        state.pool = parsed.pool;
      }
      if (Array.isArray(parsed.cases) && parsed.cases.length > 0) {
        state.cases = parsed.cases;
      }
      if (Array.isArray(parsed.recentDrops)) {
        state.recentDrops = parsed.recentDrops;
      }
      if (Array.isArray(parsed.effects) && parsed.effects.length > 0) {
        state.effects = normalizeEffectsList(parsed.effects);
      }
      if (Array.isArray(parsed.rarities) && parsed.rarities.length > 0) {
        state.rarities = normalizeRaritiesList(parsed.rarities);
      }
      if (Array.isArray(parsed.playersRegistry)) {
        state.playersRegistry = normalizePlayersRegistryList(parsed.playersRegistry);
      }
      if (Array.isArray(parsed.tradeOffers)) {
        state.tradeOffers = normalizeTradeOffersList(parsed.tradeOffers);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const cloudResult = await fetchSharedData();
  if (cloudResult.ok) {
    if (Array.isArray(cloudResult.pool) && cloudResult.pool.length > 0) {
      state.pool = cloudResult.pool;
    } else if (!state.pool || state.pool.length === 0) {
      state.pool = [...DEFAULT_POOL];
    }

    if (Array.isArray(cloudResult.cases) && cloudResult.cases.length > 0) {
      state.cases = cloudResult.cases;
    } else if (!state.cases || state.cases.length === 0) {
      state.cases = [...DEFAULT_CASES];
    }

    if (Array.isArray(cloudResult.effects) && cloudResult.effects.length > 0) {
      state.effects = normalizeEffectsList(cloudResult.effects);
    }

    if (Array.isArray(cloudResult.rarities) && cloudResult.rarities.length > 0) {
      state.rarities = normalizeRaritiesList(cloudResult.rarities);
    }

    if (Array.isArray(cloudResult.recentDrops) && cloudResult.recentDrops.length > 0) {
      const dropsMap = new Map();
      [...cloudResult.recentDrops, ...state.recentDrops].forEach(d => {
        if (d && d.uid) dropsMap.set(d.uid, d);
      });
      state.recentDrops = Array.from(dropsMap.values())
        .sort((a, b) => (b.ts || 0) - (a.ts || 0))
        .slice(0, 35);
    }

    if (Array.isArray(cloudResult.playersRegistry)) {
      state.playersRegistry = mergePlayersRegistryWithCloud(cloudResult.playersRegistry);
    }

    if (Array.isArray(cloudResult.tradeOffers)) {
      state.tradeOffers = mergeTradeOffersWithCloud(cloudResult.tradeOffers);
    }

    upsertSelfIntoRegistry();
    saveState();
  } else {
    if (!state.pool || state.pool.length === 0) state.pool = [...DEFAULT_POOL];
    if (!state.cases || state.cases.length === 0) state.cases = [...DEFAULT_CASES];
    upsertSelfIntoRegistry();
  }

  if (!state.effects || state.effects.length === 0) {
    state.effects = normalizeEffectsList(DEFAULT_EFFECTS);
  }
  if (!state.rarities || state.rarities.length === 0) {
    state.rarities = normalizeRaritiesList(DEFAULT_RARITIES);
  }
  state.playerAvatar = getSafeAvatarSrc(state.playerAvatar, state.playerName);

  injectCustomUIStyles();
  ensureHeaderProfileBadge();
  ensureRegistrationModalUI();
  ensureDroppedCardsAreaUI();
  ensureCasesPageUI();
  ensureLeaderboardAndTradesUI();
  ensureCraftsPageUI();
  ensureEditCaseModalUI();
  ensureCollectionProfileEditorUI();
  ensureBuyPackButtonVisible();
  ensureOpenAllPacksButton();
  ensureCollectionBulkSellControls();
  ensureAdminCaseBuilderUI();
  ensureAdminRaritiesManagerUI();
  ensureAdminSyncButton();
  hideFreePackTimerUI();
  syncRankInputsToFreeText();
  syncRaritySelects();

  setupNavigation();
  updateHeader();
  renderLiveDropsFeed();
  renderDroppedCards(false);
  renderCasesPage();
  renderCraftsPage();
  renderCollection();
  renderLeaderboardAndTradesPage();
  renderAdminPreview();
  renderAdminCasePoolCheckboxes();
  renderCaseBuilderPreview();
  renderAdminCasesList();
  renderAdminRaritiesManager();
  bindEvents();

  if (!state.isRegistered) {
    openRegistrationModal(true);
  } else if (isCloudConfigured()) {
    pushSharedData(state.pool, state.cases, state.recentDrops, state.rarities, state.effects, state.playersRegistry, state.tradeOffers);
  }

  if (isCloudConfigured()) {
    setInterval(async () => {
      if (isSavingCloud) return;
      const fresh = await fetchSharedData();
      if (!fresh.ok) return;

      let updated = false;
      if (Array.isArray(fresh.pool) && fresh.pool.length > 0) {
        if (JSON.stringify(fresh.pool) !== JSON.stringify(state.pool)) {
          state.pool = fresh.pool;
          updated = true;
        }
      }
      if (Array.isArray(fresh.cases) && fresh.cases.length > 0) {
        if (JSON.stringify(fresh.cases) !== JSON.stringify(state.cases)) {
          state.cases = fresh.cases;
          if (openedCaseId && !state.cases.some(c => c.id === openedCaseId)) {
            openedCaseId = null;
          }
          updated = true;
        }
      }
      if (Array.isArray(fresh.effects) && fresh.effects.length > 0) {
        const nextEffs = normalizeEffectsList(fresh.effects);
        if (JSON.stringify(nextEffs) !== JSON.stringify(state.effects)) {
          state.effects = nextEffs;
          updated = true;
        }
      }
      if (Array.isArray(fresh.rarities) && fresh.rarities.length > 0) {
        const nextRars = normalizeRaritiesList(fresh.rarities);
        if (JSON.stringify(nextRars) !== JSON.stringify(state.rarities)) {
          state.rarities = nextRars;
          syncRaritySelects();
          updated = true;
        }
      }
      if (updated) {
        syncDynamicRarityStyles();
      }
      if (Array.isArray(fresh.recentDrops)) {
        const mergedMap = new Map();
        [...fresh.recentDrops, ...state.recentDrops].forEach(d => {
          if (d && d.uid) mergedMap.set(d.uid, d);
        });
        const mergedDrops = Array.from(mergedMap.values())
          .sort((a, b) => (b.ts || 0) - (a.ts || 0))
          .slice(0, 35);
        if (JSON.stringify(mergedDrops) !== JSON.stringify(state.recentDrops)) {
          state.recentDrops = mergedDrops;
          renderLiveDropsFeed();
          updated = true;
        }
      }

      if (Array.isArray(fresh.playersRegistry)) {
        const mergedReg = mergePlayersRegistryWithCloud(fresh.playersRegistry);
        if (JSON.stringify(mergedReg) !== JSON.stringify(state.playersRegistry)) {
          state.playersRegistry = mergedReg;
          updated = true;
        }
      }

      if (Array.isArray(fresh.tradeOffers)) {
        const nextOffers = mergeTradeOffersWithCloud(fresh.tradeOffers);
        if (JSON.stringify(nextOffers) !== JSON.stringify(state.tradeOffers)) {
          state.tradeOffers = nextOffers;
          updated = true;
        }
      }

      if (updated) {
        saveState();
        updateHeader();
        renderCollection();
        renderLeaderboardAndTradesPage();
        renderAdminPool();
        renderAdminCasePoolCheckboxes();
        renderAdminCasesList();
        renderAdminRaritiesManager();
        renderCasesPage();
        renderCraftsPage();
        if (document.getElementById('tab-upgrade').classList.contains('active') && !isSpinning) {
          renderUpgradePage();
        }
      }
    }, 8000);
  }
}

function saveState() {
  upsertSelfIntoRegistry();
  try {
    localStorage.setItem('gd_case_save_v1', JSON.stringify({
      playerName: state.playerName,
      playerAvatar: state.playerAvatar,
      isRegistered: state.isRegistered,
      balance: state.balance,
      packs: state.packs,
      packsOpened: state.packsOpened,
      lastRegistryWriteTs: lastRegistryWriteTs,
      pool: state.pool,
      cases: state.cases,
      rarities: state.rarities,
      effects: state.effects,
      inventory: state.inventory,
      droppedTemp: state.droppedTemp,
      recentDrops: state.recentDrops,
      playersRegistry: state.playersRegistry,
      tradeOffers: state.tradeOffers
    }));
  } catch (e) {
    showToast('Память браузера заполнена — удали часть тяжёлых картинок!');
  }
}

function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
}

function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      const targetSec = document.getElementById(`tab-${tab}`);
      if (targetSec) targetSec.classList.add('active');

      if (tab === 'cases') renderCasesPage();
      if (tab === 'crafts') renderCraftsPage();
      if (tab === 'collection') renderCollection();
      if (tab === 'upgrade') renderUpgradePage();
      if (tab === 'leaderboard' || tab === 'trades') renderLeaderboardAndTradesPage();
      if (tab === 'admin') {
        ensureAdminCaseBuilderUI();
        ensureAdminRaritiesManagerUI();
        ensureAdminSyncButton();
        syncRankInputsToFreeText();
        syncRaritySelects();
        renderAdminPool();
        renderAdminCasePoolCheckboxes();
        renderAdminCasesList();
        renderAdminRaritiesManager();
      }
    });
  });
}

function updateHeader() {
  const packsEl = document.getElementById('header-packs');
  if (packsEl) packsEl.textContent = state.packs;

  const balEl = document.getElementById('header-balance');
  if (balEl) balEl.textContent = Math.floor(state.balance);

  const nameBadgeEl = document.getElementById('header-player-name');
  const avatarBadgeEl = document.getElementById('header-player-avatar');
  if (nameBadgeEl) nameBadgeEl.textContent = state.playerName || 'nar1';
  if (avatarBadgeEl) avatarBadgeEl.src = getSafeAvatarSrc(state.playerAvatar, state.playerName);

  updateTradesNavBadge();

  const openBtn = document.getElementById('open-pack-btn');
  if (openBtn) {
    openBtn.textContent = `Открыть пак (${state.packs})`;
    openBtn.disabled = state.packs <= 0 || isOpeningPack;
  }

  const openAllBtn = document.getElementById('open-all-packs-btn');
  if (openAllBtn) {
    openAllBtn.textContent = state.packs > 1 ? `Открыть все (${state.packs})` : 'Открыть все';
    openAllBtn.disabled = state.packs <= 0 || isOpeningPack;
  }

  const buyBtn = document.getElementById('buy-pack-btn');
  if (buyBtn) {
    buyBtn.textContent = `Купить пак (${PACK_PRICE} ₽)`;
    buyBtn.disabled = state.balance < PACK_PRICE || isOpeningPack;
  }

  const openCaseBtn = document.getElementById('open-selected-case-btn');
  const fastOpenCaseBtn = document.getElementById('fast-open-selected-case-btn');
  const activeCase = state.cases.find(c => c.id === openedCaseId);
  if (activeCase) {
    const canAfford = state.balance >= activeCase.price && !isOpeningCase;
    if (openCaseBtn) {
      openCaseBtn.textContent = `Купить (${activeCase.price} ₽)`;
      openCaseBtn.disabled = !canAfford;
    }
    if (fastOpenCaseBtn) {
      fastOpenCaseBtn.textContent = `Купить и открыть быстро (${activeCase.price} ₽)`;
      fastOpenCaseBtn.disabled = !canAfford;
    }
  }
}

function buildCardInstance(base, isHolo = false, uidPrefix = 'card') {
  const finalPrice = Math.round(base.price * (isHolo ? HOLO_MULTIPLIER : 1));
  return {
    uid: `${uidPrefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    templateId: base.id,
    rank: base.rank,
    name: base.name,
    verifier: base.verifier || '',
    publisher: base.publisher || '',
    rarity: normalizeRarityKey(base.rarity) || 'common',
    image: base.image,
    isHolo,
    price: finalPrice,
    favorite: false
  };
}

function rollSingleCard(customRarity = null, poolOverride = null, weightsOverride = null) {
  const sourcePool = Array.isArray(poolOverride) && poolOverride.length > 0 ? poolOverride : state.pool;
  if (!sourcePool || sourcePool.length === 0) return null;

  const activeWeights = Array.isArray(weightsOverride) && weightsOverride.length > 0
    ? weightsOverride
    : getPackRarityWeights();

  let chosenRarity = customRarity ? normalizeRarityKey(customRarity) : null;
  if (!chosenRarity) {
    const totalWeight = activeWeights.reduce((sum, item) => sum + Math.max(0, Number(item.weight) || 0), 0);
    const roll = Math.random() * totalWeight;
    let acc = 0;
    for (const r of activeWeights) {
      const w = Math.max(0, Number(r.weight) || 0);
      if (w <= 0) continue;
      acc += w;
      if (roll <= acc) {
        chosenRarity = r.key;
        break;
      }
    }
    if (!chosenRarity) {
      const fallbackEntry = activeWeights.find(w => (Number(w.weight) || 0) > 0) || activeWeights[0];
      chosenRarity = fallbackEntry ? fallbackEntry.key : 'common';
    }
  }

  let candidates = sourcePool.filter(c => normalizeRarityKey(c.rarity) === chosenRarity);
  if (candidates.length === 0) candidates = sourcePool;

  const base = candidates[Math.floor(Math.random() * candidates.length)];
  const isHolo = Math.random() < HOLO_CHANCE;
  return buildCardInstance(base, isHolo, 'card');
}

function formatRankDisplay(rank) {
  const raw = String(rank ?? '').trim();
  if (!raw) return '—';
  if (parseRankValue(raw) !== null && !raw.startsWith('#')) {
    return `#${raw}`;
  }
  return raw;
}

function createCardElement(card, options = {}) {
  const rarityKey = normalizeRarityKey(card.rarity) || 'common';
  const fxClass = getCardEffectClass(rarityKey);
  const isRareAnim = options.animateDrop && (card.isHolo || RARE_ANIM_TIERS.includes(rarityKey));
  const animClass = options.animateDrop ? (isRareAnim ? 'drop-anim-rare' : 'drop-anim') : '';
  const selectedClass = options.selected ? 'selected-card' : '';

  const div = document.createElement('div');
  div.className = `gd-card rarity-${rarityKey} ${fxClass} ${card.isHolo ? 'is-holo' : ''} ${animClass} ${selectedClass}`;

  const fallbackImg = `https://placehold.co/400x225/141420/ffffff?text=${encodeURIComponent(card.name || 'GD')}`;

  const verifierLine = card.verifier ? `<div>Verified by ${escapeHtml(card.verifier)}</div>` : '';
  const publisherLine = card.publisher ? `<div>Published by ${escapeHtml(card.publisher)}</div>` : '';
  const metaBlock = (verifierLine || publisherLine) ? `<div class="card-meta">${verifierLine}${publisherLine}</div>` : '';

  div.innerHTML = `
    <div class="card-top">
      <span class="card-rank">${escapeHtml(formatRankDisplay(card.rank))}</span>
      <span class="rarity-badge">${escapeHtml(getRarityLabel(rarityKey))}</span>
    </div>
    <div class="card-thumb">
      <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.name)}" onerror="this.src='${escapeHtml(fallbackImg)}'" />
    </div>
    <div class="card-info">
      <div class="card-title">${escapeHtml(card.name)}</div>
      ${metaBlock}
    </div>
    <div class="card-footer">
      <div class="card-left-tags">
        ${card.isHolo ? '<span class="holo-pill">✦ HOLO</span>' : ''}
        <span class="card-price-tag">${escapeHtml(card.price)} ₽</span>
      </div>
      ${options.showFav ? `<button type="button" class="fav-btn ${card.favorite ? 'active' : ''}" title="В избранное">★</button>` : ''}
    </div>
  `;

  if (options.showFav) {
    const favBtn = div.querySelector('.fav-btn');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.favorite = !card.favorite;
      saveState();
      renderCollection();
    });
  }

  if (options.actionLabel || options.editLabel) {
    const row = document.createElement('div');
    row.className = 'card-actions-row';

    if (options.editLabel) {
      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.textContent = options.editLabel;
      editBtn.className = 'btn-edit-card';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onEdit(card);
      });
      row.appendChild(editBtn);
    }

    if (options.actionLabel) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = options.actionLabel;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onAction(card);
      });
      row.appendChild(btn);
    }

    div.appendChild(row);
  }

  if (options.onClick) {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => options.onClick(card));
  }

  return div;
}

function prependDroppedCardElement(grid, card, animate = true) {
  const cardEl = createCardElement(card, {
    animateDrop: animate,
    actionLabel: `Продать за ${card.price} ₽`,
    onAction: (c) => {
      state.balance += c.price;
      state.droppedTemp = state.droppedTemp.filter(x => x.uid !== c.uid);
      saveState();
      updateHeader();
      renderDroppedCards(false);
      showToast(`Продано за ${c.price} ₽`);
    }
  });
  grid.prepend(cardEl);
}

// 0. КЕЙСЫ
function getCasePool(caseObj) {
  if (!caseObj) return state.pool;
  if (!Array.isArray(caseObj.itemIds) || caseObj.itemIds.length === 0) {
    return state.pool;
  }
  const matched = state.pool.filter(lvl => caseObj.itemIds.includes(lvl.id));
  return matched.length > 0 ? matched : state.pool;
}

function createCaseCardElement(caseObj, options = {}) {
  const div = document.createElement('div');
  div.className = `gd-card case-card ${options.selected ? 'selected-card' : ''}`;
  const fallbackImg = `https://placehold.co/480x270/181825/ffffff?text=${encodeURIComponent(caseObj.name || 'Case')}`;
  const itemsCount = getCasePool(caseObj).length;

  div.innerHTML = `
    <div class="card-top">
      <span class="card-rank">CASE</span>
      <span class="rarity-badge">${itemsCount} уровней</span>
    </div>
    <div class="card-thumb">
      <img src="${escapeHtml(caseObj.image || fallbackImg)}" alt="${escapeHtml(caseObj.name)}" onerror="this.src='${escapeHtml(fallbackImg)}'" />
    </div>
    <div class="card-info">
      <div class="card-title">${escapeHtml(caseObj.name)}</div>
      <div class="card-meta"><div>Открыть страницу кейса</div></div>
    </div>
    <div class="card-footer">
      <div class="card-left-tags">
        <span class="card-price-tag">${escapeHtml(caseObj.price)} ₽</span>
      </div>
    </div>
  `;

  if (options.actionLabel || options.editLabel) {
    const row = document.createElement('div');
    row.className = 'card-actions-row';

    if (options.editLabel) {
      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.textContent = options.editLabel;
      editBtn.className = 'btn-edit-card';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onEdit(caseObj);
      });
      row.appendChild(editBtn);
    }

    if (options.actionLabel) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = options.actionLabel;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onAction(caseObj);
      });
      row.appendChild(btn);
    }

    div.appendChild(row);
  }

  if (options.onClick) {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => options.onClick(caseObj));
  }

  return div;
}

function renderCasesPage() {
  ensureCasesPageUI();
  ensureDroppedCardsAreaUI();

  const catalogView = document.getElementById('cases-catalog-view');
  const detailView = document.getElementById('case-detail-view');
  const listGrid = document.getElementById('cases-list-grid');
  if (!catalogView || !detailView || !listGrid) return;

  const activeCase = state.cases.find(c => c.id === openedCaseId);
  if (!activeCase) {
    openedCaseId = null;
    catalogView.classList.remove('hidden');
    detailView.classList.add('hidden');

    listGrid.innerHTML = '';
    if (!state.cases || state.cases.length === 0) {
      listGrid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">Кейсов пока нет. Добавь первый кейс в админке!</div>';
      return;
    }

    state.cases.forEach(caseObj => {
      listGrid.appendChild(createCaseCardElement(caseObj, {
        onClick: (c) => {
          openedCaseId = c.id;
          renderCaseDropSpotlight(null);
          renderCasesPage();
        }
      }));
    });
    return;
  }

  catalogView.classList.add('hidden');
  detailView.classList.remove('hidden');

  const imgEl = document.getElementById('active-case-img');
  const titleEl = document.getElementById('active-case-title');
  const priceEl = document.getElementById('active-case-price');
  const itemsGrid = document.getElementById('active-case-items-grid');
  const trackEl = document.getElementById('cs-case-spinner-track');

  const fallbackImg = `https://placehold.co/480x270/181825/ffffff?text=${encodeURIComponent(activeCase.name || 'Case')}`;
  if (imgEl) {
    imgEl.src = activeCase.image || fallbackImg;
    imgEl.alt = activeCase.name;
    imgEl.onerror = () => { imgEl.src = fallbackImg; };
  }
  if (titleEl) titleEl.textContent = activeCase.name;
  if (priceEl) priceEl.textContent = `Цена кейса: ${activeCase.price} ₽`;

  const poolItems = getCasePool(activeCase);

  if (itemsGrid) {
    itemsGrid.innerHTML = '';
    poolItems.forEach(lvl => {
      itemsGrid.appendChild(createCardElement({ ...lvl, isHolo: false }));
    });
  }

  if (trackEl && !isOpeningCase && poolItems.length > 0) {
    trackEl.style.transition = 'none';
    trackEl.style.transform = 'translateX(0px)';
    trackEl.innerHTML = '';
    for (let i = 0; i < 14; i++) {
      const sample = poolItems[i % poolItems.length];
      const rKey = normalizeRarityKey(sample.rarity) || 'common';
      const fxClass = getCardEffectClass(rKey);
      const reelCard = document.createElement('div');
      reelCard.className = `cs-reel-card rarity-${rKey} ${fxClass}`;
      const rFallback = `https://placehold.co/240x135/141420/ffffff?text=${encodeURIComponent(sample.name || 'GD')}`;
      reelCard.innerHTML = `
        <img src="${escapeHtml(sample.image)}" alt="${escapeHtml(sample.name)}" onerror="this.src='${escapeHtml(rFallback)}'" />
        <div class="cs-reel-title">${escapeHtml(sample.name)}</div>
        <div class="cs-reel-sub">${escapeHtml(getRarityLabel(rKey))} · ${escapeHtml(sample.price)} ₽</div>
      `;
      trackEl.appendChild(reelCard);
    }
  }

  renderCaseDropSpotlight(pendingCaseDropCard);
  renderDroppedCards(false);
  updateHeader();
}

function openSelectedCase(instant = false) {
  if (isOpeningCase) return;
  const activeCase = state.cases.find(c => c.id === openedCaseId);
  if (!activeCase) return;

  if (state.balance < activeCase.price) {
    showToast(`Недостаточно ₽ (нужно ${activeCase.price} ₽)`);
    return;
  }

  const casePool = getCasePool(activeCase);
  if (!casePool || casePool.length === 0) {
    showToast('В этом кейсе нет карточек');
    return;
  }

  isOpeningCase = true;
  renderCaseDropSpotlight(null);
  state.balance -= activeCase.price;
  saveState();
  updateHeader();

  const wonCard = rollSingleCard(null, casePool, getCaseRarityWeights());
  const trackEl = document.getElementById('cs-case-spinner-track');
  const boxEl = document.getElementById('cs-case-spinner-box');

  if (!trackEl || !boxEl || !wonCard) {
    if (wonCard) {
      recordDropToFeed(wonCard, activeCase.name);
      renderCaseDropSpotlight(wonCard);
    }
    isOpeningCase = false;
    updateHeader();
    return;
  }

  const totalSlots = 40;
  const winIndex = 32;
  const step = REEL_SLOT_WIDTH + REEL_SLOT_GAP;

  trackEl.style.transition = 'none';
  trackEl.style.transform = 'translateX(0px)';
  trackEl.innerHTML = '';

  const slots = [];
  for (let i = 0; i < totalSlots; i++) {
    if (i === winIndex) {
      slots.push(wonCard);
    } else {
      const randBase = casePool[Math.floor(Math.random() * casePool.length)];
      slots.push(buildCardInstance(randBase, Math.random() < HOLO_CHANCE, 'reel'));
    }
  }

  slots.forEach(item => {
    const rKey = normalizeRarityKey(item.rarity) || 'common';
    const fxClass = getCardEffectClass(rKey);
    const el = document.createElement('div');
    el.className = `cs-reel-card rarity-${rKey} ${fxClass}`;
    const rFallback = `https://placehold.co/240x135/141420/ffffff?text=${encodeURIComponent(item.name || 'GD')}`;
    el.innerHTML = `
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.src='${escapeHtml(rFallback)}'" />
      <div class="cs-reel-title">${item.isHolo ? '✦ ' : ''}${escapeHtml(item.name)}</div>
      <div class="cs-reel-sub">${escapeHtml(getRarityLabel(rKey))}${item.isHolo ? ' HOLO' : ''} · ${escapeHtml(item.price)} ₽</div>
    `;
    trackEl.appendChild(el);
  });

  const centerOffset = boxEl.clientWidth / 2 - REEL_SLOT_WIDTH / 2;
  const jitter = (Math.random() - 0.5) * 44;
  const targetTranslate = Math.max(0, winIndex * step - centerOffset + jitter);

  const finishOpening = () => {
    recordDropToFeed(wonCard, activeCase.name);
    renderCaseDropSpotlight(wonCard);

    if (wonCard.isHolo || RARE_ANIM_TIERS.includes(normalizeRarityKey(wonCard.rarity))) {
      showToast(`Кейс! Выпал ${getRarityLabel(wonCard.rarity).toUpperCase()}${wonCard.isHolo ? ' HOLO' : ''}: ${wonCard.name}!`);
    } else {
      showToast(`Из кейса "${activeCase.name}" выпал ${wonCard.name}`);
    }

    isOpeningCase = false;
    updateHeader();
  };

  if (instant) {
    trackEl.style.transition = 'none';
    trackEl.style.transform = `translateX(-${targetTranslate}px)`;
    void trackEl.offsetWidth;
    finishOpening();
    return;
  }

  void trackEl.offsetWidth;
  trackEl.style.transition = 'transform 3.4s cubic-bezier(0.12, 0.84, 0.2, 1)';
  trackEl.style.transform = `translateX(-${targetTranslate}px)`;

  setTimeout(finishOpening, 3500);
}

// 1. ОТКРЫТИЕ ОДНОГО ПАКА
function openPack() {
  if (state.packs <= 0 || isOpeningPack) return;
  isOpeningPack = true;
  state.packs -= 1;
  state.packsOpened += 1;

  const rolledRaw = [];
  for (let i = 0; i < 5; i++) {
    const c = rollSingleCard();
    if (c) rolledRaw.push(c);
  }
  const rolled = sortCardsBestFirst(rolledRaw);
  state.droppedTemp.unshift(...rolled);
  rolled.forEach(c => recordDropToFeed(c, 'Пак'));

  saveState();
  updateHeader();

  const packBox = document.getElementById('pack-box-visual');
  if (packBox) {
    packBox.classList.remove('opening');
    void packBox.offsetWidth;
    packBox.classList.add('opening');
  }

  ensureDroppedCardsAreaUI();
  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  area.classList.remove('hidden');

  const total = state.droppedTemp.reduce((s, c) => s + c.price, 0);
  document.getElementById('dropped-total-price').textContent = total;

  if (rolled.length === 0) {
    isOpeningPack = false;
    updateHeader();
    return;
  }

  rolled.forEach((card, idx) => {
    setTimeout(() => {
      prependDroppedCardElement(grid, card, true);

      if (card.isHolo || RARE_ANIM_TIERS.includes(normalizeRarityKey(card.rarity))) {
        showToast(`Выпал ${getRarityLabel(card.rarity).toUpperCase()}${card.isHolo ? ' HOLO' : ''}: ${card.name}!`);
      }

      if (idx === rolled.length - 1) {
        isOpeningPack = false;
        updateHeader();
      }
    }, idx * 140);
  });
}

// ОТКРЫТИЕ ВСЕХ ПАКОВ СРАЗУ
function openAllPacks() {
  if (state.packs <= 0 || isOpeningPack) return;
  isOpeningPack = true;

  const packsToOpen = state.packs;
  state.packs = 0;
  state.packsOpened += packsToOpen;

  const rolledRaw = [];
  for (let p = 0; p < packsToOpen; p++) {
    for (let i = 0; i < 5; i++) {
      const c = rollSingleCard();
      if (c) rolledRaw.push(c);
    }
  }
  const rolled = sortCardsBestFirst(rolledRaw);
  state.droppedTemp.unshift(...rolled);
  rolled.slice(0, 8).forEach(c => recordDropToFeed(c, 'Все паки'));

  saveState();
  updateHeader();

  const packBox = document.getElementById('pack-box-visual');
  if (packBox) {
    packBox.classList.remove('opening');
    void packBox.offsetWidth;
    packBox.classList.add('opening');
  }

  ensureDroppedCardsAreaUI();
  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  area.classList.remove('hidden');

  const total = state.droppedTemp.reduce((s, c) => s + c.price, 0);
  document.getElementById('dropped-total-price').textContent = total;

  const rareCount = rolled.filter(c => c.isHolo || RARE_ANIM_TIERS.includes(normalizeRarityKey(c.rarity))).length;
  showToast(`Открыто паков: ${packsToOpen} (${rolled.length} карт${rareCount ? `, редких/Holo: ${rareCount}` : ''})`);

  const toRender = [...rolled].reverse();
  const batchSize = 15;
  const shouldAnimate = toRender.length <= 40;
  let index = 0;

  function renderNextBatch() {
    const fragment = document.createDocumentFragment();
    const end = Math.min(index + batchSize, toRender.length);
    for (let i = index; i < end; i++) {
      const cardEl = createCardElement(toRender[i], {
        animateDrop: shouldAnimate,
        actionLabel: `Продать за ${toRender[i].price} ₽`,
        onAction: (c) => {
          state.balance += c.price;
          state.droppedTemp = state.droppedTemp.filter(x => x.uid !== c.uid);
          saveState();
          updateHeader();
          renderDroppedCards(false);
          showToast(`Продано за ${c.price} ₽`);
        }
      });
      fragment.prepend(cardEl);
    }
    grid.prepend(fragment);
    index = end;

    if (index < toRender.length) {
      setTimeout(renderNextBatch, shouldAnimate ? 70 : 15);
    } else {
      isOpeningPack = false;
      updateHeader();
    }
  }

  renderNextBatch();
}

function renderDroppedCards(animate = false) {
  ensureDroppedCardsAreaUI();
  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  if (!area || !grid) return;

  if (state.droppedTemp.length === 0) {
    area.classList.add('hidden');
    grid.innerHTML = '';
    return;
  }
  area.classList.remove('hidden');
  grid.innerHTML = '';

  let total = 0;
  const fragment = document.createDocumentFragment();
  state.droppedTemp.forEach(card => {
    total += card.price;
    fragment.appendChild(createCardElement(card, {
      animateDrop: animate,
      actionLabel: `Продать за ${card.price} ₽`,
      onAction: (c) => {
        state.balance += c.price;
        state.droppedTemp = state.droppedTemp.filter(x => x.uid !== c.uid);
        saveState();
        updateHeader();
        renderDroppedCards(false);
        showToast(`Продано за ${c.price} ₽`);
      }
    }));
  });
  grid.appendChild(fragment);

  const totalEl = document.getElementById('dropped-total-price');
  if (totalEl) totalEl.textContent = total;
}

// 2.5 КРАФТЫ (10 КАРТ ОДНОЙ РЕДКОСТИ -> 1 КАРТА СЛЕДУЮЩЕЙ РЕДКОСТИ ПО ЦЕНЕ)
function getCraftTargetRarityObj(sourceRarityKey) {
  const nextObj = getNextRarityObj(sourceRarityKey);
  if (!nextObj) return null;

  const ordered = getOrderedRarities();
  const startIdx = ordered.findIndex(r => r.key === nextObj.key);
  if (startIdx === -1) return nextObj;

  for (let i = startIdx; i < ordered.length; i++) {
    const candidateKey = ordered[i].key;
    if (state.pool.some(lvl => normalizeRarityKey(lvl.rarity) === candidateKey)) {
      return ordered[i];
    }
  }
  return nextObj;
}

function getCraftCandidateBases(sourceRarityKey) {
  const targetRarity = getCraftTargetRarityObj(sourceRarityKey);
  if (!targetRarity) return [];
  const exact = state.pool.filter(lvl => normalizeRarityKey(lvl.rarity) === targetRarity.key);
  if (exact.length > 0) return exact;
  return state.pool;
}

function pickCraftedCardFromPrice(sourceRarityKey, totalPrice) {
  const targetRarity = getCraftTargetRarityObj(sourceRarityKey);
  const bases = getCraftCandidateBases(sourceRarityKey);
  if (!targetRarity || bases.length === 0) return null;

  const isHolo = Math.random() < HOLO_CHANCE;
  const variants = bases.map(base => ({
    base,
    isHolo,
    price: Math.round(base.price * (isHolo ? HOLO_MULTIPLIER : 1))
  }));

  const avgVariantPrice = variants.reduce((s, v) => s + v.price, 0) / variants.length || 1;
  const referenceScale = Math.max(1, totalPrice / (avgVariantPrice * 1.15));

  const scored = variants
    .map(v => {
      const scaledTarget = Math.max(1, Math.round(totalPrice * 0.65));
      const diff = Math.abs(v.price - scaledTarget);
      return { variant: v, diff, score: diff / referenceScale };
    })
    .sort((a, b) => a.score - b.score);

  const topPool = scored.slice(0, Math.min(3, scored.length)).map(item => item.variant);
  const chosen = topPool[Math.floor(Math.random() * topPool.length)];
  return buildCardInstance(chosen.base, chosen.isHolo, 'craft');
}

function renderCraftsPage() {
  ensureCraftsPageUI();
  syncRaritySelects();

  const raritySelect = document.getElementById('craft-rarity-select');
  const slotsEl = document.getElementById('craft-selected-slots');
  const availGrid = document.getElementById('craft-available-grid');
  if (!raritySelect || !slotsEl || !availGrid) return;

  const activeRarity = normalizeRarityKey(raritySelect.value || selectedCraftRarityKey);
  selectedCraftRarityKey = activeRarity;

  const matchingInventory = state.inventory.filter(c => normalizeRarityKey(c.rarity) === activeRarity);
  const validUidSet = new Set(matchingInventory.map(c => c.uid));
  selectedCraftCardUids = selectedCraftCardUids.filter(uid => validUidSet.has(uid)).slice(0, CRAFT_REQUIRED_COUNT);

  const selectedCards = selectedCraftCardUids
    .map(uid => matchingInventory.find(c => c.uid === uid))
    .filter(Boolean);

  const totalSum = selectedCards.reduce((s, c) => s + (Number(c.price) || 0), 0);
  const targetRarity = getCraftTargetRarityObj(activeRarity);

  document.getElementById('craft-selected-count').textContent = selectedCards.length;
  document.getElementById('craft-slots-count').textContent = selectedCards.length;
  document.getElementById('craft-total-price').textContent = totalSum;
  document.getElementById('craft-next-rarity').textContent = targetRarity ? targetRarity.label : 'Максимальная';

  const execBtn = document.getElementById('craft-execute-btn');
  execBtn.textContent = `Скрафтить (${selectedCards.length} / ${CRAFT_REQUIRED_COUNT})`;
  execBtn.disabled = selectedCards.length !== CRAFT_REQUIRED_COUNT || !targetRarity;

  const autofillBtn = document.getElementById('craft-autofill-btn');
  autofillBtn.disabled = matchingInventory.length === 0 || selectedCards.length >= CRAFT_REQUIRED_COUNT;

  const resultBox = document.getElementById('craft-result-box');
  const resultWrap = document.getElementById('craft-result-card-wrap');
  if (lastCraftedCard) {
    resultBox.classList.remove('hidden');
    document.getElementById('craft-result-title').textContent =
      `${lastCraftedCard.isHolo ? '✦ ' : ''}${lastCraftedCard.name} (${getRarityLabel(lastCraftedCard.rarity)})`;
    document.getElementById('craft-result-meta').textContent =
      `Цена: ${lastCraftedCard.price} ₽ · Карта добавлена в коллекцию`;
    resultWrap.innerHTML = '';
    resultWrap.appendChild(createCardElement(lastCraftedCard, { animateDrop: true }));
  } else {
    resultBox.classList.add('hidden');
    resultWrap.innerHTML = '';
  }

  slotsEl.innerHTML = '';
  for (let i = 0; i < CRAFT_REQUIRED_COUNT; i++) {
    const card = selectedCards[i];
    if (card) {
      slotsEl.appendChild(createCardElement(card, {
        selected: true,
        onClick: () => {
          selectedCraftCardUids = selectedCraftCardUids.filter(id => id !== card.uid);
          renderCraftsPage();
        }
      }));
    } else {
      const emptySlot = document.createElement('div');
      emptySlot.className = 'craft-empty-slot';
      emptySlot.textContent = `Слот #${i + 1}`;
      slotsEl.appendChild(emptySlot);
    }
  }

  availGrid.innerHTML = '';
  if (matchingInventory.length === 0) {
    availGrid.innerHTML = `<div class="empty-box" style="grid-column: 1/-1;">В коллекции нет карт редкости ${escapeHtml(getRarityLabel(activeRarity))}.</div>`;
    return;
  }

  const sortedAvailable = [...matchingInventory].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  sortedAvailable.forEach(card => {
    const isPicked = selectedCraftCardUids.includes(card.uid);
    availGrid.appendChild(createCardElement(card, {
      selected: isPicked,
      onClick: () => {
        if (isPicked) {
          selectedCraftCardUids = selectedCraftCardUids.filter(id => id !== card.uid);
        } else {
          if (selectedCraftCardUids.length >= CRAFT_REQUIRED_COUNT) {
            showToast(`Можно выбрать ровно ${CRAFT_REQUIRED_COUNT} карт!`);
            return;
          }
          selectedCraftCardUids.push(card.uid);
        }
        renderCraftsPage();
      }
    }));
  });
}

function executeCraft() {
  const activeRarity = normalizeRarityKey(selectedCraftRarityKey);
  if (!activeRarity || selectedCraftCardUids.length !== CRAFT_REQUIRED_COUNT) return;

  const selectedUidSet = new Set(selectedCraftCardUids);
  const consumedCards = state.inventory.filter(c => selectedUidSet.has(c.uid));
  if (consumedCards.length !== CRAFT_REQUIRED_COUNT) {
    showToast('Выбранные карты не найдены в инвентаре');
    selectedCraftCardUids = [];
    renderCraftsPage();
    return;
  }

  const totalSum = consumedCards.reduce((s, c) => s + (Number(c.price) || 0), 0);
  const crafted = pickCraftedCardFromPrice(activeRarity, totalSum);
  if (!crafted) {
    showToast('Не удалось подобрать карту для крафта');
    return;
  }

  state.inventory = state.inventory.filter(c => !selectedUidSet.has(c.uid));
  state.inventory.push(crafted);
  selectedCraftCardUids = [];
  lastCraftedCard = crafted;

  recordDropToFeed(crafted, 'Крафт');
  saveState();
  updateHeader();
  renderCraftsPage();
  renderCollection();
  showToast(`Скрафчено: ${crafted.name} (${getRarityLabel(crafted.rarity)})!`);
}

// 3. АПГРЕЙДЫ
function getUpgradeCatalog() {
  const items = [];
  state.pool.forEach(base => {
    ['normal', 'holo'].forEach(mode => {
      const isHolo = mode === 'holo';
      const card = buildCardInstance(base, isHolo, 'upg_cat');
      card.catalogKey = `${base.id}__${mode}`;
      items.push(card);
    });
  });
  return items;
}

function getSelectedUpgradeTarget() {
  if (!selectedUpgradeTargetKey) return null;
  return getUpgradeCatalog().find(item => item.catalogKey === selectedUpgradeTargetKey) || null;
}

function getUpgradeChance() {
  const src = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  const tgt = getSelectedUpgradeTarget();
  if (!src || !tgt) return 0;
  const raw = (src.price / tgt.price) * 82;
  return Math.max(1, Math.min(80, Number(raw.toFixed(1))));
}

function renderUpgradePage() {
  syncRaritySelects();
  const srcSlot = document.getElementById('upg-source-slot');
  const tgtSlot = document.getElementById('upg-target-slot');
  const userGrid = document.getElementById('upg-user-cards');
  const targetGrid = document.getElementById('upg-target-cards');

  const srcCard = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  srcSlot.innerHTML = '';
  if (srcCard) {
    srcSlot.appendChild(createCardElement(srcCard));
  } else {
    srcSlot.textContent = 'Выбери карту ниже';
  }

  const tgtCard = getSelectedUpgradeTarget();
  tgtSlot.innerHTML = '';
  if (tgtCard) {
    tgtSlot.appendChild(createCardElement(tgtCard));
  } else {
    tgtSlot.textContent = 'Выбери любую карту из списка';
  }

  const chance = getUpgradeChance();
  document.getElementById('upg-chance-text').textContent = `${chance}%`;
  const deg = (chance / 100) * 360;
  const wheel = document.getElementById('upgrade-wheel');
  wheel.style.background = `conic-gradient(#22c55e 0deg ${deg}deg, #1e293b ${deg}deg 360deg)`;

  document.getElementById('run-upgrade-btn').disabled = !(srcCard && tgtCard) || isSpinning;

  userGrid.innerHTML = '';
  if (state.inventory.length === 0) {
    userGrid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">У тебя пока нет карт в инвентаре.</div>';
  } else {
    [...state.inventory]
      .sort((a, b) => compareRanks(a.rank, b.rank))
      .forEach(c => {
        userGrid.appendChild(createCardElement(c, {
          selected: c.uid === selectedUpgradeSourceId,
          onClick: () => {
            if (isSpinning) return;
            selectedUpgradeSourceId = c.uid;
            renderUpgradePage();
          }
        }));
      });
  }

  const query = (document.getElementById('upg-search-input').value || '').trim().toLowerCase();
  const typeFilter = document.getElementById('upg-type-filter').value;
  const rarityFilter = document.getElementById('upg-rarity-filter').value;

  const filteredCatalog = getUpgradeCatalog().filter(c => {
    if (typeFilter === 'holo' && !c.isHolo) return false;
    if (typeFilter === 'normal' && c.isHolo) return false;
    if (rarityFilter !== 'all' && normalizeRarityKey(c.rarity) !== rarityFilter) return false;
    if (query) {
      const rankStr = String(c.rank ?? '').toLowerCase();
      const matchName = c.name.toLowerCase().includes(query);
      const matchRank = rankStr.includes(query) || `#${rankStr}`.includes(query);
      if (!matchName && !matchRank) return false;
    }
    return true;
  });

  document.getElementById('upg-catalog-count').textContent = `${filteredCatalog.length} карт`;

  targetGrid.innerHTML = '';
  if (filteredCatalog.length === 0) {
    targetGrid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">Ничего не найдено.</div>';
    return;
  }

  filteredCatalog.forEach(c => {
    targetGrid.appendChild(createCardElement(c, {
      selected: c.catalogKey === selectedUpgradeTargetKey,
      onClick: () => {
        if (isSpinning) return;
        selectedUpgradeTargetKey = c.catalogKey;
        renderUpgradePage();
      }
    }));
  });
}

function runUpgrade() {
  const srcCard = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  const tgtCard = getSelectedUpgradeTarget();
  if (!srcCard || !tgtCard || isSpinning) return;

  isSpinning = true;
  document.getElementById('run-upgrade-btn').disabled = true;
  const statusEl = document.getElementById('upgrade-status');
  statusEl.textContent = 'Крутим рулетку...';

  const chance = getUpgradeChance();
  const win = Math.random() * 100 <= chance;

  const winAngle = Math.random() * ((chance / 100) * 350);
  const loseAngle = ((chance / 100) * 360) + 10 + Math.random() * (340 - (chance / 100) * 360);
  const targetSectorAngle = win ? winAngle : loseAngle;
  const finalRotation = 360 * 5 + (360 - targetSectorAngle);

  const wheel = document.getElementById('upgrade-wheel');
  wheel.style.transform = `rotate(${finalRotation}deg)`;

  setTimeout(() => {
    state.inventory = state.inventory.filter(c => c.uid !== srcCard.uid);

    if (win) {
      const wonCard = {
        ...tgtCard,
        uid: 'upg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
      };
      state.inventory.push(wonCard);
      recordDropToFeed(wonCard, 'Апгрейд');
      statusEl.style.color = '#4ade80';
      statusEl.textContent = `УСПЕХ! Получена карта ${tgtCard.name}${tgtCard.isHolo ? ' [HOLO]' : ''}`;
      showToast('Апгрейд прошёл успешно!');
    } else {
      statusEl.style.color = '#f87171';
      statusEl.textContent = 'НЕУДАЧА! Карта сгорела.';
      showToast('Апгрейд не удался');
    }

    selectedUpgradeSourceId = null;
    saveState();

    setTimeout(() => {
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(0deg)';
      setTimeout(() => {
        wheel.style.transition = 'transform 2.6s cubic-bezier(0.15, 0.85, 0.25, 1)';
        isSpinning = false;
        renderUpgradePage();
      }, 50);
    }, 600);
  }, 2700);
}

// 4. КОЛЛЕКЦИЯ
function renderCollection() {
  renderCollectionProfileBanner();
  ensureCollectionBulkSellControls();
  syncRaritySelects();

  const rarityFilter = document.getElementById('filter-rarity').value;
  const typeFilter = document.getElementById('filter-type').value;
  const favOnly = document.getElementById('filter-fav').checked;

  document.getElementById('stat-total-cards').textContent = state.inventory.length;
  document.getElementById('stat-holo-cards').textContent = state.inventory.filter(c => c.isHolo).length;
  const totalVal = state.inventory.reduce((s, c) => s + (Number(c.price) || 0), 0);
  document.getElementById('stat-inv-value').textContent = `${totalVal} ₽`;
  document.getElementById('stat-packs-opened').textContent = state.packsOpened;

  updateCollectionBulkSellButton();

  const filtered = state.inventory
    .filter(c => {
      if (rarityFilter !== 'all' && normalizeRarityKey(c.rarity) !== rarityFilter) return false;
      if (typeFilter === 'holo' && !c.isHolo) return false;
      if (typeFilter === 'normal' && c.isHolo) return false;
      if (favOnly && !c.favorite) return false;
      return true;
    })
    .sort((a, b) => {
      const rankDiff = compareRanks(a.rank, b.rank);
      if (rankDiff !== 0) return rankDiff;
      if (a.isHolo !== b.isHolo) return a.isHolo ? -1 : 1;
      return (Number(b.price) || 0) - (Number(a.price) || 0);
    });

  const grid = document.getElementById('collection-grid');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">Карточек по выбранным фильтрам пока нет.</div>';
    return;
  }

  filtered.forEach(card => {
    grid.appendChild(createCardElement(card, {
      showFav: true,
      actionLabel: `Продать (${card.price} ₽)`,
      onAction: (c) => {
        state.balance += c.price;
        state.inventory = state.inventory.filter(x => x.uid !== c.uid);
        saveState();
        updateHeader();
        renderCollection();
        showToast(`Продано за ${c.price} ₽`);
      }
    }));
  });
}

function getCurrentAdminImage() {
  if (uploadedAdminImageDataUrl) return uploadedAdminImageDataUrl;
  const urlVal = document.getElementById('card-image').value.trim();
  if (urlVal) return urlVal;
  return 'https://placehold.co/400x225/181825/fff?text=GD+Level';
}

function getDefaultCaseImage(caseName = '') {
  const label = (caseName || 'GD Case').trim() || 'GD Case';
  return `https://placehold.co/480x270/181825/ffffff?text=${encodeURIComponent(label)}`;
}

function getCurrentCaseImage() {
  if (uploadedCaseImageDataUrl) return uploadedCaseImageDataUrl;
  const urlInput = document.getElementById('case-image-input');
  const nameInput = document.getElementById('case-name-input');
  const urlVal = urlInput ? urlInput.value.trim() : '';
  if (urlVal) return urlVal;
  return getDefaultCaseImage(nameInput ? nameInput.value : '');
}

function renderCaseBuilderPreview() {
  const imgEl = document.getElementById('case-preview-img');
  const labelEl = document.getElementById('case-preview-label');
  if (!imgEl) return;

  const nameInput = document.getElementById('case-name-input');
  const priceInput = document.getElementById('case-price-input');
  const nameVal = (nameInput && nameInput.value.trim()) || 'Новый кейс';
  const priceVal = Number(priceInput && priceInput.value) || 0;
  const src = getCurrentCaseImage();

  imgEl.src = src;
  imgEl.onerror = () => {
    imgEl.src = getDefaultCaseImage(nameVal);
  };
  if (labelEl) {
    labelEl.textContent = `${nameVal} — ${priceVal} ₽`;
  }
}

function renderAdminCasePoolCheckboxes() {
  const wrap = document.getElementById('case-pool-checkboxes');
  if (!wrap) return;

  const prevSelected = new Set(
    Array.from(wrap.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value)
  );

  wrap.innerHTML = '';

  state.pool.forEach(lvl => {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:6px; background:rgba(255,255,255,0.04); cursor:pointer; font-size:13px;';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = lvl.id;
    cb.checked = prevSelected.has(lvl.id);

    const span = document.createElement('span');
    span.textContent = `${formatRankDisplay(lvl.rank)} ${lvl.name} (${getRarityLabel(lvl.rarity)})`;

    label.appendChild(cb);
    label.appendChild(span);
    wrap.appendChild(label);
  });
}

function openEditCaseModal(caseObj) {
  ensureEditCaseModalUI();
  editingCaseImageDataUrl = '';

  document.getElementById('edit-case-id').value = caseObj.id;
  document.getElementById('edit-case-name').value = caseObj.name;
  document.getElementById('edit-case-price').value = caseObj.price;
  document.getElementById('edit-case-file').value = '';
  document.getElementById('edit-case-image').value = (caseObj.image || '').startsWith('data:') ? '' : (caseObj.image || '');

  const wrap = document.getElementById('edit-case-pool-checkboxes');
  wrap.innerHTML = '';

  const explicitIds = Array.isArray(caseObj.itemIds) && caseObj.itemIds.length > 0
    ? new Set(caseObj.itemIds)
    : null;

  state.pool.forEach(lvl => {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:6px; background:rgba(255,255,255,0.04); cursor:pointer; font-size:13px;';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = lvl.id;
    cb.checked = explicitIds ? explicitIds.has(lvl.id) : true;

    const span = document.createElement('span');
    span.textContent = `${formatRankDisplay(lvl.rank)} ${lvl.name} (${getRarityLabel(lvl.rarity)})`;

    label.appendChild(cb);
    label.appendChild(span);
    wrap.appendChild(label);
  });

  document.getElementById('edit-case-modal').classList.remove('hidden');
}

function closeEditCaseModal() {
  editingCaseImageDataUrl = '';
  const modal = document.getElementById('edit-case-modal');
  if (modal) modal.classList.add('hidden');
}

function renderAdminCasesList() {
  const countEl = document.getElementById('admin-cases-count');
  const listEl = document.getElementById('admin-cases-list');
  if (!listEl) return;

  if (countEl) countEl.textContent = state.cases.length;
  listEl.innerHTML = '';

  state.cases.forEach(caseObj => {
    listEl.appendChild(createCaseCardElement(caseObj, {
      editLabel: 'Изменить',
      onEdit: (c) => openEditCaseModal(c),
      actionLabel: 'Удалить',
      onAction: async (c) => {
        const nextCases = state.cases.filter(x => x.id !== c.id);
        const ok = await pushSharedData(state.pool, nextCases, state.recentDrops, state.rarities, state.effects);
        if (ok) {
          state.cases = nextCases;
          if (openedCaseId === c.id) {
            openedCaseId = null;
          }
          saveState();
          renderAdminCasesList();
          renderCasesPage();
          showToast(`Кейс "${c.name}" удалён`);
        }
      }
    }));
  });
}

// 5. АДМИНКА
function renderAdminPreview() {
  syncRankInputsToFreeText();
  syncRaritySelects();

  const rank = document.getElementById('card-rank').value.trim() || '#1';
  const name = document.getElementById('card-name').value || 'Название уровня';
  const verifier = document.getElementById('card-verifier').value.trim();
  const publisher = document.getElementById('card-publisher').value.trim();
  const rarity = document.getElementById('card-rarity').value || 'common';
  const price = Number(document.getElementById('card-price').value) || 100;
  const image = getCurrentAdminImage();

  const box = document.getElementById('admin-preview-box');
  box.innerHTML = '';

  const normalSample = { rank, name, verifier, publisher, rarity, price, image, isHolo: false };
  const holoSample = { rank, name, verifier, publisher, rarity, price: Math.round(price * HOLO_MULTIPLIER), image, isHolo: true };

  box.appendChild(createCardElement(normalSample));
  box.appendChild(createCardElement(holoSample));
}

function openEditModal(card) {
  syncRankInputsToFreeText();
  syncRaritySelects();
  editingCardImageDataUrl = '';
  document.getElementById('edit-card-id').value = card.id;
  document.getElementById('edit-card-rank').value = card.rank;
  document.getElementById('edit-card-name').value = card.name;
  document.getElementById('edit-card-verifier').value = card.verifier || '';
  document.getElementById('edit-card-publisher').value = card.publisher || '';
  document.getElementById('edit-card-rarity').value = normalizeRarityKey(card.rarity) || 'common';
  document.getElementById('edit-card-price').value = card.price;
  document.getElementById('edit-card-file').value = '';
  document.getElementById('edit-card-image').value = (card.image || '').startsWith('data:') ? '' : (card.image || '');
  document.getElementById('edit-card-modal').classList.remove('hidden');
}

function closeEditModal() {
  editingCardImageDataUrl = '';
  document.getElementById('edit-card-modal').classList.add('hidden');
}

async function moveAdminPoolCard(draggedId, targetId, placeAfter = false) {
  if (!draggedId || !targetId || draggedId === targetId) return;
  const fromIdx = state.pool.findIndex(item => item.id === draggedId);
  const toIdx = state.pool.findIndex(item => item.id === targetId);
  if (fromIdx === -1 || toIdx === -1) return;

  const nextPool = [...state.pool];
  const [moved] = nextPool.splice(fromIdx, 1);
  let insertIdx = nextPool.findIndex(item => item.id === targetId);
  if (insertIdx === -1) return;
  if (placeAfter) insertIdx += 1;
  nextPool.splice(insertIdx, 0, moved);

  state.pool = nextPool;
  saveState();
  renderAdminPool();
  renderAdminCasePoolCheckboxes();
  renderCasesPage();

  if (isCloudConfigured()) {
    await pushSharedData(state.pool, state.cases, state.recentDrops, state.rarities, state.effects);
  }
}

function renderAdminPool() {
  document.getElementById('pool-count').textContent = state.pool.length;
  const grid = document.getElementById('admin-pool-grid');
  grid.innerHTML = '';
  draggedAdminPoolCardId = null;

  state.pool.forEach(lvl => {
    const cardEl = createCardElement({ ...lvl, isHolo: false }, {
      editLabel: 'Изменить',
      onEdit: (c) => openEditModal(c),
      actionLabel: 'Удалить',
      onAction: async (c) => {
        if (state.pool.length <= 1) {
          showToast('В пуле должна остаться хотя бы 1 карта!');
          return;
        }
        const nextPool = state.pool.filter(x => x.id !== c.id);
        const ok = await pushSharedData(nextPool, state.cases, state.recentDrops, state.rarities, state.effects);
        if (ok) {
          state.pool = nextPool;
          saveState();
          renderAdminPool();
          renderAdminCasePoolCheckboxes();
          renderCasesPage();
          showToast('Карта удалена у всех игроков');
        }
      }
    });

    cardEl.setAttribute('draggable', 'true');
    cardEl.dataset.poolId = lvl.id;

    cardEl.addEventListener('dragstart', (e) => {
      if (e.target.closest('button, input, select, textarea')) {
        e.preventDefault();
        return;
      }
      draggedAdminPoolCardId = lvl.id;
      cardEl.classList.add('admin-drag-source');
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', lvl.id);
      }
    });

    cardEl.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (!draggedAdminPoolCardId || draggedAdminPoolCardId === lvl.id) return;
      cardEl.classList.add('admin-drag-over');
    });

    cardEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!draggedAdminPoolCardId || draggedAdminPoolCardId === lvl.id) return;
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
      cardEl.classList.add('admin-drag-over');
    });

    cardEl.addEventListener('dragleave', () => {
      cardEl.classList.remove('admin-drag-over');
    });

    cardEl.addEventListener('drop', async (e) => {
      e.preventDefault();
      cardEl.classList.remove('admin-drag-over');
      const sourceId = draggedAdminPoolCardId || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
      draggedAdminPoolCardId = null;
      if (!sourceId || sourceId === lvl.id) return;

      const rect = cardEl.getBoundingClientRect();
      const placeAfter = e.clientX > rect.left + rect.width / 2;
      await moveAdminPoolCard(sourceId, lvl.id, placeAfter);
    });

    cardEl.addEventListener('dragend', () => {
      draggedAdminPoolCardId = null;
      grid.querySelectorAll('.gd-card').forEach(el => {
        el.classList.remove('admin-drag-source', 'admin-drag-over');
      });
    });

    grid.appendChild(cardEl);
  });
}

function bindEvents() {
  // Модалка условной регистрации
  const regForm = document.getElementById('quick-register-form');
  const regNickInput = document.getElementById('reg-nickname-input');
  const regFileInput = document.getElementById('reg-avatar-file');
  const regUrlInput = document.getElementById('reg-avatar-url');
  const regPreviewImg = document.getElementById('reg-avatar-preview');
  const regGuestBtn = document.getElementById('reg-guest-btn');

  if (regFileInput) {
    regFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        uploadedRegAvatarDataUrl = '';
        if (regPreviewImg) {
          regPreviewImg.src = getSafeAvatarSrc(regUrlInput && regUrlInput.value, regNickInput && regNickInput.value);
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        uploadedRegAvatarDataUrl = reader.result;
        if (regUrlInput) regUrlInput.value = '';
        if (regPreviewImg) regPreviewImg.src = uploadedRegAvatarDataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  if (regUrlInput) {
    regUrlInput.addEventListener('input', () => {
      const val = regUrlInput.value.trim();
      if (val) {
        uploadedRegAvatarDataUrl = '';
        if (regFileInput) regFileInput.value = '';
      }
      if (regPreviewImg) {
        regPreviewImg.src = getSafeAvatarSrc(uploadedRegAvatarDataUrl || val, regNickInput && regNickInput.value);
      }
    });
  }

  if (regNickInput) {
    regNickInput.addEventListener('input', () => {
      if (!uploadedRegAvatarDataUrl && !(regUrlInput && regUrlInput.value.trim()) && regPreviewImg) {
        regPreviewImg.src = getSafeAvatarSrc('', regNickInput.value);
      }
    });
  }

  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nick = (regNickInput && regNickInput.value.trim()) || 'nar1';
      const urlVal = (regUrlInput && regUrlInput.value.trim()) || '';
      const chosenAv = uploadedRegAvatarDataUrl || urlVal || getSafeAvatarSrc(state.playerAvatar, nick);
      await applyPlayerProfileUpdate(nick, chosenAv, true);
      closeRegistrationModal();
      showToast(`Добро пожаловать, ${state.playerName}!`);
    });
  }

  if (regGuestBtn) {
    regGuestBtn.addEventListener('click', async () => {
      const fallbackNick = (regNickInput && regNickInput.value.trim()) || state.playerName || 'nar1';
      const fallbackAv = getSafeAvatarSrc(state.playerAvatar, fallbackNick);
      await applyPlayerProfileUpdate(fallbackNick, fallbackAv, true);
      closeRegistrationModal();
    });
  }

  // Редактор профиля в коллекции
  const toggleProfileEditBtn = document.getElementById('toggle-profile-edit-btn');
  const colProfileForm = document.getElementById('collection-profile-edit-form');
  const colCancelEditBtn = document.getElementById('col-cancel-edit-btn');
  const colEditAvatarFile = document.getElementById('col-edit-avatar-file');
  const colEditAvatarUrl = document.getElementById('col-edit-avatar-url');

  if (toggleProfileEditBtn && colProfileForm) {
    toggleProfileEditBtn.addEventListener('click', () => {
      colProfileForm.classList.toggle('hidden');
      renderCollectionProfileBanner();
    });
  }

  if (colCancelEditBtn && colProfileForm) {
    colCancelEditBtn.addEventListener('click', () => {
      uploadedProfileAvatarDataUrl = '';
      if (colEditAvatarFile) colEditAvatarFile.value = '';
      colProfileForm.classList.add('hidden');
    });
  }

  if (colEditAvatarFile) {
    colEditAvatarFile.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        uploadedProfileAvatarDataUrl = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        uploadedProfileAvatarDataUrl = reader.result;
        if (colEditAvatarUrl) colEditAvatarUrl.value = '';
      };
      reader.readAsDataURL(file);
    });
  }

  if (colEditAvatarUrl) {
    colEditAvatarUrl.addEventListener('input', () => {
      if (colEditAvatarUrl.value.trim()) {
        uploadedProfileAvatarDataUrl = '';
        if (colEditAvatarFile) colEditAvatarFile.value = '';
      }
    });
  }

  if (colProfileForm) {
    colProfileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nextNick = document.getElementById('col-edit-name-input').value.trim();
      const nextUrl = colEditAvatarUrl ? colEditAvatarUrl.value.trim() : '';
      const nextAv = uploadedProfileAvatarDataUrl || nextUrl || state.playerAvatar;
      await applyPlayerProfileUpdate(nextNick, nextAv, true);
      uploadedProfileAvatarDataUrl = '';
      if (colEditAvatarFile) colEditAvatarFile.value = '';
      colProfileForm.classList.add('hidden');
      showToast('Профиль обновлён!');
    });
  }

  // Лидерборд и PvP трейды
  const goToLbBtn = document.getElementById('go-to-leaderboard-btn');
  if (goToLbBtn) {
    goToLbBtn.addEventListener('click', () => {
      const lbBtn = document.querySelector('.nav-btn[data-tab="leaderboard"]');
      if (lbBtn) lbBtn.click();
    });
  }

  document.querySelectorAll('.trade-subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveTradesSubTab(btn.dataset.tradeSubtab);
    });
  });

  const pvpCancelBtn = document.getElementById('pvp-cancel-trade-btn');
  if (pvpCancelBtn) {
    pvpCancelBtn.addEventListener('click', () => {
      myTradeUids = [];
      theirTradeUids = [];
      renderLeaderboardAndTradesPage();
    });
  }

  const pvpConfirmBtn = document.getElementById('pvp-confirm-trade-btn');
  if (pvpConfirmBtn) {
    pvpConfirmBtn.addEventListener('click', sendTradeOffer);
  }

  const openPackBtn = document.getElementById('open-pack-btn');
  if (openPackBtn) openPackBtn.addEventListener('click', openPack);

  const buyPackBtn = document.getElementById('buy-pack-btn');
  if (buyPackBtn) {
    buyPackBtn.addEventListener('click', () => {
      if (state.balance < PACK_PRICE) {
        showToast(`Недостаточно ₽ (нужно ${PACK_PRICE} ₽)`);
        return;
      }
      state.balance -= PACK_PRICE;
      state.packs += 1;
      saveState();
      updateHeader();
      showToast(`Куплен 1 пак за ${PACK_PRICE} ₽!`);
    });
  }

  const backToCasesBtn = document.getElementById('back-to-cases-btn');
  if (backToCasesBtn) {
    backToCasesBtn.addEventListener('click', () => {
      if (isOpeningCase) return;
      openedCaseId = null;
      renderCaseDropSpotlight(null);
      renderCasesPage();
    });
  }

  const openSelectedCaseBtn = document.getElementById('open-selected-case-btn');
  if (openSelectedCaseBtn) {
    openSelectedCaseBtn.addEventListener('click', () => openSelectedCase(false));
  }

  const fastOpenSelectedCaseBtn = document.getElementById('fast-open-selected-case-btn');
  if (fastOpenSelectedCaseBtn) {
    fastOpenSelectedCaseBtn.addEventListener('click', () => openSelectedCase(true));
  }

  const spotlightKeepBtn = document.getElementById('case-spotlight-keep-btn');
  if (spotlightKeepBtn) {
    spotlightKeepBtn.addEventListener('click', () => {
      if (!pendingCaseDropCard) return;
      state.inventory.push(pendingCaseDropCard);
      const name = pendingCaseDropCard.name;
      renderCaseDropSpotlight(null);
      saveState();
      updateHeader();
      renderCollection();
      showToast(`Карта "${name}" добавлена в коллекцию!`);
    });
  }

  const spotlightSellBtn = document.getElementById('case-spotlight-sell-btn');
  if (spotlightSellBtn) {
    spotlightSellBtn.addEventListener('click', () => {
      if (!pendingCaseDropCard) return;
      const sum = pendingCaseDropCard.price;
      const name = pendingCaseDropCard.name;
      state.balance += sum;
      renderCaseDropSpotlight(null);
      saveState();
      updateHeader();
      showToast(`Карта "${name}" продана за ${sum} ₽`);
    });
  }

  const keepAllDroppedBtn = document.getElementById('keep-all-dropped-btn');
  if (keepAllDroppedBtn) {
    keepAllDroppedBtn.addEventListener('click', () => {
      state.inventory.push(...state.droppedTemp);
      state.droppedTemp = [];
      saveState();
      renderDroppedCards(false);
      showToast('Все карточки добавлены в коллекцию!');
    });
  }

  const sellAllDroppedBtn = document.getElementById('sell-all-dropped-btn');
  if (sellAllDroppedBtn) {
    sellAllDroppedBtn.addEventListener('click', () => {
      const sum = state.droppedTemp.reduce((s, c) => s + c.price, 0);
      state.balance += sum;
      state.droppedTemp = [];
      saveState();
      updateHeader();
      renderDroppedCards(false);
      showToast(`Продано всё за ${sum} ₽`);
    });
  }

  // Крафты
  const craftRaritySelect = document.getElementById('craft-rarity-select');
  if (craftRaritySelect) {
    craftRaritySelect.addEventListener('change', () => {
      selectedCraftRarityKey = normalizeRarityKey(craftRaritySelect.value);
      selectedCraftCardUids = [];
      renderCraftsPage();
    });
  }

  const craftAutofillBtn = document.getElementById('craft-autofill-btn');
  if (craftAutofillBtn) {
    craftAutofillBtn.addEventListener('click', () => {
      const matching = state.inventory
        .filter(c => normalizeRarityKey(c.rarity) === selectedCraftRarityKey && !selectedCraftCardUids.includes(c.uid))
        .sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));

      for (const card of matching) {
        if (selectedCraftCardUids.length >= CRAFT_REQUIRED_COUNT) break;
        selectedCraftCardUids.push(card.uid);
      }
      renderCraftsPage();
    });
  }

  const craftClearBtn = document.getElementById('craft-clear-btn');
  if (craftClearBtn) {
    craftClearBtn.addEventListener('click', () => {
      selectedCraftCardUids = [];
      renderCraftsPage();
    });
  }

  const craftExecuteBtn = document.getElementById('craft-execute-btn');
  if (craftExecuteBtn) {
    craftExecuteBtn.addEventListener('click', executeCraft);
  }

  // Апгрейды
  const upgSearch = document.getElementById('upg-search-input');
  if (upgSearch) upgSearch.addEventListener('input', () => { if (!isSpinning) renderUpgradePage(); });
  const upgType = document.getElementById('upg-type-filter');
  if (upgType) upgType.addEventListener('change', () => { if (!isSpinning) renderUpgradePage(); });
  const upgRarity = document.getElementById('upg-rarity-filter');
  if (upgRarity) upgRarity.addEventListener('change', () => { if (!isSpinning) renderUpgradePage(); });
  const runUpgBtn = document.getElementById('run-upgrade-btn');
  if (runUpgBtn) runUpgBtn.addEventListener('click', runUpgrade);

  // Фильтры коллекции
  ['filter-rarity', 'filter-type', 'filter-fav'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderCollection);
  });

  // Админка: логин
  const adminLoginBtn = document.getElementById('admin-login-btn');
  if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', () => {
      const pass = document.getElementById('admin-pass-input').value;
      if (pass === '12356790') {
        document.getElementById('admin-lock').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        ensureAdminCaseBuilderUI();
        ensureAdminRaritiesManagerUI();
        ensureAdminSyncButton();
        syncRankInputsToFreeText();
        syncRaritySelects();
        renderAdminPool();
        renderAdminCasePoolCheckboxes();
        renderCaseBuilderPreview();
        renderAdminCasesList();
        renderAdminRaritiesManager();
      } else {
        document.getElementById('admin-error').textContent = 'Неверный пароль!';
      }
    });
  }

  // Админка: редкости, эффекты и шансы
  const saveRaritiesBtn = document.getElementById('save-rarity-chances-btn');
  if (saveRaritiesBtn) {
    saveRaritiesBtn.addEventListener('click', async () => {
      const rows = Array.from(document.querySelectorAll('#admin-rarities-tbody tr'));
      if (rows.length === 0) return;

      const rawPack = rows.map(tr => Number(tr.querySelector('.rarity-pack-input').value) || 0);
      const rawCase = rows.map(tr => Number(tr.querySelector('.rarity-case-input').value) || 0);
      const normPack = normalizeWeightsTo100(rawPack);
      const normCase = normalizeWeightsTo100(rawCase);

      const nextRarities = state.rarities.map((r, idx) => {
        const tr = rows[idx];
        const nextLabel = tr ? (tr.querySelector('.rarity-label-input').value.trim() || r.label) : r.label;
        const colorVal = tr ? tr.querySelector('.rarity-color-input').value : r.color;
        const effectVal = tr ? normalizeEffectId(tr.querySelector('.rarity-effect-select').value) : normalizeEffectId(r.effectId);
        return {
          ...r,
          label: nextLabel,
          color: colorVal || r.color,
          effectId: effectVal,
          packChance: Number(normPack[idx].toFixed(6)),
          caseChance: Number(normCase[idx].toFixed(6))
        };
      });

      const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, nextRarities, state.effects);
      if (ok) {
        state.rarities = nextRarities;
        syncDynamicRarityStyles();
        syncRaritySelects();
        saveState();
        renderAdminRaritiesManager();
        renderCollection();
        renderCasesPage();
        renderCraftsPage();
        renderLiveDropsFeed();
        showToast('Редкости, эффекты и шансы обновлены!');
      }
    });
  }

  const resetRaritiesBtn = document.getElementById('reset-rarity-chances-btn');
  if (resetRaritiesBtn) {
    resetRaritiesBtn.addEventListener('click', async () => {
      const nextRarities = normalizeRaritiesList(DEFAULT_RARITIES);
      const nextEffects = normalizeEffectsList(DEFAULT_EFFECTS);
      const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, nextRarities, nextEffects);
      if (ok) {
        state.rarities = nextRarities;
        state.effects = nextEffects;
        syncDynamicRarityStyles();
        syncRaritySelects();
        saveState();
        renderAdminRaritiesManager();
        renderCollection();
        renderCasesPage();
        renderCraftsPage();
        showToast('Редкости и эффекты сброшены к значениям по умолчанию');
      }
    });
  }

  const addRarityForm = document.getElementById('add-rarity-form');
  if (addRarityForm) {
    addRarityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const label = document.getElementById('new-rarity-label').value.trim();
      const customKey = document.getElementById('new-rarity-key').value.trim();
      const color = document.getElementById('new-rarity-color').value || '#38bdf8';
      const effectId = normalizeEffectId(document.getElementById('new-rarity-effect').value);
      const packChance = Math.max(0, Number(document.getElementById('new-rarity-pack-chance').value) || 0);
      const caseChance = Math.max(0, Number(document.getElementById('new-rarity-case-chance').value) || 0);

      const key = normalizeRarityKey(customKey || label);
      if (!label || !key) {
        showToast('Укажи название редкости!');
        return;
      }

      const maxOrder = state.rarities.reduce((m, r) => Math.max(m, Number(r.order) || 0), 0);
      const existingIdx = state.rarities.findIndex(r => r.key === key);

      let nextRarities;
      if (existingIdx >= 0) {
        nextRarities = [...state.rarities];
        nextRarities[existingIdx] = {
          ...nextRarities[existingIdx],
          label,
          color,
          effectId,
          packChance,
          caseChance
        };
      } else {
        nextRarities = [
          ...state.rarities,
          {
            key,
            label,
            color,
            effectId,
            packChance,
            caseChance,
            order: maxOrder + 1
          }
        ];
      }

      const normPack = normalizeWeightsTo100(nextRarities.map(r => r.packChance));
      const normCase = normalizeWeightsTo100(nextRarities.map(r => r.caseChance));
      nextRarities = nextRarities.map((r, i) => ({
        ...r,
        packChance: Number(normPack[i].toFixed(6)),
        caseChance: Number(normCase[i].toFixed(6))
      }));

      const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, nextRarities, state.effects);
      if (ok) {
        state.rarities = nextRarities;
        syncDynamicRarityStyles();
        syncRaritySelects();
        saveState();
        renderAdminRaritiesManager();
        renderCraftsPage();
        addRarityForm.reset();
        fillEffectSelect(document.getElementById('new-rarity-effect'), 'none');
        showToast(`Редкость "${label}" добавлена!`);
      }
    });
  }

  const addEffectForm = document.getElementById('add-effect-form');
  if (addEffectForm) {
    addEffectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('new-effect-name').value.trim();
      const styleMode = document.getElementById('new-effect-mode').value || 'pulse_glow';
      const intensity = Math.max(0.3, Math.min(2.5, Number(document.getElementById('new-effect-intensity').value) || 1));
      const useRarityColor = document.getElementById('new-effect-use-rarity-color').checked;
      const pickedColor = document.getElementById('new-effect-color').value || '#22d3ee';

      if (!name) {
        showToast('Укажи название эффекта!');
        return;
      }

      const baseSlug = normalizeEffectId(name) || 'custom_fx';
      const id = baseSlug === 'none' ? `fx_${Date.now()}` : `${baseSlug}_${Date.now().toString(36).slice(-4)}`;

      const nextEffects = [
        ...state.effects,
        {
          id,
          name,
          styleMode,
          intensity,
          accentColor: useRarityColor ? '' : pickedColor
        }
      ];

      const ok = await pushSharedData(state.pool, state.cases, state.recentDrops, state.rarities, nextEffects);
      if (ok) {
        state.effects = nextEffects;
        syncDynamicRarityStyles();
        saveState();
        renderAdminRaritiesManager();
        addEffectForm.reset();
        document.getElementById('new-effect-use-rarity-color').checked = true;
        showToast(`Эффект "${name}" создан!`);
      }
    });
  }

  // Админка: добавление карточки
  const cardFileInput = document.getElementById('card-file');
  if (cardFileInput) {
    cardFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        uploadedAdminImageDataUrl = '';
        renderAdminPreview();
        return;
      }
      if (file.size > 80 * 1024) {
        showToast('Файл больше 80 КБ — для общего пула лучше вставить URL картинки!');
      }
      const reader = new FileReader();
      reader.onload = () => {
        uploadedAdminImageDataUrl = reader.result;
        document.getElementById('card-image').value = '';
        renderAdminPreview();
      };
      reader.readAsDataURL(file);
    });
  }

  ['card-rank', 'card-name', 'card-verifier', 'card-publisher', 'card-rarity', 'card-price', 'card-image'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        if (id === 'card-image' && document.getElementById('card-image').value.trim()) {
          uploadedAdminImageDataUrl = '';
          document.getElementById('card-file').value = '';
        }
        renderAdminPreview();
      });
    }
  });

  const addCardForm = document.getElementById('add-card-form');
  if (addCardForm) {
    addCardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('card-file');
      const urlInput = document.getElementById('card-image').value.trim();

      if (!uploadedAdminImageDataUrl && !urlInput) {
        showToast('Выбери картинку с ПК или вставь URL!');
        return;
      }

      const rawRank = document.getElementById('card-rank').value.trim();
      const parsedNum = parseRankValue(rawRank);

      const newLevel = {
        id: 'lvl_' + Date.now(),
        rank: parsedNum !== null ? parsedNum : rawRank,
        name: document.getElementById('card-name').value.trim(),
        verifier: document.getElementById('card-verifier').value.trim(),
        publisher: document.getElementById('card-publisher').value.trim(),
        rarity: normalizeRarityKey(document.getElementById('card-rarity').value) || 'common',
        price: Number(document.getElementById('card-price').value),
        image: uploadedAdminImageDataUrl || urlInput
      };

      const nextPool = [newLevel, ...state.pool];
      const ok = await pushSharedData(nextPool, state.cases, state.recentDrops, state.rarities, state.effects);
      if (!ok) return;

      state.pool = nextPool;
      saveState();
      renderAdminPool();
      renderAdminCasePoolCheckboxes();
      renderCasesPage();
      renderCraftsPage();
      e.target.reset();
      fileInput.value = '';
      uploadedAdminImageDataUrl = '';
      renderAdminPreview();
      showToast(`Уровень "${newLevel.name}" добавлен всем игрокам!`);
    });
  }

  // Админка: создание кейса
  const caseFileInput = document.getElementById('case-file-input');
  const caseUrlInput = document.getElementById('case-image-input');
  const caseNameInput = document.getElementById('case-name-input');
  const casePriceInput = document.getElementById('case-price-input');
  const caseSelectAllBtn = document.getElementById('case-select-all-btn');
  const addCaseForm = document.getElementById('add-case-form');

  if (caseFileInput) {
    caseFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        uploadedCaseImageDataUrl = '';
        renderCaseBuilderPreview();
        return;
      }
      if (file.size > 80 * 1024) {
        showToast('Картинка кейса больше 80 КБ — для общего пула лучше вставить URL!');
      }
      const reader = new FileReader();
      reader.onload = () => {
        uploadedCaseImageDataUrl = reader.result;
        if (caseUrlInput) caseUrlInput.value = '';
        renderCaseBuilderPreview();
      };
      reader.readAsDataURL(file);
    });
  }

  if (caseUrlInput) {
    caseUrlInput.addEventListener('input', () => {
      if (caseUrlInput.value.trim()) {
        uploadedCaseImageDataUrl = '';
        if (caseFileInput) caseFileInput.value = '';
      }
      renderCaseBuilderPreview();
    });
  }

  if (caseNameInput) caseNameInput.addEventListener('input', renderCaseBuilderPreview);
  if (casePriceInput) casePriceInput.addEventListener('input', renderCaseBuilderPreview);

  if (caseSelectAllBtn) {
    caseSelectAllBtn.addEventListener('click', () => {
      const boxes = Array.from(document.querySelectorAll('#case-pool-checkboxes input[type="checkbox"]'));
      if (boxes.length === 0) return;
      const allChecked = boxes.every(b => b.checked);
      boxes.forEach(b => { b.checked = !allChecked; });
    });
  }

  if (addCaseForm) {
    addCaseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (caseNameInput && caseNameInput.value.trim()) || '';
      const price = Number(casePriceInput && casePriceInput.value) || 0;
      const urlVal = (caseUrlInput && caseUrlInput.value.trim()) || '';
      const image = uploadedCaseImageDataUrl || urlVal || getDefaultCaseImage(name);

      if (!name) {
        showToast('Введи название кейса!');
        return;
      }
      if (!price || price <= 0) {
        showToast('Укажи корректную цену кейса!');
        return;
      }

      const checkedIds = Array.from(
        document.querySelectorAll('#case-pool-checkboxes input[type="checkbox"]:checked')
      ).map(cb => cb.value);

      const newCase = {
        id: 'case_' + Date.now(),
        name,
        price,
        image,
        itemIds: checkedIds.length > 0 ? checkedIds : state.pool.map(lvl => lvl.id)
      };

      const nextCases = [newCase, ...state.cases];
      const ok = await pushSharedData(state.pool, nextCases, state.recentDrops, state.rarities, state.effects);
      if (!ok) return;

      state.cases = nextCases;
      saveState();
      renderAdminCasesList();
      renderCasesPage();

      addCaseForm.reset();
      if (caseFileInput) caseFileInput.value = '';
      uploadedCaseImageDataUrl = '';
      renderCaseBuilderPreview();
      showToast(`Кейс "${newCase.name}" создан!`);
    });
  }

  // Модалка редактирования кейса
  const closeEditCaseBtn = document.getElementById('close-edit-case-btn');
  const cancelEditCaseBtn = document.getElementById('cancel-edit-case-btn');
  const editCaseFileInput = document.getElementById('edit-case-file');
  const editCaseSelectAllBtn = document.getElementById('edit-case-select-all-btn');
  const editCaseForm = document.getElementById('edit-case-form');

  if (closeEditCaseBtn) closeEditCaseBtn.addEventListener('click', closeEditCaseModal);
  if (cancelEditCaseBtn) cancelEditCaseBtn.addEventListener('click', closeEditCaseModal);

  if (editCaseFileInput) {
    editCaseFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        editingCaseImageDataUrl = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        editingCaseImageDataUrl = reader.result;
        const urlInp = document.getElementById('edit-case-image');
        if (urlInp) urlInp.value = '';
      };
      reader.readAsDataURL(file);
    });
  }

  if (editCaseSelectAllBtn) {
    editCaseSelectAllBtn.addEventListener('click', () => {
      const boxes = Array.from(document.querySelectorAll('#edit-case-pool-checkboxes input[type="checkbox"]'));
      if (boxes.length === 0) return;
      const allChecked = boxes.every(b => b.checked);
      boxes.forEach(b => { b.checked = !allChecked; });
    });
  }

  if (editCaseForm) {
    editCaseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-case-id').value;
      const idx = state.cases.findIndex(c => c.id === id);
      if (idx === -1) return;

      const current = state.cases[idx];
      const name = document.getElementById('edit-case-name').value.trim();
      const price = Number(document.getElementById('edit-case-price').value) || current.price;
      const urlVal = document.getElementById('edit-case-image').value.trim();
      const nextImage = editingCaseImageDataUrl || urlVal || current.image;

      const checkedIds = Array.from(
        document.querySelectorAll('#edit-case-pool-checkboxes input[type="checkbox"]:checked')
      ).map(cb => cb.value);

      const nextCases = [...state.cases];
      nextCases[idx] = {
        ...current,
        name: name || current.name,
        price,
        image: nextImage,
        itemIds: checkedIds.length > 0 ? checkedIds : state.pool.map(lvl => lvl.id)
      };

      const ok = await pushSharedData(state.pool, nextCases, state.recentDrops, state.rarities, state.effects);
      if (!ok) return;

      state.cases = nextCases;
      saveState();
      renderAdminCasesList();
      renderCasesPage();
      closeEditCaseModal();
      showToast(`Кейс "${nextCases[idx].name}" обновлён!`);
    });
  }

  // Модалка редактирования карточки
  const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
  if (closeEditModalBtn) closeEditModalBtn.addEventListener('click', closeEditModal);
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeEditModal);

  const editCardFile = document.getElementById('edit-card-file');
  if (editCardFile) {
    editCardFile.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        editingCardImageDataUrl = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        editingCardImageDataUrl = reader.result;
        document.getElementById('edit-card-image').value = '';
      };
      reader.readAsDataURL(file);
    });
  }

  const editCardForm = document.getElementById('edit-card-form');
  if (editCardForm) {
    editCardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-card-id').value;
      const idx = state.pool.findIndex(c => c.id === id);
      if (idx === -1) return;

      const current = state.pool[idx];
      const rawRank = document.getElementById('edit-card-rank').value.trim();
      const parsedNum = parseRankValue(rawRank);
      const rank = parsedNum !== null ? parsedNum : (rawRank || current.rank);
      const name = document.getElementById('edit-card-name').value.trim() || current.name;
      const verifier = document.getElementById('edit-card-verifier').value.trim();
      const publisher = document.getElementById('edit-card-publisher').value.trim();
      const rarity = normalizeRarityKey(document.getElementById('edit-card-rarity').value) || current.rarity;
      const price = Number(document.getElementById('edit-card-price').value) || current.price;
      const urlVal = document.getElementById('edit-card-image').value.trim();
      const nextImage = editingCardImageDataUrl || urlVal || current.image;

      const updatedCard = {
        ...current,
        rank,
        name,
        verifier,
        publisher,
        rarity,
        price,
        image: nextImage
      };

      const nextPool = [...state.pool];
      nextPool[idx] = updatedCard;

      const ok = await pushSharedData(nextPool, state.cases, state.recentDrops, state.rarities, state.effects);
      if (!ok) return;

      state.pool = nextPool;
      state.inventory = state.inventory.map(invCard => {
        if (invCard.templateId === id || invCard.id === id) {
          return {
            ...invCard,
            rank: updatedCard.rank,
            name: updatedCard.name,
            verifier: updatedCard.verifier,
            publisher: updatedCard.publisher,
            rarity: updatedCard.rarity,
            image: updatedCard.image,
            price: Math.round(updatedCard.price * (invCard.isHolo ? HOLO_MULTIPLIER : 1))
          };
        }
        return invCard;
      });

      saveState();
      renderAdminPool();
      renderAdminCasePoolCheckboxes();
      renderCasesPage();
      renderCraftsPage();
      renderCollection();
      closeEditModal();
      showToast('Уровень обновлён у всех игроков!');
    });
  }
}

init();
