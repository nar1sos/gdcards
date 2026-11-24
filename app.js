// === ОБЩИЙ ОБЛАЧНЫЙ КОНФИГ ДЛЯ ВСЕХ БРАУЗЕРОВ И ИГРОКОВ ===
// Впиши сюда свой Bin ID и X-Master-Key, чтобы у всех пользователей сразу работало облако
const SHARED_CLOUD_CONFIG = {
  binId: '6b01dba4ac6210605a9a4b56',
  apiKey: '$2a$10$uRETf0psynxbv1ND6K6TkOEOldfaLwR07Hx7U7imDwBJpF6fJKFRe'
};

const PACK_PRICE = 1000;
const INITIAL_BALANCE = 1500;
const MAX_CASE_OPEN_COUNT = 3;

const DEFAULT_CASE_CATEGORIES = [
  { id: 'cat_featured', name: 'Основные кейсы' },
  { id: 'cat_players', name: 'Кейсы игроков' }
];

// === ЗВУКОВОЙ ДВИЖОК (WEB AUDIO API) ===
const SoundFX = (() => {
  let ctx = null;
  let muted = localStorage.getItem('gd_muted') === '1';
  let volume = Number(localStorage.getItem('gd_volume') ?? 0.45);
  if (!Number.isFinite(volume) || volume < 0 || volume > 1) volume = 0.45;

  function ensureCtx() {
    if (muted || volume <= 0) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!ctx) ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function tone({ freq = 440, endFreq = null, type = 'triangle', duration = 0.12, gain = 0.25, delay = 0 }) {
    const c = ensureCtx();
    if (!c) return;
    const now = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }
    const peak = Math.max(0.0001, gain * volume);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(peak, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  return {
    isMuted: () => muted,
    getVolume: () => volume,
    setMuted(val) {
      muted = Boolean(val);
      localStorage.setItem('gd_muted', muted ? '1' : '0');
      if (!muted) ensureCtx();
    },
    setVolume(pct) {
      const clamped = Math.max(0, Math.min(100, Number(pct) || 0));
      volume = clamped / 100;
      localStorage.setItem('gd_volume', String(volume));
      if (volume > 0 && muted) {
        muted = false;
        localStorage.setItem('gd_muted', '0');
      }
      ensureCtx();
    },
    click() {
      tone({ freq: 620, endFreq: 780, type: 'sine', duration: 0.045, gain: 0.12 });
    },
    tick(pitchBoost = 0) {
      tone({ freq: 520 + pitchBoost * 18, endFreq: 340, type: 'triangle', duration: 0.04, gain: 0.14 });
    },
    win(isHolo = false) {
      const notes = isHolo ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        tone({ freq: f, type: 'triangle', duration: 0.22, gain: 0.24, delay: i * 0.075 });
      });
    },
    sell() {
      tone({ freq: 880, endFreq: 1174.66, type: 'sine', duration: 0.09, gain: 0.18, delay: 0 });
      tone({ freq: 1174.66, endFreq: 1318.5, type: 'sine', duration: 0.12, gain: 0.18, delay: 0.07 });
    },
    packOpen() {
      [330, 440, 554.37, 659.25].forEach((f, i) => {
        tone({ freq: f, type: 'sawtooth', duration: 0.11, gain: 0.1, delay: i * 0.06 });
      });
    },
    upgradeSuccess() {
      [440, 554.37, 659.25, 880].forEach((f, i) => {
        tone({ freq: f, type: 'triangle', duration: 0.2, gain: 0.22, delay: i * 0.08 });
      });
    },
    upgradeFail() {
      tone({ freq: 260, endFreq: 130, type: 'sawtooth', duration: 0.28, gain: 0.2, delay: 0 });
    },
    trade() {
      tone({ freq: 587.33, type: 'triangle', duration: 0.12, gain: 0.2, delay: 0 });
      tone({ freq: 880, type: 'triangle', duration: 0.18, gain: 0.2, delay: 0.1 });
    }
  };
})();

function updateSoundUI() {
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.textContent = SoundFX.isMuted() ? '🔇' : '🔊';
  }
  const slider = document.getElementById('sound-volume-slider');
  const label = document.getElementById('sound-volume-label');
  const pct = Math.round(SoundFX.getVolume() * 100);
  if (slider) slider.value = String(pct);
  if (label) label.textContent = pct + '%';
}

function toggleSoundMute() {
  SoundFX.setMuted(!SoundFX.isMuted());
  updateSoundUI();
  if (!SoundFX.isMuted()) SoundFX.click();
}

function setSoundVolume(val) {
  SoundFX.setVolume(val);
  updateSoundUI();
  SoundFX.tick(4);
}

// === СОСТОЯНИЕ И СОХРАНЕНИЕ ===
const savedCloud = JSON.parse(localStorage.getItem('gd_cloud') || 'null');
const initialCloud = {
  binId: (savedCloud && savedCloud.binId) || SHARED_CLOUD_CONFIG.binId || '',
  apiKey: (savedCloud && savedCloud.apiKey) || SHARED_CLOUD_CONFIG.apiKey || ''
};

const hasSavedRarities = localStorage.getItem('gd_rarities') !== null;
const hasSavedCards = localStorage.getItem('gd_cards') !== null;
const hasSavedCases = localStorage.getItem('gd_cases') !== null;
const hasSavedCategories = localStorage.getItem('gd_case_categories') !== null;

let state = {
  nickname: localStorage.getItem('gd_nick') || 'Player_' + Math.floor(100 + Math.random() * 900),
  balance: Number(localStorage.getItem('gd_balance') ?? INITIAL_BALANCE),
  inventory: JSON.parse(localStorage.getItem('gd_inventory') || '[]'),
  stats: JSON.parse(localStorage.getItem('gd_stats') || '{"opened":0,"upgrades":0}'),
  rarities: hasSavedRarities ? JSON.parse(localStorage.getItem('gd_rarities')) : JSON.parse(JSON.stringify(DEFAULT_RARITIES)),
  cards: hasSavedCards ? JSON.parse(localStorage.getItem('gd_cards')) : JSON.parse(JSON.stringify(DEFAULT_CARDS)),
  cases: hasSavedCases ? JSON.parse(localStorage.getItem('gd_cases')) : JSON.parse(JSON.stringify(DEFAULT_CASES)),
  caseCategories: hasSavedCategories ? JSON.parse(localStorage.getItem('gd_case_categories')) : JSON.parse(JSON.stringify(DEFAULT_CASE_CATEGORIES)),
  cloud: initialCloud,
  holoMultiplier: Number(localStorage.getItem('gd_holo_mult') ?? 2.5),
  holoChance: Number(localStorage.getItem('gd_holo_chance') ?? 0.12)
};

if (!Number.isFinite(state.balance) || state.balance < 0) state.balance = INITIAL_BALANCE;
if (!Array.isArray(state.inventory)) state.inventory = [];
state.inventory = state.inventory.filter(item => item && typeof item.uid === 'string' && typeof item.cardId === 'string');

let currentCaseId = null;
let caseOpenCount = 1;
let isSpinning = false;
let isUpgrading = false;
let isOpeningPack = false;
let lastWonItems = [];
let editingCardId = null;
let editingCaseId = null;
let hasLocalCatalogEdits = localStorage.getItem('gd_dirty_catalog') === '1';
let cloudSyncInProgress = false;

let draggedRarityId = null;
let draggedCardId = null;
let draggedCategoryId = null;

let upgSelectedSourceUid = null;
let upgSelectedTargetId = null;
let upgSelectedTargetHolo = false;
let currentWheelAngle = 0;

let tradeMyOfferUids = [];
let tradeBotOffer = [];

let craftSelectedUids = [];

let rotX = 0;
let rotY = 0;
let isDragging3D = false;
let dragStartX = 0;
let dragStartY = 0;

let rarityMapCache = new Map();
let cardMapCache = new Map();

function rebuildLookupCaches() {
  rarityMapCache = new Map(state.rarities.map(r => [r.id, r]));
  cardMapCache = new Map(state.cards.map(c => [c.id, c]));
}

function normalizeCaseCategoriesAndCases() {
  if (!Array.isArray(state.caseCategories) || state.caseCategories.length === 0) {
    state.caseCategories = JSON.parse(JSON.stringify(DEFAULT_CASE_CATEGORIES));
  }
  const validCatIds = new Set(state.caseCategories.map(c => c.id));
  const fallbackCatId = state.caseCategories[0].id;

  if (!Array.isArray(state.cases)) state.cases = [];
  state.cases.forEach(c => {
    if (!c.categoryId || !validCatIds.has(c.categoryId)) {
      c.categoryId = fallbackCatId;
    }
  });
}

// === РАСЧЁТ ШАНСА АПГРЕЙДА (ПОДДЕРЖКА < 1%, МАКСИМУМ 85%) ===
function calculateUpgradeChance(srcPrice, tgtPrice) {
  const s = Number(srcPrice) || 0;
  const t = Number(tgtPrice) || 0;
  if (s <= 0 || t <= 0) return 0;
  const rawChance = (s / t) * 85;
  return Math.min(85, Math.max(0, rawChance));
}

function formatUpgradeChanceText(chance) {
  if (!Number.isFinite(chance) || chance <= 0) return '0%';
  if (chance < 0.0001) return chance.toFixed(6).replace(/0+$/, '').replace(/\.$/, '') + '%';
  if (chance < 0.01) return chance.toFixed(4).replace(/0+$/, '').replace(/\.$/, '') + '%';
  if (chance < 1) return chance.toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + '%';
  return chance.toFixed(2).replace(/\.00$/, '') + '%';
}

// === ИЕРАРХИЯ РЕДКОСТЕЙ И ОТДЕЛЬНЫЕ ШАНСЫ (КЕЙСЫ / ПАКИ) ===
function recalculateRarityHierarchy() {
  if (!Array.isArray(state.rarities) || state.rarities.length === 0) {
    state.rarities = JSON.parse(JSON.stringify(DEFAULT_RARITIES));
  }
  const total = state.rarities.length;
  state.rarities.forEach((r, idx) => {
    const caseW = sanitizeChanceInput(r.weight);
    const packW = r.packWeight !== undefined ? sanitizeChanceInput(r.packWeight) : caseW;
    r.weight = caseW;
    r.packWeight = packW;
    r.order = total - idx;
  });

  const caseSum = state.rarities.reduce((acc, r) => acc + sanitizeChanceInput(r.weight), 0);
  if (caseSum <= 0 && state.rarities.length > 0) {
    state.rarities[state.rarities.length - 1].weight = 100;
  }

  const packSum = state.rarities.reduce((acc, r) => acc + sanitizeChanceInput(r.packWeight), 0);
  if (packSum <= 0 && state.rarities.length > 0) {
    state.rarities[state.rarities.length - 1].packWeight = 100;
  }
  rebuildLookupCaches();
}

function getRarityChanceWeight(rarityId, mode = 'case') {
  const rar = getRarityObj(rarityId);
  if (!rar) return 0;
  if (mode === 'pack') {
    return sanitizeChanceInput(rar.packWeight !== undefined ? rar.packWeight : rar.weight);
  }
  return sanitizeChanceInput(rar.weight);
}

function isUpcomingCard(card) {
  if (!card) return false;
  const rar = getRarityObj(card.rarity);
  const rarId = String(card.rarity || '').toLowerCase();
  const rarName = String(rar?.name || '').toLowerCase();
  return Number(card.top || 0) <= 0 || rarId === 'upcoming' || rarName === 'upcoming';
}

// === ЛОГИКА ТОПОВ И UPCOMING-КАРТОЧЕК ===
function normalizeCardsAndRanks() {
  if (!Array.isArray(state.cards)) state.cards = [];

  const upcoming = [];
  const ranked = [];

  state.cards.forEach(c => {
    if (isUpcomingCard(c)) {
      c.top = 0;
      upcoming.push(c);
    } else {
      ranked.push(c);
    }
  });

  ranked.sort((a, b) => {
    const topA = Number(a.top) > 0 ? Number(a.top) : 999999;
    const topB = Number(b.top) > 0 ? Number(b.top) : 999999;
    return topA - topB;
  });

  ranked.forEach((c, idx) => {
    c.top = idx + 1;
  });

  state.cards = [...upcoming, ...ranked];
  rebuildLookupCaches();
}

// === АВТОНОРМАЛИЗАЦИЯ ШАНСОВ ===
function sanitizeChanceInput(rawVal) {
  const cleaned = String(rawVal ?? '').replace(',', '.').trim();
  let num = Number(cleaned);
  if (!Number.isFinite(num) || num < 0) return 0;
  if (num > 100) return 100;
  return num;
}

function formatChancePercent(weight, mode = 'case') {
  const total = state.rarities.reduce((acc, r) => {
    const w = mode === 'pack'
      ? sanitizeChanceInput(r.packWeight !== undefined ? r.packWeight : r.weight)
      : sanitizeChanceInput(r.weight);
    return acc + w;
  }, 0) || 1;
  const pct = (sanitizeChanceInput(weight) / total) * 100;
  if (pct === 0) return '0%';
  if (pct < 0.0001) return pct.toFixed(10).replace(/0+$/, '').replace(/\.$/, '') + '%';
  if (pct < 1) return pct.toFixed(4).replace(/0+$/, '').replace(/\.$/, '') + '%';
  return pct.toFixed(2).replace(/\.00$/, '') + '%';
}

recalculateRarityHierarchy();
normalizeCardsAndRanks();
normalizeCaseCategoriesAndCases();

function saveState(markCatalogDirty = false) {
  recalculateRarityHierarchy();
  normalizeCardsAndRanks();
  normalizeCaseCategoriesAndCases();
  if (markCatalogDirty) {
    hasLocalCatalogEdits = true;
    localStorage.setItem('gd_dirty_catalog', '1');
  }
  localStorage.setItem('gd_nick', state.nickname);
  localStorage.setItem('gd_balance', String(state.balance));
  localStorage.setItem('gd_inventory', JSON.stringify(state.inventory));
  localStorage.setItem('gd_stats', JSON.stringify(state.stats));
  localStorage.setItem('gd_rarities', JSON.stringify(state.rarities));
  localStorage.setItem('gd_cards', JSON.stringify(state.cards));
  localStorage.setItem('gd_cases', JSON.stringify(state.cases));
  localStorage.setItem('gd_case_categories', JSON.stringify(state.caseCategories));
  localStorage.setItem('gd_holo_mult', String(state.holoMultiplier));
  localStorage.setItem('gd_holo_chance', String(state.holoChance));
  updateTopBar();
  updateCloudSyncBadge();
}

function updateCloudSyncBadge() {
  const pushBtn = document.getElementById('push-cloud-catalog-btn');
  if (!pushBtn) return;
  pushBtn.textContent = hasLocalCatalogEdits ? '☁ Залить в облако (*)' : '☁ Залить всё в облако';
}

function updateTopBar() {
  document.getElementById('user-balance').textContent = Math.floor(state.balance);
  document.getElementById('nickname-input').value = state.nickname;
}

function saveNickname() {
  const val = document.getElementById('nickname-input').value.trim();
  if (val) {
    state.nickname = val;
    saveState(false);
  }
}

// === НАВИГАЦИЯ ПО ВКЛАДКАМ ===
function switchTab(tabName) {
  SoundFX.click();
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('tab-' + tabName).classList.add('active');
  document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');

  if (tabName === 'cases') renderCasesList();
  if (tabName === 'upgrade') renderUpgradeUI();
  if (tabName === 'trade') {
    if (document.getElementById('trade-arena').classList.contains('hidden')) {
      startBotTrade();
    } else {
      renderTradeUI();
    }
  }
  if (tabName === 'collection') renderCollection();
  if (tabName === 'craft') renderCraftUI();
  if (tabName === 'admin') renderAdminUI();
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ КАРТОЧЕК И СОРТИРОВКИ ===
function getRarityObj(rarityId) {
  return rarityMapCache.get(rarityId) || state.rarities[state.rarities.length - 1] || state.rarities[0];
}

function getCardById(cardId) {
  return cardMapCache.get(cardId);
}

function getCardPrice(card, isHolo) {
  if (!card) return 0;
  const mult = Number(state.holoMultiplier) > 0 ? Number(state.holoMultiplier) : 2.5;
  return Math.round(Number(card.price || 0) * (isHolo ? mult : 1));
}

function sortItems(items, sortMode) {
  return [...items].sort((a, b) => {
    const cardA = a.card || a;
    const cardB = b.card || b;
    const priceA = getCardPrice(cardA, a.isHolo || false);
    const priceB = getCardPrice(cardB, b.isHolo || false);
    const rarA = Number(getRarityObj(cardA.rarity)?.order || 0);
    const rarB = Number(getRarityObj(cardB.rarity)?.order || 0);

    if (sortMode === 'price-desc') return priceB - priceA;
    if (sortMode === 'price-asc') return priceA - priceB;
    if (sortMode === 'rarity-desc') return rarB - rarA || priceB - priceA;
    if (sortMode === 'rarity-asc') return rarA - rarB || priceA - priceB;
    if (sortMode === 'top-asc') {
      const upA = isUpcomingCard(cardA);
      const upB = isUpcomingCard(cardB);
      if (upA !== upB) return upA ? -1 : 1;
      return (Number(cardA.top) || 999999) - (Number(cardB.top) || 999999);
    }
    return 0;
  });
}

function createCardHTML(card, isHolo = false, extraClass = '', clickAttr = '', actionBtnHTML = '', wrapAttr = '') {
  const rar = getRarityObj(card.rarity);
  const price = getCardPrice(card, isHolo);
  const effectClass = rar.effect && rar.effect !== 'none' ? `effect-${rar.effect}` : '';
  const holoClass = isHolo ? 'is-holo' : '';
  const upcoming = isUpcomingCard(card);
  const rankHTML = upcoming
    ? '<span class="card-rank is-upcoming">UPCOMING</span>'
    : `<span class="card-rank">#${Number(card.top)}</span>`;

  const sweepLayer = rar.effect === 'shine-sweep' ? '<div class="shine-sweep-layer"></div>' : '';
  const sparkleLayer = rar.effect === 'sparkle'
    ? '<div class="sparkle-layer"><span class="spark-dot"></span><span class="spark-dot"></span><span class="spark-dot"></span><span class="spark-dot"></span></div>'
    : '';
  const holoLayer = isHolo ? '<div class="holo-full-overlay"></div>' : '';

  return `
    <div class="card-wrap" ${wrapAttr}>
      <div class="gd-card ${holoClass} ${effectClass} ${extraClass}"
           style="--rar-color: ${rar.color}; --rar-bg: ${rar.bg};"
           ${clickAttr}>
        ${holoLayer}
        ${sweepLayer}
        ${sparkleLayer}
        <div class="card-top-row">
          ${rankHTML}
          <span class="card-rarity-badge">${rar.name}</span>
        </div>
        <img class="card-thumb" loading="lazy" decoding="async" draggable="false" src="${card.img}" alt="${card.name}" onerror="this.src='https://placehold.co/320x180/181a20/ffffff?text=GD+LEVEL'">
        <div class="card-title">${card.name}</div>
        <div class="card-bottom-area">
          <span class="card-price">${price} ₽</span>
          ${isHolo ? '<span class="holo-pill">✦ HOLO</span>' : ''}
        </div>
      </div>
      ${actionBtnHTML}
    </div>
  `;
}

function giveCardToPlayer(card, isHolo) {
  const item = {
    uid: 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    cardId: card.id,
    isHolo: Boolean(isHolo)
  };
  state.inventory.push(item);
  saveState(false);
  return item;
}

// === ОБЛАКО ДЛЯ ВСЕХ ИГРОКОВ ===
function buildCloudHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (state.cloud.apiKey) {
    headers['X-Master-Key'] = state.cloud.apiKey;
  }
  return headers;
}

async function readCloudRecord() {
  if (!state.cloud.binId) return null;
  const headers = {};
  if (state.cloud.apiKey) headers['X-Master-Key'] = state.cloud.apiKey;
  const res = await fetch(`https://api.jsonbin.io/v3/b/${state.cloud.binId}/latest`, { headers });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json();
  return json.record && typeof json.record === 'object' ? json.record : {};
}

async function writeCloudRecord(recordObj) {
  if (!state.cloud.binId) return;
  const res = await fetch(`https://api.jsonbin.io/v3/b/${state.cloud.binId}`, {
    method: 'PUT',
    headers: buildCloudHeaders(),
    body: JSON.stringify(recordObj)
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
}

async function pushCatalogToCloud() {
  if (!state.cloud.binId) return;
  const btn = document.getElementById('push-cloud-catalog-btn');
  if (btn) btn.disabled = true;
  cloudSyncInProgress = true;

  try {
    recalculateRarityHierarchy();
    normalizeCardsAndRanks();
    normalizeCaseCategoriesAndCases();
    let currentRecord = {};
    try {
      currentRecord = (await readCloudRecord()) || {};
    } catch (_) {
      currentRecord = {};
    }

    currentRecord.catalog = {
      cards: state.cards,
      rarities: state.rarities,
      cases: state.cases,
      caseCategories: state.caseCategories,
      holoMultiplier: state.holoMultiplier,
      holoChance: state.holoChance,
      updatedAt: Date.now()
    };

    await writeCloudRecord(currentRecord);
    hasLocalCatalogEdits = false;
    localStorage.setItem('gd_dirty_catalog', '0');
    updateCloudSyncBadge();
    SoundFX.sell();
  } catch (e) {
    console.warn('Ошибка загрузки в облако:', e);
  } finally {
    cloudSyncInProgress = false;
    if (btn) btn.disabled = false;
  }
}

async function syncCatalogFromCloud(forceOverwriteLocal = false) {
  if (!state.cloud.binId || cloudSyncInProgress) return;
  if (hasLocalCatalogEdits && !forceOverwriteLocal) return;

  cloudSyncInProgress = true;
  try {
    const record = await readCloudRecord();
    if (!record) return;

    let changed = false;
    const cat = record.catalog;
    if (cat && typeof cat === 'object') {
      if (Array.isArray(cat.cards) && cat.cards.length > 0) {
        state.cards = cat.cards;
        changed = true;
      }
      if (Array.isArray(cat.rarities) && cat.rarities.length > 0) {
        state.rarities = cat.rarities;
        recalculateRarityHierarchy();
        changed = true;
      }
      if (Array.isArray(cat.caseCategories) && cat.caseCategories.length > 0) {
        state.caseCategories = cat.caseCategories;
        changed = true;
      }
      if (Array.isArray(cat.cases) && cat.cases.length > 0) {
        state.cases = cat.cases;
        changed = true;
      }
      if (typeof cat.holoMultiplier === 'number' && cat.holoMultiplier > 0) {
        state.holoMultiplier = cat.holoMultiplier;
        changed = true;
      }
      if (typeof cat.holoChance === 'number' && cat.holoChance >= 0 && cat.holoChance <= 1) {
        state.holoChance = cat.holoChance;
        changed = true;
      }
    }

    if (changed) {
      if (forceOverwriteLocal) {
        hasLocalCatalogEdits = false;
        localStorage.setItem('gd_dirty_catalog', '0');
      }
      saveState(false);
      renderCasesList();
      if (document.getElementById('tab-collection').classList.contains('active')) renderCollection();
      if (document.getElementById('tab-admin').classList.contains('active')) renderAdminUI();
      if (document.getElementById('tab-upgrade').classList.contains('active')) renderUpgradeUI();
      if (document.getElementById('tab-craft').classList.contains('active')) renderCraftUI();
      if (document.getElementById('tab-trade').classList.contains('active')) renderTradeUI();
    }
  } catch (e) {
    console.warn('Ошибка чтения из облака:', e);
  } finally {
    cloudSyncInProgress = false;
  }
}

// === КЕЙСЫ, КАТЕГОРИИ И МУЛЬТИ-РУЛЕТКА (МАКСИМУМ x3) ===
function renderCasesList() {
  normalizeCaseCategoriesAndCases();
  const sortMode = document.getElementById('cases-sort').value;
  const sortFn = (a, b) => sortMode === 'price-asc' ? a.price - b.price : b.price - a.price;

  const listEl = document.getElementById('cases-list');
  const sectionsHtml = state.caseCategories.map(cat => {
    const catCases = state.cases.filter(c => c.categoryId === cat.id).sort(sortFn);
    if (catCases.length === 0) return '';
    const cardsHtml = catCases.map(c => `
      <div class="case-item" onclick="openCaseView('${c.id}')">
        <img src="${c.img}" alt="${c.name}" onerror="this.src='https://placehold.co/320x180/181a20/ffffff?text=CASE'">
        <h3>${c.name}</h3>
        <div class="case-price-tag">${c.price} ₽</div>
      </div>
    `).join('');

    return `
      <div class="case-category-section">
        <div class="case-category-header">
          <h3 class="case-category-title">${cat.name}</h3>
        </div>
        <div class="cases-grid">${cardsHtml}</div>
      </div>
    `;
  }).join('');

  listEl.innerHTML = sectionsHtml || '<div class="hint-text">Кейсов пока нет</div>';
}

function setCaseOpenCount(count) {
  if (isSpinning) return;
  SoundFX.click();
  const clamped = Math.max(1, Math.min(MAX_CASE_OPEN_COUNT, Number(count) || 1));
  caseOpenCount = clamped;
  document.querySelectorAll('#case-count-selector .count-chip').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.count) === caseOpenCount);
  });
  updateCaseOpenCostLabel();
  const c = state.cases.find(x => x.id === currentCaseId);
  if (c) buildMultiRouletteTracks(c);
}

function updateCaseOpenCostLabel() {
  const c = state.cases.find(x => x.id === currentCaseId);
  if (!c) return;
  const countLabel = document.getElementById('active-case-count-label');
  const totalPriceEl = document.getElementById('active-case-total-price');
  if (countLabel) countLabel.textContent = `x${caseOpenCount}`;
  if (totalPriceEl) totalPriceEl.textContent = c.price * caseOpenCount;
}

function buildMultiRouletteTracks(caseObj, winners = null) {
  const container = document.getElementById('roulettes-multi-container');
  if (!container || !caseObj) return;

  const pool = caseObj.cardIds.map(getCardById).filter(Boolean);
  if (pool.length === 0) {
    container.innerHTML = '';
    return;
  }

  let tracksHtml = '';
  for (let row = 0; row < caseOpenCount; row++) {
    const winEntry = winners && winners[row] ? winners[row] : null;
    let cardsHtml = '';
    for (let i = 0; i < 45; i++) {
      if (i === 38 && winEntry) {
        cardsHtml += createCardHTML(winEntry.card, winEntry.isHolo);
      } else {
        const rndCard = pool[Math.floor(Math.random() * pool.length)];
        cardsHtml += createCardHTML(rndCard, Math.random() < state.holoChance);
      }
    }
    tracksHtml += `
      <div class="roulette-wrapper">
        <div class="roulette-pointer"></div>
        <div id="roulette-track-${row}" class="roulette-track">${cardsHtml}</div>
      </div>
    `;
  }

  container.innerHTML = tracksHtml;
  for (let row = 0; row < caseOpenCount; row++) {
    const track = document.getElementById(`roulette-track-${row}`);
    if (track) {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0px)';
    }
  }
}

function openCaseView(caseId) {
  SoundFX.click();
  currentCaseId = caseId;
  const c = state.cases.find(x => x.id === caseId);
  if (!c) {
    closeCaseView();
    return;
  }
  if (caseOpenCount > MAX_CASE_OPEN_COUNT) caseOpenCount = MAX_CASE_OPEN_COUNT;
  document.getElementById('cases-grid-view').classList.add('hidden');
  document.getElementById('case-open-view').classList.remove('hidden');
  document.getElementById('active-case-title').textContent = c.name;
  setCaseOpenCount(caseOpenCount);
  renderCaseContents();
}

function closeCaseView() {
  if (isSpinning) return;
  SoundFX.click();
  currentCaseId = null;
  document.getElementById('case-open-view').classList.add('hidden');
  document.getElementById('cases-grid-view').classList.remove('hidden');
}

function renderCaseContents() {
  const c = state.cases.find(x => x.id === currentCaseId);
  if (!c) return;
  const sortMode = document.getElementById('case-contents-sort').value;
  const caseCards = c.cardIds.map(getCardById).filter(Boolean);
  const sorted = sortItems(caseCards, sortMode);
  document.getElementById('case-contents-grid').innerHTML = sorted.map(card => createCardHTML(card, false)).join('');
}

function rollWeightedCard(poolCards, mode = 'case') {
  let totalWeight = 0;
  const weighted = poolCards.map(card => {
    const w = getRarityChanceWeight(card.rarity, mode);
    totalWeight += w;
    return { card, w };
  });
  if (totalWeight <= 0) return poolCards[Math.floor(Math.random() * poolCards.length)];
  let rnd = Math.random() * totalWeight;
  for (const item of weighted) {
    if (rnd < item.w) return item.card;
    rnd -= item.w;
  }
  return poolCards[poolCards.length - 1];
}

function getRouletteStepWidth() {
  const firstCard = document.querySelector('.roulette-track .card-wrap');
  const cardW = firstCard ? firstCard.getBoundingClientRect().width : 180;
  const gapW = window.innerWidth <= 768 ? 8 : 12;
  return { cardW, stepW: cardW + gapW };
}

function setCaseControlsDisabled(disabled) {
  document.getElementById('spin-case-btn').disabled = disabled;
  document.getElementById('fast-spin-btn').disabled = disabled;
  document.querySelectorAll('#case-count-selector .count-chip').forEach(btn => {
    btn.disabled = disabled;
  });
}

function playRouletteTicks(durationMs, fast) {
  const ticksCount = fast ? 10 : 28;
  for (let i = 0; i < ticksCount; i++) {
    const progress = i / ticksCount;
    const delay = durationMs * (1 - Math.pow(1 - progress, 1.85));
    setTimeout(() => {
      if (isSpinning) SoundFX.tick(Math.floor(progress * 6));
    }, delay);
  }
}

function spinCurrentCase(fast = false) {
  if (isSpinning) return;
  const c = state.cases.find(x => x.id === currentCaseId);
  if (!c) return;

  const count = Math.min(MAX_CASE_OPEN_COUNT, caseOpenCount);
  const totalCost = c.price * count;
  if (state.balance < totalCost) return;

  const pool = c.cardIds.map(getCardById).filter(Boolean);
  if (pool.length === 0) return;

  state.balance -= totalCost;
  state.stats.opened += count;
  saveState(false);

  const rolledWinners = [];
  for (let i = 0; i < count; i++) {
    rolledWinners.push({
      card: rollWeightedCard(pool, 'case'),
      isHolo: Math.random() < state.holoChance
    });
  }

  buildMultiRouletteTracks(c, rolledWinners);
  isSpinning = true;
  setCaseControlsDisabled(true);

  const { cardW, stepW } = getRouletteStepWidth();
  const durationSec = fast ? 0.85 : 4.2;
  playRouletteTicks(durationSec * 1000, fast);

  setTimeout(() => {
    for (let row = 0; row < count; row++) {
      const track = document.getElementById(`roulette-track-${row}`);
      if (!track) continue;
      const jitter = Math.random() * Math.min(36, cardW * 0.2) - Math.min(18, cardW * 0.1);
      const offset = 38 * stepW + jitter + cardW / 2;
      track.style.transition = `transform ${durationSec}s cubic-bezier(0.12, 0.88, 0.22, 1)`;
      track.style.transform = `translateX(-${offset}px)`;
    }
  }, 30);

  setTimeout(() => {
    isSpinning = false;
    setCaseControlsDisabled(false);
    const addedEntries = rolledWinners.map(w => {
      const added = giveCardToPlayer(w.card, w.isHolo);
      return { card: w.card, isHolo: w.isHolo, uid: added.uid };
    });
    SoundFX.win(addedEntries.some(e => e.isHolo));
    showWinModal(addedEntries);
  }, fast ? 950 : 4350);
}

// === ПАКИ ЗА 1000 РУБЛЕЙ ===
function buyPack() {
  if (isOpeningPack || state.balance < PACK_PRICE) return;
  isOpeningPack = true;
  SoundFX.packOpen();
  const buyBtn = document.getElementById('buy-pack-btn');
  if (buyBtn) buyBtn.disabled = true;

  state.balance -= PACK_PRICE;
  state.stats.opened += 1;
  saveState(false);

  const revealArea = document.getElementById('pack-reveal-area');
  revealArea.innerHTML = '';

  const pulledCards = [];
  for (let i = 0; i < 5; i++) {
    const card = rollWeightedCard(state.cards, 'pack');
    const isHolo = Math.random() < state.holoChance;
    giveCardToPlayer(card, isHolo);
    pulledCards.push({ card, isHolo });
  }

  pulledCards.forEach((entry, idx) => {
    setTimeout(() => {
      SoundFX.tick(idx + 2);
      const temp = document.createElement('div');
      temp.innerHTML = createCardHTML(entry.card, entry.isHolo);
      const wrap = temp.firstElementChild;
      if (wrap) {
        wrap.classList.add('pack-reveal-anim');
        revealArea.appendChild(wrap);
      }
      if (idx === pulledCards.length - 1) {
        SoundFX.win(pulledCards.some(p => p.isHolo));
        isOpeningPack = false;
        if (buyBtn) buyBtn.disabled = false;
      }
    }, idx * 140);
  });
}

// === АПГРЕЙДЫ ===
function renderUpgradeUI() {
  renderUpgradeMyInventory();
  renderUpgradeTargets();
  updateUpgradeSlotsAndChance();
}

function renderUpgradeMyInventory() {
  const invSort = document.getElementById('upg-inv-sort').value;
  const myMapped = state.inventory
    .map(item => ({ ...item, card: getCardById(item.cardId) }))
    .filter(x => x.card);

  const sortedMy = sortItems(myMapped, invSort);
  document.getElementById('upgrade-my-cards').innerHTML = sortedMy.map(item => {
    const sel = item.uid === upgSelectedSourceUid ? 'selected' : '';
    return createCardHTML(item.card, item.isHolo, sel, `data-upg-uid="${item.uid}" onclick="selectUpgradeSource('${item.uid}')"`);
  }).join('');
}

function renderUpgradeTargets() {
  const tSort = document.getElementById('upg-target-sort')?.value || 'price-asc';
  const searchQ = (document.getElementById('upg-target-search')?.value || '').trim().toLowerCase();
  const holoMode = document.getElementById('upg-target-holo-filter')?.value || 'all';

  const allTargets = [];
  for (let i = 0; i < state.cards.length; i++) {
    const card = state.cards[i];
    if (holoMode === 'all' || holoMode === 'normal') {
      allTargets.push({ card, isHolo: false });
    }
    if (holoMode === 'all' || holoMode === 'holo') {
      allTargets.push({ card, isHolo: true });
    }
  }

  let filtered = allTargets;
  if (searchQ) {
    const cleanNum = searchQ.replace(/^#/, '');
    filtered = allTargets.filter(t => {
      const nameMatch = String(t.card.name || '').toLowerCase().includes(searchQ);
      const rarMatch = String(getRarityObj(t.card.rarity)?.name || '').toLowerCase().includes(searchQ);
      const upcomingMatch = isUpcomingCard(t.card) && 'upcoming'.includes(searchQ);
      const topMatch = !isUpcomingCard(t.card) && cleanNum && String(t.card.top) === cleanNum;
      return nameMatch || rarMatch || upcomingMatch || topMatch;
    });
  }

  const sortedTargets = sortItems(filtered, tSort);
  const countEl = document.getElementById('upg-targets-count');
  if (countEl) countEl.textContent = sortedTargets.length;

  const gridEl = document.getElementById('upgrade-target-cards');
  if (sortedTargets.length === 0) {
    gridEl.innerHTML = '<div class="hint-text">Карточки по запросу не найдены</div>';
  } else {
    gridEl.innerHTML = sortedTargets.map(t => {
      const sel = (t.card.id === upgSelectedTargetId && t.isHolo === upgSelectedTargetHolo) ? 'selected' : '';
      return createCardHTML(
        t.card,
        t.isHolo,
        sel,
        `data-upg-target="${t.card.id}_${t.isHolo}" onclick="selectUpgradeTarget('${t.card.id}', ${t.isHolo})"`
      );
    }).join('');
  }
}

function selectUpgradeSource(uid) {
  if (isUpgrading) return;
  SoundFX.click();
  const prevUid = upgSelectedSourceUid;
  upgSelectedSourceUid = uid;

  if (prevUid) {
    document.querySelectorAll(`[data-upg-uid="${prevUid}"]`).forEach(el => el.classList.remove('selected'));
  }
  document.querySelectorAll(`[data-upg-uid="${uid}"]`).forEach(el => el.classList.add('selected'));

  updateUpgradeSlotsAndChance();
}

function selectUpgradeTarget(cardId, isHolo) {
  if (isUpgrading) return;
  SoundFX.click();
  const prevKey = upgSelectedTargetId ? `${upgSelectedTargetId}_${upgSelectedTargetHolo}` : null;
  upgSelectedTargetId = cardId;
  upgSelectedTargetHolo = isHolo;
  const nextKey = `${cardId}_${isHolo}`;

  if (prevKey) {
    document.querySelectorAll(`[data-upg-target="${prevKey}"]`).forEach(el => el.classList.remove('selected'));
  }
  document.querySelectorAll(`[data-upg-target="${nextKey}"]`).forEach(el => el.classList.add('selected'));

  updateUpgradeSlotsAndChance();
}

function updateUpgradeSlotsAndChance() {
  const srcSlot = document.getElementById('upgrade-source-slot');
  const tgtSlot = document.getElementById('upgrade-target-slot');
  const btn = document.getElementById('do-upgrade-btn');
  const chanceText = document.getElementById('upgrade-chance-text');
  const circle = document.getElementById('upgrade-circle');

  const srcItem = state.inventory.find(x => x.uid === upgSelectedSourceUid);
  const srcCard = srcItem ? getCardById(srcItem.cardId) : null;
  const tgtCard = upgSelectedTargetId ? getCardById(upgSelectedTargetId) : null;

  srcSlot.innerHTML = srcCard ? createCardHTML(srcCard, srcItem.isHolo) : 'Выбери карту снизу';
  tgtSlot.innerHTML = tgtCard ? createCardHTML(tgtCard, upgSelectedTargetHolo) : 'Выбери цель справа';

  if (srcCard && tgtCard) {
    const srcPrice = getCardPrice(srcCard, srcItem.isHolo);
    const tgtPrice = getCardPrice(tgtCard, upgSelectedTargetHolo);
    const chance = calculateUpgradeChance(srcPrice, tgtPrice);

    chanceText.textContent = formatUpgradeChanceText(chance);
    const deg = (chance / 100) * 360;
    circle.style.background = `conic-gradient(var(--accent-gold) 0deg ${deg}deg, #262934 ${deg}deg 360deg)`;
    btn.disabled = isUpgrading;
  } else {
    chanceText.textContent = '0.00%';
    circle.style.background = `conic-gradient(var(--accent-gold) 0deg, #262934 0deg)`;
    btn.disabled = true;
  }
}

function executeUpgrade() {
  if (isUpgrading) return;
  const srcIdx = state.inventory.findIndex(x => x.uid === upgSelectedSourceUid);
  if (srcIdx === -1) return;

  const srcItem = state.inventory[srcIdx];
  const srcCard = getCardById(srcItem.cardId);
  const tgtCard = getCardById(upgSelectedTargetId);
  if (!srcCard || !tgtCard) return;

  const srcPrice = getCardPrice(srcCard, srcItem.isHolo);
  const tgtPrice = getCardPrice(tgtCard, upgSelectedTargetHolo);
  const chance = calculateUpgradeChance(srcPrice, tgtPrice);

  const speedMode = document.getElementById('upgrade-speed-select')?.value || 'normal';
  const durationMs = speedMode === 'slow' ? 4500 : speedMode === 'fast' ? 800 : 2500;
  const extraSpins = speedMode === 'slow' ? 8 : speedMode === 'fast' ? 3 : 6;

  const roll = Math.random() * 100;
  const targetDeg = (roll / 100) * 360;
  const baseNormalized = ((currentWheelAngle % 360) + 360) % 360;
  const deltaToTarget = (targetDeg - baseNormalized + 360) % 360;
  currentWheelAngle += extraSpins * 360 + deltaToTarget;

  const rotor = document.getElementById('upgrade-arrow-rotor');
  rotor.style.transition = `transform ${durationMs}ms cubic-bezier(0.12, 0.88, 0.22, 1)`;
  rotor.style.transform = `rotate(${currentWheelAngle}deg)`;

  isUpgrading = true;
  playRouletteTicks(durationMs, speedMode === 'fast');
  document.getElementById('do-upgrade-btn').disabled = true;
  document.getElementById('upgrade-result-msg').innerHTML = '<span style="color:var(--text-muted);">Крутим...</span>';

  setTimeout(() => {
    isUpgrading = false;
    state.inventory.splice(srcIdx, 1);
    upgSelectedSourceUid = null;

    const msg = document.getElementById('upgrade-result-msg');
    if (chance > 0 && roll < chance) {
      SoundFX.upgradeSuccess();
      state.stats.upgrades += 1;
      giveCardToPlayer(tgtCard, upgSelectedTargetHolo);
      msg.innerHTML = `<span style="color:#4ade80; font-weight:800;">УСПЕХ! Выпал ${tgtCard.name}</span>`;
    } else {
      SoundFX.upgradeFail();
      msg.innerHTML = `<span style="color:#f87171; font-weight:800;">НЕУДАЧА! Карточка сгорела</span>`;
    }
    saveState(false);
    renderUpgradeUI();
  }, durationMs + 80);
}

// === ТРЕЙД С БОТОМ ===
function startBotTrade() {
  SoundFX.click();
  tradeMyOfferUids = [];
  tradeBotOffer = [];
  document.getElementById('trade-arena').classList.remove('hidden');
  renderTradeUI();
}

function toggleTradeCard(uid) {
  SoundFX.click();
  const idx = tradeMyOfferUids.indexOf(uid);
  if (idx > -1) tradeMyOfferUids.splice(idx, 1);
  else tradeMyOfferUids.push(uid);

  recalculateBotOffer();
  renderTradeUI();
}

function recalculateBotOffer() {
  let mySum = 0;
  tradeMyOfferUids.forEach(uid => {
    const item = state.inventory.find(x => x.uid === uid);
    if (!item) return;
    const card = getCardById(item.cardId);
    if (!card) return;
    mySum += getCardPrice(card, item.isHolo);
  });

  let targetBotBudget = Math.floor(mySum * (0.90 + Math.random() * 0.10));
  tradeBotOffer = [];

  if (targetBotBudget > 0 && state.cards.length > 0) {
    const sortedCatalog = [...state.cards].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    for (let guard = 0; guard < 12 && targetBotBudget >= 10; guard++) {
      const affordable = sortedCatalog.filter(c => getCardPrice(c, false) <= targetBotBudget);
      if (affordable.length === 0) break;
      const pick = affordable[Math.floor(Math.random() * Math.min(3, affordable.length))];
      const canHolo = getCardPrice(pick, true) <= targetBotBudget && Math.random() < 0.25;
      tradeBotOffer.push({ card: pick, isHolo: canHolo });
      targetBotBudget -= getCardPrice(pick, canHolo);
    }
  }
}

function renderTradeUI() {
  tradeMyOfferUids = tradeMyOfferUids.filter(uid => {
    const item = state.inventory.find(x => x.uid === uid);
    return item && getCardById(item.cardId);
  });

  let mySum = 0;
  const offerHtml = tradeMyOfferUids.map(uid => {
    const item = state.inventory.find(x => x.uid === uid);
    const card = item ? getCardById(item.cardId) : null;
    if (!item || !card) return '';
    mySum += getCardPrice(card, item.isHolo);
    return createCardHTML(card, item.isHolo, '', `onclick="toggleTradeCard('${uid}')"`);
  }).join('');

  let botSum = 0;
  const botHtml = tradeBotOffer.filter(b => b && b.card).map(b => {
    botSum += getCardPrice(b.card, b.isHolo);
    return createCardHTML(b.card, b.isHolo);
  }).join('');

  document.getElementById('my-trade-sum').textContent = mySum;
  document.getElementById('bot-trade-sum').textContent = botSum;
  document.getElementById('my-trade-offer').innerHTML = offerHtml || '<div class="hint-text">Пока ничего не выбрано</div>';
  document.getElementById('bot-trade-offer').innerHTML = botHtml || '<div class="hint-text">Выбери свои карты слева</div>';

  const availInv = state.inventory
    .map(item => ({ ...item, card: getCardById(item.cardId) }))
    .filter(x => x.card && !tradeMyOfferUids.includes(x.uid));

  const countEl = document.getElementById('trade-inv-count');
  if (countEl) countEl.textContent = availInv.length;

  const invEl = document.getElementById('trade-my-inv');
  if (availInv.length === 0) {
    invEl.innerHTML = '<div class="hint-text">В инвентаре нет карт для обмена. Открой кейс или пак!</div>';
  } else {
    invEl.innerHTML = availInv.map(item =>
      createCardHTML(item.card, item.isHolo, '', `onclick="toggleTradeCard('${item.uid}')"`)
    ).join('');
  }

  document.getElementById('confirm-trade-btn').disabled = !(mySum > 0 && tradeBotOffer.length > 0);
}

function confirmTrade() {
  SoundFX.trade();
  state.inventory = state.inventory.filter(x => !tradeMyOfferUids.includes(x.uid));
  tradeBotOffer.forEach(b => {
    if (b && b.card) giveCardToPlayer(b.card, b.isHolo);
  });
  tradeMyOfferUids = [];
  tradeBotOffer = [];
  saveState(false);
  renderTradeUI();
}

// === КРАФТЫ (10 -> 1) ===
function renderCraftUI() {
  const sortMode = document.getElementById('craft-sort').value;
  const mapped = state.inventory
    .map(item => ({ ...item, card: getCardById(item.cardId) }))
    .filter(x => x.card);

  const sorted = sortItems(mapped, sortMode);
  document.getElementById('craft-inv-grid').innerHTML = sorted.map(item => {
    const isSel = craftSelectedUids.includes(item.uid);
    return createCardHTML(item.card, item.isHolo, isSel ? 'selected' : '', `onclick="toggleCraftCard('${item.uid}')"`);
  }).join('');

  const slotsEl = document.getElementById('craft-selected-slots');
  let slotsHtml = '';
  let sumPrice = 0;

  for (let i = 0; i < 10; i++) {
    const uid = craftSelectedUids[i];
    if (uid) {
      const item = state.inventory.find(x => x.uid === uid);
      const card = getCardById(item.cardId);
      sumPrice += getCardPrice(card, item.isHolo);
      slotsHtml += `<div class="craft-mini-slot" onclick="toggleCraftCard('${uid}')"><img src="${card.img}" style="width:100%;height:100%;object-fit:cover;"></div>`;
    } else {
      slotsHtml += `<div class="craft-mini-slot">${i + 1}</div>`;
    }
  }
  slotsEl.innerHTML = slotsHtml;
  document.getElementById('craft-count').textContent = craftSelectedUids.length;
  document.getElementById('craft-avg-price').textContent = craftSelectedUids.length ? Math.round(sumPrice / craftSelectedUids.length) : 0;
  document.getElementById('do-craft-btn').disabled = craftSelectedUids.length !== 10;
}

function toggleCraftCard(uid) {
  SoundFX.click();
  const idx = craftSelectedUids.indexOf(uid);
  if (idx > -1) {
    craftSelectedUids.splice(idx, 1);
  } else {
    if (craftSelectedUids.length >= 10) return;
    const newItem = state.inventory.find(x => x.uid === uid);
    const newCard = getCardById(newItem.cardId);

    if (craftSelectedUids.length > 0) {
      const firstItem = state.inventory.find(x => x.uid === craftSelectedUids[0]);
      const firstCard = getCardById(firstItem.cardId);
      if (firstCard.rarity !== newCard.rarity) return;
    }
    craftSelectedUids.push(uid);
  }
  renderCraftUI();
}

function executeCraft() {
  if (craftSelectedUids.length !== 10) return;

  let totalValue = 0;
  let baseRarityId = null;

  craftSelectedUids.forEach(uid => {
    const item = state.inventory.find(x => x.uid === uid);
    const card = getCardById(item.cardId);
    baseRarityId = card.rarity;
    totalValue += getCardPrice(card, item.isHolo);
  });

  const avgInputPrice = totalValue / 10;
  const currentRar = getRarityObj(baseRarityId);
  const nextRar = [...state.rarities].sort((a, b) => a.order - b.order).find(r => r.order > currentRar.order) || currentRar;

  const candidates = state.cards.filter(c => c.rarity === nextRar.id);
  const pool = candidates.length > 0 ? candidates : state.cards;

  const sortedPool = [...pool].sort((a, b) => a.price - b.price);
  const minInput = Math.min(...state.cards.filter(c => c.rarity === baseRarityId).map(c => c.price));
  const maxInput = Math.max(...state.cards.filter(c => c.rarity === baseRarityId).map(c => getCardPrice(c, true)));
  const ratio = maxInput > minInput ? Math.min(1, Math.max(0, (avgInputPrice - minInput) / (maxInput - minInput))) : 0.5;

  const targetIndex = Math.min(sortedPool.length - 1, Math.floor(ratio * sortedPool.length));
  const craftedCard = sortedPool[targetIndex];
  const isHolo = Math.random() < state.holoChance;

  state.inventory = state.inventory.filter(x => !craftSelectedUids.includes(x.uid));
  craftSelectedUids = [];

  const added = giveCardToPlayer(craftedCard, isHolo);
  SoundFX.win(isHolo);
  showWinModal([{ card: craftedCard, isHolo, uid: added.uid }]);
  renderCraftUI();
}

// === КОЛЛЕКЦИЯ, ПРОДАЖА, СТАТИСТИКА И 3D-ПРОСМОТР ===
function renderSellRarityOptions() {
  const sel = document.getElementById('sell-rarity-select');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = state.rarities.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
  if (prev && state.rarities.some(r => r.id === prev)) {
    sel.value = prev;
  }
}

function renderCollection() {
  renderSellRarityOptions();
  const sortMode = document.getElementById('col-sort').value;
  const mapped = state.inventory
    .map(item => ({ ...item, card: getCardById(item.cardId) }))
    .filter(x => x.card);

  const totalValue = mapped.reduce((acc, x) => acc + getCardPrice(x.card, x.isHolo), 0);
  document.getElementById('stat-total-cards').textContent = mapped.length;
  document.getElementById('stat-inv-value').textContent = totalValue + ' ₽';
  document.getElementById('stat-opened').textContent = state.stats.opened;
  document.getElementById('stat-upgrades').textContent = state.stats.upgrades;

  const sorted = sortItems(mapped, sortMode);
  document.getElementById('collection-grid').innerHTML = sorted.map(item => {
    const price = getCardPrice(item.card, item.isHolo);
    const sellBtn = `<button class="secondary-btn" style="width:100%; margin-top:6px; padding:6px 8px; font-size:11px;" onclick="event.stopPropagation(); sellInventoryCard('${item.uid}')">Продать за ${price} ₽</button>`;
    return createCardHTML(item.card, item.isHolo, '', `onclick="openCard3DModal('${item.card.id}', ${item.isHolo})"`, sellBtn);
  }).join('');
}

function sellBySelectedRarity() {
  const rarityId = document.getElementById('sell-rarity-select')?.value;
  if (!rarityId) return;

  let earned = 0;
  state.inventory = state.inventory.filter(item => {
    const card = getCardById(item.cardId);
    if (card && card.rarity === rarityId) {
      earned += getCardPrice(card, item.isHolo);
      return false;
    }
    return true;
  });

  if (earned > 0) {
    SoundFX.sell();
    state.balance += earned;
    saveState(false);
    renderCollection();
  }
}

function sellAllInventoryCards() {
  if (state.inventory.length === 0) return;

  let earned = 0;
  state.inventory.forEach(item => {
    const card = getCardById(item.cardId);
    if (card) {
      earned += getCardPrice(card, item.isHolo);
    }
  });

  if (earned > 0) SoundFX.sell();
  state.inventory = [];
  state.balance += earned;
  saveState(false);
  renderCollection();
}

function getCardDropChancePercentText(card, isHolo) {
  const sameRarityCount = Math.max(1, state.cards.filter(c => c.rarity === card.rarity).length);
  const totalW = state.rarities.reduce((sum, r) => sum + getRarityChanceWeight(r.id, 'case'), 0) || 1;
  const rarShare = getRarityChanceWeight(card.rarity, 'case') / totalW;
  const holoShare = isHolo ? state.holoChance : (1 - state.holoChance);
  const exactPct = (rarShare / sameRarityCount) * holoShare * 100;

  if (exactPct === 0) return '0%';
  if (exactPct < 0.0001) return exactPct.toFixed(10).replace(/0+$/, '').replace(/\.$/, '') + '%';
  if (exactPct < 1) return exactPct.toFixed(4).replace(/0+$/, '').replace(/\.$/, '') + '%';
  return exactPct.toFixed(2).replace(/\.00$/, '') + '%';
}

function openCard3DModal(cardId, isHolo) {
  const card = getCardById(cardId);
  if (!card) return;
  SoundFX.click();
  const rar = getRarityObj(card.rarity);

  isDragging3D = false;
  document.getElementById('card-3d-front').innerHTML = createCardHTML(card, isHolo);
  document.getElementById('card-3d-info').innerHTML = `
    <div><span>Название:</span><b>${card.name}</b></div>
    <div><span>Позиция в топе:</span><b>${isUpcomingCard(card) ? 'UPCOMING' : '#' + card.top}</b></div>
    <div><span>Редкость:</span><b style="color:${rar.color}">${rar.name}</b></div>
    <div><span>Тип:</span><b>${isHolo ? '✦ HOLO' : 'Обычная'}</b></div>
    <div><span>Шанс выпадения:</span><b>${getCardDropChancePercentText(card, isHolo)}</b></div>
    <div><span>Цена:</span><b style="color:var(--accent-green)">${getCardPrice(card, isHolo)} ₽</b></div>
  `;

  reset3DRotation();
  document.getElementById('card-3d-modal').classList.remove('hidden');
}

function closeCard3DModal(e) {
  if (e && e.target !== document.getElementById('card-3d-modal')) return;
  isDragging3D = false;
  document.getElementById('card-3d-modal').classList.add('hidden');
}

function reset3DRotation() {
  rotX = 0;
  rotY = 0;
  apply3DRotation();
}

function apply3DRotation() {
  const flipper = document.getElementById('card-3d-flipper');
  if (flipper) {
    flipper.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }
}

(function init3DStageEvents() {
  const stage = document.getElementById('stage-3d');
  if (!stage) return;

  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDragging3D = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    try { stage.setPointerCapture(e.pointerId); } catch (_) {}
  });

  stage.addEventListener('pointermove', (e) => {
    if (!isDragging3D) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    rotY += dx * 0.7;
    rotX = Math.max(-55, Math.min(55, rotX - dy * 0.6));
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    apply3DRotation();
  });

  const stopDragging = (e) => {
    if (!isDragging3D) return;
    isDragging3D = false;
    try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
  };

  stage.addEventListener('pointerup', stopDragging);
  stage.addEventListener('pointercancel', stopDragging);
})();

function sellInventoryCard(uid) {
  const idx = state.inventory.findIndex(x => x.uid === uid);
  if (idx === -1) return;
  const item = state.inventory[idx];
  const card = getCardById(item.cardId);
  if (card) {
    SoundFX.sell();
    state.balance += getCardPrice(card, item.isHolo);
  }
  state.inventory.splice(idx, 1);
  saveState(false);
  renderCollection();
}

function sellAllDuplicates() {
  const seen = new Set();
  let earned = 0;
  state.inventory = state.inventory.filter(item => {
    const key = item.cardId + '_' + item.isHolo;
    if (seen.has(key)) {
      const card = getCardById(item.cardId);
      if (card) earned += getCardPrice(card, item.isHolo);
      return false;
    }
    seen.add(key);
    return true;
  });
  if (earned > 0) SoundFX.sell();
  state.balance += earned;
  saveState(false);
  renderCollection();
}

// === АДМИН-ПАНЕЛЬ ===
function checkAdminPass() {
  const pass = document.getElementById('admin-pass-input').value;
  if (pass === '12356790') {
    SoundFX.click();
    document.getElementById('admin-login-box').classList.add('hidden');
    document.getElementById('admin-panel-content').classList.remove('hidden');
    renderAdminUI();
  }
}

function saveCloudConfig() {
  SoundFX.click();
  state.cloud.binId = document.getElementById('cfg-bin-id').value.trim();
  state.cloud.apiKey = document.getElementById('cfg-api-key').value.trim();
  localStorage.setItem('gd_cloud', JSON.stringify(state.cloud));
  if (!hasLocalCatalogEdits) {
    syncCatalogFromCloud(false);
  }
}

function adminAddCaseCategory() {
  const input = document.getElementById('new-case-cat-name');
  const name = (input?.value || '').trim();
  if (!name) return;

  const id = 'cat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5);
  state.caseCategories.push({ id, name });
  input.value = '';
  SoundFX.click();
  saveState(true);
  renderAdminUI();
  renderCasesList();
}

function moveCaseCategory(catId, direction) {
  const idx = state.caseCategories.findIndex(c => c.id === catId);
  if (idx === -1) return;
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= state.caseCategories.length) return;

  const [moved] = state.caseCategories.splice(idx, 1);
  state.caseCategories.splice(targetIdx, 0, moved);
  SoundFX.click();
  saveState(true);
  renderAdminUI();
  renderCasesList();
}

function handleCategoryDrop(targetCatId) {
  if (!draggedCategoryId || draggedCategoryId === targetCatId) return;
  const fromIdx = state.caseCategories.findIndex(c => c.id === draggedCategoryId);
  const toIdx = state.caseCategories.findIndex(c => c.id === targetCatId);
  draggedCategoryId = null;
  if (fromIdx === -1 || toIdx === -1) return;

  const [moved] = state.caseCategories.splice(fromIdx, 1);
  state.caseCategories.splice(toIdx, 0, moved);
  SoundFX.click();
  saveState(true);
  renderAdminUI();
  renderCasesList();
}

function adminDeleteCaseCategory(catId) {
  if (state.caseCategories.length <= 1) return;
  const idx = state.caseCategories.findIndex(c => c.id === catId);
  if (idx === -1) return;

  const fallbackCat = state.caseCategories[idx === 0 ? 1 : idx - 1];
  state.cases.forEach(c => {
    if (c.categoryId === catId) c.categoryId = fallbackCat.id;
  });
  state.caseCategories.splice(idx, 1);
  SoundFX.click();
  saveState(true);
  renderAdminUI();
  renderCasesList();
}

function renderAdminCaseCategories() {
  const listEl = document.getElementById('admin-case-categories-list');
  if (!listEl) return;

  listEl.innerHTML = state.caseCategories.map((cat, idx) => {
    const count = state.cases.filter(c => c.categoryId === cat.id).length;
    return `
      <div class="admin-cat-row"
           draggable="true"
           ondragstart="draggedCategoryId='${cat.id}'; this.style.opacity='0.5';"
           ondragend="this.style.opacity='1'; draggedCategoryId=null; document.querySelectorAll('.admin-cat-row').forEach(el=>el.classList.remove('drag-over'));"
           ondragover="event.preventDefault(); this.classList.add('drag-over');"
           ondragleave="this.classList.remove('drag-over');"
           ondrop="event.preventDefault(); this.classList.remove('drag-over'); handleCategoryDrop('${cat.id}');">
        <div>
          <span class="admin-cat-title">#${idx + 1} ${cat.name}</span>
          <span class="admin-cat-meta">(${count} кейсов)</span>
        </div>
        <div class="admin-cat-actions">
          <button class="secondary-btn" style="padding:5px 9px;font-size:12px;" ${idx === 0 ? 'disabled' : ''} onclick="moveCaseCategory('${cat.id}', -1)" title="Выше">▲</button>
          <button class="secondary-btn" style="padding:5px 9px;font-size:12px;" ${idx === state.caseCategories.length - 1 ? 'disabled' : ''} onclick="moveCaseCategory('${cat.id}', 1)" title="Ниже">▼</button>
          <button class="secondary-btn" style="padding:5px 9px;font-size:12px;color:#f87171;" ${state.caseCategories.length <= 1 ? 'disabled' : ''} onclick="adminDeleteCaseCategory('${cat.id}')">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

function handleRarityDrop(targetId) {
  if (!draggedRarityId || draggedRarityId === targetId) return;
  const fromIdx = state.rarities.findIndex(r => r.id === draggedRarityId);
  const toIdx = state.rarities.findIndex(r => r.id === targetId);
  if (fromIdx === -1 || toIdx === -1) return;

  const [moved] = state.rarities.splice(fromIdx, 1);
  state.rarities.splice(toIdx, 0, moved);
  draggedRarityId = null;

  saveState(true);
  renderAdminUI();
}

function handleCardDragDrop(targetCardId) {
  if (!draggedCardId || draggedCardId === targetCardId) return;
  const fromIdx = state.cards.findIndex(c => c.id === draggedCardId);
  const toIdx = state.cards.findIndex(c => c.id === targetCardId);
  if (fromIdx === -1 || toIdx === -1) return;

  const movedCard = state.cards[fromIdx];
  const targetCard = state.cards[toIdx];

  if (isUpcomingCard(movedCard)) {
    const [removed] = state.cards.splice(fromIdx, 1);
    removed.top = 0;
    const newToIdx = state.cards.findIndex(c => c.id === targetCardId);
    state.cards.splice(newToIdx >= 0 ? newToIdx : 0, 0, removed);
  } else {
    const [removed] = state.cards.splice(fromIdx, 1);
    if (!isUpcomingCard(targetCard)) {
      const insertAt = state.cards.findIndex(c => c.id === targetCardId);
      removed.top = Number(targetCard.top) || 1;
      state.cards.splice(insertAt >= 0 ? insertAt : state.cards.length, 0, removed);
    } else {
      const firstRankedIdx = state.cards.findIndex(c => !isUpcomingCard(c));
      removed.top = 1;
      if (firstRankedIdx >= 0) {
        state.cards.splice(firstRankedIdx, 0, removed);
      } else {
        state.cards.push(removed);
      }
    }
  }

  draggedCardId = null;
  saveState(true);
  renderAdminUI();
}

function updateCasePreview() {
  const previewBox = document.getElementById('case-creator-preview');
  if (!previewBox) return;

  const name = document.getElementById('new-case-name')?.value.trim() || 'Новый кейс';
  const price = Math.max(0, Number(document.getElementById('new-case-price')?.value) || 500);
  const img = document.getElementById('new-case-img')?.value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=CASE';
  const catId = document.getElementById('new-case-category')?.value || state.caseCategories[0]?.id;
  const catName = state.caseCategories.find(c => c.id === catId)?.name || '';
  const selectedCount = document.querySelectorAll('.case-card-cb:checked').length;

  previewBox.innerHTML = `
    <div class="case-item" style="width:100%;cursor:default;transform:none;">
      <img src="${img}" alt="${name}" onerror="this.src='https://placehold.co/320x180/181a20/ffffff?text=CASE'">
      <h3>${name}</h3>
      <div class="admin-case-meta">${catName} • Карточек: ${selectedCount}</div>
      <div class="case-price-tag">${price} ₽</div>
    </div>
  `;
}

function openEditCasePanel(caseId) {
  const caseObj = state.cases.find(c => c.id === caseId);
  if (!caseObj) return;

  SoundFX.click();
  editingCaseId = caseObj.id;
  document.getElementById('admin-edit-case-panel').classList.remove('hidden');
  document.getElementById('edit-case-heading').textContent = caseObj.name;
  document.getElementById('edit-case-name').value = caseObj.name ?? '';
  document.getElementById('edit-case-price').value = caseObj.price ?? 500;
  document.getElementById('edit-case-img').value = caseObj.img ?? '';

  const editCatSel = document.getElementById('edit-case-category');
  if (editCatSel) {
    editCatSel.innerHTML = state.caseCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    editCatSel.value = caseObj.categoryId || state.caseCategories[0].id;
  }

  const currentSet = new Set(Array.isArray(caseObj.cardIds) ? caseObj.cardIds : []);
  document.getElementById('admin-edit-case-cards-selector').innerHTML = state.cards.map(c => `
    <label style="display:flex;align-items:center;gap:6px;font-size:12px;">
      <input type="checkbox" class="edit-case-card-cb" value="${c.id}" ${currentSet.has(c.id) ? 'checked' : ''}> ${isUpcomingCard(c) ? '[UPCOMING]' : '#' + c.top} ${c.name}
    </label>
  `).join('');

  renderAdminCasesList();
  updateEditCasePreview();
  document.getElementById('admin-edit-case-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function cancelEditCase() {
  editingCaseId = null;
  document.getElementById('admin-edit-case-panel').classList.add('hidden');
  renderAdminCasesList();
}

function updateEditCasePreview() {
  const previewBox = document.getElementById('edit-case-preview');
  if (!previewBox || !editingCaseId) return;

  const name = document.getElementById('edit-case-name')?.value.trim() || 'Кейс';
  const price = Math.max(0, Number(document.getElementById('edit-case-price')?.value) || 500);
  const img = document.getElementById('edit-case-img')?.value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=CASE';
  const catId = document.getElementById('edit-case-category')?.value || state.caseCategories[0]?.id;
  const catName = state.caseCategories.find(c => c.id === catId)?.name || '';
  const selectedCount = document.querySelectorAll('.edit-case-card-cb:checked').length;

  previewBox.innerHTML = `
    <div class="case-item" style="width:100%;cursor:default;transform:none;">
      <img src="${img}" alt="${name}" onerror="this.src='https://placehold.co/320x180/181a20/ffffff?text=CASE'">
      <h3>${name}</h3>
      <div class="admin-case-meta">${catName} • Карточек: ${selectedCount}</div>
      <div class="case-price-tag">${price} ₽</div>
    </div>
  `;
}

function saveEditedCase() {
  if (!editingCaseId) return;
  const idx = state.cases.findIndex(c => c.id === editingCaseId);
  if (idx === -1) return;

  const name = document.getElementById('edit-case-name').value.trim();
  const price = Math.max(0, Number(document.getElementById('edit-case-price').value) || 500);
  const img = document.getElementById('edit-case-img').value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=CASE';
  const categoryId = document.getElementById('edit-case-category')?.value || state.cases[idx].categoryId || state.caseCategories[0].id;
  const selectedIds = Array.from(document.querySelectorAll('.edit-case-card-cb:checked')).map(cb => cb.value);

  if (!name || selectedIds.length === 0) return;

  state.cases[idx] = {
    ...state.cases[idx],
    name,
    price,
    img,
    categoryId,
    cardIds: selectedIds
  };

  SoundFX.click();
  saveState(true);
  document.getElementById('edit-case-heading').textContent = name;
  renderAdminCasesList();
  renderAdminCaseCategories();
  renderCasesList();
  if (currentCaseId === editingCaseId) {
    openCaseView(editingCaseId);
  }
}

function deleteEditingCase() {
  if (!editingCaseId) return;
  const idToDelete = editingCaseId;
  editingCaseId = null;
  document.getElementById('admin-edit-case-panel').classList.add('hidden');
  adminDeleteCase(idToDelete);
}

function renderAdminCasesList() {
  const listEl = document.getElementById('admin-cases-list');
  const countEl = document.getElementById('admin-cases-count');
  if (!listEl) return;
  if (countEl) countEl.textContent = state.cases.length;

  if (state.cases.length === 0) {
    listEl.innerHTML = '<div class="hint-text">Кейсов пока нет</div>';
    return;
  }

  listEl.innerHTML = state.cases.map(c => {
    const isEditing = c.id === editingCaseId ? 'editing-target' : '';
    const catName = state.caseCategories.find(cat => cat.id === c.categoryId)?.name || '';
    return `
      <div class="admin-case-card ${isEditing}">
        <img src="${c.img}" alt="${c.name}" onerror="this.src='https://placehold.co/320x180/181a20/ffffff?text=CASE'">
        <b>${c.name}</b>
        <div class="admin-case-meta">${catName} • ${c.price} ₽ • ${Array.isArray(c.cardIds) ? c.cardIds.length : 0} карт</div>
        <div class="admin-case-btns">
          <button class="secondary-btn" style="padding:6px 10px;font-size:12px;" onclick="openEditCasePanel('${c.id}')">Изменить</button>
          <button class="secondary-btn" style="color:#f87171;padding:6px 10px;font-size:12px;" onclick="adminDeleteCase('${c.id}')">Удалить</button>
        </div>
      </div>
    `;
  }).join('');
}

function adminDeleteCase(caseId) {
  SoundFX.click();
  state.cases = state.cases.filter(c => c.id !== caseId);
  if (editingCaseId === caseId) {
    editingCaseId = null;
    document.getElementById('admin-edit-case-panel').classList.add('hidden');
  }
  if (currentCaseId === caseId) {
    isSpinning = false;
    closeCaseView();
  }
  saveState(true);
  renderCasesList();
  renderAdminCasesList();
  renderAdminCaseCategories();
}

function renderAdminUI() {
  recalculateRarityHierarchy();
  normalizeCardsAndRanks();
  normalizeCaseCategoriesAndCases();
  updateCloudSyncBadge();
  updateSoundUI();
  document.getElementById('cfg-bin-id').value = state.cloud.binId || '';
  document.getElementById('cfg-api-key').value = state.cloud.apiKey || '';

  renderAdminCaseCategories();

  const catOptionsHTML = state.caseCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
  const newCatSel = document.getElementById('new-case-category');
  if (newCatSel) {
    const prevCat = newCatSel.value;
    newCatSel.innerHTML = catOptionsHTML;
    if (prevCat && state.caseCategories.some(c => c.id === prevCat)) newCatSel.value = prevCat;
  }

  const totalRars = state.rarities.length;
  document.getElementById('admin-rarities-list').innerHTML = state.rarities.map((r, idx) => {
    const casePctText = formatChancePercent(r.weight, 'case');
    const packPctText = formatChancePercent(r.packWeight ?? r.weight, 'pack');
    const tierLabel = idx === 0 ? 'МАКС' : (idx === totalRars - 1 ? 'НИЗ' : `#${idx + 1}`);
    return `
      <div class="rar-manage-card"
           draggable="true"
           ondragstart="draggedRarityId='${r.id}'; this.style.opacity='0.5';"
           ondragend="this.style.opacity='1'; draggedRarityId=null; document.querySelectorAll('.rar-manage-card').forEach(el=>el.classList.remove('drag-over'));"
           ondragover="event.preventDefault(); this.classList.add('drag-over');"
           ondragleave="this.classList.remove('drag-over');"
           ondrop="event.preventDefault(); this.classList.remove('drag-over'); handleRarityDrop('${r.id}');"
           style="--rar-color:${r.color}; --rar-bg:${r.bg};">
        <div class="rar-manage-top">
          <div>
            <span class="rar-rank-pill">${tierLabel}</span>
            <span style="color:${r.color};">${r.name}</span>
          </div>
          <button onclick="adminDeleteRarity('${r.id}')" style="background:none;border:none;color:#f87171;cursor:pointer;font-weight:900;">✕</button>
        </div>
        <div class="rar-chance-row">
          <span>Кейсы (${casePctText}):</span>
          <input type="text" value="${r.weight ?? 10}" onchange="updateRarityWeight('${r.id}', this.value, 'case')">
        </div>
        <div class="rar-chance-row">
          <span>Паки (${packPctText}):</span>
          <input type="text" value="${r.packWeight ?? r.weight ?? 10}" onchange="updateRarityWeight('${r.id}', this.value, 'pack')">
        </div>
        <div class="rar-chance-row">
          <span>Градиент (2 цвета):</span>
          <div style="display:flex;gap:6px;">
            <input type="color" value="${r.color}" title="Цвет 1 (рамка и верх градиента)" onchange="updateRarityColors('${r.id}', this.value, null)">
            <input type="color" value="${r.bg}" title="Цвет 2 (низ градиента)" onchange="updateRarityColors('${r.id}', null, this.value)">
          </div>
        </div>
        <div class="rar-chance-row">
          <span>Эффект:</span>
          <select onchange="updateRarityEffect('${r.id}', this.value)">
            <option value="none" ${r.effect === 'none' ? 'selected' : ''}>Нет</option>
            <option value="prismatic-foil" ${r.effect === 'prismatic-foil' ? 'selected' : ''}>Радужный фойл</option>
            <option value="aura" ${r.effect === 'aura' ? 'selected' : ''}>Левитирующая аура</option>
            <option value="shine-sweep" ${r.effect === 'shine-sweep' ? 'selected' : ''}>Блик сверху вниз</option>
            <option value="glow" ${r.effect === 'glow' ? 'selected' : ''}>Свечение (Glow)</option>
            <option value="rainbow-shift" ${r.effect === 'rainbow-shift' ? 'selected' : ''}>Перелив цвета редкости</option>
            <option value="sparkle" ${r.effect === 'sparkle' ? 'selected' : ''}>Искры</option>
          </select>
        </div>
      </div>
    `;
  }).join('');

  const rarOptionsHTML = state.rarities.map(r =>
    `<option value="${r.id}">${r.name}</option>`
  ).join('');

  const rarSelect = document.getElementById('new-card-rarity');
  const prevSelected = rarSelect.value;
  rarSelect.innerHTML = rarOptionsHTML;
  if (prevSelected && state.rarities.some(r => r.id === prevSelected)) {
    rarSelect.value = prevSelected;
  }

  const editRarSelect = document.getElementById('edit-card-rarity');
  const prevEditRar = editRarSelect.value;
  editRarSelect.innerHTML = rarOptionsHTML;
  if (prevEditRar && state.rarities.some(r => r.id === prevEditRar)) {
    editRarSelect.value = prevEditRar;
  }

  document.getElementById('admin-case-cards-selector').innerHTML = state.cards.map(c => `
    <label style="display:flex;align-items:center;gap:6px;font-size:12px;">
      <input type="checkbox" class="case-card-cb" value="${c.id}"> ${isUpcomingCard(c) ? '[UPCOMING]' : '#' + c.top} ${c.name}
    </label>
  `).join('');

  renderAdminCasesList();
  updateCasePreview();

  if (editingCaseId && state.cases.some(c => c.id === editingCaseId)) {
    const activeCase = state.cases.find(c => c.id === editingCaseId);
    const editCatSel = document.getElementById('edit-case-category');
    if (editCatSel) {
      editCatSel.innerHTML = catOptionsHTML;
      editCatSel.value = activeCase.categoryId || state.caseCategories[0].id;
    }
    const activeSet = new Set(activeCase.cardIds || []);
    document.getElementById('admin-edit-case-cards-selector').innerHTML = state.cards.map(c => `
      <label style="display:flex;align-items:center;gap:6px;font-size:12px;">
        <input type="checkbox" class="edit-case-card-cb" value="${c.id}" ${activeSet.has(c.id) ? 'checked' : ''}> ${isUpcomingCard(c) ? '[UPCOMING]' : '#' + c.top} ${c.name}
      </label>
    `).join('');
    updateEditCasePreview();
  } else {
    editingCaseId = null;
    document.getElementById('admin-edit-case-panel').classList.add('hidden');
  }

  document.getElementById('admin-cards-count').textContent = state.cards.length;
  document.getElementById('admin-all-cards').innerHTML = state.cards.map(c => {
    const isEditing = c.id === editingCardId ? 'editing-target' : '';
    const delBtn = `<button class="secondary-btn" style="width:100%;margin-top:6px;padding:6px 8px;font-size:11px;color:#f87171;" onclick="event.stopPropagation(); adminDeleteCard('${c.id}')">Удалить</button>`;
    const dndAttrs = `draggable="true" ` +
      `ondragstart="draggedCardId='${c.id}'; this.style.opacity='0.5';" ` +
      `ondragend="this.style.opacity='1'; draggedCardId=null; document.querySelectorAll('#admin-all-cards .card-wrap').forEach(el=>el.classList.remove('drag-over'));" ` +
      `ondragover="event.preventDefault(); this.classList.add('drag-over');" ` +
      `ondragleave="this.classList.remove('drag-over');" ` +
      `ondrop="event.preventDefault(); this.classList.remove('drag-over'); handleCardDragDrop('${c.id}');"`;
    return createCardHTML(c, false, isEditing, `onclick="openEditCardPanel('${c.id}')"`, delBtn, dndAttrs);
  }).join('');

  if (editingCardId && state.cards.some(c => c.id === editingCardId)) {
    updateEditCardPreview();
  } else {
    editingCardId = null;
    document.getElementById('admin-edit-card-panel').classList.add('hidden');
  }

  updateCardPreview();
}

function openEditCardPanel(cardId) {
  const card = getCardById(cardId);
  if (!card) return;

  SoundFX.click();
  editingCardId = card.id;
  document.getElementById('admin-edit-card-panel').classList.remove('hidden');
  document.getElementById('edit-card-heading').textContent = card.name;
  document.getElementById('edit-card-top').value = isUpcomingCard(card) ? 0 : (card.top ?? 0);
  document.getElementById('edit-card-name').value = card.name ?? '';
  document.getElementById('edit-card-rarity').value = card.rarity;
  document.getElementById('edit-card-price').value = card.price ?? 500;
  document.getElementById('edit-card-img').value = card.img ?? '';

  renderAdminUI();
  updateEditCardPreview();
  document.getElementById('admin-edit-card-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function cancelEditCard() {
  editingCardId = null;
  document.getElementById('admin-edit-card-panel').classList.add('hidden');
  renderAdminUI();
}

function updateEditCardPreview() {
  const previewBox = document.getElementById('edit-card-preview');
  if (!previewBox || !editingCardId) return;

  const top = Number(document.getElementById('edit-card-top').value) || 0;
  const name = document.getElementById('edit-card-name').value.trim() || 'Без названия';
  const rarity = document.getElementById('edit-card-rarity').value || state.rarities[0].id;
  const price = Number(document.getElementById('edit-card-price').value) || 500;
  const img = document.getElementById('edit-card-img').value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=GD';
  const isHolo = Boolean(document.getElementById('edit-preview-holo-toggle')?.checked);

  previewBox.innerHTML = createCardHTML({ id: editingCardId, top, name, rarity, price, img }, isHolo);
}

function saveEditedCard() {
  if (!editingCardId) return;
  const idx = state.cards.findIndex(c => c.id === editingCardId);
  if (idx === -1) return;

  const rawTop = Number(document.getElementById('edit-card-top').value) || 0;
  const name = document.getElementById('edit-card-name').value.trim();
  const rarity = document.getElementById('edit-card-rarity').value;
  const price = Number(document.getElementById('edit-card-price').value) || 500;
  const img = document.getElementById('edit-card-img').value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=GD';

  if (!name) return;

  const updated = {
    ...state.cards[idx],
    top: rawTop > 0 ? rawTop : 0,
    name,
    rarity,
    price,
    img
  };

  state.cards.splice(idx, 1);

  if (!isUpcomingCard(updated) && rawTop > 0) {
    const ranked = state.cards.filter(c => !isUpcomingCard(c));
    const clampedPos = Math.min(ranked.length, Math.max(0, rawTop - 1));
    const targetRankedCard = ranked[clampedPos];
    if (targetRankedCard) {
      const insertIdx = state.cards.findIndex(c => c.id === targetRankedCard.id);
      state.cards.splice(insertIdx, 0, updated);
    } else {
      state.cards.push(updated);
    }
  } else {
    state.cards.push(updated);
  }

  SoundFX.click();
  saveState(true);
  document.getElementById('edit-card-heading').textContent = name;
  renderAdminUI();
}

function deleteEditingCard() {
  if (!editingCardId) return;
  const idToDelete = editingCardId;
  editingCardId = null;
  adminDeleteCard(idToDelete);
}

function updateRarityColors(id, newColor1, newColor2) {
  const rar = state.rarities.find(r => r.id === id);
  if (!rar) return;
  if (newColor1) rar.color = newColor1;
  if (newColor2) rar.bg = newColor2;
  saveState(true);
  renderAdminUI();
  updateCardPreview();
}

function updateRarityWeight(id, rawVal, mode = 'case') {
  const rar = state.rarities.find(r => r.id === id);
  if (!rar) return;
  const sanitized = sanitizeChanceInput(rawVal);
  if (mode === 'pack') {
    rar.packWeight = sanitized;
  } else {
    rar.weight = sanitized;
  }
  saveState(true);
  renderAdminUI();
  updateCardPreview();
}

function updateRarityEffect(id, newEffect) {
  const rar = state.rarities.find(r => r.id === id);
  if (!rar) return;
  rar.effect = newEffect;
  saveState(true);
  renderAdminUI();
  updateCardPreview();
}

function updateCardPreview() {
  const previewBox = document.getElementById('card-creator-preview');
  if (!previewBox) return;

  const top = Number(document.getElementById('new-card-top').value) || 0;
  const name = document.getElementById('new-card-name').value.trim() || 'Tidal Wave';
  const rarity = document.getElementById('new-card-rarity').value || state.rarities[0].id;
  const price = Number(document.getElementById('new-card-price').value) || 22000;
  const img = document.getElementById('new-card-img').value.trim() || 'https://i.ytimg.com/vi/9fsZ014qB3s/mqdefault.jpg';
  const isHolo = Boolean(document.getElementById('preview-holo-toggle')?.checked);

  previewBox.innerHTML = createCardHTML({ id: 'preview', top, name, rarity, price, img }, isHolo);
}

function adminAddRarity() {
  const name = document.getElementById('new-rar-name').value.trim();
  const color = document.getElementById('new-rar-color').value;
  const bg = document.getElementById('new-rar-bg').value;
  const weight = sanitizeChanceInput(document.getElementById('new-rar-weight').value);
  const packWeight = sanitizeChanceInput(document.getElementById('new-rar-pack-weight').value);
  const effect = document.getElementById('new-rar-effect').value;
  if (!name) return;

  const id = name.toLowerCase().replace(/\s+/g, '_');
  const existing = state.rarities.find(r => r.id === id);
  if (existing) {
    Object.assign(existing, { name, color, bg, weight, packWeight, effect });
  } else {
    state.rarities.push({ id, name, color, bg, order: 1, weight, packWeight, effect });
  }
  SoundFX.click();
  saveState(true);
  renderAdminUI();
}

function adminDeleteRarity(id) {
  if (state.rarities.length <= 1) return;
  SoundFX.click();
  state.rarities = state.rarities.filter(r => r.id !== id);
  saveState(true);
  renderAdminUI();
}

function adminAddCard() {
  const rawTop = Number(document.getElementById('new-card-top').value) || 0;
  const name = document.getElementById('new-card-name').value.trim();
  const rarity = document.getElementById('new-card-rarity').value;
  const price = Number(document.getElementById('new-card-price').value) || 500;
  const img = document.getElementById('new-card-img').value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=GD';

  if (!name) return;

  const newCard = {
    id: 'c_' + Date.now(),
    top: rawTop > 0 ? rawTop : 0,
    name,
    rarity,
    price,
    img
  };

  if (!isUpcomingCard(newCard) && rawTop > 0) {
    const ranked = state.cards.filter(c => !isUpcomingCard(c));
    const clampedPos = Math.min(ranked.length, Math.max(0, rawTop - 1));
    const targetRankedCard = ranked[clampedPos];
    if (targetRankedCard) {
      const insertIdx = state.cards.findIndex(c => c.id === targetRankedCard.id);
      state.cards.splice(insertIdx, 0, newCard);
    } else {
      state.cards.push(newCard);
    }
  } else {
    state.cards.push(newCard);
  }

  SoundFX.click();
  saveState(true);
  renderAdminUI();
}

function adminDeleteCard(id) {
  SoundFX.click();
  state.cards = state.cards.filter(c => c.id !== id);
  saveState(true);
  renderAdminUI();
}

function adminAddCase() {
  const name = document.getElementById('new-case-name').value.trim();
  const price = Number(document.getElementById('new-case-price').value) || 500;
  const img = document.getElementById('new-case-img').value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=CASE';
  const categoryId = document.getElementById('new-case-category')?.value || state.caseCategories[0].id;
  const selectedIds = Array.from(document.querySelectorAll('.case-card-cb:checked')).map(cb => cb.value);

  if (!name || selectedIds.length === 0) return;
  SoundFX.click();
  state.cases.push({ id: 'case_' + Date.now(), name, price, img, categoryId, cardIds: selectedIds });
  saveState(true);
  renderAdminUI();
  renderCasesList();
}

// === МОДАЛЬНОЕ ОКНО ВЫИГРЫША ===
function showWinModal(itemsList) {
  lastWonItems = Array.isArray(itemsList) ? itemsList : [];
  const modalContent = document.querySelector('#win-modal .modal-content');
  const titleEl = document.getElementById('win-modal-title');
  const container = document.getElementById('win-card-container');
  const sellBtn = document.getElementById('sell-won-btn');

  if (modalContent) {
    modalContent.classList.toggle('multi-win-content', lastWonItems.length > 1);
  }
  if (titleEl) {
    titleEl.textContent = lastWonItems.length > 1 ? `Тебе выпало (${lastWonItems.length}):` : 'Тебе выпало!';
  }

  container.innerHTML = lastWonItems.map(entry => createCardHTML(entry.card, entry.isHolo)).join('');

  const totalSellPrice = lastWonItems.reduce((sum, entry) => sum + getCardPrice(entry.card, entry.isHolo), 0);
  sellBtn.textContent = lastWonItems.length > 1 ? `Продать все за ${totalSellPrice} ₽` : `Продать за ${totalSellPrice} ₽`;
  sellBtn.disabled = totalSellPrice <= 0;

  document.getElementById('win-modal').classList.remove('hidden');
}

function closeWinModal() {
  SoundFX.click();
  lastWonItems = [];
  document.getElementById('win-modal').classList.add('hidden');
}

function sellWonCard() {
  if (lastWonItems.length === 0) return;

  const uidSet = new Set(lastWonItems.map(x => x.uid));
  let earned = 0;

  state.inventory = state.inventory.filter(item => {
    if (uidSet.has(item.uid)) {
      const card = getCardById(item.cardId);
      if (card) earned += getCardPrice(card, item.isHolo);
      return false;
    }
    return true;
  });

  if (earned > 0) {
    SoundFX.sell();
    state.balance += earned;
    saveState(false);
    if (document.getElementById('tab-collection').classList.contains('active')) {
      renderCollection();
    }
  }

  closeWinModal();
}

// === ЗАПУСК ===
updateTopBar();
updateCloudSyncBadge();
updateSoundUI();
renderCasesList();
if (!hasLocalCatalogEdits) {
  syncCatalogFromCloud(false);
}
