// === НАСТРОЙКИ ОБЩЕГО ПУЛА КАРТ, КЕЙСОВ И ЛАЙВ-ДРОПОВ (JSONBin.io) ===
const JSONBIN_BIN_ID = '6afc4b60ffd5d16053c85caa';
const JSONBIN_MASTER_KEY = '$2a$10$eiZem/A1JhfYhF6bHWXE7uzoJ6D8QjuKpyPe5Hrg9i2osHoYhRrVK';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Стартовый пул (используется только если облако ещё не настроено или в облаке вообще нет массива pool)
const DEFAULT_POOL = [
  {
    id: 'lvl_1',
    rank: 1,
    name: 'Tidal Wave',
    verifier: 'Zoink',
    publisher: 'OniLink',
    rarity: 'limit',
    price: 4500,
    image: 'https://i.ytimg.com/vi/9fsZ014qB3s/maxresdefault.jpg'
  },
  {
    id: 'lvl_2',
    rank: 2,
    name: 'Acheron',
    verifier: 'Zoink',
    publisher: 'ryamu',
    rarity: 'apex',
    price: 2200,
    image: 'https://i.ytimg.com/vi/sBKR6aUorzA/maxresdefault.jpg'
  },
  {
    id: 'lvl_3',
    rank: 3,
    name: 'Avernus',
    verifier: 'Zoink',
    publisher: 'PockeWindfish',
    rarity: 'apex',
    price: 1900,
    image: 'https://i.ytimg.com/vi/16Zh8hW264w/maxresdefault.jpg'
  },
  {
    id: 'lvl_4',
    rank: 4,
    name: 'Thinking Space II',
    verifier: 'Zoink',
    publisher: 'CairoX',
    rarity: 'mythic',
    price: 750,
    image: 'https://i.ytimg.com/vi/5M6h8f6bY5g/maxresdefault.jpg'
  },
  {
    id: 'lvl_5',
    rank: 5,
    name: 'Silent Clubstep',
    verifier: 'Paqoe',
    publisher: 'TheRealSailent',
    rarity: 'legendary',
    price: 1200,
    image: 'https://i.ytimg.com/vi/GR4Sn_dc83w/maxresdefault.jpg'
  },
  {
    id: 'lvl_6',
    rank: 6,
    name: 'Abyss of Darkness',
    verifier: 'Cursed',
    publisher: 'Exen',
    rarity: 'legendary',
    price: 1050,
    image: 'https://i.ytimg.com/vi/ejJ2220141A/maxresdefault.jpg'
  },
  {
    id: 'lvl_9',
    rank: 9,
    name: 'ORBIT',
    verifier: 'Zoink',
    publisher: 'MindCap',
    rarity: 'mythic',
    price: 720,
    image: 'https://placehold.co/400x225/1a1025/ffffff?text=ORBIT'
  },
  {
    id: 'lvl_7',
    rank: 10,
    name: 'Antarctic Lights',
    verifier: 'Axinity',
    publisher: 'declanic',
    rarity: 'mythic',
    price: 680,
    image: 'https://i.ytimg.com/vi/8hH2H6-X1bU/maxresdefault.jpg'
  },
  {
    id: 'lvl_8',
    rank: 14,
    name: 'Slaughterhouse',
    verifier: 'Doggie',
    publisher: 'icedcave',
    rarity: 'epic',
    price: 340,
    image: 'https://i.ytimg.com/vi/kpcF1-6989M/maxresdefault.jpg'
  },
  {
    id: 'lvl_10',
    rank: 35,
    name: 'Kuzureta',
    verifier: 'Teno',
    publisher: 'Teno',
    rarity: 'common',
    price: 110,
    image: 'https://i.ytimg.com/vi/0rG15S9Z4zY/maxresdefault.jpg'
  },
  {
    id: 'lvl_11',
    rank: 48,
    name: 'Bloodlust',
    verifier: 'Knobbelboy',
    publisher: 'Knobbelboy',
    rarity: 'common',
    price: 95,
    image: 'https://i.ytimg.com/vi/5247258391/maxresdefault.jpg'
  },
  {
    id: 'lvl_12',
    rank: 75,
    name: 'Tartarus',
    verifier: 'Dolphy',
    publisher: 'Riot',
    rarity: 'common',
    price: 80,
    image: 'https://i.ytimg.com/vi/398123981/maxresdefault.jpg'
  }
];

const DEFAULT_CASES = [
  {
    id: 'case_starter',
    name: 'Starter Demon Case',
    price: 350,
    image: 'https://placehold.co/480x270/171a2b/ffffff?text=STARTER+CASE',
    itemIds: ['lvl_10', 'lvl_11', 'lvl_12', 'lvl_8', 'lvl_7']
  },
  {
    id: 'case_top_list',
    name: 'Main List Overload Case',
    price: 1400,
    image: 'https://placehold.co/480x270/2a1226/ffffff?text=MAIN+LIST+CASE',
    itemIds: ['lvl_1', 'lvl_2', 'lvl_3', 'lvl_4', 'lvl_5', 'lvl_6', 'lvl_9']
  }
];

const RARITY_WEIGHTS = [
  { key: 'common', weight: 67.5 },
  { key: 'epic', weight: 31.5 },
  { key: 'mythic', weight: 0.4 },
  { key: 'legendary', weight: 0.3 },
  { key: 'apex', weight: 0.2 },
  { key: 'limit', weight: 0.1 }
];

const RARITY_RANK_ORDER = {
  limit: 6,
  apex: 5,
  legendary: 4,
  mythic: 3,
  epic: 2,
  common: 1
};

const RARITY_LABELS = {
  all: 'Все редкости',
  common: 'Common',
  epic: 'Epic',
  mythic: 'Mythic',
  legendary: 'Legendary',
  apex: 'Apex',
  limit: 'Limit'
};

const RARE_ANIM_TIERS = ['legendary', 'apex', 'limit'];
const HOLO_CHANCE = 0.12;
const HOLO_MULTIPLIER = 3.5;
const PACK_PRICE = 250;

let state = {
  playerId: '',
  playerName: 'nar1',
  balance: 500,
  packs: 0,
  packsOpened: 0,
  pool: [],
  cases: [],
  inventory: [],
  droppedTemp: [],
  recentDrops: []
};

let selectedCaseId = null;
let tradeActive = false;
let userTradeIds = [];
let botOfferCards = [];

let selectedUpgradeSourceId = null;
let selectedUpgradeTargetKey = null;
let isSpinning = false;
let isOpeningPack = false;
let isOpeningCase = false;
let uploadedAdminImageDataUrl = '';
let uploadedCaseImageDataUrl = '';
let editingCardImageDataUrl = '';

function isCloudConfigured() {
  return (
    JSONBIN_BIN_ID &&
    !JSONBIN_BIN_ID.includes('ВСТАВЬ_СЮДА') &&
    JSONBIN_MASTER_KEY &&
    !JSONBIN_MASTER_KEY.includes('ВСТАВЬ_СЮДА')
  );
}

function injectCaseBattleStyles() {
  if (document.getElementById('cb-theme-style')) return;
  const style = document.createElement('style');
  style.id = 'cb-theme-style';
  style.textContent = `
    :root {
      --cb-bg: #111521;
      --cb-panel: #171c2b;
      --cb-panel-2: #1e2438;
      --cb-border: #283049;
      --cb-accent: #8cc63f;
      --cb-accent-hover: #9cd64c;
      --cb-text: #eef2ff;
      --cb-muted: #8f9bb7;
    }

    body {
      margin: 0;
      background: radial-gradient(circle at 50% -10%, #1d253b 0%, var(--cb-bg) 55%);
      color: var(--cb-text);
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    }

    .cb-shell {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    .cb-live-sidebar {
      width: 112px;
      flex-shrink: 0;
      background: #131724;
      border-right: 1px solid var(--cb-border);
      padding: 10px 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .cb-live-header {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--cb-accent);
      text-align: center;
      padding: 4px 2px 6px;
      border-bottom: 1px solid var(--cb-border);
    }

    .cb-live-feed {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: calc(100vh - 115px);
      overflow-y: auto;
      scrollbar-width: thin;
    }

    .cb-live-item {
      background: var(--cb-panel);
      border: 1px solid var(--cb-border);
      border-radius: 8px;
      padding: 6px;
      text-align: center;
      font-size: 11px;
      transition: transform 0.18s ease, border-color 0.18s ease;
    }

    .cb-live-item:hover {
      transform: translateY(-1px);
      border-color: #3c486e;
    }

    .cb-live-item.rare-glow {
      border-color: #f59e0b;
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.25);
    }

    .cb-live-item img {
      width: 100%;
      height: 48px;
      object-fit: cover;
      border-radius: 5px;
      display: block;
      margin-bottom: 4px;
    }

    .cb-live-name {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #fff;
    }

    .cb-live-who {
      font-size: 10px;
      color: var(--cb-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    .cb-live-price {
      font-size: 10px;
      font-weight: 700;
      color: var(--cb-accent);
      margin-top: 2px;
    }

    .cb-main-area {
      flex: 1;
      min-width: 0;
      padding: 20px 24px 48px;
    }

    .tab-section,
    .case-opener-box,
    .empty-box {
      background: rgba(23, 28, 43, 0.88);
      border: 1px solid var(--cb-border);
      border-radius: 12px;
    }

    .btn-primary,
    #open-pack-btn,
    #buy-pack-btn,
    #open-selected-case-btn,
    #run-upgrade-btn,
    #confirm-trade-btn {
      background: linear-gradient(180deg, #98d448 0%, #7cb332 100%);
      color: #0e1406;
      font-weight: 700;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .btn-primary:hover:not(:disabled),
    #open-pack-btn:hover:not(:disabled),
    #buy-pack-btn:hover:not(:disabled),
    #open-selected-case-btn:hover:not(:disabled) {
      filter: brightness(1.06);
    }

    .btn-secondary {
      background: var(--cb-panel-2);
      color: var(--cb-text);
      border: 1px solid var(--cb-border);
      border-radius: 8px;
      cursor: pointer;
    }

    .btn-danger,
    #sell-bulk-btn {
      background: #7f1d1d;
      color: #fecaca;
      border: 1px solid #b91c1c;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .gd-card {
      background: var(--cb-panel);
      border: 1px solid var(--cb-border);
      border-radius: 10px;
      overflow: hidden;
      transition: transform 0.16s ease, box-shadow 0.16s ease;
    }

    .gd-card:hover {
      transform: translateY(-2px);
    }

    .gd-card.rarity-epic { border-color: #a855f7; }
    .gd-card.rarity-mythic { border-color: #ec4899; }
    .gd-card.rarity-legendary { border-color: #f59e0b; }
    .gd-card.rarity-apex { border-color: #ef4444; }
    .gd-card.rarity-limit {
      border-color: #38bdf8;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.25);
    }

    .gd-card.is-holo {
      box-shadow: 0 0 16px rgba(250, 204, 21, 0.35);
    }

    @media (max-width: 760px) {
      .cb-shell {
        flex-direction: column;
      }
      .cb-live-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--cb-border);
      }
      .cb-live-feed {
        flex-direction: row;
        max-height: none;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 4px;
      }
      .cb-live-item {
        min-width: 108px;
        flex-shrink: 0;
      }
      .cb-main-area {
        padding: 14px;
      }
    }
  `;
  document.head.appendChild(style);
}

function ensureCaseBattleLayout() {
  injectCaseBattleStyles();

  const main = document.querySelector('main');
  if (main && !main.parentElement.classList.contains('cb-shell')) {
    const shell = document.createElement('div');
    shell.className = 'cb-shell';

    const sidebar = document.createElement('aside');
    sidebar.className = 'cb-live-sidebar';
    sidebar.innerHTML = `
      <div class="cb-live-header">LIVE ДРОПЫ</div>
      <div id="cb-live-feed" class="cb-live-feed"></div>
    `;

    const mainWrap = document.createElement('div');
    mainWrap.className = 'cb-main-area';

    main.parentElement.insertBefore(shell, main);
    mainWrap.appendChild(main);
    shell.appendChild(sidebar);
    shell.appendChild(mainWrap);
  }
}

function getCardPowerScore(card) {
  const rScore = RARITY_RANK_ORDER[card.rarity] || 1;
  const holoBonus = card.isHolo ? 10 : 0;
  return rScore * 100 + holoBonus + (Number(card.price) || 0) / 10000;
}

function sortCardsBestFirst(cards) {
  return [...cards].sort((a, b) => getCardPowerScore(b) - getCardPowerScore(a));
}

function recordDropToFeed(card, sourceLabel = 'Пак') {
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
    pushSharedData(state.pool, state.cases, state.recentDrops);
  }
}

function renderLiveDropsFeed() {
  const feedEl = document.getElementById('cb-live-feed');
  if (!feedEl) return;

  const sorted = [...state.recentDrops].sort((a, b) => {
    const aIsMine = a.playerId === state.playerId;
    const bIsMine = b.playerId === state.playerId;
    const aRare = a.isHolo || RARE_ANIM_TIERS.includes(a.rarity) || a.rarity === 'mythic';
    const bRare = b.isHolo || RARE_ANIM_TIERS.includes(b.rarity) || b.rarity === 'mythic';

    // Свежие дропы идут первыми, а среди недавних крутые дропы приподнимаются вверх
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
    const div = document.createElement('div');
    const isRare = item.isHolo || RARE_ANIM_TIERS.includes(item.rarity) || item.rarity === 'mythic';
    div.className = `cb-live-item rarity-${item.rarity} ${isRare ? 'rare-glow' : ''}`;
    const whoText = item.playerId === state.playerId ? `Ты (${item.source})` : `${item.playerName}`;
    const fallbackImg = `https://placehold.co/160x90/171c2b/ffffff?text=${encodeURIComponent(item.name)}`;

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='${fallbackImg}'" />
      <div class="cb-live-name">${item.isHolo ? '✦ ' : ''}${item.name}</div>
      <div class="cb-live-price">${item.price} ₽</div>
      <div class="cb-live-who">${whoText}</div>
    `;
    feedEl.appendChild(div);
  });
}

async function fetchSharedData() {
  if (!isCloudConfigured()) {
    return { ok: false, pool: null, cases: null, recentDrops: null };
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
      recentDrops: Array.isArray(rec.recentDrops) ? rec.recentDrops : null
    };
  } catch (err) {
    console.error('Не удалось загрузить общие данные:', err);
    return { ok: false, pool: null, cases: null, recentDrops: null };
  }
}

async function pushSharedData(
  nextPool = state.pool,
  nextCases = state.cases,
  nextDrops = state.recentDrops
) {
  if (!isCloudConfigured()) {
    return false;
  }
  try {
    const res = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_MASTER_KEY
      },
      body: JSON.stringify({
        pool: nextPool,
        cases: nextCases,
        recentDrops: nextDrops
      })
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return true;
  } catch (err) {
    console.error('Ошибка отправки общих данных:', err);
    return false;
  }
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

function ensureCasesPageUI() {
  const nav = document.querySelector('nav, .nav-bar, .navbar, .tabs-nav');
  if (nav && !nav.querySelector('[data-tab="cases"]')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-btn';
    btn.dataset.tab = 'cases';
    btn.textContent = 'Кейсы';
    const adminBtn = nav.querySelector('[data-tab="admin"]');
    if (adminBtn) {
      nav.insertBefore(btn, adminBtn);
    } else {
      nav.appendChild(btn);
    }
  }

  if (!document.getElementById('tab-cases')) {
    const main = document.querySelector('main') || document.body;
    const section = document.createElement('section');
    section.id = 'tab-cases';
    section.className = 'tab-section';
    section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Кейсы</h2>
        <p class="hint">Выбери кейс и открой его за баланс. Содержимое и шансы редкостей работают как в паках.</p>
      </div>
      <div id="cases-list-grid" class="cards-grid"></div>
      <div id="selected-case-panel" class="case-opener-box hidden" style="margin-top:24px; padding:18px;">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <img id="active-case-img" src="" alt="" style="width:128px; height:72px; object-fit:cover; border-radius:10px; border:1px solid var(--cb-border);" />
            <div>
              <h3 id="active-case-title" style="margin:0 0 4px;"></h3>
              <div id="active-case-price" class="hint"></div>
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <button type="button" id="open-selected-case-btn" class="btn-primary">Открыть кейс</button>
          </div>
        </div>
        <div style="margin-bottom:10px; font-weight:600;">Содержимое кейса:</div>
        <div id="active-case-items-grid" class="cards-grid"></div>
      </div>
    `;
    const adminTab = document.getElementById('tab-admin');
    if (adminTab && adminTab.parentElement === main) {
      main.insertBefore(section, adminTab);
    } else {
      main.appendChild(section);
    }
  }
}

function ensureAdminCaseBuilderUI() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel || document.getElementById('add-case-form')) return;

  const container = document.createElement('div');
  container.id = 'admin-cases-builder';
  container.style.cssText = 'margin-top:32px; padding-top:24px; border-top:1px solid var(--cb-border);';
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
          <span>Картинка кейса с ПК</span>
          <input type="file" id="case-file-input" accept="image/*" />
        </label>
        <label style="display:flex; flex-direction:column; gap:6px;">
          <span>Или ссылка (URL) на картинку кейса</span>
          <input type="url" id="case-image-input" placeholder="https://..." />
        </label>
      </div>

      <div>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px;">
          <span>Содержимое кейса (выбери уровни из пула; если ничего не отмечено — войдёт весь пул):</span>
          <button type="button" id="case-select-all-btn" class="btn-secondary" style="padding:4px 10px; font-size:12px;">Выбрать все</button>
        </div>
        <div id="case-pool-checkboxes" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:8px; max-height:240px; overflow:auto; padding:10px; border-radius:10px; border:1px solid var(--cb-border); background:rgba(15,15,24,0.6);"></div>
      </div>

      <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
        <button type="submit" class="btn-primary">Добавить кейс</button>
        <div id="case-preview-box" style="display:flex; align-items:center; gap:10px;">
          <img id="case-preview-img" src="https://placehold.co/160x90/181825/fff?text=Case+Preview" alt="Превью кейса" style="width:128px; height:72px; object-fit:cover; border-radius:8px; border:1px solid var(--cb-border);" />
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
  [
    ['all', 'Все редкости'],
    ['common', 'Common'],
    ['epic', 'Epic'],
    ['mythic', 'Mythic'],
    ['legendary', 'Legendary'],
    ['apex', 'Apex'],
    ['limit', 'Limit']
  ].forEach(([val, label]) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = label;
    select.appendChild(opt);
  });

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
}

function getCollectionSellCandidates(rarity = 'all') {
  if (rarity === 'all') {
    return [...state.inventory];
  }
  return state.inventory.filter(c => c.rarity === rarity);
}

function updateCollectionBulkSellButton() {
  const select = document.getElementById('sell-rarity-select');
  const btn = document.getElementById('sell-bulk-btn');
  if (!select || !btn) return;

  const rarity = select.value;
  const targets = getCollectionSellCandidates(rarity);
  const sum = targets.reduce((s, c) => s + c.price, 0);
  const label = rarity === 'all' ? 'Продать всё' : `Продать ${RARITY_LABELS[rarity] || rarity}`;
  btn.textContent = `${label} (${sum} ₽)`;
  btn.disabled = targets.length === 0;
}

function sellCollectionByRarity() {
  const select = document.getElementById('sell-rarity-select');
  const rarity = select ? select.value : 'all';
  const targets = getCollectionSellCandidates(rarity);
  if (targets.length === 0) return;

  const targetUidSet = new Set(targets.map(c => c.uid));
  const sum = targets.reduce((s, c) => s + c.price, 0);

  state.inventory = state.inventory.filter(c => !targetUidSet.has(c.uid));
  state.balance += sum;
  saveState();
  updateHeader();
  renderCollection();

  const desc = rarity === 'all'
    ? `Проданы все карты (${targets.length} шт.) за ${sum} ₽`
    : `Проданы карты редкости ${RARITY_LABELS[rarity] || rarity} (${targets.length} шт.) за ${sum} ₽`;
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
  btn.textContent = 'Залить пул и кейсы в облако всем игрокам';
  btn.addEventListener('click', async () => {
    if (!state.pool || state.pool.length === 0) {
      showToast('Пул пуст — нечего отправлять');
      return;
    }
    const ok = await pushSharedData(state.pool, state.cases, state.recentDrops);
    if (ok) {
      showToast(`Сохранено в облако: ${state.pool.length} карт, ${state.cases.length} кейсов`);
    }
  });

  const status = document.createElement('span');
  status.id = 'cloud-sync-status';
  status.className = 'hint';
  status.textContent = isCloudConfigured()
    ? 'Облако подключено: изменения пула, кейсов и дропов видят все игроки'
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
      state.playerName = parsed.playerName || 'nar1';
      state.balance = parsed.balance ?? 500;
      state.packs = parsed.packs ?? 0;
      state.packsOpened = parsed.packsOpened ?? 0;
      state.inventory = Array.isArray(parsed.inventory) ? parsed.inventory : [];
      if (Array.isArray(parsed.pool) && parsed.pool.length > 0) {
        state.pool = parsed.pool;
      }
      if (Array.isArray(parsed.cases) && parsed.cases.length > 0) {
        state.cases = parsed.cases;
      }
      if (Array.isArray(parsed.recentDrops)) {
        state.recentDrops = parsed.recentDrops;
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

    if (Array.isArray(cloudResult.recentDrops) && cloudResult.recentDrops.length > 0) {
      state.recentDrops = cloudResult.recentDrops;
    }
    saveState();
  } else {
    if (!state.pool || state.pool.length === 0) state.pool = [...DEFAULT_POOL];
    if (!state.cases || state.cases.length === 0) state.cases = [...DEFAULT_CASES];
  }

  if (state.cases.length > 0 && !selectedCaseId) {
    selectedCaseId = state.cases[0].id;
  }

  ensureCaseBattleLayout();
  ensureCasesPageUI();
  ensureBuyPackButtonVisible();
  ensureOpenAllPacksButton();
  ensureCollectionBulkSellControls();
  ensureAdminCaseBuilderUI();
  ensureAdminSyncButton();
  hideFreePackTimerUI();

  setupNavigation();
  updateHeader();
  renderLiveDropsFeed();
  renderCasesPage();
  renderCollection();
  renderAdminPreview();
  renderAdminCasePoolCheckboxes();
  renderCaseBuilderPreview();
  renderAdminCasesList();
  bindEvents();

  if (isCloudConfigured()) {
    setInterval(async () => {
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
          if (!state.cases.some(c => c.id === selectedCaseId)) {
            selectedCaseId = state.cases[0].id;
          }
          updated = true;
        }
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

      if (updated) {
        saveState();
        renderAdminPool();
        renderAdminCasePoolCheckboxes();
        renderAdminCasesList();
        renderCasesPage();
        if (document.getElementById('tab-upgrade').classList.contains('active') && !isSpinning) {
          renderUpgradePage();
        }
      }
    }, 8000);
  }
}

function saveState() {
  try {
    localStorage.setItem('gd_case_save_v1', JSON.stringify({
      playerName: state.playerName,
      balance: state.balance,
      packs: state.packs,
      packsOpened: state.packsOpened,
      pool: state.pool,
      cases: state.cases,
      inventory: state.inventory,
      recentDrops: state.recentDrops
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
      if (tab === 'collection') renderCollection();
      if (tab === 'upgrade') renderUpgradePage();
      if (tab === 'trades' && tradeActive) renderTradeWorkspace();
      if (tab === 'admin') {
        ensureAdminCaseBuilderUI();
        ensureAdminSyncButton();
        renderAdminPool();
        renderAdminCasePoolCheckboxes();
        renderAdminCasesList();
      }
    });
  });
}

function updateHeader() {
  const packsEl = document.getElementById('header-packs');
  if (packsEl) packsEl.textContent = state.packs;

  const balEl = document.getElementById('header-balance');
  if (balEl) balEl.textContent = Math.floor(state.balance);

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
  const activeCase = state.cases.find(c => c.id === selectedCaseId);
  if (openCaseBtn && activeCase) {
    openCaseBtn.textContent = `Открыть кейс (${activeCase.price} ₽)`;
    openCaseBtn.disabled = state.balance < activeCase.price || isOpeningCase;
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
    rarity: base.rarity,
    image: base.image,
    isHolo,
    price: finalPrice,
    favorite: false
  };
}

function rollSingleCard(customRarity = null, poolOverride = null) {
  const sourcePool = Array.isArray(poolOverride) && poolOverride.length > 0 ? poolOverride : state.pool;
  if (!sourcePool || sourcePool.length === 0) return null;

  let chosenRarity = customRarity;
  if (!chosenRarity) {
    const roll = Math.random() * 100;
    let acc = 0;
    for (const r of RARITY_WEIGHTS) {
      acc += r.weight;
      if (roll <= acc) {
        chosenRarity = r.key;
        break;
      }
    }
  }

  let candidates = sourcePool.filter(c => c.rarity === chosenRarity);
  if (candidates.length === 0) candidates = sourcePool;

  const base = candidates[Math.floor(Math.random() * candidates.length)];
  const isHolo = Math.random() < HOLO_CHANCE;
  return buildCardInstance(base, isHolo, 'card');
}

function createCardElement(card, options = {}) {
  const isRareAnim = options.animateDrop && (card.isHolo || RARE_ANIM_TIERS.includes(card.rarity));
  const animClass = options.animateDrop ? (isRareAnim ? 'drop-anim-rare' : 'drop-anim') : '';
  const selectedClass = options.selected ? 'selected-card' : '';

  const div = document.createElement('div');
  div.className = `gd-card rarity-${card.rarity} ${card.isHolo ? 'is-holo' : ''} ${animClass} ${selectedClass}`;

  const fallbackImg = `https://placehold.co/400x225/141420/ffffff?text=${encodeURIComponent(card.name)}`;

  const verifierLine = card.verifier ? `<div>Verified by ${card.verifier}</div>` : '';
  const publisherLine = card.publisher ? `<div>Published by ${card.publisher}</div>` : '';
  const metaBlock = (verifierLine || publisherLine) ? `<div class="card-meta">${verifierLine}${publisherLine}</div>` : '';

  div.innerHTML = `
    <div class="card-top">
      <span class="card-rank">#${card.rank}</span>
      <span class="rarity-badge">${card.rarity}</span>
    </div>
    <div class="card-thumb">
      <img src="${card.image}" alt="${card.name}" onerror="this.src='${fallbackImg}'" />
    </div>
    <div class="card-info">
      <div class="card-title">${card.name}</div>
      ${metaBlock}
    </div>
    <div class="card-footer">
      <div class="card-left-tags">
        ${card.isHolo ? '<span class="holo-pill">✦ HOLO</span>' : ''}
        <span class="card-price-tag">${card.price} ₽</span>
      </div>
      ${options.showFav ? `<button class="fav-btn ${card.favorite ? 'active' : ''}" title="В избранное">★</button>` : ''}
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
  // Крутые/последние карточки отображаются первыми (слева сверху)
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
  const fallbackImg = `https://placehold.co/480x270/181825/ffffff?text=${encodeURIComponent(caseObj.name)}`;
  const itemsCount = getCasePool(caseObj).length;

  div.innerHTML = `
    <div class="card-top">
      <span class="card-rank">CASE</span>
      <span class="rarity-badge">${itemsCount} уровней</span>
    </div>
    <div class="card-thumb">
      <img src="${caseObj.image}" alt="${caseObj.name}" onerror="this.src='${fallbackImg}'" />
    </div>
    <div class="card-info">
      <div class="card-title">${caseObj.name}</div>
      <div class="card-meta"><div>Открытие за баланс</div></div>
    </div>
    <div class="card-footer">
      <div class="card-left-tags">
        <span class="card-price-tag">${caseObj.price} ₽</span>
      </div>
    </div>
  `;

  if (options.actionLabel) {
    const row = document.createElement('div');
    row.className = 'card-actions-row';
    const btn = document.createElement('button');
    btn.textContent = options.actionLabel;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      options.onAction(caseObj);
    });
    row.appendChild(btn);
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
  const listGrid = document.getElementById('cases-list-grid');
  const panel = document.getElementById('selected-case-panel');
  if (!listGrid || !panel) return;

  listGrid.innerHTML = '';
  if (!state.cases || state.cases.length === 0) {
    listGrid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">Кейсов пока нет. Добавь первый кейс в админке!</div>';
    panel.classList.add('hidden');
    return;
  }

  if (!state.cases.some(c => c.id === selectedCaseId)) {
    selectedCaseId = state.cases[0].id;
  }

  state.cases.forEach(caseObj => {
    listGrid.appendChild(createCaseCardElement(caseObj, {
      selected: caseObj.id === selectedCaseId,
      onClick: (c) => {
        selectedCaseId = c.id;
        renderCasesPage();
      }
    }));
  });

  const activeCase = state.cases.find(c => c.id === selectedCaseId);
  if (!activeCase) {
    panel.classList.add('hidden');
    return;
  }

  panel.classList.remove('hidden');
  const imgEl = document.getElementById('active-case-img');
  const titleEl = document.getElementById('active-case-title');
  const priceEl = document.getElementById('active-case-price');
  const itemsGrid = document.getElementById('active-case-items-grid');

  const fallbackImg = `https://placehold.co/480x270/181825/ffffff?text=${encodeURIComponent(activeCase.name)}`;
  if (imgEl) {
    imgEl.src = activeCase.image || fallbackImg;
    imgEl.alt = activeCase.name;
    imgEl.onerror = () => { imgEl.src = fallbackImg; };
  }
  if (titleEl) titleEl.textContent = activeCase.name;
  if (priceEl) priceEl.textContent = `Стоимость открытия: ${activeCase.price} ₽`;

  if (itemsGrid) {
    itemsGrid.innerHTML = '';
    const poolItems = [...getCasePool(activeCase)].sort((a, b) => Number(a.rank) - Number(b.rank));
    poolItems.forEach(lvl => {
      itemsGrid.appendChild(createCardElement({ ...lvl, isHolo: false }));
    });
  }

  updateHeader();
}

function openSelectedCase() {
  if (isOpeningCase) return;
  const activeCase = state.cases.find(c => c.id === selectedCaseId);
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
  state.balance -= activeCase.price;

  const rolledCard = rollSingleCard(null, casePool);
  if (rolledCard) {
    state.droppedTemp.unshift(rolledCard);
    recordDropToFeed(rolledCard, activeCase.name);
  }

  saveState();
  updateHeader();

  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  if (area && grid && rolledCard) {
    area.classList.remove('hidden');
    prependDroppedCardElement(grid, rolledCard, true);
    const total = state.droppedTemp.reduce((s, c) => s + c.price, 0);
    const totalEl = document.getElementById('dropped-total-price');
    if (totalEl) totalEl.textContent = total;
  }

  if (rolledCard && (rolledCard.isHolo || RARE_ANIM_TIERS.includes(rolledCard.rarity))) {
    showToast(`Кейс! Выпал ${rolledCard.rarity.toUpperCase()}${rolledCard.isHolo ? ' HOLO' : ''}: ${rolledCard.name}!`);
  } else if (rolledCard) {
    showToast(`Из кейса "${activeCase.name}" выпал ${rolledCard.name}`);
  }

  setTimeout(() => {
    isOpeningCase = false;
    updateHeader();
  }, 220);
}

// 1. ОТКРЫТИЕ ОДНОГО ПАКА
function openPack() {
  if (state.packs <= 0 || isOpeningPack) return;
  isOpeningPack = true;
  state.packs -= 1;
  state.packsOpened += 1;

  const rolledRaw = [];
  for (let i = 0; i < 5; i++) {
    rolledRaw.push(rollSingleCard());
  }
  // Крутые карточки ставим в начало, чтобы они появлялись слева первыми
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

  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  area.classList.remove('hidden');

  const total = state.droppedTemp.reduce((s, c) => s + c.price, 0);
  document.getElementById('dropped-total-price').textContent = total;

  rolled.forEach((card, idx) => {
    setTimeout(() => {
      prependDroppedCardElement(grid, card, true);

      if (card.isHolo || RARE_ANIM_TIERS.includes(card.rarity)) {
        showToast(`Выпал ${card.rarity.toUpperCase()}${card.isHolo ? ' HOLO' : ''}: ${card.name}!`);
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
      rolledRaw.push(rollSingleCard());
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

  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  area.classList.remove('hidden');

  const total = state.droppedTemp.reduce((s, c) => s + c.price, 0);
  document.getElementById('dropped-total-price').textContent = total;

  const rareCount = rolled.filter(c => c.isHolo || RARE_ANIM_TIERS.includes(c.rarity)).length;
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
  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
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

  document.getElementById('dropped-total-price').textContent = total;
}

// 2. ТРЕЙДЫ С БОТОМ
function startTrade() {
  tradeActive = true;
  userTradeIds = [];
  botOfferCards = [];
  document.getElementById('trade-placeholder').classList.add('hidden');
  document.getElementById('trade-workspace').classList.remove('hidden');
  document.getElementById('trade-inventory-block').classList.remove('hidden');
  renderTradeWorkspace();
}

function getAllCatalogVariants() {
  const list = [];
  state.pool.forEach(base => {
    list.push({ base, isHolo: false, price: Math.round(base.price) });
    list.push({ base, isHolo: true, price: Math.round(base.price * HOLO_MULTIPLIER) });
  });
  return list;
}

function pickTradeTargetSum(userSum) {
  const roll = Math.random();

  if (roll < 0.13) {
    const bonus = 500 + Math.random() * 500;
    return Math.round(userSum + bonus);
  }

  if (roll < 0.35) {
    const bonus = 100 + Math.random() * 400;
    return Math.round(userSum + bonus);
  }

  const delta = (Math.random() * 240) - 120;
  return Math.max(10, Math.round(userSum + delta));
}

function generateBotOffer() {
  const userCards = state.inventory.filter(c => userTradeIds.includes(c.uid));
  const userSum = userCards.reduce((s, c) => s + c.price, 0);

  if (userSum === 0) {
    botOfferCards = [];
    return;
  }

  const variants = getAllCatalogVariants();
  if (variants.length === 0) {
    botOfferCards = [];
    return;
  }

  const targetSum = pickTradeTargetSum(userSum);
  let bestCombo = [];
  let bestDiff = Infinity;

  for (let i = 0; i < 800; i++) {
    const count = Math.floor(Math.random() * 4) + 1;
    const combo = [];
    for (let k = 0; k < count; k++) {
      combo.push(variants[Math.floor(Math.random() * variants.length)]);
    }
    const comboSum = combo.reduce((s, item) => s + item.price, 0);
    const diff = Math.abs(comboSum - targetSum);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestCombo = combo;
      if (diff === 0) break;
    }
  }

  botOfferCards = sortCardsBestFirst(
    bestCombo.map(item => buildCardInstance(item.base, item.isHolo, 'trade'))
  );
}

function renderTradeWorkspace() {
  const userSlots = document.getElementById('user-offer-slots');
  const botSlots = document.getElementById('bot-offer-slots');
  const invGrid = document.getElementById('trade-user-inv');

  userSlots.innerHTML = '';
  botSlots.innerHTML = '';
  invGrid.innerHTML = '';

  const userCards = state.inventory.filter(c => userTradeIds.includes(c.uid));
  const userSum = userCards.reduce((s, c) => s + c.price, 0);
  const botSum = botOfferCards.reduce((s, c) => s + c.price, 0);

  document.getElementById('user-offer-sum').textContent = userSum;
  document.getElementById('bot-offer-sum').textContent = botSum;

  userCards.forEach(c => {
    userSlots.appendChild(createCardElement(c, {
      onClick: () => {
        userTradeIds = userTradeIds.filter(id => id !== c.uid);
        generateBotOffer();
        renderTradeWorkspace();
      }
    }));
  });

  botOfferCards.forEach(c => {
    botSlots.appendChild(createCardElement(c));
  });

  const confirmBtn = document.getElementById('confirm-trade-btn');
  const statusText = document.getElementById('bot-status-text');

  if (userCards.length === 0) {
    confirmBtn.disabled = true;
    statusText.textContent = 'Добавь свои карты в трейд';
  } else {
    confirmBtn.disabled = false;
    const diff = botSum - userSum;
    const diffLabel = diff > 0 ? `+${diff} ₽` : diff < 0 ? `${diff} ₽` : '0 ₽';
    statusText.textContent = `Оффер: ${botSum} ₽ (${diffLabel} к твоим ${userSum} ₽)`;
  }

  state.inventory
    .filter(c => !userTradeIds.includes(c.uid))
    .sort((a, b) => Number(a.rank) - Number(b.rank))
    .forEach(c => {
      invGrid.appendChild(createCardElement(c, {
        onClick: () => {
          if (userTradeIds.length >= 6) {
            showToast('Максимум 6 карт в одном трейде');
            return;
          }
          userTradeIds.push(c.uid);
          generateBotOffer();
          renderTradeWorkspace();
        }
      }));
    });
}

// 3. АПГРЕЙДЫ
function getUpgradeCatalog() {
  const items = [];
  [...state.pool]
    .sort((a, b) => Number(a.rank) - Number(b.rank))
    .forEach(base => {
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
  wheel.style.background = `conic-gradient(#8cc63f 0deg ${deg}deg, #1e2438 ${deg}deg 360deg)`;

  document.getElementById('run-upgrade-btn').disabled = !(srcCard && tgtCard) || isSpinning;

  userGrid.innerHTML = '';
  if (state.inventory.length === 0) {
    userGrid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">У тебя пока нет карт в инвентаре.</div>';
  } else {
    [...state.inventory]
      .sort((a, b) => Number(a.rank) - Number(b.rank))
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
    if (rarityFilter !== 'all' && c.rarity !== rarityFilter) return false;
    if (query) {
      const matchName = c.name.toLowerCase().includes(query);
      const matchRank = `#${c.rank}`.includes(query) || String(c.rank) === query;
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
      statusEl.style.color = '#8cc63f';
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

// 4. КОЛЛЕКЦИЯ (сортировка по топу: #1 первый, #2 второй и т.д.)
function renderCollection() {
  ensureCollectionBulkSellControls();

  const rarityFilter = document.getElementById('filter-rarity').value;
  const typeFilter = document.getElementById('filter-type').value;
  const favOnly = document.getElementById('filter-fav').checked;

  document.getElementById('stat-total-cards').textContent = state.inventory.length;
  document.getElementById('stat-holo-cards').textContent = state.inventory.filter(c => c.isHolo).length;
  const totalVal = state.inventory.reduce((s, c) => s + c.price, 0);
  document.getElementById('stat-inv-value').textContent = `${totalVal} ₽`;
  document.getElementById('stat-packs-opened').textContent = state.packsOpened;

  updateCollectionBulkSellButton();

  const filtered = state.inventory
    .filter(c => {
      if (rarityFilter !== 'all' && c.rarity !== rarityFilter) return false;
      if (typeFilter === 'holo' && !c.isHolo) return false;
      if (typeFilter === 'normal' && c.isHolo) return false;
      if (favOnly && !c.favorite) return false;
      return true;
    })
    .sort((a, b) => {
      const rankDiff = (Number(a.rank) || 999999) - (Number(b.rank) || 999999);
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

function getCurrentCaseImage() {
  if (uploadedCaseImageDataUrl) return uploadedCaseImageDataUrl;
  const urlInput = document.getElementById('case-image-input');
  const urlVal = urlInput ? urlInput.value.trim() : '';
  if (urlVal) return urlVal;
  return 'https://placehold.co/480x270/181825/fff?text=GD+Case';
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
    imgEl.src = `https://placehold.co/480x270/181825/fff?text=${encodeURIComponent(nameVal)}`;
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
  const sortedPool = [...state.pool].sort((a, b) => Number(a.rank) - Number(b.rank));

  sortedPool.forEach(lvl => {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:6px; background:rgba(255,255,255,0.04); cursor:pointer; font-size:13px;';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = lvl.id;
    cb.checked = prevSelected.has(lvl.id);

    const span = document.createElement('span');
    span.textContent = `#${lvl.rank} ${lvl.name} (${lvl.rarity})`;

    label.appendChild(cb);
    label.appendChild(span);
    wrap.appendChild(label);
  });
}

function renderAdminCasesList() {
  const countEl = document.getElementById('admin-cases-count');
  const listEl = document.getElementById('admin-cases-list');
  if (!listEl) return;

  if (countEl) countEl.textContent = state.cases.length;
  listEl.innerHTML = '';

  state.cases.forEach(caseObj => {
    listEl.appendChild(createCaseCardElement(caseObj, {
      actionLabel: 'Удалить',
      onAction: async (c) => {
        const nextCases = state.cases.filter(x => x.id !== c.id);
        const ok = await pushSharedData(state.pool, nextCases, state.recentDrops);
        if (ok) {
          state.cases = nextCases;
          if (selectedCaseId === c.id) {
            selectedCaseId = state.cases[0] ? state.cases[0].id : null;
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
  const rank = document.getElementById('card-rank').value || 1;
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
  editingCardImageDataUrl = '';
  document.getElementById('edit-card-id').value = card.id;
  document.getElementById('edit-card-rank').value = card.rank;
  document.getElementById('edit-card-name').value = card.name;
  document.getElementById('edit-card-verifier').value = card.verifier || '';
  document.getElementById('edit-card-publisher').value = card.publisher || '';
  document.getElementById('edit-card-rarity').value = card.rarity;
  document.getElementById('edit-card-price').value = card.price;
  document.getElementById('edit-card-file').value = '';
  document.getElementById('edit-card-image').value = card.image.startsWith('data:') ? '' : card.image;
  document.getElementById('edit-card-modal').classList.remove('hidden');
}

function closeEditModal() {
  editingCardImageDataUrl = '';
  document.getElementById('edit-card-modal').classList.add('hidden');
}

function renderAdminPool() {
  document.getElementById('pool-count').textContent = state.pool.length;
  const grid = document.getElementById('admin-pool-grid');
  grid.innerHTML = '';

  [...state.pool]
    .sort((a, b) => Number(a.rank) - Number(b.rank))
    .forEach(lvl => {
      grid.appendChild(createCardElement({ ...lvl, isHolo: false }, {
        editLabel: 'Изменить',
        onEdit: (c) => openEditModal(c),
        actionLabel: 'Удалить',
        onAction: async (c) => {
          if (state.pool.length <= 1) {
            showToast('В пуле должна остаться хотя бы 1 карта!');
            return;
          }
          const nextPool = state.pool.filter(x => x.id !== c.id);
          const ok = await pushSharedData(nextPool, state.cases, state.recentDrops);
          if (ok) {
            state.pool = nextPool;
            saveState();
            renderAdminPool();
            renderAdminCasePoolCheckboxes();
            renderCasesPage();
            showToast('Карта удалена у всех игроков');
          }
        }
      }));
    });
}

function bindEvents() {
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

  const openSelectedCaseBtn = document.getElementById('open-selected-case-btn');
  if (openSelectedCaseBtn) {
    openSelectedCaseBtn.addEventListener('click', openSelectedCase);
  }

  document.getElementById('keep-all-dropped-btn').addEventListener('click', () => {
    state.inventory.push(...state.droppedTemp);
    state.droppedTemp = [];
    saveState();
    renderDroppedCards(false);
    showToast('Все карточки добавлены в коллекцию!');
  });

  document.getElementById('sell-all-dropped-btn').addEventListener('click', () => {
    const sum = state.droppedTemp.reduce((s, c) => s + c.price, 0);
    state.balance += sum;
    state.droppedTemp = [];
    saveState();
    updateHeader();
    renderDroppedCards(false);
    showToast(`Продано всё за ${sum} ₽`);
  });

  // Трейды
  document.getElementById('start-trade-btn').addEventListener('click', startTrade);
  document.getElementById('reroll-bot-btn').addEventListener('click', () => {
    generateBotOffer();
    renderTradeWorkspace();
  });
  document.getElementById('cancel-trade-btn').addEventListener('click', () => {
    tradeActive = false;
    document.getElementById('trade-workspace').classList.add('hidden');
    document.getElementById('trade-inventory-block').classList.add('hidden');
    document.getElementById('trade-placeholder').classList.remove('hidden');
  });
  document.getElementById('confirm-trade-btn').addEventListener('click', () => {
    if (userTradeIds.length === 0) return;
    state.inventory = state.inventory.filter(c => !userTradeIds.includes(c.uid));
    state.inventory.push(...botOfferCards);
    botOfferCards.forEach(c => recordDropToFeed(c, 'Трейд'));
    userTradeIds = [];
    botOfferCards = [];
    saveState();
    renderTradeWorkspace();
    showToast('Обмен с ботом успешно завершён!');
  });

  // Апгрейды
  document.getElementById('upg-search-input').addEventListener('input', () => {
    if (!isSpinning) renderUpgradePage();
  });
  document.getElementById('upg-type-filter').addEventListener('change', () => {
    if (!isSpinning) renderUpgradePage();
  });
  document.getElementById('upg-rarity-filter').addEventListener('change', () => {
    if (!isSpinning) renderUpgradePage();
  });
  document.getElementById('run-upgrade-btn').addEventListener('click', runUpgrade);

  // Фильтры коллекции
  ['filter-rarity', 'filter-type', 'filter-fav'].forEach(id => {
    document.getElementById(id).addEventListener('change', renderCollection);
  });

  // Админка: логин
  document.getElementById('admin-login-btn').addEventListener('click', () => {
    const pass = document.getElementById('admin-pass-input').value;
    if (pass === '12356790') {
      document.getElementById('admin-lock').classList.add('hidden');
      document.getElementById('admin-panel').classList.remove('hidden');
      ensureAdminCaseBuilderUI();
      ensureAdminSyncButton();
      renderAdminPool();
      renderAdminCasePoolCheckboxes();
      renderCaseBuilderPreview();
      renderAdminCasesList();
    } else {
      document.getElementById('admin-error').textContent = 'Неверный пароль!';
    }
  });

  // Админка: добавление карточки
  document.getElementById('card-file').addEventListener('change', (e) => {
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

  ['card-rank', 'card-name', 'card-verifier', 'card-publisher', 'card-rarity', 'card-price', 'card-image'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      if (id === 'card-image' && document.getElementById('card-image').value.trim()) {
        uploadedAdminImageDataUrl = '';
        document.getElementById('card-file').value = '';
      }
      renderAdminPreview();
    });
  });

  document.getElementById('add-card-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('card-file');
    const urlInput = document.getElementById('card-image').value.trim();

    if (!uploadedAdminImageDataUrl && !urlInput) {
      showToast('Выбери картинку с ПК или вставь URL!');
      return;
    }

    const newLevel = {
      id: 'lvl_' + Date.now(),
      rank: Number(document.getElementById('card-rank').value),
      name: document.getElementById('card-name').value.trim(),
      verifier: document.getElementById('card-verifier').value.trim(),
      publisher: document.getElementById('card-publisher').value.trim(),
      rarity: document.getElementById('card-rarity').value,
      price: Number(document.getElementById('card-price').value),
      image: uploadedAdminImageDataUrl || urlInput
    };

    const nextPool = [newLevel, ...state.pool];
    const ok = await pushSharedData(nextPool, state.cases, state.recentDrops);
    if (!ok) return;

    state.pool = nextPool;
    saveState();
    renderAdminPool();
    renderAdminCasePoolCheckboxes();
    renderCasesPage();
    e.target.reset();
    fileInput.value = '';
    uploadedAdminImageDataUrl = '';
    renderAdminPreview();
    showToast(`Уровень "${newLevel.name}" добавлен всем игрокам!`);
  });

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
      const image = uploadedCaseImageDataUrl || urlVal;

      if (!name) {
        showToast('Введи название кейса!');
        return;
      }
      if (!price || price <= 0) {
        showToast('Укажи корректную цену кейса!');
        return;
      }
      if (!image) {
        showToast('Выбери картинку кейса с ПК или вставь URL!');
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
      const ok = await pushSharedData(state.pool, nextCases, state.recentDrops);
      if (!ok) return;

      state.cases = nextCases;
      selectedCaseId = newCase.id;
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

  // Модалка редактирования карточки
  document.getElementById('close-edit-modal-btn').addEventListener('click', closeEditModal);
  document.getElementById('cancel-edit-btn').addEventListener('click', closeEditModal);

  document.getElementById('edit-card-file').addEventListener('change', (e) => {
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

  document.getElementById('edit-card-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-card-id').value;
    const idx = state.pool.findIndex(c => c.id === id);
    if (idx === -1) return;

    const current = state.pool[idx];
    const urlVal = document.getElementById('edit-card-image').value.trim();
    const nextImage = editingCardImageDataUrl || urlVal || current.image;

    const nextPool = [...state.pool];
    nextPool[idx] = {
      ...current,
      rank: Number(document.getElementById('edit-card-rank').value),
      name: document.getElementById('edit-card-name').value.trim(),
      verifier: document.getElementById('edit-card-verifier').value.trim(),
      publisher: document.getElementById('edit-card-publisher').value.trim(),
      rarity: document.getElementById('edit-card-rarity').value,
      price: Number(document.getElementById('edit-card-price').value),
      image: nextImage
    };

    const ok = await pushSharedData(nextPool, state.cases, state.recentDrops);
    if (!ok) return;

    state.pool = nextPool;
    saveState();
    renderAdminPool();
    renderAdminCasePoolCheckboxes();
    renderCasesPage();
    closeEditModal();
    showToast(`Карточка "${state.pool[idx].name}" обновлена для всех!`);
  });
}

init();
